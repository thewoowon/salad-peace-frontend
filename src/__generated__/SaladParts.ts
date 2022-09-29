/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SaladParts
// ====================================================

export interface SaladParts_options {
  __typename: "SaladOption";
  name: string;
  extra: number | null;
}

export interface SaladParts {
  __typename: "Salad";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: SaladParts_options[] | null;
}
