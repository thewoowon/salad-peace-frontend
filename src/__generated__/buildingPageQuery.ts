/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BuildingsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: buildingPageQuery
// ====================================================

export interface buildingPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  buildingCount: number;
}

export interface buildingPageQuery_allCategories {
  __typename: "AllCategoriesOuput";
  ok: boolean;
  error: string | null;
  categories: buildingPageQuery_allCategories_categories[] | null;
}

export interface buildingPageQuery_buildings_results_category {
  __typename: "Category";
  name: string;
}

export interface buildingPageQuery_buildings_results {
  __typename: "Building";
  id: number;
  name: string;
  category: buildingPageQuery_buildings_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface buildingPageQuery_buildings {
  __typename: "BuildingsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: buildingPageQuery_buildings_results[] | null;
}

export interface buildingPageQuery {
  allCategories: buildingPageQuery_allCategories;
  buildings: buildingPageQuery_buildings;
}

export interface buildingPageQueryVariables {
  input: BuildingsInput;
}
