import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { buildingsPageQuery, buildingsPageQueryVariables } from "../../__generated__/buildingsPageQuery";
import { Building } from "../../components/building";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { CATEGORY_FRAGMENT,BUILDING_FRAGMENT } from "../../fragments";
import { Helmet } from "react-helmet-async";
import GoogleMapReact from "google-map-react";
import { useMe } from "../../hooks/useMe";



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
}
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const Buildings = () => {
    const { data: userData } = useMe();
    console.log(userData);
    const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
    const [map, setMap] = useState<google.maps.Map>();
    const [maps, setMaps] = useState<any>();
    const [page,setPage] = useState(1);
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
    const onNextPageClick = () => setPage((current) => current + 1);
    const onPrevPageClick = () => setPage((current) => current - 1);

    const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
        setMap(map);
        setMaps(maps);
    }

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
    return (
        <div>
          <Helmet>
            <title>샐러드에 평화를 - 샐러드피스</title>
          </Helmet>
            <div className="flex justify-center items-center h-96 max-w-screen-xl m-auto my-20">
              <div className="flex justify-center items-center h-full w-6/12">
                <img src="https://thejobyouhate76.s3.amazonaws.com/parc1.jpeg" className="w-6/12 h-full rounded-xl shadow shadow-md mr-2"></img>
                <div className="w-6/12 h-full rounded-xl shadow shadow-md relative overflow-hidden">
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
              </div>
              <div className="flex justify-center items-center h-full w-6/12">
                <div>
                  <p className="text-3xl">{`${userData?.me.name}님!`}</p>
                  <p className="text-5xl">{`현재 ${userData?.me.building?.name}에`}</p>
                  <p className="text-5xl"><span className=" text-red-500">54</span>개의</p>
                  <p className="text-5xl">샐러드가 남아있어요.</p>
                  <button className="bg-green-400 text-white p-3 rounded-xl mt-3 hover:bg-green-500">바로 주문하기</button>
                </div>
              </div>
            </div>
            <div className="h-96 flex justify-center items-center bg-green-300">
              <p className="text-5xl text-white font-bold ">샐러드피스는 전국 <span className="text-red-400">107</span>개의 빌딩과 함께하고 있어요<div className=""></div></p>
            </div>
            {!loading && (
                <div className="max-w-screen-2xl pb-20 mx-auto mt-12">
                    <div className="flex justify-around max-w-sm mx-auto ">
                        {data?.allCategories.categories?.map((category,index) => (
                         <Link key={category.id} to={`/category/${category.slug}`} className="mx-2">
                          <div className="flex flex-col group items-center cursor-pointer">
                            <div
                              className=" w-16 h-16 bg-cover flex justify-center items-center group-hover:bg-gray-100 rounded-full shadow shadow-sm"
                            >
                              <img src={`${category.coverImg}`} className="w-10/12 h-10/12"></img>
                            </div>
                            <span className="mt-1 text-sm text-center font-medium">
                              {category.name}
                            </span>
                          </div>
                        </Link>
                        ))}
                    </div>
                    <div className="grid mt-10 md:grid-cols-4 gap-x-5 gap-y-10">
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