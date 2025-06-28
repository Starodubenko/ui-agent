import axios from "axios";
import type { ComponentItem } from "../types/component";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const login = async (email: string, password: string): Promise<string> => {
  const { data } = await api.post("/auth/login", { email, password });
  return data.access_token;
};
export const register = async (email: string, password: string): Promise<string> => {
  const { data } = await api.post("/auth/register", { email, password });
  return data.access_token;
};

export const generateComponent = async (prompt: string, token: string): Promise<string> => {
  const { data } = await api.post("/ai/generate", { prompt }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.code;
};
export const getHistory = async (token: string) => {
  const { data } = await api.get("/ai/history", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};
export const generateTest = async (prompt: string, code: string, token: string): Promise<string> => {
  const { data } = await api.post("/ai/testgen", { prompt, code }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.code;
};
export const refactorCode = async (code: string, token: string): Promise<string> => {
  const { data } = await api.post("/ai/refactor", { code }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.code;
};
export const figmaImport = async (fileId: string, nodeId: string, token: string): Promise<string> => {
  const { data } = await api.post("/ai/figma", { fileId, nodeId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.code;
};

export const getLatestComponents = async (token: string): Promise<ComponentItem[]> => {
  const res = await api.get('/ai/components', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Сохранить компонент
export const saveComponent = async (name: string, code: string, token: string) => {
  return api.post('/ai/component', { name, code }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Получить компонент по id (для предпросмотра)
export const getComponentById = async (id: string, token: string): Promise<ComponentItem> => {
  const res = await api.get(`/ai/component/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
