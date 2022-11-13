import { gql } from "@apollo/client";

export const BUILDING_FRAGMENT = gql`
  fragment BuildingParts on Building {
    id
    name
    category {
      name
    }
    address
    isPromoted
    coverImg
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
    building{
      id
      name
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
    building {
      name
    }
    quantity
    createdAt
    updatedAt
  }
`;

export const MY_BUILDING_SALAD_FRAGMENT = gql`
  fragment MyBuildingSaladParts on Assignment {
    id
    name
    manager{
      id
      email
    }
    total
    building{
      id
      name
    }
    salad{
      id
      name
    }
    }
    `;

