import React from 'react';

interface IButtonProps{
    canClick:boolean;
    loading:boolean;
    actionText:string;
}


export const Button:React.FC<IButtonProps> = ({canClick,loading,actionText}) => {
    return (
        <button role={"button"} className={`text-white text-lg focus:outline-none font-medium py-4 transition-colors ${canClick 
        ? "bg-red-500 hover:bg-red-500" 
        : "bg-gray-300 pointer-events-none"}`}>
            {
                loading ? "Loading..." : actionText
            }
        </button>
    )
}