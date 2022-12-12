import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { Building } from "../../components/building";
import { BUILDING_FRAGMENT } from "../../fragments";
import { searchBuilding, searchBuildingVariables } from "../../__generated__/searchBuilding";


interface IState {
  searchTerm: string;
}

const SEARCH_BUILDING = gql`
  query searchBuilding($input: SearchBuildingInput!) {
    searchBuilding(input: $input) {
      ok
      error
      totalPages
      totalResults
      buildings {
        ...BuildingParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const state = location.state as IState;
  const { searchTerm } = state;
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState<searchBuilding | null>(null);
  const [page, setPage] = useState(1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const [callQuery] = useLazyQuery<
    searchBuilding,
    searchBuildingVariables
  >(SEARCH_BUILDING);

  useEffect(() => {
    if (!state) {
      return navigate("/", { replace: true });
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          query: searchTerm,
        },
      },
      onCompleted: (data) => {
        const {
          searchBuilding: { ok, buildings, totalPages },
        } = data;
        if (ok && buildings) {
          setSearchResult(data);
        }
      }
    });
  }, [state, navigate,callQuery,searchTerm]);
  return (
    <div>
      <Helmet>
        <title>샐러드 생활에 평화를 - 샐러드피스</title>
      </Helmet>
      <div className="max-w-screen-xl pb-20 mx-auto mt-12">
                  <div className="grid mt-10 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
                    {searchResult && searchResult.searchBuilding.buildings && searchResult.searchBuilding.buildings.map((building) => (
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
                    {
                      page > 1 
                      ? 
                      (
                        <button
                          onClick={onPrevPageClick}
                          className="focus:outline-none font-medium text-2xl"
                        >
                          &larr;
                        </button>
                      ) 
                      : 
                      (
                        <div></div>
                      )
                    }
                    <span>
                      Page {page} of {searchResult?.searchBuilding.totalPages}
                    </span>
                    {page !== searchResult?.searchBuilding.totalPages 
                      ? 
                      (
                        <button
                          onClick={onNextPageClick}
                          className="focus:outline-none font-medium text-2xl"
                        >
                          &rarr;
                        </button>
                      ) 
                      : 
                      (
                        <div></div>
                      )
                    }
                  </div>
              </div>
    </div>
      
    
  );
};
