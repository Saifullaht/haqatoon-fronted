import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";
import BloodDonorForm from "./pages/BloodDonarForm";
import Home from "./pages/home";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import Login from "./pages/login";
import Signup from "./pages/signup";
import BloodDonars from "./pages/BloodDonars";
import { AuthContext } from "./Context/Authcontext";

// Debounce Hook for navigation
const useDebouncedNavigate = () => {
  const navigate = useNavigate();
  let debounceTimer;

  return (path) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      navigate(path);
    }, 300); // 300ms debounce time
  };
};

// Layout for main content pages (with Navbar)
const MainLayout = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
);

// Layout for Admin (with Sidebar)
const AdminLayout = ({ children }) => (
  <div style={{ display: "flex" }}>
    <Sidebar />
    <div style={{ marginLeft: "16rem", flex: 1 }}>{children}</div>
  </div>
);

// Private route wrapper for authenticated users
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Public Route wrapper for Login and Signup pages
const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? children : <Navigate to="/home" />;
};

const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const debouncedNavigate = useDebouncedNavigate(); // Use debounced navigation
  const location = useLocation(); // Get the current path

  // Check for token in localStorage and set user on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("user");
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      setUser(null);
    }
  }, [setUser]);

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {/* Render Navbar only if not on login/signup page */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Private Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <MainLayout>
                <About />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <MainLayout>
                <ContactUs />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/BloodDonorForm"
          element={
            <PrivateRoute>
              <MainLayout>
                <BloodDonorForm />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/BloodDonars"
          element={
            <PrivateRoute>
              <MainLayout>
                <BloodDonars />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Public Routes for Login and Signup */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Catch-All Route */}
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;