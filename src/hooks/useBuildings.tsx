import { gql, useQuery } from "@apollo/client";
import { buildingsNoneQuery } from "../__generated__/buildingsNoneQuery";

export const BUILDINGS_NONE_QUERY = gql`
  query buildingsNoneQuery{
    buildings_none{
      results {
        id
        name
        coverImg
        address
        buildingCode
        category {
          id
        }
      }
      count
    }
  }
`;


export const useBuildings = () => {
  return useQuery<buildingsNoneQuery>(BUILDINGS_NONE_QUERY);
};