import { gql } from "@apollo/client";

export const BUILDING_FRAGMENT = gql`
  fragment BuildingParts on Building {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    buildingCount
    # restaurantCount
  }
`;

export const SALAD_FRAGMENT = gql`
  fragment SaladParts on Salad {
    id
    name
    price
    photo
    description
    options {
      name
      extra
    }
  }
`;

export const ORDERS_FRAGMENT = gql`
  fragment OrderParts on Order {
    id
    createdAt
    total
  }
`;

export const FULL_ORDER_FRAGMENT = gql`
  fragment FullOrderParts on Order {
    id
    status
    total
    driver {
      email
    }
    customer {
      email
    }
    buiding {
      name
    }
  }
`