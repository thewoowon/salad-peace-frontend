import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BUILDING_FRAGMENT } from "../../fragments";
import { myBuildings } from "../../__generated__/myBuildings";
import { Building } from "../../components/building";

export const MY_BUILDINGS_QUERY = gql`
  query myBuildings {
    myBuildings {
      ok
      error
      buildings {
        ...BuildingParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
`;

export const MyBuildings = () =>{
    const { data } = useQuery<myBuildings>(MY_BUILDINGS_QUERY);
  return (
    <div>
      <Helmet>
        <title>My Buildings | Salad Peace</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">My Buildings</h2>
        {data?.myBuildings.ok && data.myBuildings.buildings.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">You have no Buildings.</h4>
            <Link
              className="text-lime-600 hover:underline"
              to="/add-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        ):
        <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myBuildings.buildings.map((restaurant: { id: React.Key | null | undefined; coverImg: string; name: string; category: { name: string | undefined; }; }) => (
                <Building
                id={restaurant.id + ""}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
                key={restaurant.id}
            />
            ))}
        </div>
        }
      </div>
    </div>
  );
}
