/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_searchBuilding_buildings_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurant_searchBuilding_buildings {
  __typename: "Building";
  id: number;
  name: string;
  category: searchRestaurant_searchBuilding_buildings_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}

export interface searchRestaurant_searchBuilding {
  __typename: "SearchBuildingOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  buildings: searchRestaurant_searchBuilding_buildings[] | null;
}

export interface searchRestaurant {
  searchBuilding: searchRestaurant_searchBuilding;
}

export interface searchRestaurantVariables {
  input: SearchBuildingInput;
}
