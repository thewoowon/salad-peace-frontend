import { gql, useQuery,useSubscription } from "@apollo/client";
import React,{useEffect} from "react";
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
        <script type="text/javascript">
          
        </script>
      </Helmet>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myAreaBuilding.building?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myAreaBuilding.building?.name || "Loading..."}
        </h2>
        <Link
          to={`/buildings/${id}/add-salad`}
          className=" mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Salad &rarr;
        </Link>
        <span className="cursor-pointer text-white bg-lime-700 py-3 px-10"
        onClick={openCheckout}>
          Buy Promotion &rarr;
        </span>
        <div className="mt-10">
          {data?.myAreaBuilding.building?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
            ) : (
                <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                  {data?.myAreaBuilding.building?.menu.map((salad) => (
                    <Salad
                      key={salad.id}
                      name={salad.name}
                      description={salad.description}
                      price={salad.price}>
                      </Salad>
                  ))}
                </div>
              )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="  mt-10">
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
  );
};