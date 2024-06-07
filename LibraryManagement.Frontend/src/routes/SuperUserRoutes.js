import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import RequiredAuth from "../components/RequiredAuth";
import NotFound from "../pages/NotFound";

const LoginLazy = React.lazy(() => import("../pages/Login"));
const HomeLazy = React.lazy(() => import("../pages/SuperUsers/Home"));
const BooksLazy = React.lazy(() => import("../pages/SuperUsers/Books/Books"));
const BookDetailsLazy = React.lazy(() => import("../pages/BookDetails"));
const EditBookLazy = React.lazy(
  () => import("../pages/SuperUsers/Books/EditBook"),
);
const ProfileLazy = React.lazy(() => import("../pages/SuperUsers/Profile"));
const CategoriesLazy = React.lazy(
  () => import("../pages/SuperUsers/Categories/Categories"),
);
const EditCategoryLazy = React.lazy(
  () => import("../pages/SuperUsers/Categories/EditCategory"),
);
const RequestsLazy = React.lazy(
  () => import("../pages/SuperUsers/BorrowingRequest/Requests"),
);
const RequestDetailsLazy = React.lazy(
  () => import("../pages/SuperUsers/BorrowingRequest/RequestDetails"),
);

const SuperUserRoutes = () => {
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
      path: "/books/edit/:id",
      element: (
        <Suspense>
          <EditBookLazy />
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
      path: "/categories",
      element: (
        <Suspense>
          <CategoriesLazy />
        </Suspense>
      ),
    },
    {
      path: "/categories/edit/:id",
      element: (
        <Suspense>
          <EditCategoryLazy />
        </Suspense>
      ),
    },
    {
      path: "/requests",
      element: (
        <Suspense>
          <RequestsLazy />
        </Suspense>
      ),
    },
    {
      path: "/requests/:id",
      element: (
        <Suspense>
          <RequestDetailsLazy />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return elements;
};

export default SuperUserRoutes;
