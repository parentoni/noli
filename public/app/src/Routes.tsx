/**
 * @file Routes.tsx
 * @description Routes for the application.
 */
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { PaymentTest } from "./pages/payment/PaymentTest";
import { Redirect } from "./pages/redirect/Redirect";
import { AuthProvider } from "./shared/contexts/AuthContext";

const routes: RouteObject[] = [
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/auth/redirect",
    element: <Redirect />
  },
  {
    path: "/test",
    element: <PaymentTest />
  }
]

const router = createBrowserRouter(routes)

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
