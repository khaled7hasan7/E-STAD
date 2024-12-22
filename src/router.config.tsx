import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage  from "./components/nweLogin";
import HomePage from "./pages/Home";
import SignupPage from "./components/newSignup";

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
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default AppRouter;