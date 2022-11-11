import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import saladPeaceLogo from "../images/saladPeace_2.svg";
import { useForm } from "react-hook-form";
import { Timer } from "./timer";
import logout from "../images/loginOut.svg";
import editProfile from "../images/edit-profile.svg";
import { authTokenVar, client, isLoggedInVar } from "../apollo";

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
    const onClickHandler = () => {
      localStorage.removeItem("salad-token");
      authTokenVar(null);
      isLoggedInVar(false);
      navigate("/",{replace:true});
      client.resetStore();
    }

    return (
      <>
      {
        !data?.me.verified && 
        <div className="bg-gray-600 p-3 text-center text-base text-white">
          <span >이메일 인증이 완료되지 않았어요.</span>
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
                className="input w-3/4 md:w-3/12 border border-gray-500 border-solid rounded-xl p-3 outline-none"
                placeholder="빌딩 이름 검색"
                />
            </form>
            <span className="text-xs absolute right-0 flex justify-center items-center">
              <div>
                <Timer></Timer>
              </div>
              <Link to="/edit-profile">
                <img src={editProfile} className="w-9 h-9" alt="edit-profile"></img>
              </Link>
              <button onClick={onClickHandler}>
                <img src={logout} className="w-12 h-12" alt="logout"></img>
              </button>
            </span>
          </div>
        </header>
      </>
    );
  };