import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import sp from '../images/sp.svg';
import saladPeace_1 from '../images/saladPeace_1.svg';
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constant";
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

//오로지 아폴로만을 위한 (프론트엔드)만을 위한 네이밍 CornMutation
export const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput:LoginInput!){ 
        login(input:$loginInput){
            ok,
            token,
            error
        }
    }
`;

interface ILoginForm{
    email:string;
    password:string;
}

export const Login = ()=>{
    const {register,
         getValues,
         formState,
         handleSubmit,
        } = useForm<ILoginForm>({
        mode:"onChange"
    });
    const onCompleted = (data:loginMutation) =>{
        const {
            login:{ok,token}
        } = data;
        if(ok && token)
        {
            localStorage.setItem(LOCALSTORAGE_TOKEN,token);
            authTokenVar(token);
            isLoggedInVar(true);
        }
    };
    const [loginMutation,{data:loginMutationResult,loading}] = useMutation<
    loginMutation,
    loginMutationVariables
    >(
        LOGIN_MUTATION,{
            onCompleted,
        }
    );
    
    const onSubmit = () =>{
        if(!loading)
        {
            const {email, password} = getValues();
            loginMutation({
                variables:{
                    loginInput:{
                        email:email,
                        password:password
                    }
                }
            });
        }
    }
    return <div className="min-h-full flex items-center flex-col lg:mt-28 xl:mt-32 2xl:mt-40">
        <Helmet>
            <title>로그인 | 샐러드피스</title>
        </Helmet>
            <div className="w-full max-w-sm flex flex-col px-5 items-center">
            <a href="/"><img src={saladPeace_1} alt="SaladPeace"></img></a>
            <h4 className=" text-center w-full font-medium text-left text-xl">도심 속 샐러드 생활, 샐러드피스</h4>
            <form  
                className="grid gap-3 mt-5 w-full mb-5" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    {...register("email",{
                        required:"이메일은 필수입니다.",
                        pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    type="email"
                    placeholder="이메일을 입력해주세요." 
                    required={true}
                    className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"
                    ></input>
                {
                    formState.errors.email?.type === "pattern" && (
                        <FormError errorMessage={"유효한 이메일을 입력해주세요."}></FormError>
                    )
                }
                {
                    formState.errors.email?.message && (
                        <FormError errorMessage={formState.errors.email?.message}></FormError>
                    )
                }
                <input 
                    {...register("password",{required:"비밀번호는 필수입니다."})}
                    type="password"
                    required={true}
                    placeholder="비밀번호를 입력해주세요." 
                    className="h-12 rounded-md border px-5 focus:outline-none focus:bg-purple-100 transition-colors"></input>
                {
                    formState.errors.password?.message && (
                        <FormError errorMessage={formState.errors.password?.message}></FormError>
                    )
                }
                <Button canClick={formState.isValid} actionText={"Log In"} loading={loading}></Button>
                {
                    loginMutationResult?.login.error && (
                        <FormError errorMessage={loginMutationResult.login.error}></FormError>
                    )
                }
            </form>
            <div>
                샐러드피스가 처음이신가요? <Link to={"/create-account"} className="text-green-600 hover:underline">계정 생성</Link>
            </div>
        </div>
    </div>
}