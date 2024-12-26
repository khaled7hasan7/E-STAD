import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage from "./components/Login";
import HomePage from "./pages/Home";
import SignupPage from "./components/Signup";
import ServicesPage from "./pages/Services";
import UsPage from "./pages/Us";
import CreateStadPage from "./pages/CreateStad";

// Authentication utility function
const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Return true if a token exists, otherwise false
};

// Protected Route Wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                { index: true, element: <HomePage /> },
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
                    path: "services",
                    element: <ServicesPage />,
                },
                {
                    path: "createStad",
                    element: <CreateStadPage />,
                },
                {
                    path: "dashboard",
                    element: (
                        // <ProtectedRoute element={<Dashboard />} />
                        <ProtectedRoute element={<HomePage />} />
                    ), // Protect the dashboard route
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRouter;
