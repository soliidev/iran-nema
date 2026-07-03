import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const AdminLayout = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;
