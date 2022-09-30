import React from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import saladPeaceLogo from "../images/saladPeace_2.svg";
import { useForm } from "react-hook-form";

interface IFormProps{
  searchTerm:string;
}

export const Header: React.FC = () => {
    const { data } = useMe();
    const {register,handleSubmit,getValues} = useForm<IFormProps>();
    const navigate = useNavigate();
    const onSearchSubmit = () =>{
      const searchTerm = getValues();
      navigate("/search",{state:searchTerm});
    }
    return (
      <>
      {
        !data?.me.verified && 
        <div className="bg-green-500 p-3 text-center text-base text-white">
          <span >Please verify your email.</span>
        </div>
      }
        <header className="py-8">
          <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center relative">
            <Link to="/" className="absolute left-0">
              <img src={saladPeaceLogo} className="h-12" alt="Salad Peace" />
            </Link>
            <form onSubmit={handleSubmit(onSearchSubmit)} className="w-full flex items-center justify-center">
                <input
                {...register("searchTerm",{required:true,minLength:3})}
                type="Search"
                className="input w-3/4 md:w-3/12 border border-green-500 border-solid rounded-xl p-3"
                placeholder="Search buildings..."
                />
            </form>
            <span className="text-xs absolute right-0">
              <Link to="/edit-profile">
                <FontAwesomeIcon icon={faUser} className="text-3xl" />
              </Link>
            </span>
          </div>
        </header>
      </>
    );
  };