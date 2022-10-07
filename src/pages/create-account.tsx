import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import sp from '../images/sp.svg';
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import {Helmet} from 'react-helmet-async';
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";

import DaumPostcode from 'react-daum-postcode';

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
                        name:name
                    },
                    buildingCode:buildingCode
                }
            });
        }
    }
    return <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
        <Helmet>
            <title>Create Account | Salad Peace</title>
        </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
            <img src={sp} className="w-52 mb-10" alt="SaladPeace"></img>
            <h4 className=" w-full font-medium text-left text-3xl">Welcome back</h4>
            <form  className="grid gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    {...register("name",{required:"Name is required"})}
                    type="name"
                    placeholder="Name" 
                    className="input transition-colors"></input>
                {
                    formState.errors.name?.message && (
                        <FormError errorMessage={formState.errors.name?.message}></FormError>
                    )
                }
                <input 
                    {...register("email",{required:"Email is required",pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                    type="email"
                    placeholder="Email" 
                    className="input transition-colors"></input>
                {
                    formState.errors.email?.type === "pattern" && (
                        <FormError errorMessage={"Please Enter a Valid Email"}></FormError>
                    )
                }
                {
                    formState.errors.email?.message && (
                        <FormError errorMessage={formState.errors.email?.message}></FormError>
                    )
                }
                
                <input 
                    {...register("password",{required:"Password is required",minLength:10})}
                    type="password"
                    placeholder="Password" 
                    className="input"></input>
                {
                    formState.errors.password?.message && (
                        <FormError errorMessage={formState.errors.password?.message}></FormError>
                    )
                }
                <select {...register("role")} className="input">
                    {Object.keys(UserRole).map((value,iter) =>{
                        
                        return(<option key={iter} >{value}</option>)
                        
                    })}
                </select>
                <input 
                    {...register("buildingCode",{required:"Building Code is required",minLength:10})}
                    type="buildingCode"
                    placeholder="Building Code" 
                    className="input"></input>
                {
                    formState.errors.buildingCode?.message && (
                        <FormError errorMessage={formState.errors.buildingCode?.message}></FormError>
                    )
                }
                <Button canClick={formState.isValid} actionText={"Create Account"} loading={loading}></Button>
                {
                    createAccountMutationResult?.createAccount.error &&(
                        <FormError errorMessage={createAccountMutationResult.createAccount.error}></FormError>
                    )
                }
            </form>
            <div>
                Already have an account?{" "}
                <Link to={"/"} className="text-green-600 hover:underline">Create an Account</Link>
            </div>
        </div>
    </div>
}