import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { BUILDING_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

interface IState {
  searchTerm: string;
}

const SEARCH_BUILDING = gql`
  query searchRestaurant($input: SearchBuildingInput!) {
    searchBuilding(input: $input) {
      ok
      error
      totalPages
      totalResults
      buildings {
        ...BuildingParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const state = location.state as IState;
  const { searchTerm } = state;
  const navigate = useNavigate();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_BUILDING);

  useEffect(() => {
    console.log(searchTerm);
    if (!state) {
      return navigate("/", { replace: true });
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, [state, navigate]);
  return (
    <h1>
      <Helmet>
        <title>Home | Uber Eats</title>
      </Helmet>
      Search Page!
    </h1>
  );
};
