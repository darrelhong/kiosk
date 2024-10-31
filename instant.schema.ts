// kiosk
// https://instantdb.com/dash?s=main&t=home&app=6058892c-89fc-4d53-9b44-cd7ff01c706e

import { i } from "@instantdb/react";

const graph = i.graph(
  {
    $users: i.entity({
      email: i.any().unique().indexed(),
    }),
    merchants: i.entity({
      category: i.string(),
      logoSrc: i.string(),
      name: i.string(),
    }),
    orders: i.entity({
      notes: i.string(),
      quantity: i.number(),
    }),
    products: i.entity({
      description: i.string(),
      imageSrc: i.string(),
      name: i.string(),
      price: i.number(),
    }),
  },
  {
    merchants$user: {
      forward: {
        on: "merchants",
        has: "one",
        label: "$user",
      },
      reverse: {
        on: "$users",
        has: "one",
        label: "merchant",
      },
    },
    merchantsProducts: {
      forward: {
        on: "merchants",
        has: "many",
        label: "products",
      },
      reverse: {
        on: "products",
        has: "one",
        label: "merchant",
      },
    },
    ordersProducts: {
      forward: {
        on: "orders",
        has: "one",
        label: "product",
      },
      reverse: {
        on: "products",
        has: "many",
        label: "orders",
      },
    },
  },
);

export default graph;
