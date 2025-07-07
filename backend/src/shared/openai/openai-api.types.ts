import {
  ChatCompletion,
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions';

// Chat-месседж для OpenAI (только поддерживаемые типы)
export type OpenAiChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
  tool_call_id?: string;
};

// Используем официальный тип OpenAI SDK
export type OpenAiChatRequest = {
  model?: string;
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stop?: string | string[];
  user?: string;
};

// usage-информация из OpenAI
export type OpenAiUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

// Один вариант ответа (choice)
export type OpenAiChatChoice = {
  index: number;
  message: OpenAiChatMessage;
  finish_reason: string;
};

// Основной ответ chat/completions
export type OpenAiChatResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: OpenAiUsage;
  choices: OpenAiChatChoice[];
};

// Сокращённый тип для бизнес-логики
export type OpenAiBusinessChatResponse = {
  content: string;
  full: ChatCompletion;
  usage: ChatCompletion['usage'];
  messages: ChatCompletionMessageParam[];
};
