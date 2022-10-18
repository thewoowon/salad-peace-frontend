import { gql, useQuery,useSubscription } from "@apollo/client";
import React,{useEffect} from "react";
import { jsx, css } from '@emotion/react'
import { Helmet } from "react-helmet-async";
import { Link, useParams,useNavigate } from "react-router-dom";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { Salad } from "../../components/salad";
import {
  SALAD_FRAGMENT,
  ORDERS_FRAGMENT,
  FULL_ORDER_FRAGMENT,
  BUILDING_FRAGMENT,
} from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  myAreaBuilding,
  myAreaBuildingVariables,
} from '../../__generated__/myAreaBuilding';
import { pendingOrders } from "../../__generated__/pendingOrders";
import {CREATE_PAYMENT_MUTATION, PENDING_ORDERS_SUBSCRIPTION} from "../master/my-building";

export const MY_AREA_BUILDING_QUERY = gql`
  query myAreaBuilding($input: MyBuildingInput!) {
    myAreaBuilding(input: $input) {
      ok
      error
      building {
        ...BuildingParts
        menu {
          ...SaladParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
  ${BUILDING_FRAGMENT}
  ${SALAD_FRAGMENT}
  ${ORDERS_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyAreaBuilding = () => {
  const {id} = useParams<{id:string}>();
  const { data } = useQuery<myAreaBuilding, myAreaBuildingVariables>(
    MY_AREA_BUILDING_QUERY,
    {
        variables: {
            input:{
                id:+(id ?? "")
            }
        },
    }
  );
  const { data: userData } = useMe();
  // @ts-ignore
  const Paddle = window.Paddle;
  const openCheckout  = () => { 
      Paddle.Setup({ vendor: 155253 });
      Paddle.Checkout.open({
        product: 638793,
        email: userData?.me.email,
        successCallback: (data: any) => {
          // createPaymentMutation({
          //   variables: {
          //     input: {
          //       transactionId: data.checkout.id,
          //       restaurantId: +id,
          //     },
          //   },
          // });
        },
      });
  }
  const { data: subscriptionData } = useSubscription<pendingOrders>(
    PENDING_ORDERS_SUBSCRIPTION
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      navigate(`/orders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData, navigate]);
  return (
    <div>
      <Helmet>
        <title>
          {data?.myAreaBuilding.building?.name || "Loading..."} - 샐러드피스
        </title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div className="flex">
        <div 
          className="py-48 w-6/12 bg-gray-300 px-20"
          style={{backgroundImage: `url(${data?.myAreaBuilding.building?.coverImg})`,backgroundSize:"cover"}}
          // css={css`
          //         background-image:url('${data?.myAreaBuilding.building?.coverImg}');
          //         background-size:cover;
          //         }
          //       `}>
          >
          <div className="bg-white w-12/12 py-8 text-center rounded-md">
              <h4 className="text-4xl mb-3">{data?.myAreaBuilding.building?.name}</h4>
              <h5 className="text-md font-light mb-2">
              {data?.myAreaBuilding.building?.category?.name}에 있는 멋진 빌딩
              </h5>
              <h6 className="text-md font-light">
                {data?.myAreaBuilding.building?.address}에 있어요
              </h6>
          </div>
        </div>
        <div className="pb-5 flex flex-col w-6/12 px-20">
          <div className="my-5 flex justify-start">
            <div>
              <button onClick={()=>{navigate(`/area-buildings/${id}/add-salad`)}}
              className="btn px-10 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all m-3">
                샐러드 추가하기
              </button>
              <button onClick={openCheckout}
              className="btn px-10 py-2 bg-purple-300 rounded-md hover:bg-purple-200 transition-all">
                프로모션 구매하기
              </button>
            </div>
          </div>
          <div>
            {data?.myAreaBuilding.building?.menu.length === 0 ? (
              <h4 className="text-xl mb-5">샐러드를 추가해주세요.</h4>
              ) : (
                  <div className="w-full grid mt-2 md:grid-cols-1 gap-x-5 gap-y-10">
                    {data?.myAreaBuilding.building?.menu.map((salad) => (
                      <Salad
                        key={salad.id}
                        name={salad.name}
                        description={salad.description}
                        price={salad.price}
                        coverImg={salad.photo ?? ""}
                        mode="read">
                        </Salad>
                    ))}
                  </div>
                )}
          </div>
          <div className="mt-20 mb-10">
            <h4 className="text-center text-2xl font-medium">판매현황</h4>
            <div className="mt-5">
              <VictoryChart
                height={500}
                theme={VictoryTheme.material}
                width={window.innerWidth}
                domainPadding={50}
                containerComponent={<VictoryVoronoiContainer />}
              >
                <VictoryLine
                  labels={({ datum }) => `$${datum.y}`}
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 18 } as any}
                      renderInPortal
                      dy={-20}
                    />
                  }
                  data={data?.myAreaBuilding.building?.orders.map((order) => ({
                    x: order.createdAt,
                    y: order.total,
                  }))}
                  interpolation="natural"
                  style={{
                    data: {
                      strokeWidth: 5,
                    },
                  }}
                />
                <VictoryAxis
                  tickLabelComponent={<VictoryLabel renderInPortal />}
                  style={{
                    tickLabels: {
                      fontSize: 20,
                    } as any,
                  }}
                  tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
                />
              </VictoryChart>
            </div>        
          </div>
        </div>          
      </div>
    </div>
  );
};