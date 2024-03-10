/**
 * @file Routes.tsx
 * @description Routes for the application.
 */
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login/Login";

const routes: RouteObject[] = [
  {
    path: "/auth/login",
    element: <Login />
  }
]

const router = createBrowserRouter(routes)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
