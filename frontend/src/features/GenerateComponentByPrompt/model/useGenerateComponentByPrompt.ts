import { useState } from "react";

import {
  useGenerateComponentByPromptMutation,
  type GenerateComponentByPromptMutation,
  type GenerateComponentInput,
} from "generated/graphql";

export const useGenerateComponentByPrompt = () => {
  const [generateMutation] = useGenerateComponentByPromptMutation();
  const [result, setResult] = useState<
    GenerateComponentByPromptMutation["generateComponentByPrompt"] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (variables: GenerateComponentInput) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { data } = await generateMutation({
        variables: {
          input: variables,
        },
      });
      if (data?.generateComponentByPrompt) {
        setResult(data.generateComponentByPrompt);
      } else {
        setError("Нет данных");
      }
    } catch (e: any) {
      setError(e.message || "Ошибка генерации");
    } finally {
      setLoading(false);
    }
  };

  return { generate, result, loading, error };
};
