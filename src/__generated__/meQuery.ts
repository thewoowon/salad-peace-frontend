/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_building {
  __typename: "Building";
  id: number;
  name: string;
}

export interface meQuery_me_category {
  __typename: "Category";
  id: number;
}

export interface meQuery_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  verified: boolean;
  name: string;
  building: meQuery_me_building | null;
  category: meQuery_me_category | null;
}

export interface meQuery {
  me: meQuery_me;
}
