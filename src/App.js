import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 min-h-screen lg:ml-64 transition-all duration-300">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  // routes that don't show layout
  const noLayoutRoutes = ["/login"];
  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return showLayout ? (
    <Layout>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/transactions"
          element={
            isAuthenticated ? <Transactions /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Layout>
  ) : (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
