import { gql, useMutation ,useQuery } from "@apollo/client";
import React, { useState } from "react";
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
            buildingId: + (params.id ?? ""),
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
    const addItemToOrder = (saladId: number) => {
      if (isSelected(saladId)) {
        return;
      }
      const createOrderItemInput:CreateOrderItemInput = {
        saladId:saladId,
        options:[]
      }
      setOrderItems((current) => [
        createOrderItemInput
        ,...current
      ]);
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
        const hasOption = Boolean(
          oldItem.options?.find((aOption: { name: string; }) => aOption.name == optionName)
        );
        if (!hasOption) {
          removeFromOrder(saladId);
          setOrderItems((current) => [
            { saladId, options: [{ name: optionName }, ...oldItem.options!] },
            ...current,
          ]);
        }
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
            options: oldItem.options?.filter(
              (option: { name: string; }) => option.name !== optionName
            ),
          },
          ...current,
        ]);
        return;
      }
    };
    const getOptionFromItem = (
      item: CreateOrderItemInput,
      optionName: string
    ) => {
      return item.options?.find((option: { name: string; }) => option.name === optionName);
    };
    const isOptionSelected = (saladId: number, optionName: string) => {
      const item = getItem(saladId);
      if (item) {
        return Boolean(getOptionFromItem(item, optionName));
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
        alert("Can't place empty order");
        return;
      }
      const ok = window.confirm("You are about to place an order");
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
            <title>{data?.building.building?.name || ""} | Salad Peace</title>
          </Helmet>
          <div
            className=" bg-gray-800 bg-center bg-cover py-48"
            style={{
              backgroundImage: `url(${data?.building.building?.coverImg})`,
            }}
          >
            <div className="bg-white w-3/12 py-8 pl-48">
              <h4 className="text-4xl mb-3">{data?.building.building?.name}</h4>
              <h5 className="text-sm font-light mb-2">
                {data?.building.building?.category?.name}
              </h5>
              <h6 className="text-sm font-light">
                {data?.building.building?.address}
              </h6>
            </div>
          </div>
          <div className="container pb-32 flex flex-col items-end mt-20">
          {!orderStarted && (
          <button onClick={triggerStartOrder} className="btn px-10">
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button onClick={triggerConfirmOrder} className="btn px-10 mr-3">
              Confirm Order
            </button>
            <button
              onClick={triggerCancelOrder}
              className="btn px-10 bg-black hover:bg-black"
            >
              Cancel Order
            </button>
          </div>
        )}
            <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
              {data?.building.building?.menu.map((dish: { id: number; name: string; description: string; price: number; options: any[] | null | undefined; }, index: React.Key | null | undefined) => (
                <Salad
                  isSelected={isSelected(dish.id)}
                  id={dish.id}
                  orderStarted={orderStarted}
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  isCustomer={true}
                  options={dish.options}
                  addItemToOrder={addItemToOrder}
                  removeFromOrder={removeFromOrder}>
                    {dish.options?.map((option, index) => (
                      <SaladOption
                        key={index}
                        saladId={dish.id}
                        isSelected={isOptionSelected(dish.id, option.name)}
                        name={option.name}
                        extra={option.extra}
                        addOptionToItem={addOptionToItem}
                        removeOptionFromItem={removeOptionFromItem}
                      />
                  ))}
                  </Salad>
              ))}
            </div>
          </div>
        </div>
      );
  };