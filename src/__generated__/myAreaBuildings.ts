/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myAreaBuildings
// ====================================================

export interface myAreaBuildings_myAreaBuildings_buildings_category {
  __typename: "Category";
  name: string;
}

export interface myAreaBuildings_myAreaBuildings_buildings {
  __typename: "Building";
  id: number;
  name: string;
  category: myAreaBuildings_myAreaBuildings_buildings_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}

export interface myAreaBuildings_myAreaBuildings {
  __typename: "MyBuildingsOutput";
  ok: boolean;
  error: string | null;
  buildings: myAreaBuildings_myAreaBuildings_buildings[];
}

export interface myAreaBuildings {
  myAreaBuildings: myAreaBuildings_myAreaBuildings;
}
