import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateBlessing from "./pages/create-blessing";
import HomePage from "./pages/home";
import { CircularProgress, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Suspense, useEffect } from "react";
import { useUserStore } from "./states/user-store";
import React from "react";
import { AuthService } from "./services/auth.service";
import { RequireAuth } from "./components/RequireAuth";
import CenteringContainer from "./components/CenteringContainer";

const App = () => {
  const ShowEvents = React.lazy(() => import("./pages/show-events"));
  const ShowBlessings = React.lazy(() => import("./pages/show-blessings"));
  const GenerateQr = React.lazy(() => import("./pages/generate-qr"));
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const CreateEvent = React.lazy(() => import("./pages/create-event"));
  const EditEvent = React.lazy(() => import("./pages/edit-event"));
  const { user, setUser } = useUserStore();
  const fetchUser = async () => {
    const data = await AuthService.getUser();
    setUser(data);
  };
  useEffect(() => {
    if (user.id === "") fetchUser();
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
              element={
                <Suspense
                  fallback={
                    <CenteringContainer sx={{ height: "90vh" }}>
                      <CircularProgress />
                    </CenteringContainer>
                  }
                >
                  {element}
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
