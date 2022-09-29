/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BuildingsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: buildingsPageQuery
// ====================================================

export interface buildingsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  buildingCount: number;
}

export interface buildingsPageQuery_allCategories {
  __typename: "AllCategoriesOuput";
  ok: boolean;
  error: string | null;
  categories: buildingsPageQuery_allCategories_categories[] | null;
}

export interface buildingsPageQuery_buildings_results_category {
  __typename: "Category";
  name: string;
}

export interface buildingsPageQuery_buildings_results {
  __typename: "Building";
  id: number;
  name: string;
  category: buildingsPageQuery_buildings_results_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}

export interface buildingsPageQuery_buildings {
  __typename: "BuildingsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: buildingsPageQuery_buildings_results[] | null;
}

export interface buildingsPageQuery {
  allCategories: buildingsPageQuery_allCategories;
  buildings: buildingsPageQuery_buildings;
}

export interface buildingsPageQueryVariables {
  input: BuildingsInput;
}
