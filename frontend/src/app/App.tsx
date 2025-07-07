import { ApolloProvider, ThemeProvider } from "@app/providers";
import { useUserStore } from "@entities/User/model/user.store";
import { useEffect } from "react";
import { AppRouter } from "./routes";

export const App = () => {
    const rehydrate = useUserStore((s) => s.rehydrate);
    const rehydrated = useUserStore((s) => s.rehydrated);
  
    useEffect(() => {
      rehydrate();
    }, [rehydrate]);
  
    if (!rehydrated) return null; // Или loader
  
    return (
      <ThemeProvider>
        <ApolloProvider>
          <AppRouter />
        </ApolloProvider>
      </ThemeProvider>
    );
  };
  
