import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

export const Billing = () => {
    const params = useParams<{order_id:string}>();

    return (<div>
                <Helmet>
                    <title>주문하기 - 샐러드피스</title>
                </Helmet>
                <h1>Billing 주문 번호 {params.order_id}</h1>
                <div>주문해주셔서 감사합니다!</div>
            </div>
        )
};