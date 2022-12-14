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
import saladPeace_1 from '../../images/saladPeace_1.svg';
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
    <div className="min-h-full flex items-center justify-center lg:mt-6 xl:mt-8 2xl:mt-10 relative">
      <Helmet>
        <title>????????? ???????????? -???????????????</title>
      </Helmet>
      <div className="w-full max-w-sm flex flex-col px-5 items-center">
        <h4 className="font-semibold text-2xl mb-3">????????? ??????</h4>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          type="text"
          placeholder="??????????????? ??????????????????."
          {...register("name",{ required: "????????? ???????????????." })}
        />
        <input
          className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          type="number"
          min={0}
          placeholder="??????????????? ??????????????????."
          {...register("price",{ required: "????????? ???????????????." })}
        />
        <input
          className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          type="text"
          placeholder="????????? ????????? ??????????????????."
          {...register("description",{ required: "????????? ???????????????." })}
        />
        <div className="flex items-center justify-center">
          <p className="mx-2">???????????? ????????? ??????????&nbsp;&nbsp;{'????????' }</p>
          <button
            type="button"
            onClick={onAddOptionClick}
            className=" cursor-pointer text-white bg-purple-600 rounded-md py-1 px-2 bg-"
          >
            ?????? ??????
          </button>
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="????????? ??????"
        />
      </form>
      </div>
      
          {optionsNumber.length !== 0 &&
          <div className="shadow-md rounded-md top-0 p-5">
            {optionsNumber.map((id) => (
              <div key={id} className="mt-5 transition-all">
                <input
                  {...register(`${id}-optionName`)}
                  className="py-2 px-4 text-sm focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="???????????? ??????????????????."
                />
                <input
                  {...register(`${id}-optionExtra`)}
                  className="py-2 px-4 text-sm focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="?????? ??????????????? ??????????????????."
                />
                <span
                  className="cursor-pointer text-white bg-purple-500 ml-3 py-3 px-4 mt-5 rounded-md"
                  onClick={() => onDeleteClick(id)}
                >
                  ??????
                </span>
              </div>
            ))}
            </div>
            }
      </div>
  );
};