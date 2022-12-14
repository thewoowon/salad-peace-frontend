/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrder
// ====================================================

export interface getOrder_getOrder_order_driver {
  __typename: "User";
  email: string;
}

export interface getOrder_getOrder_order_customer {
  __typename: "User";
  email: string;
}

export interface getOrder_getOrder_order_building {
  __typename: "Building";
  name: string;
}

export interface getOrder_getOrder_order {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: getOrder_getOrder_order_driver | null;
  customer: getOrder_getOrder_order_customer | null;
  building: getOrder_getOrder_order_building;
  quantity: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface getOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: string | null;
  order: getOrder_getOrder_order | null;
}

export interface getOrder {
  getOrder: getOrder_getOrder;
}

export interface getOrderVariables {
  input: GetOrderInput;
}
