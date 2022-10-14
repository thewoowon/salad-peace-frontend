import React from "react";
import { Route, Routes } from "react-router-dom";
import { Buildings } from "../pages/client/buildings";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { NotFound } from "../pages/404";
import { Search } from "../pages/client/search";
import { Category } from "../pages/client/category";
import { Building } from "../pages/client/building";
import { MyBuildings } from "../pages/master/my-buildings";
import { AddBuilding } from "../pages/master/add-buildings";
import { MyBuilding } from "../pages/master/my-building";
import { AddSalad } from "../pages/master/add-salad";
import { Order } from "../pages/order";
import { Dashboard } from "../pages/driver/dashboard";
import { UserRole } from "../__generated__/globalTypes";
import { MutatingDots } from 'react-loader-spinner';
import { MyAreaBuildings } from "../pages/manager/my-area-buildings";
import { AddAreaBuilding } from "../pages/manager/add-area-buildings";
import { MyAreaBuilding } from "../pages/manager/my-area-building";
import { AddAreaSalad } from "../pages/manager/add-area-salad";

const clientRoutes = [
  {
    path: "/",
    component: <Buildings></Buildings>,
  },
  {
    path: "/search",
    component: <Search></Search>,
  },
  {
    path: "/category/:slug",
    component: <Category></Category>,
  },
  {
    path: "/buildings/:id",
    component: <Building></Building>,
  },
  
];

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail></ConfirmEmail> },
  { path: "/edit-profile", component: <EditProfile></EditProfile> },
  { path: "/orders/:id", component: <Order></Order> },
];

const buildingRoutes = [
  { path: "/", component: <MyBuildings></MyBuildings> },
  { path: "/add-building", component: <AddBuilding></AddBuilding> },
  { path: "/buildings/:id", component: <MyBuilding></MyBuilding> },
  { path: "/buildings/:buildingId/add-salad", component: <AddSalad></AddSalad> },
];
const managerRoutes = [
  { path: "/", component: <MyAreaBuildings></MyAreaBuildings> },
  { path: "/add-area-building", component: <AddAreaBuilding></AddAreaBuilding> },
  { path: "/area-buildings/:id", component: <MyAreaBuilding></MyAreaBuilding> },
  { path: "/area-buildings/:buildingId/add-salad", component: <AddAreaSalad></AddAreaSalad> },
]

const driverRoutes = [{ path: "/", component: <Dashboard></Dashboard> }];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">
        <MutatingDots 
          height="120"
          width="120"
          color="rgb(74 222 128)"
          secondaryColor= 'rgb(239 68 68)'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        </span>
      </div>
    );
  }
  return (
    <>
      <Header></Header>
      <Routes>
        {data.me.role === UserRole.Client &&
          clientRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.path}
                element={route.component}
              ></Route>
            );
          })}
        {data.me.role === UserRole.Master &&
          buildingRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.path}
                element={route.component}
              ></Route>
            );
          })}
        {data.me.role === UserRole.Delivery &&
          driverRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.path}
                element={route.component}
              ></Route>
            );
          })}
        {data.me.role === UserRole.Manager &&
        managerRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={route.component}
            ></Route>
          );
        })}
        {commonRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={route.component}
            ></Route>
          );
        })}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
};
