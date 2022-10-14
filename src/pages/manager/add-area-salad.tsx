import { gql, useMutation } from "@apollo/client";
import React ,{ useState }  from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createSalad,
  createSaladVariables,
} from "../../__generated__/createSalad";
import { MY_AREA_BUILDING_QUERY } from "./my-area-building";
import { CREATE_SALAD_MUTATION} from "../master/add-salad";

interface IParams {
  buildingId: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

export const AddAreaSalad = () => {
  const { buildingId } = useParams<{buildingId:string}>();
  const navigate = useNavigate();
  const [createSaladMutation, { loading }] = useMutation<
    createSalad,
    createSaladVariables
  >(CREATE_SALAD_MUTATION, {
    refetchQueries: [
      {
        query: MY_AREA_BUILDING_QUERY,
        variables: {
          input: {
            id: +(buildingId ?? "") ,
          },
        },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));
    createSaladMutation({
      variables: {
        input: {
          name:name,
          price: +price,
          description:description,
          buildingId: +(buildingId ?? ""),
          options: optionObjects,
        },
      },
    });
    navigate(-1);
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>샐러드 주문하기 -샐러드피스</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">샐러드 추가</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="input"
          type="text"
          placeholder="Name"
          {...register("name",{ required: "이름은 필수입니다." })}
        />
        <input
          className="input"
          type="number"
          min={0}
          placeholder="Price"
          {...register("price",{ required: "가격은 필수입니다." })}
        />
        <input
          className="input"
          type="text"
          placeholder="Description"
          {...register("description",{ required: "상세는 필수입니다." })}
        />
        <div className="my-10">
          <h4 className="font-medium  mb-3 text-lg">샐러드 옵션</h4>
          <span
            onClick={onAddOptionClick}
            className=" cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
          >
            샐러드 옵션 추가
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5">
                <input
                  {...register(`${id}-optionName`)}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                  onClick={() => onDeleteClick(id)}
                >
                  삭제
                </span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="샐러드 생성"
        />
      </form>
    </div>
  );
};