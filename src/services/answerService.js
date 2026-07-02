const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Une erreur est survenue.");
  }

  return data;
};

// Récupérer les réponses d'une question
export const getAnswersByQuestion = async (questionId) => {
  const res = await fetch(`${API_URL}/answers/question/${questionId}`);

  return handleResponse(res);
};

// Ajouter une réponse
export const createAnswer = async (questionId, content) => {
  const res = await fetch(`${API_URL}/answers/question/${questionId}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ content }),
  });

  return handleResponse(res);
};