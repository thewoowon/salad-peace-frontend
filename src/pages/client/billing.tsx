import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useMyOrder } from "../../hooks/useOrders";
import saladPeace_1 from '../../images/saladPeace_1.svg';
import { Order } from "../order";

export const Billing = () => {
    const params = useParams<{order_id:string}>();
    const { data: myOrders } = useMyOrder(parseInt(params.order_id ?? ""));
    return (
        <div className="min-h-full flex flex-col items-center lg:mt-6 xl:mt-8 2xl:mt-10">
            <Helmet>
                <title>회원 정보 수정 - 샐러드피스</title>
            </Helmet>
            <div className="w-full max-w-3xl flex flex-col px-5 items-center">
                <h4 className="font-semibold text-2xl mb-3">주문이 접수되었어요!</h4>
                <h5 className="font-semibold mb-3">내역을 확인해주세요.</h5>
                <div className="w-full justify-center">
                    {
                        myOrders?.myOrder.salads && myOrders?.myOrder.salads.map((salad) => {
                            return (
                                <div className="flex h-28 p-3 items-center rounded-md shadow-lg border-2 border-gray-50">
                                    <div className="w-2/12 flex items-center justify-center">
                                        <input type={"checkbox"}  className=" checked:bg-purple-500 "></input>
                                    </div>
                                    <div className="w-6/12 flex items-center justify-start">
                                        <img src={salad.salad.photo ?? ""} alt="salad" className="w-24 h-24 rounded-md object-fill"></img>
                                        <div className="pl-5">
                                            <p>{salad.salad.name}</p>
                                            <p className="text-xs font-bold text-gray-600">{salad.salad.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-2/12 flex items-center justify-center">
                                        <p>수량 : {salad.quantity}</p>
                                    </div>
                                    <div className="w-2/12 flex items-center justify-center">
                                        <p>가격 : {salad.quantity * salad.salad.price}₩</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="flex justify-end h-16 items-center">
                        <div className="w-3/12 flex justify-center items-center">
                            <p>총 수량 : {myOrders?.myOrder.order?.quantity}</p>
                        </div>
                        <div className="w-3/12 flex justify-center items-center">
                            <p>총 가격 : {myOrders?.myOrder.order?.total}₩</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
};