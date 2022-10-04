/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myAreaBuilding
// ====================================================

export interface myAreaBuilding_myAreaBuilding_building_category {
  __typename: "Category";
  name: string;
}

export interface myAreaBuilding_myAreaBuilding_building_menu_options {
  __typename: "SaladOption";
  name: string;
  extra: number | null;
}

export interface myAreaBuilding_myAreaBuilding_building_menu {
  __typename: "Salad";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: myAreaBuilding_myAreaBuilding_building_menu_options[] | null;
}

export interface myAreaBuilding_myAreaBuilding_building_orders {
  __typename: "Order";
  id: number;
  createdAt: any;
  total: number | null;
}

export interface myAreaBuilding_myAreaBuilding_building {
  __typename: "Building";
  id: number;
  name: string;
  category: myAreaBuilding_myAreaBuilding_building_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
  menu: myAreaBuilding_myAreaBuilding_building_menu[];
  orders: myAreaBuilding_myAreaBuilding_building_orders[];
}

export interface myAreaBuilding_myAreaBuilding {
  __typename: "MyBuildingOutput";
  ok: boolean;
  error: string | null;
  building: myAreaBuilding_myAreaBuilding_building | null;
}

export interface myAreaBuilding {
  myAreaBuilding: myAreaBuilding_myAreaBuilding;
}

export interface myAreaBuildingVariables {
  input: MyBuildingInput;
}
