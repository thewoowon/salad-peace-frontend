/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBuildingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createBuilding
// ====================================================

export interface createBuilding_createBuilding {
  __typename: "CreateBuildingOutput";
  error: string | null;
  ok: boolean;
  buildingId: number;
}

export interface createBuilding {
  createBuilding: createBuilding_createBuilding;
}

export interface createBuildingVariables {
  input: CreateBuildingInput;
}
