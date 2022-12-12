import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import saladPeace_1 from "../images/saladPeace_1.svg";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UserRole } from "../__generated__/globalTypes";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import Modal from "react-modal";
import { allCategories } from "../__generated__/allCategories";
import { MyBuildings } from "./master/my-buildings";
import { useBuildings } from "../hooks/useBuildings";
import { MyBuilding } from "./master/my-building";

// import DaumPostcode from "react-daum-postcode";
// import { Address } from "../components/address";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation(
    $buildingCode: String!
    $createAccountInput: CreateAccountInput!
  ) {
    createAccount(buildingCode: $buildingCode, input: $createAccountInput) {
      ok
      error
    }
  }
`;

const ALL_CATEGORIES_QUERY = gql`
  query allCategories {
    allCategories {
      ok
      error
      categories {
        id
        name
        slug
        coverImg
      }
    }
  }
`;
interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
  name: string;
  //buildingCode: string;
  floor: number;
}

export const CreateAccount = () => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const { register, getValues, formState, handleSubmit } =
    useForm<ICreateAccountForm>({
      mode: "onChange",
      defaultValues: { role: UserRole.Client },
    });
  const navigate = useNavigate();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok,error },
    } = data;
    if (ok) {
      navigate("/");
    }
    if (error){
        alert(error);
    }
  };

  const [inputBuildingName, setInputBuildingName] = useState<string>("");
  const [myCategory, setMyCategory] = useState<number>(-1);
  const [myBuildingId, setMyBuildingId] = useState<number>(-1);
  const [myBuildingCode, setMyBuildingCode] = useState<string>("");
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const { data: allCategories } = useQuery<allCategories>(ALL_CATEGORIES_QUERY);
  const {data : myBuildings} = useBuildings();
  
  const onSubmit = () => {
      const { email, password, role, name,floor } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {
            email: email,
            password: password,
            role: role,
            name: name,
            floor:parseInt(floor.toString()),
          },
          buildingCode: myBuildingCode,
        },
      });
  };

  const openModal = () => {
    setOpenPostcode(true);
  };

  const closeModal = () => {
    setOpenPostcode(false);
  };

  const customStyle = {
    content: {
      top: "45%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "500px",
    },
  };
  //   const handle = {
  //     // 버튼 클릭 이벤트
  //     clickButton: (e: React.MouseEvent<HTMLButtonElement>) => {
  //       e.stopPropagation();
  //       setOpenPostcode((current) => !current);
  //     },

  //     // 주소 선택 이벤트
  //     selectAddress: (data: any) => {
  //       console.log(`
  //                 주소: ${data.address},
  //                 우편번호: ${data.zonecode}
  //             `);
  //       setOpenPostcode(false);
  //     },
  //   };

  return (
    <div className="flex items-center flex-col lg:mt-12 xl:mt-16 2xl:mt-20">
      <Helmet>
        <title>계정 생성 | 샐러드피스</title>
      </Helmet>
      <div className="w-full max-w-sm flex flex-col px-5 items-center">
        <a href="/create-account">
          <img src={saladPeace_1} alt="SaladPeace"></img>
        </a>
        <h4 className=" text-center w-full font-medium text-left text-xl">
          도심 속 샐러드 생활, 샐러드피스
        </h4>
        <form
          className="grid gap-3 mt-5 w-full mb-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name", { required: "이름은 필수입니다." })}
            type="name"
            placeholder="이름을 입력하세요."
            className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          ></input>
          {formState.errors.name?.message && (
            <FormError
              errorMessage={formState.errors.name?.message}
            ></FormError>
          )}
          <input
            {...register("email", {
              required: "이메일 입력은 필수입니다.",
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="이메일을 입력하세요."
            className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          ></input>
          {formState.errors.email?.type === "pattern" && (
            <FormError errorMessage={"이메일이 유효하지 않습니다."}></FormError>
          )}
          {formState.errors.email?.message && (
            <FormError
              errorMessage={formState.errors.email?.message}
            ></FormError>
          )}

          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: 10,
            })}
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          ></input>
          {formState.errors.password?.message && (
            <FormError
              errorMessage={formState.errors.password?.message}
            ></FormError>
          )}
          <select
            defaultValue={"Client"}
            {...register("role")}
            disabled
            className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          >
            {Object.keys(UserRole).map((value, iter) => {
              return <option key={iter}>{value}</option>;
            })}
          </select>
          <div>
            <button
              type="button"
              className="w-full rounded-md shadow-md px-4 py-2 bg-purple-500 text-white"
              onClick={() => {
                setOpenPostcode(!openPostcode);
              }}
            >
              빌딩 나의 찾기
            </button>
            {/* <Address toggle={openPostcode} setToggle={setOpenPostcode}></Address> */}
          </div>
          <input
            type="buildingCode"
            placeholder="빌딩 코드를 입력하세요."
            disabled={true}
            className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
            value={myBuildingCode}
          ></input>
          <input
            {...register("floor", {
              required: "층수는 필수입니다.",
            })}
            type="floor"
            placeholder="층수를 입력하세요."
            className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
          ></input>
          {formState.errors.floor?.message && (
            <FormError
              errorMessage={formState.errors.floor?.message}
            ></FormError>
          )}
          <Button
            canClick={formState.isValid}
            actionText={"계정 생성"}
            loading={loading}
          ></Button>
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            ></FormError>
          )}
        </form>
        <div>
          이미 샐러드피스의 회원이신가요?{" "}
          <Link to={"/"} className="text-green-600 hover:underline">
            로그인하기
          </Link>
        </div>
      </div>
      <Modal isOpen={openPostcode} style={customStyle} ariaHideApp={false}>
        {myCategory === -1 ? (
          <div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-sm py-1">지역 선택</p>
                <button
                  onClick={closeModal}
                  className="text-md hover:bg-zinc-200 p-1 rounded-full"
                >
                  X
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              {allCategories &&
                allCategories.allCategories.categories?.map(
                  (category, index) => {
                    return (
                      <div key={category.id} className="w-full flex justify-between items-center px-10 bg-zinc-100 border border-zinc-100 py-2 my-2 rounded-md">
                        <p>{category.name}</p>
                        <button onClick={()=>{
                            setMyCategory(category.id)
                        }} className="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md">
                          선택
                        </button>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-sm py-1">빌딩 선택</p>
                <button
                  onClick={() => {
                    setMyCategory(-1);
                    setMyBuildingId(-1);
                    setMyBuildingCode("");
                    closeModal();
                  }}
                  className="text-md hover:bg-zinc-200 p-1 rounded-full"
                >
                  X
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <input
                onChange={(e) => {
                  setInputBuildingName(e.target.value);
                }}
                placeholder="빌딩 이름을 입력하요 검색"
                className=" my-4 px-4 py-2 bg-white shadow-md border border-zinc-200 rounded-md w-full h-12 text-sm outline-none"
              ></input>
            </div>
            <div>
                {
                    myBuildings && myBuildings.buildings_none && myBuildings.buildings_none.results?.map((building, index)=>{
                        return (
                            building.name !== "" && building.name.includes(inputBuildingName) && building.category?.id === myCategory ?
                            <div key={building.id} className="relative border border-zinc-200 flex w-full h-16 bg-white shadow-md rounded-md my-1">
                                <div className="flex justify-center items-center h-full px-2">
                                    <img src={building.coverImg ?? ""} alt="buildingImg" className="w-10 h-10 rounded-full"></img>
                                </div>
                                <div className="flex flex-col items-start justify-center p-2 text-sm">
                                    <p>{building.name}</p>
                                    <p>{building.address}</p>
                                </div>
                                <span className="mx-auto"></span>
                                <div className="flex justify-center items-center px-2">
                                <button onClick={()=>{
                                    setMyBuildingId(building.id)
                                    setMyBuildingCode(building.buildingCode)
                                    closeModal()
                                }} className="px-4 py-2 bg-purple-500 text-white rounded-md shadow-md">
                                선택
                                </button>
                                </div>
                            </div>
                            :
                            null
                        )
                    })
                }
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
