import { gql, useQuery } from "@apollo/client";
import { myOrderQuery } from "../__generated__/myOrderQuery";

export const GET_ORDER_BY_ID_QUERY = gql`
  query myOrderQuery{
    myOrder{
      order {
        total
        items{
          id
        }
        customer{
          id
        }
        quantity
      }
      salads{
        id
        price
        name
        photo
        description
      }
    }
  }
`;


export const useMyOrder = () => {
  return useQuery<myOrderQuery>(GET_ORDER_BY_ID_QUERY);
};