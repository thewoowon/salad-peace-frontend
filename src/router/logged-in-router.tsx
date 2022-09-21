import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Restaurants } from "../pages/client/restaurants";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { NotFound } from "../pages/404";
import { Search } from "../pages/client/search";
import { Category } from "../pages/client/category";
import { Restaurant } from "../pages/client/restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { AddDish } from "../pages/owner/add-dish";
import { Order } from "../pages/order";
import { Dashboard } from "../pages/driver/dashboard";
import { UserRole } from "../__generated__/globalTypes";

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants></Restaurants>,
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
    path: "/restaurants/:id",
    component: <Restaurant></Restaurant>,
  },
];

const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail></ConfirmEmail> },
  { path: "/edit-profile", component: <EditProfile></EditProfile> },
  { path: "/orders/:id", component: <Order></Order> },
];

const restaurantRoutes = [
  { path: "/", component: <MyRestaurants></MyRestaurants> },
  { path: "/add-restaurant", component: <AddRestaurant></AddRestaurant> },
  { path: "/restaurants/:id", component: <MyRestaurant /> },
  { path: "/restaurants/:restaurantId/add-dish", component: <AddDish /> },
];
const driverRoutes = [{ path: "/", component: <Dashboard></Dashboard> }];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">...Loading</span>
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
        {data.me.role === UserRole.Owner &&
          restaurantRoutes.map((route, iter) => {
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
