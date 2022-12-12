import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {useParams } from "react-router-dom";
import { Building } from "../../components/building";
import { CATEGORY_FRAGMENT, BUILDING_FRAGMENT } from "../../fragments";
import { category, categoryVariables } from "../../__generated__/category";


const CATEGORY_QUERY = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      buildings {
        ...BuildingParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${BUILDING_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

export const Category = () => {
    const params = useParams<{slug:string}>();
    const [page, setPage] = useState(1);
    const onNextPageClick = () => setPage((current) => current + 1);
    const onPrevPageClick = () => setPage((current) => current - 1);
    const { data, loading } = useQuery<category, categoryVariables>(
      CATEGORY_QUERY,
      {
        variables: {
          input: {
            page: 1,
            slug: (params.slug ?? "")
          },
        },
      }
    );
    return <div>
        <Helmet>
          <title>샐러드 생활에 평화를 - 샐러드피스</title>
        </Helmet>
        {
            loading 
            ? 
            <h1>Loading...</h1> 
            : 
              <div className="max-w-screen-xl pb-20 mx-auto mt-12">
                  <div className="grid mt-10 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-x-5 gap-y-10">
                    {data?.category.buildings && data?.category.buildings?.map((building) => (
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
                      Page {page} of {data?.category.totalPages}
                    </span>
                    {page !== data?.category.totalPages 
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
        }
    </div>;
  };