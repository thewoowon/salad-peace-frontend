/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myBuildings
// ====================================================

export interface myBuildings_myBuildings_buildings_category {
  __typename: "Category";
  name: string;
}

export interface myBuildings_myBuildings_buildings {
  __typename: "Building";
  id: number;
  name: string;
  category: myBuildings_myBuildings_buildings_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}

export interface myBuildings_myBuildings {
  __typename: "MyBuildingsOutput";
  ok: boolean;
  error: string | null;
  buildings: myBuildings_myBuildings_buildings[];
}

export interface myBuildings {
  myBuildings: myBuildings_myBuildings;
}
