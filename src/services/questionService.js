const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5173/api";

// ── Récupérer le token JWT stocké
const getToken = () => localStorage.getItem("token");

// ── Headers communs avec Authorization
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ── Gérer les réponses API proprement
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Une erreur est survenue.");
  }
  return data;
};

// ────────────────────────────────────────────────────────────
// POST /api/questions  →  Créer une question (auth requise)
// ────────────────────────────────────────────────────────────
export const createQuestion = async ({ title, description, tags }) => {
  const res = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, description, tags }),
  });
  return handleResponse(res);
};

// ────────────────────────────────────────────────────────────
// GET /api/questions   →  Liste des questions (filtres + pagination)
// ────────────────────────────────────────────────────────────
export const getQuestions = async ({
  search = "",
  tag = "",
  sortBy = "recent",
  status = "",
  page = 1,
  limit = 10,
} = {}) => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (tag)    params.set("tag", tag);
  if (sortBy) params.set("sortBy", sortBy);
  if (status) params.set("status", status);
  params.set("page",  page);
  params.set("limit", limit);

  const res = await fetch(`${API_URL}/questions?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};

// ────────────────────────────────────────────────────────────
// GET /api/questions/:id  →  Détail d'une question
// ────────────────────────────────────────────────────────────
export const getQuestionById = async (id) => {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
};

// ────────────────────────────────────────────────────────────
// PUT /api/questions/:id  →  Modifier une question (auth requise)
// ────────────────────────────────────────────────────────────
export const updateQuestion = async (id, { title, description, tags }) => {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ title, description, tags }),
  });
  return handleResponse(res);
};

// ────────────────────────────────────────────────────────────
// DELETE /api/questions/:id  →  Supprimer une question (auth requise)
// ────────────────────────────────────────────────────────────
export const deleteQuestion = async (id) => {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
};
