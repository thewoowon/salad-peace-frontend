/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuantityLeftInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: quantityQuery
// ====================================================

export interface quantityQuery_quantity {
  __typename: "QuantityLeftOutput";
  quantity: number | null;
}

export interface quantityQuery {
  quantity: quantityQuery_quantity;
}

export interface quantityQueryVariables {
  input: QuantityLeftInput;
}
