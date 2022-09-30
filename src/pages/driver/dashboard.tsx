import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useSubscription,useMutation } from "@apollo/client";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { coockedOrders } from "../../__generated__/coockedOrders";
import { Link,useNavigate} from "react-router-dom";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";


const COOCKED_ORDERS_SUBSCRIPTION = gql`
  subscription coockedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
    lat: number;
    lng: number;
  }

interface IDriverProps {
    lat: number;
    lng: number;
    $hover?: any;
  }
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const Dashboard = () => {
    const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
    const [map, setMap] = useState<google.maps.Map>();
    const [maps, setMaps] = useState<any>();

    const onSucces = ({ coords: { latitude, longitude } }: GeolocationPosition) => {
        setDriverCoords({ lat: latitude, lng: longitude });
    };
    
    const onError = (error: GeolocationPositionError) => {
      console.log(error);
    };
    useEffect(() => {
      navigator.geolocation.watchPosition(onSucces, onError, {
        enableHighAccuracy: true,
      });
    }, []);
    useEffect(() => {
        if (map && maps) {
            map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
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
      }, [driverCoords.lat, driverCoords.lng, map, maps]
    );
    const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
        setMap(map);
        setMaps(maps);
    }
    const { data: coockedOrdersData } = useSubscription<coockedOrders>(
      COOCKED_ORDERS_SUBSCRIPTION
    );
    useEffect(() => {
      if (coockedOrdersData?.cookedOrders.id) {
          if (map) {
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              polylineOptions: {
                strokeColor: "#000",
                strokeOpacity: 1,
                strokeWeight: 5,
              },
            });
            directionsRenderer.setMap(map);
            directionsService.route(
              {
                origin: {
                  location: new google.maps.LatLng(
                    driverCoords.lat,
                    driverCoords.lng
                  ),
                },
                destination: {
                  location: new google.maps.LatLng(
                    driverCoords.lat + 0.05,
                    driverCoords.lng + 0.05
                  ),
                },
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (result) => {
                directionsRenderer.setDirections(result);
              }
            );
          
        };
      }
    }, [coockedOrdersData, driverCoords.lat, driverCoords.lng, map]);

    const navigate = useNavigate();
    const onCompleted = (data: takeOrder) => {
        if (data.takeOrder.ok) {
            navigate(`/orders/${coockedOrdersData?.cookedOrders.id}`);
        }
    };
    const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
        TAKE_ORDER_MUTATION,
        {
        onCompleted,
        }
    );
    const triggerMutation = (orderId: number) => {
        takeOrderMutation({
        variables: {
            input: {
            id: orderId,
            },
        },
        });
    };
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          draggable={true}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33,
          }}
          bootstrapURLKeys={{ key: "AIzaSyDKkUZT0Bt7y-uscb-zXebDQbluZ8IlUDY" }}
          ></GoogleMapReact>
      </div>
      <div className=" max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {coockedOrdersData?.cookedOrders.building ? (
          <>
            <h1 className="text-center  text-3xl font-medium">
              New Coocked Order
            </h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pick it up soon @{" "}
              {coockedOrdersData?.cookedOrders.building?.name}
            </h1>
            <Link
              to={`/orders/${coockedOrdersData?.cookedOrders.id}`}
              className="btn w-full  block  text-center mt-5"
            >
              Accept Challenge &rarr;
            </Link>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">
            No orders yet...
          </h1>
        )}
      </div>
    </div>
  );
};