/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyBuildingSaladParts
// ====================================================

export interface MyBuildingSaladParts_manager {
  __typename: "User";
  id: number;
  email: string;
}

export interface MyBuildingSaladParts_building {
  __typename: "Building";
  id: number;
  name: string;
}

export interface MyBuildingSaladParts_salad {
  __typename: "Salad";
  id: number;
  name: string;
}

export interface MyBuildingSaladParts {
  __typename: "Assignment";
  id: number;
  name: string;
  manager: MyBuildingSaladParts_manager;
  total: number;
  building: MyBuildingSaladParts_building | null;
  salad: MyBuildingSaladParts_salad | null;
}
