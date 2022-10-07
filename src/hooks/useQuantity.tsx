import { gql, useQuery } from "@apollo/client";
import { quantityQuery } from "../__generated__/meQuery";

export const QUANTITY_QUERY = gql`
  query quantityQuery {
    quantity {
        quantity
    }
  }
`;

export const useQuantity = () => {
  return useQuery<quantityQuery>(QUANTITY_QUERY);
};