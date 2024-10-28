import { init_experimental } from "@instantdb/react";

import schema from "../../instant.schema.ts";

export const db = init_experimental({
  appId: import.meta.env.VITE_INSTANT_APP_ID,
  schema,
});
