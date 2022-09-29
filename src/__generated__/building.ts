/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BuildingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: building
// ====================================================

export interface building_building_building_category {
  __typename: "Category";
  name: string;
}

export interface building_building_building_menu_options {
  __typename: "SaladOption";
  name: string;
  extra: number | null;
}

export interface building_building_building_menu {
  __typename: "Salad";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: building_building_building_menu_options[] | null;
}

export interface building_building_building {
  __typename: "Building";
  id: number;
  name: string;
  category: building_building_building_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
  menu: building_building_building_menu[];
}

export interface building_building {
  __typename: "BuildingOutput";
  ok: boolean;
  error: string | null;
  building: building_building_building | null;
}

export interface building {
  building: building_building;
}

export interface buildingVariables {
  input: BuildingInput;
}
