import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { ThemeProvider } from "@core/components/theme-provider";
import { ReactQueryProvider as QueryClientProvider } from "@core/lib/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import ExpensesPage from "./pages/expenses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/expenses",
    element: <ExpensesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* <Toaster richColors /> */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
