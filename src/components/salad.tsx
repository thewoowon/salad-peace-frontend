import { constants } from "buffer";
import React, { ReactNode,useState } from "react";
import { building_building_building_menu_options } from "../__generated__/building";

interface ISaladProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  isSelected?: boolean;
  coverImg:string;
  options?: building_building_building_menu_options[] | null;
  addItemToOrder?: (dishId: number,quantity:number) => void;
  removeFromOrder?: (dishId: number) => void;
  children: ReactNode;
  mode: "default" | "read";
  left?:number;
}

export const Salad: React.FC<ISaladProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  isSelected,
  coverImg,
  removeFromOrder,
  children:saladOptions,
  mode,
  left
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id,count);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  const [count,setCount] = useState(0);
  return (
    <div
    onClick={onClick}
    className={`flex py-4 w-10/12 cursor-pointer  transition-all rounded-md shadow-md ${
      isSelected ? "border border-purple-500" : "border border-gray-200 transition-transform "
    }`}
  >
      <div className="flex w-full">
        <div className="w-5/12 pl-5 pr-3 flex items-center">          
            <img src={coverImg} className="object-fill w-48 h-52 rounded-xl" alt="샐러드"></img>
        </div>
        <div className="w-7/12 pl-3 pr-5 py-3 relative">
          <div className="pb-2">
            <p className="text-3xl font-medium flex items-center">
              {name}{" "}
              {orderStarted && (
                <button
                  className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
                    isSelected ? "bg-red-500" : " bg-purple-600"
                  }`}
                  onClick={onClick}
                >
                  {isSelected ? "삭제" : "추가"}
                </button>
              )}
            </p>
            <h4 className="font-medium">{description}</h4>
          </div>
          <div className="flex w-full relative">
            <p className="w-6/12">개당 가격</p>
            <p className="w-6/12 text-right">{price}원</p>
          </div>
          {
            mode === "default" && (
              <>
              <div className="flex w-full relative border-b-2">
                <p className="w-6/12">현재 수량</p>
                <p className="w-6/12 text-right">170개</p>
              </div>
              <div className="flex w-full relative mt-2 pt-2">
                <p className="w-6/12">주문 수량</p>
                <div className="w-6/12 flex justify-end">
                  <button onClick={()=>{
                    const minus = count-1
                    if (minus < 0) {
                      setCount(0)
                    }
                    else{
                      setCount(minus)
                    }
                  }} className="bg-gray-300 w-6 shadow-sm rounded-sm flex justify-center items-center transition-all hover:bg-gray-200">-</button>
                  <div className="bg-white w-6 flex justify-center items-center">{count}</div>
                  <button onClick={()=>{
                    const plus = count+1
                    setCount(plus)
                  }} className="bg-gray-300 w-6 shadow-sm rounded-sm flex justify-center items-center transition-all hover:bg-gray-200">+</button>
                </div>
              </div>
              <div className="flex w-full relative pt-4">
                <p className="w-6/12 font-md text-2xl">총 가격</p>
                <p className="w-6/12 text-right font-bold text-2xl text-green-600">{price*count}원</p>
              </div>
              </>
            )
          }
          {
            mode === "read" && (
              <>
              <div className="flex w-full relative border-b-2">
                <p className="w-6/12">평점</p>
                <p className="w-6/12 text-right">4.5점</p>
              </div>
              <div className="flex w-full relative mt-2 pt-2">
                <p className="w-6/12">활성화</p>
                <p className="w-6/12 text-right">판매중인 상품</p>
              </div>
              <div className="flex w-full relative pt-4">
                <p className="w-6/12 font-md text-2xl">누적판매개수</p>
                <p className="w-6/12 text-right font-bold text-2xl text-green-600">10000개</p>
              </div>
              </>
            )
          }
        </div>
        {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Salad Options:</h5>
          <div className="grid gap-2  justify-start">{saladOptions}</div>
        </div>
        )}
      </div>
    </div>
  );
};