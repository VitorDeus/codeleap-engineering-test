import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import { useUsername, UsernameContext, useUsernameProvider } from "./hooks/useUsername";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function AppRoutes() {
  const { username } = useUsername();

  return (
    <Routes>
      <Route
        path="/signup"
        element={username ? <Navigate to="/feed" replace /> : <SignupPage />}
      />
      <Route
        path="/feed"
        element={username ? <FeedPage /> : <Navigate to="/signup" replace />}
      />
      <Route
        path="*"
        element={
          <Navigate to={username ? "/feed" : "/signup"} replace />
        }
      />
    </Routes>
  );
}

export default function App() {
  const usernameValue = useUsernameProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <UsernameContext.Provider value={usernameValue}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UsernameContext.Provider>
    </QueryClientProvider>
  );
}
