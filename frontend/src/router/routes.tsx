import MainLayout from "@/layouts/MainLayout";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PlacesPage from "@/pages/PlacesPage";
import VirtualTourPage from "@/pages/VirtualTourPage";
import { createBrowserRouter } from "react-router-dom";

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
        ]
    }
]);