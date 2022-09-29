import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';
import sp from '../images/sp.svg';
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constant";

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
    return <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <Helmet>
            <title>Login | Salad Peace</title>
        </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
            <img src={sp} className="w-52 mb-10" alt="SaladPeace"></img>
            <h4 className=" w-full font-medium text-left text-3xl">Welcome back</h4>
            <form  
                className="grid gap-3 mt-5 w-full mb-5" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    {...register("email",{
                        required:"Email is required",
                        pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    type="email"
                    placeholder="Email" 
                    required={true}
                    className="input transition-colors"></input>
                {
                    formState.errors.email?.type === "pattern" && (
                        <FormError errorMessage={"Please enter a valid email"}></FormError>
                    )
                }
                {
                    formState.errors.email?.message && (
                        <FormError errorMessage={formState.errors.email?.message}></FormError>
                    )
                }
                <input 
                    {...register("password",{required:"Password is required"})}
                    type="password"
                    required={true}
                    placeholder="Password" 
                    className="input"></input>
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
                New to Uber? <Link to={"/create-account"} className="text-green-600 hover:underline">Create an Account</Link>
            </div>
        </div>
    </div>
}