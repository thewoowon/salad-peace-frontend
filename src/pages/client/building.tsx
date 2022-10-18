/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { gql, useMutation ,useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Salad } from "../../components/salad";
import { BUILDING_FRAGMENT, SALAD_FRAGMENT } from "../../fragments";
import { building, buildingVariables } from "../../__generated__/building";
import { Helmet } from "react-helmet-async";
import { CreateOrderItemInput } from "../../__generated__/globalTypes"
import { SaladOption } from "../../components/salad-option";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";


const BUILDING_QUERY = gql`
  query building($input: BuildingInput!) {
    building(input: $input) {
      ok
      error   
      building {
        ...BuildingParts
        menu {
          ...SaladParts
        }
      }
      assignments {
        total
        salad {
          id
          name
          price
          photo
          description
          options {
            name
            choices {
              name
              extra
            }
            extra
          }
        }
      }
    }
  }
  ${BUILDING_FRAGMENT}
  ${SALAD_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

export const Building = () => {
    const params = useParams<{id:string}>();
    const { loading, data } = useQuery<building, buildingVariables>(
      BUILDING_QUERY,
      {
        variables: {
          input: {
            buildingId: +(params.id ?? ""),
          },
        },
      }
    );
    const [orderStarted, setOrderStarted] = useState(false);
    const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
    const triggerStartOrder = () => {
      setOrderStarted(true);
    };
    const getItem = (saladId: number) => {
      return orderItems.find((order) => order.saladId === saladId);
    };
    const isSelected = (saladId: number) => {
      return Boolean(getItem(saladId));
    };
    const addItemToOrder = (saladId: number,quantity:number) => {
      if (isSelected(saladId)) {
        return;
      }
      const createOrderItemInput:CreateOrderItemInput = {
        saladId:saladId,
        // options:[]
        quantity:quantity
      }
      console.log(createOrderItemInput)
      setOrderItems((current) => [
        createOrderItemInput
        ,...current
      ]);
      console.log(orderItems)
    };
    const removeFromOrder = (saladId: number) => {
      setOrderItems((current) =>
        current.filter((salad) => salad.saladId !== saladId)
      );
    };

    const addOptionToItem = (saladId: number, optionName: string) => {
      if (!isSelected(saladId)) {
        return;
      }
      const oldItem = getItem(saladId);
      if (oldItem) {
        // const hasOption = Boolean(
        //   oldItem.options?.find((aOption: { name: string; }) => aOption.name == optionName)
        // );
        // if (!hasOption) {
        //   removeFromOrder(saladId);
        //   setOrderItems((current) => [
        //     { saladId, options: [{ name: optionName }, ...oldItem.options!] },
        //     ...current,
        //   ]);
        // }
       
          removeFromOrder(saladId);
          setOrderItems((current) => [
            { saladId, quantity:1 },
            ...current,
          ]);
        
      }
    };
    const removeOptionFromItem = (saladId: number, optionName: string) => {
      if (!isSelected(saladId)) {
        return;
      }
      const oldItem = getItem(saladId);
      if (oldItem) {
        removeFromOrder(saladId);
        setOrderItems((current) => [
          {
            saladId,
            // options: oldItem.options?.filter(
            //   (option: { name: string; }) => option.name !== optionName
            // ),
            quantity:1
          },
          ...current,
        ]);
        return;
      }
    };
    // const getOptionFromItem = (
    //   item: CreateOrderItemInput,
    //   optionName: string
    // ) => {
    //   return item.options?.find((option: { name: string; }) => option.name === optionName);
    // };
    const isOptionSelected = (saladId: number, optionName: string) => {
      const item = getItem(saladId);
      if (item) {
        // return Boolean(getOptionFromItem(item, optionName));
        return true;
      }
      return false;
    };
    const triggerCancelOrder = () => {
      setOrderStarted(false);
      setOrderItems([]);
    };
    const navigate = useNavigate();
    const onCompleted = (data: createOrder) => {
      const {
        createOrder: { ok, orderId },
      } = data;
      if (data.createOrder.ok) {
        navigate(`/orders/${orderId}`);
      }
    };
    const [createOrderMutation, { loading: placingOrder }] = useMutation<
      createOrder,
      createOrderVariables
    >(CREATE_ORDER_MUTATION, {
      onCompleted,
    });
    const triggerConfirmOrder = () => {
      if (orderItems.length === 0) {
        alert("주문할 메뉴를 선택해주세요.");
        return;
      }
      const ok = window.confirm("이대로 주문하시겠습니까?");
      if (ok) {
        createOrderMutation({
          variables: {
            input: {
              items: orderItems,
            },
          },
        });
      }
    };
    return (
        <div>
          <Helmet>
            <title>{data?.building.building?.name || ""} - 샐러드피스</title>
          </Helmet>
          <div className="flex">
            <div
              className="py-48 w-6/12 bg-gray-300 px-20"
              css={css`
                        background-image:url('${data?.building.building?.coverImg}');
                        background-size:cover;
                        }
                      `}>
              <div className="bg-white w-12/12 py-8 text-center rounded-md">
                <h4 className="text-4xl mb-3">{data?.building.building?.name}</h4>
                <h5 className="text-md font-light mb-2">
                  {data?.building.building?.category?.name}에 있는 멋진 빌딩
                </h5>
                <h6 className="text-md font-light">
                  {data?.building.building?.address}에 있어요
                </h6>
              </div>
            </div>
            <div className="pb-32 flex flex-col w-6/12 px-20">
              <div className="w-full grid mt-16 md:grid-cols-1 gap-x-5 gap-y-10">
                {data?.building.assignments?.map((dish, index: number) => (
                  <Salad
                    isSelected={isSelected(dish?.salad?.id !== undefined  ? dish.salad.id:0)}
                    id={dish?.salad?.id !== undefined  ? dish.salad.id:0}
                    orderStarted={orderStarted}
                    key={index}
                    name={dish?.salad?.name !== undefined  ? dish.salad.name:""}
                    description={dish?.salad?.description !== undefined  ? dish.salad.description:""}
                    price={dish.salad?.price !== undefined  ? dish.salad.price:0}
                    isCustomer={true}
                    options={dish?.salad?.options}
                    addItemToOrder={addItemToOrder}
                    removeFromOrder={removeFromOrder}
                    coverImg={dish?.salad?.photo ?? ""}
                    >
                      {
                      dish.salad?.options?.map((option: { name: string; extra: number | null | undefined; }, index: React.Key | null | undefined) => (
                        <SaladOption
                          key={index}
                          saladId={dish?.salad?.id !== undefined  ? dish.salad.id:0}
                          isSelected={isOptionSelected(dish?.salad?.id !== undefined  ? dish.salad.id:0, option.name)}
                          name={option.name}
                          extra={option.extra}
                          addOptionToItem={addOptionToItem}
                          removeOptionFromItem={removeOptionFromItem}
                        />
                    ))}
                    </Salad>
                ))}
              </div>
              <div className='w-10/12 flex justify-end py-5'>
                {!orderStarted && (
                <button onClick={triggerStartOrder} className="btn px-10 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all">
                  주문담기
                </button>
                )}
                {orderStarted && (
                  <div className="flex items-center">
                    <button onClick={triggerConfirmOrder} className="btn px-10 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all mr-2">
                      주문하기
                    </button>
                    <button
                      onClick={triggerCancelOrder}
                      className="btn px-10 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
                    >
                      주문취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
  };