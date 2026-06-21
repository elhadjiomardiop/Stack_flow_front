import { useState } from 'react';
import { FiHome, FiLogIn, FiMenu, FiUser, FiUserPlus, FiX } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    [
      'rounded-full px-4 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-orange-100 text-orange-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ');

  const mobileLinkClass = ({ isActive }) =>
    [
      'flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-medium transition-colors',
      isActive
        ? 'bg-orange-50 text-orange-700'
        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
    ].join(' ');

  const authLinkClass =
    'inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:py-2 sm:text-sm';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    toast.info('Deconnexion reussie');
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:hidden">
          <NavLink
            to="/"
            className="flex items-center gap-2"
            aria-label="Accueil StackOverflow"
            onClick={closeMobileMenu}
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500 text-lg font-black text-white shadow-sm">
              S
            </span>
            <span className="text-lg font-bold text-slate-900">StackOverflow</span>
          </NavLink>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-600 shadow-sm transition hover:border-orange-200 hover:bg-orange-100"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <FiX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FiMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden w-full md:flex md:items-center md:gap-6">
          <NavLink
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Accueil StackOverflow"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500 text-lg font-black text-white shadow-sm">
              S
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">StackOverflow</p>
            </div>
          </NavLink>

          <nav className="flex flex-1 items-center justify-center gap-1">
            <NavLink to="/" end className={navLinkClass}>
              Accueil
            </NavLink>
            <NavLink to="/profil" className={navLinkClass}>
              Profil
            </NavLink>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="relative w-full max-w-md xl:max-w-lg">
              <input
                type="search"
                aria-label="Rechercher"
                placeholder="Rechercher des questions..."
                className="w-full rounded-full border border-slate-300 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              >
                <path
                  d="M21 21l-4.3-4.3m1.8-5.2a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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

        {mobileMenuOpen && (
          <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg md:hidden">
            <nav className="space-y-2">
              <NavLink to="/" end className={mobileLinkClass} onClick={closeMobileMenu}>
                <FiHome className="h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                <span>Accueil</span>
              </NavLink>

              <NavLink to="/profil" className={mobileLinkClass} onClick={closeMobileMenu}>
                <FiUser className="h-4 w-4 shrink-0 text-orange-600" aria-hidden="true" />
                <span>Profil</span>
              </NavLink>
            </nav>

            <div className="my-4 border-t border-slate-100" />

            {token ? (
              <div className="space-y-3">
                <NavLink
                  to="/profil"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Mon profil
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Se deconnecter
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <NavLink
                  to="/connexion"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <FiLogIn className="h-4 w-4" aria-hidden="true" />
                  <span>Connexion</span>
                </NavLink>
                <NavLink
                  to="/inscription"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  <FiUserPlus className="h-4 w-4" aria-hidden="true" />
                  <span>S'inscrire</span>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
