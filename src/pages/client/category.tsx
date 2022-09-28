import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, BUILDING_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";

const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      buildings {
        ...BuildingParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

type ICategoryParams= {
  slug: string;
}

export const Category = () => {
    const params = useParams<{slug:string}>();
    const { data, loading } = useQuery<category, categoryVariables>(
      CATEGORY_QUERY,
      {
        variables: {
          input: {
            page: 1,
            slug: (params.slug ?? "")
          },
        },
      }
    );
    return <h1>Category</h1>;
  };