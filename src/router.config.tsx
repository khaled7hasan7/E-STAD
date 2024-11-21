import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import Login from "./components/Login";
import HomePage from "./pages/Home";

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                { index: true, element: <HomePage /> },
                {
                    path: 'login',
                    element: <Login />,
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default AppRouter;