import { gql, useQuery } from "@apollo/client";
import { QuantityLeftInput } from "../__generated__/globalTypes";
import { quantityQuery } from "../__generated__/quantityQuery";

export const QUANTITY_QUERY = gql`
  query quantityQuery($input:QuantityLeftInput!) {
    quantity(input: $input) {
        quantity
    }
  }
`;

export const useQuantity = (id:number) => {
  return useQuery<quantityQuery>(QUANTITY_QUERY,{
    variables: {
      input: {
        id: id,
      },
    },
    pollInterval:500
  });
};