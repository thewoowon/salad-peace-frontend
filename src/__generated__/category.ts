/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_buildings_category {
  __typename: "Category";
  name: string;
}

export interface category_category_buildings {
  __typename: "Building";
  id: number;
  name: string;
  category: category_category_buildings_category | null;
  address: string;
  isPromoted: boolean;
  coverImg: string | null;
}

export interface category_category_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImg: string | null;
  slug: string;
  buildingCount: number;
}

export interface category_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  buildings: category_category_buildings[] | null;
  category: category_category_category | null;
}

export interface category {
  category: category_category;
}

export interface categoryVariables {
  input: CategoryInput;
}
