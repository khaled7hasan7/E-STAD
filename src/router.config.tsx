import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage from "./components/Login";
import HomePage from "./pages/Home";
import SignupPage from "./components/Signup";
import StadiumPage from "./pages/MuStadium";
import UsPage from "./pages/Us";
import CreateStadPage from "./pages/CreateStad";
import AdminNotification from "./pages/AdminNotifications";

// Authentication utility function
const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Return true if a token exists, otherwise false
};

// Get a unique user key
const getUserKey = () => {
    const token = localStorage.getItem("authToken");
    return token ? `user-${token}` : "guest";
};

// Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout key={getUserKey()} />, // Add key here to force re-mount
            children: [
                { index: true, element: <HomePage key={getUserKey()} /> }, // Add key here to force re-mount
                {
                    path: "login",
                    element: <LoginPage />,
                },
                {
                    path: "signup",
                    element: <SignupPage />,
                },
                {
                    path: "us",
                    element: <UsPage />,
                },
                {
                    path: "stadium",
                    element: <StadiumPage />,
                },
                {
                    path: "createStad",
                    element: <CreateStadPage />,
                },
                {
                    path: "adminNoti",
                    element: <AdminNotification />,
                },
                {
                    path: "dashboard",
                    element: (
                        <ProtectedRoute
                            element={<HomePage key={getUserKey()} />} // Add key here to force re-mount
                        />
                    ), // Protect the dashboard route
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
