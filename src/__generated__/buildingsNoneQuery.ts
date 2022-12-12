/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: buildingsNoneQuery
// ====================================================

export interface buildingsNoneQuery_buildings_none_results_category {
  __typename: "Category";
  id: number;
}

export interface buildingsNoneQuery_buildings_none_results {
  __typename: "Building";
  id: number;
  name: string;
  coverImg: string | null;
  address: string;
  buildingCode: string;
  category: buildingsNoneQuery_buildings_none_results_category | null;
}

export interface buildingsNoneQuery_buildings_none {
  __typename: "BuildingsNoneOutput";
  results: buildingsNoneQuery_buildings_none_results[] | null;
  count: number;
}

export interface buildingsNoneQuery {
  buildings_none: buildingsNoneQuery_buildings_none;
}
