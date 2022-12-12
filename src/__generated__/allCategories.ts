/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allCategories
// ====================================================

export interface allCategories_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  slug: string;
  coverImg: string | null;
}

export interface allCategories_allCategories {
  __typename: "AllCategoriesOuput";
  ok: boolean;
  error: string | null;
  categories: allCategories_allCategories_categories[] | null;
}

export interface allCategories {
  allCategories: allCategories_allCategories;
}
