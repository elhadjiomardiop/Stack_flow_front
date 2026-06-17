import { NavLink } from 'react-router-dom';

const footerLinks = {
  platform: [
    { label: 'Questions', to: '/' },
    { label: 'Poser une question', to: '/ajouter_question' },
    { label: 'Profil', to: '/profil' },
  ],
  account: [
    { label: 'Connexion', to: '/connexion' },
    { label: 'Inscription', to: '/inscription' },
  ],
  company: ['A propos', 'Blog', 'Aide', 'Contact'],
  community: ['Meta', 'Charte', 'Confidentialite', 'Cookies'],
};

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <NavLink to="/" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-lg font-black text-white">
              S
            </span>
            <span className="text-sm font-bold text-slate-900">
              Mini Stack Overflow
            </span>
          </NavLink>
          <p className="mt-4 max-w-xs text-sm leading-6">
            Un espace pour poser des questions, partager des solutions et
            apprendre ensemble.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
            Plateforme
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerLinks.platform.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className="transition hover:text-orange-600"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
            Compte
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerLinks.account.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className="transition hover:text-orange-600"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">
            Communauté
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {footerLinks.community.map((item) => (
              <li key={item}>
                <span className="transition hover:text-orange-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright © 2026 Mini Stack Overflow</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
