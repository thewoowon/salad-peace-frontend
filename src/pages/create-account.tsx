import { gql, useMutation } from "@apollo/client";
import React, { ReactEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import sp from '../images/sp.svg';
import saladPeace_1 from '../images/saladPeace_1.svg';
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";

import DaumPostcode from 'react-daum-postcode';
import { Address } from "../components/address";

export const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($buildingCode:String!,$createAccountInput:CreateAccountInput!){ 
        createAccount(buildingCode:$buildingCode,input:$createAccountInput){
            ok,
            error
        }
    }
`;

interface ICreateAccountForm{
    email:string;
    password:string;
    role:UserRole;
    name:string;
    buildingCode:string;
}

export const CreateAccount = ()=>{
    const [openPostcode, setOpenPostcode] = useState<boolean>(false);
    const {register, getValues,formState,handleSubmit,watch} = useForm<ICreateAccountForm>({
        mode:"onChange",
        defaultValues:{role:UserRole.Client},
    });
    const navigate = useNavigate();
    const onCompleted = (data:createAccountMutation)=>{
        const {
            createAccount:{ok} 
        } = data;
        if(ok){
            navigate("/");
        }
    }
    const [createAccountMutation,{loading,data:createAccountMutationResult}] = useMutation<createAccountMutation,createAccountMutationVariables>(
        CREATE_ACCOUNT_MUTATION,{
            onCompleted,
        }
    );
    const onSubmit = () =>{
        if(!loading)
        {
            const {email,password,role,name,buildingCode} = getValues();
            createAccountMutation({
                variables:{
                    createAccountInput:{
                        email:email,
                        password:password,
                        role:role,
                        name:name,
                    },
                    buildingCode:buildingCode
                }
            });
        }
    }
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: (e:React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data: any) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setOpenPostcode(false);
        },
    }

    return <div className="flex items-center flex-col lg:mt-12 xl:mt-16 2xl:mt-20">
        <Helmet>
            <title>계정 생성 | 샐러드피스</title>
        </Helmet>
        <div className="w-full max-w-sm flex flex-col px-5 items-center">
            <a href="/create-account"><img src={saladPeace_1} alt="SaladPeace"></img></a>
            <h4 className=" text-center w-full font-medium text-left text-xl">도심 속 샐러드 생활, 샐러드피스</h4>
            <form  className="grid gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("name",{required:"이름은 필수입니다."})}
                    type="name"
                    placeholder="이름을 입력하세요." 
                    className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"></input>
                {
                    formState.errors.name?.message && (
                        <FormError errorMessage={formState.errors.name?.message}></FormError>
                    )
                }
                <input 
                    {...register("email",{required:"이메일 입력은 필수입니다.",pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                    type="email"
                    placeholder="이메일을 입력하세요." 
                    className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"></input>
                {
                    formState.errors.email?.type === "pattern" && (
                        <FormError errorMessage={"이메일이 유효하지 않습니다."}></FormError>
                    )
                }
                {
                    formState.errors.email?.message && (
                        <FormError errorMessage={formState.errors.email?.message}></FormError>
                    )
                }
                
                <input 
                    {...register("password",{required:"비밀번호는 필수입니다.",minLength:10})}
                    type="password"
                    placeholder="비밀번호를 입력하세요." 
                    className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"></input>
                {
                    formState.errors.password?.message && (
                        <FormError errorMessage={formState.errors.password?.message}></FormError>
                    )
                }
                <select {...register("role")} className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors">
                    {Object.keys(UserRole).map((value,iter) =>{
                        
                        return(<option key={iter} >{value}</option>)
                        
                    })}
                </select>
                <div>
                    <button type="button" onClick={handle.clickButton}>toggle</button>
                    <Address toggle={openPostcode} setToggle={setOpenPostcode}></Address>
                </div>
                <input 
                    {...register("buildingCode",{required:"빌딩 코드는 필수입니다.",minLength:10})}
                    type="buildingCode"
                    placeholder="빌딩 코드를 입력하세요." 
                    disabled={true}
                    className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"></input>
                {
                    formState.errors.buildingCode?.message && (
                        <FormError errorMessage={formState.errors.buildingCode?.message}></FormError>
                    )
                }
                <Button canClick={formState.isValid} actionText={"계정 생성"} loading={loading}></Button>
                {
                    createAccountMutationResult?.createAccount.error &&(
                        <FormError errorMessage={createAccountMutationResult.createAccount.error}></FormError>
                    )
                }
            </form>
            <div>
                이미 샐러드피스의 회원이신가요?{" "}
                <Link to={"/"} className="text-green-600 hover:underline">로그인하기</Link>
            </div>
        </div>
    </div>
}