import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

interface IButtonProps{
    canClick:boolean;
    loading:boolean;
    actionText:string;
}


export const Button:React.FC<IButtonProps> = ({canClick,loading,actionText}) => {
    return (
        <button role={"button"} className={`text-white text-lg focus:outline-none font-medium py-4 rounded-lg transition-colors ${canClick 
        ? "bg-purple-400 hover:bg-purple-400" 
        : "bg-gray-300 pointer-events-none"}`}>
            {
                loading 
                ? 
                // <MutatingDots 
                // height="30"
                // width="30"
                // color="rgb(74 222 128)"
                // secondaryColor= 'rgb(239 68 68)'
                // radius='12.5'
                // ariaLabel="mutating-dots-loading"
                // wrapperStyle={{}}
                // wrapperClass=""
                // visible={true}
                // />
                "잠시만 기다려주세요."
                : 
                actionText
            }
        </button>
    )
}