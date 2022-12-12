import { gql, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  buildingsPageQuery,
  buildingsPageQueryVariables,
} from "../../__generated__/buildingsPageQuery";
import { Building } from "../../components/building";
import { useNavigate, Link } from "react-router-dom";
import {
  CATEGORY_FRAGMENT,
  BUILDING_FRAGMENT,
} from "../../fragments";
import { Helmet } from "react-helmet-async";
import GoogleMapReact from "google-map-react";
import { useMe } from "../../hooks/useMe";
import { useQuantity } from "../../hooks/useQuantity";
import { css } from "@emotion/react";
import { useBuildings } from "../../hooks/useBuildings";
import { PENDING_ORDERS_SUBSCRIPTION } from "../master/my-building";
import { pendingOrders, pendingOrders_pendingOrders } from "../../__generated__/pendingOrders";
import editProfile from "../../images/edit-profile.svg";

// const MY_BUIDING_SALAD_SUBSCRIPTION = gql`
//   subscription pendingOrders{
//     pendingOrders {
//       ...FullOrderParts
//     }
//   }
//   ${MY_BUILDING_SALAD_FRAGMENT}
// `;

// export const IGNITED_ORDERS_SUBSCRIPTION = gql`
//   subscription ingnitedOrders {
//     ingnitedOrders {
//       ...FullOrderParts
//     }
//   }
//   ${FULL_ORDER_FRAGMENT}
// `;

