/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdatesInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: orderUpdates
// ====================================================

export interface orderUpdates_orderUpdates_driver {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_customer {
  __typename: "User";
  email: string;
}

export interface orderUpdates_orderUpdates_building {
  __typename: "Building";
  name: string;
}

export interface orderUpdates_orderUpdates {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: orderUpdates_orderUpdates_driver | null;
  customer: orderUpdates_orderUpdates_customer | null;
  building: orderUpdates_orderUpdates_building;
  quantity: number | null;
}

export interface orderUpdates {
  orderUpdates: orderUpdates_orderUpdates;
}

export interface orderUpdatesVariables {
  input: OrderUpdatesInput;
}
