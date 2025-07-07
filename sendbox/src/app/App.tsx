import { ThemeProvider } from "@app/providers";
import { CodePlayground } from "@components/CodePlayground";
import { useEffect, useState } from "react";


export const App = () => {
    const [code, setCode] = useState<string>()

    useEffect(() => {
      window.addEventListener("message", async (event) => {
        if (!event.data?.code) return;
  
        setCode(event.data?.code);
      }, false);
    }, [])

    return (
      <ThemeProvider>
        <CodePlayground inputCode={code} />
      </ThemeProvider>
    );
  };
  
