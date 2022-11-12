import { gql, useQuery } from "@apollo/client";
import { myOrderQuery } from "../__generated__/myOrderQuery";

export const GET_ORDER_BY_ID_QUERY = gql`
  query myOrderQuery($input:GetOrderInput!){
    myOrder(input:$input){
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
        quantity
        salad{
          name
          photo
          price
          description
        }
      }
    }
  }
`;


export const useMyOrder = (order_id:number) => {
  return useQuery<myOrderQuery>(GET_ORDER_BY_ID_QUERY,
    {
      variables: {
        input: {
          id: order_id,
        },
      },
    }
  );
};