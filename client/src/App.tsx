import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateBlessing from "./pages/create-blessing";
import HomePage from "./pages/home";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Suspense, useEffect } from "react";
import { useUserStore } from "./stores/user-store";
import React from "react";
import { RequireAuth } from "./components/RequireAuth";
import Loading from "./components/Loading";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const ShowEvents = React.lazy(() => import("./pages/show-events"));
  const ShowBlessings = React.lazy(() => import("./pages/show-blessings"));
  const GenerateQr = React.lazy(() => import("./pages/generate-qr"));
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const CreateEvent = React.lazy(() => import("./pages/create-event"));
  const EditEvent = React.lazy(() => import("./pages/edit-event"));
  const { user, storeCurrentUser } = useUserStore();
  const stripeClient = loadStripe(
    "pk_test_51L7i4RGHAMj9Boauziuk9EFyiXAzPsv7RWE1ZWBsF6dtEG77WnbbdGmUyE1cyuAfa5oMBHnm41efExk7KU3sAR3p00lv4rPKFn"
  );
  useEffect(() => {
    if (user.id === "") storeCurrentUser();
  }, []);

  const routes = [
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/blessings/:eventid",
      element: (
        <Elements stripe={stripeClient}>
          <CreateBlessing />
        </Elements>
      ),
    },

    {
      path: "/events",
      element: (
        <RequireAuth>
          <ShowEvents />
        </RequireAuth>
      ),
    },
    {
      path: "/qr",
      element: (
        <RequireAuth>
          <GenerateQr />
        </RequireAuth>
      ),
    },
    {
      path: "/event/edit",
      element: (
        <RequireAuth>
          <EditEvent />
        </RequireAuth>
      ),
    },
    {
      path: "/blessings",
      element: (
        <RequireAuth>
          <ShowBlessings />
        </RequireAuth>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
    },
    {
      path: "/event/create",
      element: (
        <RequireAuth>
          <CreateEvent />
        </RequireAuth>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {routes.map(({ path, element }) => {
          return (
            <Route
              key={path}
              path={path}
              element={<Suspense fallback={<Loading />}>{element}</Suspense>}
            />
          );
        })}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
