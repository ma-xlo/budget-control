import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { ThemeProvider } from "@core/components/theme-provider";
import { ReactQueryProvider as QueryClientProvider } from "@core/lib/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import ExpensesPage from "./pages/expenses";
import { getCookie } from "./modules/core/utils/helpers";
import { Toaster } from "./modules/core/components/ui/sonner";
import DashboardLayout from "./modules/core/layouts/dashboard";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import AuthRequired from "./modules/auth/layouts/auth-required";
import useMediaQuery from "./modules/core/hooks/use-media-query";

const layout = getCookie("react-resizable-panels:layout");
const collapsed = getCookie("react-resizable-panels:collapsed");

const defaultLayout = layout ? JSON.parse(layout) : undefined;
const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

const App = () => {
  const isDesktop = useMediaQuery();

  return (
    <React.StrictMode>
      <QueryClientProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Toaster position={isDesktop ? "bottom-right" : "top-center"} />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRequired />,
    children: [
      {
        path: "/",
        element: (
          <DashboardLayout
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
          />
        ),
        children: [
          {
            path: "/",
            element: <ExpensesPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
