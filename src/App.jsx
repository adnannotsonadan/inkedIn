import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public site
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import TattooChat from "./components/TattooChat";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Artists from "./pages/Artists";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

// Admin
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminSignup from "./admin/pages/AdminSignup";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminBookings from "./admin/pages/AdminBookings";
import AdminArtists from "./admin/pages/AdminArtists";
import AdminGallery from "./admin/pages/AdminGallery";

// Shared admin styles
import "./admin/admin.css";

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <TattooChat />
  </>
);

const App = () => {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* ── Public routes ── */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/artists" element={<PublicLayout><Artists /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />

          {/* ── Admin routes ── */}
          <Route path="/admin/login"  element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminBookings /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/artists"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminArtists /></AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminLayout><AdminGallery /></AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
};

export default App;
