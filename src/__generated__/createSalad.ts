/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSaladInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createSalad
// ====================================================

export interface createSalad_createSalad {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface createSalad {
  createSalad: createSalad_createSalad;
}

export interface createSaladVariables {
  input: CreateSaladInput;
}
