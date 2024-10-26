/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";

// Create Virtual Routes

const IndexLazyImport = createFileRoute("/")();
const authLoginLazyImport = createFileRoute("/(auth)/login")();

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const authLoginLazyRoute = authLoginLazyImport
  .update({
    id: "/(auth)/login",
    path: "/login",
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import("./routes/(auth)/login.lazy").then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/(auth)/login": {
      id: "/(auth)/login";
      path: "/login";
      fullPath: "/login";
      preLoaderRoute: typeof authLoginLazyImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexLazyRoute;
  "/login": typeof authLoginLazyRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexLazyRoute;
  "/login": typeof authLoginLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexLazyRoute;
  "/(auth)/login": typeof authLoginLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/login";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/login";
  id: "__root__" | "/" | "/(auth)/login";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute;
  authLoginLazyRoute: typeof authLoginLazyRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  authLoginLazyRoute: authLoginLazyRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/(auth)/login"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/(auth)/login": {
      "filePath": "(auth)/login.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
