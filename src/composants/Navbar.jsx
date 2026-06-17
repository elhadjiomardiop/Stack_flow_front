import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-orange-100 text-orange-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ');

  const authLinkClass =
    'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:py-2 sm:text-sm';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    toast.info('Deconnexion reussie');
    navigate('/');
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Accueil Mini Stack Overflow"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
              S
            </span>
            <div className="hidden leading-tight sm:block">
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                mini
              </p>
              <p className="text-sm font-bold text-slate-900">Stack Overflow</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-1 xl:flex">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/profil" className={navLinkClass}>
              Profil
            </NavLink>
            <NavLink to="/ajouter_question" className={navLinkClass}>
              Poser une question
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileSearchOpen((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 md:hidden"
              aria-label={mobileSearchOpen ? 'Masquer la recherche' : 'Afficher la recherche'}
              aria-expanded={mobileSearchOpen}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-end gap-2 lg:hidden">
            {token ? (
              <>
                <NavLink
                  to="/profil"
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Mon profil
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-sm"
                >
                  Se deconnecter
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/connexion"
                  className={`${authLinkClass} border border-slate-200 text-slate-700 hover:bg-slate-50`}
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/inscription"
                  className={`${authLinkClass} bg-orange-500 text-white hover:bg-orange-600`}
                >
                  Inscription
                </NavLink>
              </>
            )}
          </div>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <div className="relative w-full max-w-md xl:max-w-lg">
              <input
                type="search"
                aria-label="Rechercher"
                placeholder="Rechercher des questions..."
                className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {token ? (
                <>
                  <NavLink
                    to="/profil"
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Mon profil
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Se deconnecter
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/connexion"
                    className={`${authLinkClass} border border-slate-200 text-slate-700 hover:bg-slate-50`}
                  >
                    Connexion
                  </NavLink>
                  <NavLink
                    to="/inscription"
                    className={`${authLinkClass} bg-orange-500 text-white hover:bg-orange-600`}
                  >
                    Inscription
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

        {mobileSearchOpen && (
          <form className="relative w-full md:hidden" onSubmit={(event) => event.preventDefault()}>
            <input
              type="search"
              aria-label="Rechercher"
              placeholder="Rechercher des questions..."
              className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              autoFocus
              onBlur={() => {
                setTimeout(() => closeMobileSearch(), 150);
              }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </form>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1 text-sm xl:hidden">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/profil" className={navLinkClass}>
            Profil
          </NavLink>
          <NavLink to="/ajouter_question" className={navLinkClass}>
            Poser une question
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
