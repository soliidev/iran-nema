import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {Outlet} from "react-router-dom";

const ScrollToTop = () => {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const MainLayout = () => {
    return (
        <>
            <Header />
            <ScrollToTop />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayout;