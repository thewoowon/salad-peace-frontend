/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchBuilding
// ====================================================

export interface searchBuilding_searchBuilding_buildings_category {
  __typename: "Category";
  name: string;
}

export interface searchBuilding_searchBuilding_buildings {
  __typename: "Building";
  id: number;
  name: string;
  category: searchBuilding_searchBuilding_buildings_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}

export interface searchBuilding_searchBuilding {
  __typename: "SearchBuildingOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  buildings: searchBuilding_searchBuilding_buildings[] | null;
}

export interface searchBuilding {
  searchBuilding: searchBuilding_searchBuilding;
}

export interface searchBuildingVariables {
  input: SearchBuildingInput;
}