const BUILDINGS_QUERY = gql`
  query buildingsPageQuery($input: BuildingsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    buildings(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...BuildingParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
  address: string;
}
const Driver: React.FC<IDriverProps> = ({ address }) => (
  <div>
    <div
      style={{
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px",
        borderRadius: "50%",
        fontWeight: "bold",
      }}
      className="text-5xl w-20 hover:scale-110 transform transition ease-in tooltip"
    >
      🥗
      <span className="tooltiptext tooltip-top">{address}</span>
    </div>
    <div className="w-20 text-lg bg-purple-500 rounded-lg text-white text-center h-8 flex justify-center items-center">
      여기에요!
    </div>
  </div>
);

interface IMarkerProps {
  text: string;
}

const CustomMarker = ({ text }: IMarkerProps) => (
  <div
    css={css`
      background: white;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      width: 70px;
      height: 30px;

      font-size: 15px;
    `}
  >
    {text}
  </div>
);

export const Buildings = () => {
  const { data: subscriptionData } =
    useSubscription<pendingOrders>(PENDING_ORDERS_SUBSCRIPTION);
  const { data: userData } = useMe();
  const { data: buildings_none } = useBuildings();
  const [myCoords, setMyCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, loading } = useQuery<
    buildingsPageQuery,
    buildingsPageQueryVariables
  >(BUILDINGS_QUERY, {
    variables: {
      input: {
        page: page,
      },
    },
  });
  const {
    data: quantity,
    loading: quantityLoading,
    // refetch: quantityRefetching,
  } = useQuantity(userData?.me.building?.id ?? 0);
  // const [substract, setSubstract] = useState(0);
  const [nowOrders,setNowOrders] = useState<pendingOrders_pendingOrders[]>([])
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(myCoords.lat, myCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  const onSucces = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setMyCoords({ lat: latitude, lng: longitude });
  };

  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    if (subscriptionData?.pendingOrders) {
      for (let index = 0; index < nowOrders.length; index++) {
        const element = nowOrders[index];
        if (subscriptionData.pendingOrders.id === element.id){
          return
        }
      }
      nowOrders.push(subscriptionData.pendingOrders);
      setNowOrders(nowOrders);
    }
  }, [subscriptionData,nowOrders]);

  useEffect(() => {
    navigator.geolocation.watchPosition(onSucces, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(myCoords.lat, myCoords.lng));
      map.setZoom(16); 
      /* const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              {
                location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
              },
              (results, status) => {
                console.log(status, results);
              }
            ); */
    }
  }, [myCoords.lat, myCoords.lng, map, maps]);

  return (
    <div>
      <Helmet>
        <title>샐러드 생활에 평화를 - 샐러드피스</title>
      </Helmet>
      <div className="flex justify-center items-center h-96 max-w-screen-xl m-auto my-20">
        <div className="flex justify-center items-center h-full w-4/12">
          <img
            src={userData?.me.building?.coverImg ?? ""}
            className="w-6/12 h-80 rounded-xl shadow-md mr-2"
            alt="hello"
          ></img>
          <div className="w-6/12 h-80 rounded-xl shadow relative overflow-hidden">
            <GoogleMapReact
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={onApiLoaded}
              defaultZoom={16}
              draggable={true}
              defaultCenter={{
                lat: 59.95,
                lng: 30.33,
              }}
              bootstrapURLKeys={{
                key: "AIzaSyDKkUZT0Bt7y-uscb-zXebDQbluZ8IlUDY",
              }}
            >
              <Driver
                lat={myCoords.lat}
                lng={myCoords.lng}
                address={userData?.me.building?.address ?? ""}
              ></Driver>
            </GoogleMapReact>
          </div>
        </div>
        <div className="flex justify-center items-center h-full w-5/12">
          <div>
            <p className="text-3xl">{`${userData?.me.name}님!`}</p>
            <p className="text-5xl">{`현재 ${userData?.me.building?.name}에`}</p>
            <p className="text-5xl">
              <span className=" text-red-500">
                {!quantityLoading
                  ? `${(quantity?.quantity.quantity ?? 0)}`
                  : "???"}
              </span>
              개의
            </p>
            <p className="text-5xl">샐러드가 남아있어요.</p>
            <button
              onClick={() => {
                navigate(`buildings/${userData?.me.building?.id}`);
              }}
              className="bg-gray-600 text-white p-3 rounded-xl mt-3 hover:bg-gray-600"
            >
              바로 주문하기
            </button>
          </div>
        </div>
        <div className="flex justify-center h-full w-3/12 overflow-scroll">
          <ol className="w-full h-9/12 p-3">
            {
              nowOrders?.map((value,iter) => {
                return(
                  <li key={iter} className="h-28 shadow-lg rounded-lg p-5 flex justify-center items-center">
                    <div className="w-9/12">
                      <p>{value.quantity}{"개 주문! "}{"감사합니다😊"}</p>
                      <p>{value.customer?.email}</p>
                      <p>{value.createdAt.substring(0, 10)}</p>
                    </div>
                    <div className="w-3/12 flex justify-end items-center">
                      <img className="w-full" src={editProfile} alt="person"></img>
                    </div>
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
      <div className="h-96 flex justify-center items-center bg-gray-100">
        <p className="text-4xl text-black ">
          샐러드피스는 전국{" "}
          <span className="text-purple-500">
            {buildings_none?.buildings_none.count}
          </span>
          개의 빌딩과 함께하고 있어요
        </p>
      </div>
      {!loading && (
        <div className="max-w-screen-xl pb-20 mx-auto mt-12">
          <div className="flex justify-around max-w-sm mx-auto ">
            {data?.allCategories.categories?.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="mx-2"
              >
                <div className="flex flex-col group items-center cursor-pointer">
                  <div className=" w-16 h-16 bg-cover flex justify-center items-center group-hover:bg-gray-100 rounded-full shadow shadow-sm">
                    <img
                      src={`${category.coverImg}`}
                      className="w-10/12 h-10/12"
                      alt="Category"
                    ></img>
                  </div>
                  <span className="mt-1 text-sm text-center font-medium">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid mt-10 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
            {data?.buildings.results?.map((building) => (
              <Building
                id={building.id + ""}
                coverImg={building.coverImg ? building.coverImg : ""}
                name={building.name}
                categoryName={building.category?.name}
                key={building.id}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.buildings.totalPages}
            </span>
            {page !== data?.buildings.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
