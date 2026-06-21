import { useNavigate } from 'react-router-dom';
import Questions from './../../composants/Questions';
import { toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { MdWavingHand } from 'react-icons/md';

const Accueil = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (token) {
      navigate('/ajouter_question');
      return;
    }

    toast.info('Connecte-toi pour poser une question');
    navigate('/connexion');
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-700 via-orange-400 to-yellow-500 px-6 py-10 text-white shadow-[0_18px_60px_rgba(109,40,217,0.28)] sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
              Mini StackOver Flow
            </span>
            <div className="space-y-3">
              <h1 className="flex max-w-3xl flex-wrap items-center gap-3 text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                <span>Bienvenue sur</span>
                <span className="text-yellow-300">Dev Home</span>
                <MdWavingHand className="h-7 w-7 text-yellow-300 sm:h-9 sm:w-9" aria-hidden="true" />
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/85 sm:text-lg">
                Posez vos questions, partagez vos connaissances et progressez
                avec la communauté des développeurs.
              </p>
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-orange-600 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-violet-50 sm:px-7 sm:py-4 sm:text-base"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-100 text-base">
                <FiPlus className="h-4 w-4" aria-hidden="true" />
              </span>
              Poser une question
            </button>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <Questions />
      </div>
    </div>
  );
};

export default Accueil;
