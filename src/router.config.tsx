import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage  from "./components/Login";
import HomePage from "./pages/Home";
import SignupPage from "./components/Signup";
import ServicesPage from "./pages/Services";
import UsPage from "./pages/Us";

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                { index: true, element: <HomePage /> },
                {
                    path: 'login',
                    element: <LoginPage  />,
                },
                {
                    path: 'signup',
                    element: <SignupPage />,
                },
                {
                    path: 'us',
                    element: <UsPage />,
                },
                {
                    path: 'services',
                    element: <ServicesPage />,
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default AppRouter;