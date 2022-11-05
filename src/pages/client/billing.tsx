import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useMyOrder } from "../../hooks/useOrders";
import saladPeace_1 from '../../images/saladPeace_1.svg';

export const Billing = () => {
    const params = useParams<{order_id:string}>();
    const { data: myOrders } = useMyOrder();
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
                                    <div className="w-6/12 flex items-center justify-center">
                                        <img src={salad.photo ?? ""} alt="salad" className="w-32 rounded-md"></img>
                                        <div>
                                            <p>{salad.name}</p>
                                            <p className="text-xs font-bold text-gray-600">{salad.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-3/12 flex items-center justify-center">
                                        <p>수량 : {}</p>
                                    </div>
                                    <div className="w-3/12 flex items-center justify-center">
                                        <p>가격 : {}₩</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="flex justify-end h-16 items-center">
                        <div className="w-3/12 flex justify-center items-center">
                            <p>총 수량 : {"2"}</p>
                        </div>
                        <div className="w-3/12 flex justify-center items-center">
                            <p>총 가격 : {"14,000"}₩</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
};