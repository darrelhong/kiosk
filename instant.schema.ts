// kiosk
// https://instantdb.com/dash?s=main&t=home&app=6058892c-89fc-4d53-9b44-cd7ff01c706e

import { i } from "@instantdb/react";

const graph = i.graph(
  {
    "$users": i.entity({
      "email": i.any().unique().indexed(),
    }),
    "merchants": i.entity({
      "category": i.any(),
      "logoSrc": i.any(),
      "name": i.any(),
    }),
    "orders": i.entity({
  
    }),
    "products": i.entity({
  
    }),
  },
  {
    "merchants$user": {
      "forward": {
        "on": "merchants",
        "has": "one",
        "label": "$user"
      },
      "reverse": {
        "on": "$users",
        "has": "one",
        "label": "merchant"
      }
    },
    "merchantsProducts": {
      "forward": {
        "on": "merchants",
        "has": "many",
        "label": "products"
      },
      "reverse": {
        "on": "products",
        "has": "one",
        "label": "merchant"
      }
    }
  }
);

export default graph;
