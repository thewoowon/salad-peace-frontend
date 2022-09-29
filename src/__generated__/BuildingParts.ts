/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BuildingParts
// ====================================================

export interface BuildingParts_category {
  __typename: "Category";
  name: string;
}

export interface BuildingParts {
  __typename: "Building";
  id: number;
  name: string;
  category: BuildingParts_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}
