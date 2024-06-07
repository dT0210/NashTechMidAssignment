import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import RequiredAuth from "../components/RequiredAuth";
import NotFound from "../pages/NotFound";

const LoginLazy = React.lazy(() => import("../pages/Login"));
const HomeLazy = React.lazy(() => import("../pages/Users/Home"));
const BooksLazy = React.lazy(() => import("../pages/Users/Books/Books"));
const BookDetailsLazy = React.lazy(() => import("../pages/BookDetails"));
const ProfileLazy = React.lazy(() => import("../pages/Users/Profile"));
const RequestDetailsLazy = React.lazy(
  () => import("../pages/Users/RequestDetails"),
);

const UserRoutes = () => {
  const elements = useRoutes([
    {
      path: "/",
      element: (
        <Suspense>
          <HomeLazy />
        </Suspense>
      ),
    },
    {
      path: "/books",
      element: (
        <Suspense>
          <BooksLazy />
        </Suspense>
      ),
    },
    {
      path: "/books/:id",
      element: (
        <Suspense>
          <BookDetailsLazy />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense>
          <LoginLazy />
        </Suspense>
      ),
    },
    {
      path: "/profile",
      element: (
        <RequiredAuth>
          <Suspense>
            <ProfileLazy />
          </Suspense>
        </RequiredAuth>
      ),
    },
    {
      path: "/requests/:id",
      element: (
        <RequiredAuth>
          <Suspense>
            <RequestDetailsLazy />
          </Suspense>
        </RequiredAuth>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return elements;
};

export default UserRoutes;
