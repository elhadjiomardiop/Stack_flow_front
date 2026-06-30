import { useRouteError, useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // On ignore silencieusement l'erreur DOM des extensions de navigateur
  const isExtensionError =
    error?.message?.includes("removeChild") ||
    error?.message?.includes("not a child") ||
    error?.message?.includes("nœud à supprimer");

  if (isExtensionError) {
    // Retour silencieux à la page précédente
    navigate(-1);
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <FaExclamationTriangle className="text-red-500" size={24} />
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          Une erreur est survenue
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {error?.message || "Erreur inattendue de l'application."}
        </p>

        {error?.stack && (
          <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-slate-100 p-3 text-left text-xs text-slate-600">
            {error.stack}
          </pre>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <FaRedo size={12} /> Réessayer
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <FaHome size={12} /> Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
