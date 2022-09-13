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

const App = () => {
  const ShowEvents = React.lazy(() => import("./pages/show-events"));
  const ShowBlessings = React.lazy(() => import("./pages/show-blessings"));
  const GenerateQr = React.lazy(() => import("./pages/generate-qr"));
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const CreateEvent = React.lazy(() => import("./pages/create-event"));
  const EditEvent = React.lazy(() => import("./pages/edit-event"));
  const { user, storeCurrentUser } = useUserStore();

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
      element: <CreateBlessing />,
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
