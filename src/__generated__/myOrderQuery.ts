/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myOrderQuery
// ====================================================

export interface myOrderQuery_myOrder_order_items {
  __typename: "OrderItem";
  id: number;
}

export interface myOrderQuery_myOrder_order_customer {
  __typename: "User";
  id: number;
}

export interface myOrderQuery_myOrder_order {
  __typename: "Order";
  total: number | null;
  items: myOrderQuery_myOrder_order_items[];
  customer: myOrderQuery_myOrder_order_customer | null;
  quantity: number | null;
}

export interface myOrderQuery_myOrder_salads_salad {
  __typename: "Salad";
  name: string;
  photo: string | null;
  price: number;
  description: string;
}

export interface myOrderQuery_myOrder_salads {
  __typename: "OrderItem";
  quantity: number;
  salad: myOrderQuery_myOrder_salads_salad;
}

export interface myOrderQuery_myOrder {
  __typename: "GetOrderOutput";
  order: myOrderQuery_myOrder_order | null;
  salads: myOrderQuery_myOrder_salads[] | null;
}

export interface myOrderQuery {
  myOrder: myOrderQuery_myOrder;
}

export interface myOrderQueryVariables {
  input: GetOrderInput;
}
