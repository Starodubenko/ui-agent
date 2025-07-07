import { useUserStore } from "@entities/User/model";
import { AuthPage } from "@pages/AuthPage";
import { MainPage } from "@pages/MainPage";
import { PromptPage } from "@pages/PromptPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./routeGuards";


export const AppRouter = () => {
  const user = useUserStore((s) => s.user);
  const rehydrated = useUserStore((s) => s.rehydrated);

  if (!rehydrated) return null;

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          !rehydrated
            ? null
            : user
            ? <Navigate to="/" replace />
            : <AuthPage />
        }
      />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/prompt" element={<PromptPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
