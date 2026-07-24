import {type JSX, lazy, Suspense} from "react";
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "@/components/common";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";

const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const PlacesPage = lazy(() => import("@/features/places/pages/PlacesPage"));
const PlaceDetailsPage = lazy(() => import("@/features/places/pages/PlaceDetailsPage"));
const VirtualTourPage = lazy(() => import("@/features/virtual-tour/page/VirtualTourPage"));
const AboutPage = lazy(() => import("@/features/about/pages/AboutPage"));
const ContactPage = lazy(() => import("@/features/contact/pages/ContactPage"));
const NotFoundPage = lazy(() => import("@/features/not-found/pages/NotFoundPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const AdminPanelPage = lazy(() => import("@/features/admin/pages/AdminPanelPage"));
const CategoriesListPage = lazy(() => import("@/features/admin/pages/CategoriesListPage"));
const CategoryFormPage = lazy(() => import("@/features/admin/pages/CategoryFormPage"));
const PlacesListPage = lazy(() => import("@/features/admin/pages/PlacesListPage"));
const PlaceFormPage = lazy(() => import("@/features/admin/pages/PlaceFormPage"));
const PlaceImagesPage = lazy(() => import("@/features/admin/pages/PlaceImagesPage"));
const FavoritesPage = lazy(() => import("@/features/favorites/pages/FavoritesPage"));
const MessagesListPage = lazy(() => import("@/features/admin/pages/MessagesListPage"));

const PageLoader = () => (
  <div className="space-y-4 p-8">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);

const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: withSuspense(NotFoundPage),
    children: [
      { index: true, element: <ErrorBoundary>{withSuspense(HomePage)}</ErrorBoundary> },
      { path: "places", element: <ErrorBoundary>{withSuspense(PlacesPage)}</ErrorBoundary> },
      { path: "places/:id", element: <ErrorBoundary>{withSuspense(PlaceDetailsPage)}</ErrorBoundary> },
      { path: "virtual-tour", element: <ErrorBoundary>{withSuspense(VirtualTourPage)}</ErrorBoundary> },
      { path: "about", element: <ErrorBoundary>{withSuspense(AboutPage)}</ErrorBoundary> },
      { path: "contact", element: <ErrorBoundary>{withSuspense(ContactPage)}</ErrorBoundary> },
      { path: "login", element: <ErrorBoundary>{withSuspense(LoginPage)}</ErrorBoundary> },
      { path: "register", element: <ErrorBoundary>{withSuspense(RegisterPage)}</ErrorBoundary> },
      { path: "favorites", element: <ErrorBoundary>{withSuspense(FavoritesPage)}</ErrorBoundary> },
    ],
  },
  {
    path: "/dashboard",
    element: <AdminLayout />,
    errorElement: withSuspense(NotFoundPage),
    children: [
      { index: true, element: <ErrorBoundary>{withSuspense(AdminPanelPage)}</ErrorBoundary> },
      { path: "categories", element: <ErrorBoundary>{withSuspense(CategoriesListPage)}</ErrorBoundary> },
      { path: "categories/new", element: <ErrorBoundary>{withSuspense(CategoryFormPage)}</ErrorBoundary> },
      { path: "categories/:id/edit", element: <ErrorBoundary>{withSuspense(CategoryFormPage)}</ErrorBoundary> },
      { path: "places", element: <ErrorBoundary>{withSuspense(PlacesListPage)}</ErrorBoundary> },
      { path: "places/new", element: <ErrorBoundary>{withSuspense(PlaceFormPage)}</ErrorBoundary> },
      { path: "places/:id/edit", element: <ErrorBoundary>{withSuspense(PlaceFormPage)}</ErrorBoundary> },
      { path: "places/:id/images", element: <ErrorBoundary>{withSuspense(PlaceImagesPage)}</ErrorBoundary> },
      { path: "messages", element: <ErrorBoundary>{withSuspense(MessagesListPage)}</ErrorBoundary> },
    ],
  },
]);
