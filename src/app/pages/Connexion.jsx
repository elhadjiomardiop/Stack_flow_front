import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE =
  import.meta.env.VITE_URL_FRONT || "https://stack-flow-back.onrender.com";
  

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Laconnexion = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_BASE}/api/auth/connexion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        if (result.token) {
          localStorage.setItem('token', result.token);
        }

        toast.success(`Connexion réussie ${result.user.prenom} ${result.user.nom}`);
        navigate('/');
      } else {
        toast.error(result.message || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur serveur. Veuillez réessayer.');
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-center text-2xl font-bold text-slate-900">Connexion</h1>

        <form onSubmit={Laconnexion} className="mt-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Mot de passe</label>
            <input
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 py-2.5 font-semibold text-white transition hover:bg-slate-800"
          >
            Se connecter
          </button>
          <Link
            to="/inscription"
            className="inline-flex text-sm font-semibold text-orange-600 underline-offset-4 hover:underline"
          >
            S'inscrire
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
