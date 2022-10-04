/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React from "react";
import {Link} from "react-router-dom";

interface IBuildingProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const AreaBuilding: React.FC<IBuildingProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={`/area-buildings/${id}`} className="rounded-lg shadow-md bg-white" 
  css={css`
  transition:all 0.2s ease-in-out;
  &:hover {
    scale: 1.01;
  }
`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-cover bg-center mb-3 py-48 rounded-t-lg"
      ></div>
      <h3 className="text-lg px-5">{name}</h3>
      <span className="border-t mt-2 py-2 text-xs opacity-50 px-5">
        {categoryName ? categoryName : "No Category"}
      </span>
    </div>
  </Link>
  
);