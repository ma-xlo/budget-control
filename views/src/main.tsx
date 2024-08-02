import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { ThemeProvider } from "@core/components/theme-provider";
import { ReactQueryProvider as QueryClientProvider } from "@core/lib/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import ExpensesPage from "./pages/expenses";
import DefaultLayout from "./modules/core/layouts/default";
import { getCookie } from "./modules/core/utils/helpers";
import { Toaster } from "./modules/core/components/ui/sonner";

const layout = getCookie("react-resizable-panels:layout");
const collapsed = getCookie("react-resizable-panels:collapsed");

const defaultLayout = layout ? JSON.parse(layout) : undefined;
const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
      />
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/expenses",
        element: <ExpensesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
