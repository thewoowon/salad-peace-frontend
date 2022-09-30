import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createBuilding,
  createBuildingVariables,
} from "../../__generated__/createBuilding";
import { CREATE_ACCOUNT_MUTATION } from "../create-account";
import { MY_BUILDINGS_QUERY } from "./my-buildings";

const CREATE_BUILDING_MUTATION = gql`
  mutation createBuilding($input: CreateBuildingInput!) {
    createBuilding(input: $input) {
      error
      ok
      buildingId
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file:string;
  permanentWorker: number;
  buildingCode: string;
}

export const AddBuilding = () => {
  const client = useApolloClient();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const onCompleted = (data: createBuilding) => {
    const {
      createBuilding: { ok,buildingId},
    } = data;
    if (ok) {
      const { name, categoryName, address, permanentWorker, buildingCode} = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_BUILDINGS_QUERY });
      client.writeQuery({
        query: MY_BUILDINGS_QUERY,
        data: {
          myBuildings: {
            ...queryResult.myBuildings,
            buildings: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: buildingId,
                isPromoted: false,
                name,
                permanentWorker:permanentWorker,
                buildingCode:buildingCode,
                __typename: "Building",
              },
              ...queryResult.myBuildings.buildings,
            ],
          },
        },
      });
      navigate("/");
    }
  };
  const [createBuildingMutation, { data }] = useMutation<
    createBuilding,
    createBuildingVariables
    >(CREATE_BUILDING_MUTATION, {
      onCompleted,
      refetchQueries:[{query:MY_BUILDINGS_QUERY}]
    });
  const {
    register,
    getValues,
    formState,
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address, permanentWorker, buildingCode } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      createBuildingMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
            permanentWorker,
            buildingCode
          },
        },
      });
    } catch (e) {}
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>빌딩 추가하기 - 샐러드피스</title>
      </Helmet>
      <h1>Add Building</h1>
      <form onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5">
        <input
          className="input"
          type="text"
          placeholder="Name"
          {...register("name", {required: "Name is required."} )}
        />
        <input
          className="input"
          type="text"
          placeholder="Address"
          {...register("address",{ required: "Address is required." })}
        />
        <input
          className="input"
          type="text"
          placeholder="Category Name"
          {...register("categoryName",{ required: "Category Name is required." })}
        />
        <input
          className="input"
          type="text"
          placeholder="Permanent Worker"
          {...register("permanentWorker",{ required: "Permanent Worker is required." })}
        />
        <input
          className="input"
          type="text"
          placeholder="Building Code"
          {...register("buildingCode",{ required: "Building Code is required." })}
        />
        <div>
          <input type={"file"} 
                accept={"image/*"}
          {...register("file",{required:true})}></input>
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="Create Building"
        />
        {data?.createBuilding?.error && (
          <FormError errorMessage={data.createBuilding.error} />
        )}
      </form>
    </div>
  );
};