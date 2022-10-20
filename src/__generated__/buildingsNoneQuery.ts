/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: buildingsNoneQuery
// ====================================================

export interface buildingsNoneQuery_buildings_none_results {
  __typename: "Building";
  id: number;
  name: string;
  coverImg: string | null;
  address: string;
}

export interface buildingsNoneQuery_buildings_none {
  __typename: "BuildingsNoneOutput";
  results: buildingsNoneQuery_buildings_none_results[] | null;
  count: number;
}

export interface buildingsNoneQuery {
  buildings_none: buildingsNoneQuery_buildings_none;
}
