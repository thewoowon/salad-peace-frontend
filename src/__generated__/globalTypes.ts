/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Master = "Master",
}

export interface BuildingInput {
  buildingId: number;
}

export interface BuildingsInput {
  page?: number | null;
}

export interface CategoryInput {
  page?: number | null;
  slug: string;
}

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateBuildingInput {
  name: string;
  address: string;
  coverImg?: string | null;
  permanentWorker: number;
  buildingCode: string;
  categoryName: string;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  saladId: number;
  options?: OrderItemOptionInputType[] | null;
}

export interface CreatePaymentInput {
  transactionId: string;
  buildingId: number;
  restaurantId: number;
}

export interface CreateSaladInput {
  name: string;
  price: number;
  description: string;
  options?: SaladOptionInputType[] | null;
  buildingId: number;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditProfileInput {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyBuildingInput {
  id: number;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface SaladChoiceInputType {
  name?: string | null;
  extra?: number | null;
}

export interface SaladOptionInputType {
  name: string;
  choices?: SaladChoiceInputType[] | null;
  extra?: number | null;
}

export interface SearchBuildingInput {
  page?: number | null;
  query: string;
}

export interface TakeOrderInput {
  id: number;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
