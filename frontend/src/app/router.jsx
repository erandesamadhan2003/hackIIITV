import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/Pages/Home";
import { Login } from "@/auth/Login";
import { Signup } from "@/auth/Signup";
import { CodeEditor } from "@/Pages/CodeEditor";
import { JoinRoom } from "@/Pages/JoinRoom";
import ProtectedRoute from "@/components/ProtectedRoute";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/editor/:roomId",
        element: (
            <ProtectedRoute>
                <CodeEditor />
            </ProtectedRoute>
        ),
    },
    {
        path: "/joinroom",
        element: (
            <ProtectedRoute>
                <JoinRoom />
            </ProtectedRoute>
        ),
    },
]);
