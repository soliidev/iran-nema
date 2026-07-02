import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/features/about/pages/AboutPage";
import ContactPage from "@/features/contact/pages/ContactPage";
import HomePage from "@/features/home/pages/HomePage";
import NotFoundPage from "@/features/not-found/pages/NotFoundPage";
import PlacesPage from "@/features/places/pages/PlacesPage";
import VirtualTourPage from "@/features/virtual-tour/page/VirtualTourPage";
import { createBrowserRouter } from "react-router-dom";
import PlaceDetailsPage from "@/features/places/pages/PlaceDetailsPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "places",
                element: <PlacesPage />,
            },
            {
                path: "virtual-tour",
                element: <VirtualTourPage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "contact",
                element: <ContactPage />,
            },
            {
                path: "places/:id",
                element: <PlaceDetailsPage />,
            },
        ]
    }
]);