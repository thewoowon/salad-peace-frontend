/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myBuilding
// ====================================================

export interface myBuilding_myBuilding_building_category {
  __typename: "Category";
  name: string;
}

export interface myBuilding_myBuilding_building_menu_options {
  __typename: "SaladOption";
  name: string;
  extra: number | null;
}

export interface myBuilding_myBuilding_building_menu_building {
  __typename: "Building";
  id: number;
  name: string;
}

export interface myBuilding_myBuilding_building_menu {
  __typename: "Salad";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myBuilding_myBuilding_building_menu_options[] | null;
  building: myBuilding_myBuilding_building_menu_building | null;
}

export interface myBuilding_myBuilding_building_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface myBuilding_myBuilding_building {
  __typename: "Building";
  id: number;
  name: string;
  category: myBuilding_myBuilding_building_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
  menu: myBuilding_myBuilding_building_menu[];
  orders: myBuilding_myBuilding_building_orders[];
}

export interface myBuilding_myBuilding {
  __typename: "MyBuildingOutput";
  ok: boolean;
  error: string | null;
  building: myBuilding_myBuilding_building | null;
}

export interface myBuilding {
  myBuilding: myBuilding_myBuilding;
}

export interface myBuildingVariables {
  input: MyBuildingInput;
}
