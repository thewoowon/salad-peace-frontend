import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BUILDING_FRAGMENT } from "../../fragments";
import { myAreaBuildings } from "../../__generated__/myAreaBuildings";
import { AreaBuilding } from "../../components/areaBuilding";

export const MY_AREA_BUILDINGS_QUERY = gql`
  query myAreaBuildings {
    myAreaBuildings {
      ok
      error
      buildings {
        ...BuildingParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
`;

export const MyAreaBuildings = () =>{
    const { data } = useQuery<myAreaBuildings>(MY_AREA_BUILDINGS_QUERY);
  return (
    <div>
      <Helmet>
        <title>담당 빌딩 현황 - 샐러드피스</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto mt-32">
        <h2 className="text-4xl font-medium mb-10">담당 빌딩 현황</h2>
        {data?.myAreaBuildings.ok && data.myAreaBuildings.buildings.length === 0 ? (
          <>
            <h4 className="text-xl mb-5">빌딩이 없는 것 같아요.</h4>
            <Link
              className="text-lime-600 hover:underline"
              to="/add-restaurant"
            >
              Create one &rarr;
            </Link>
          </>
        ):
        <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.myAreaBuildings.buildings.map((building) => (
                <AreaBuilding
                id={building.id + ""}
                coverImg={building.coverImg ? building.coverImg : ""}
                name={building.name}
                categoryName={building.category?.name}
                key={building.id}
            />
            ))}
        </div>
        }
      </div>
    </div>
  );
}
