import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { buildingsPageQuery, buildingsPageQueryVariables } from "../../__generated__/buildingsPageQuery";
import { Building } from "../../components/building";
import { useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { CATEGORY_FRAGMENT,BUILDING_FRAGMENT } from "../../fragments";
import { Helmet } from "react-helmet-async";

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

export const Buildings = () => {
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
    return (
        <div>
          <Helmet>
            <title>샐러드에 평화를 - 샐러드피스</title>
          </Helmet>
            <div className="flex justify-center items-center h-96 max-w-screen-xl m-auto">
              <div className="flex justify-center items-center h-full w-6/12">
                <p>Map</p>
              </div>
              <div className="flex justify-center items-center h-full w-6/12">
                <div>
                  <p>{"우원님!"}</p>
                  <p>{"현재 파크원에 남아있는 샐러드에요."}</p>
                  <p>54 개</p>
                  <button>바로 주문하기</button>
                </div>
              </div>
            </div>
            {!loading && (
                <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
                    <div className="flex justify-around max-w-sm mx-auto ">
                        {data?.allCategories.categories?.map((category,index) => (
                         <Link key={category.id} to={`/category/${category.slug}`} className="mx-2">
                          <div className="flex flex-col group items-center cursor-pointer">
                            <div
                              className=" w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                              style={{ backgroundImage: `url(${category.coverImg})` }}
                            ></div>
                            <span className="mt-1 text-sm text-center font-medium">
                              {category.name}
                            </span>
                          </div>
                        </Link>
                        ))}
                    </div>
                    <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
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