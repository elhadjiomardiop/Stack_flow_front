import { Link, useParams } from 'react-router-dom';
import { getQuestionById, questions } from '../../data/questions';

const Detail = () => {
  const { id } = useParams();
  const question = getQuestionById(id);

  if (!question) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Question introuvable</h1>
          <p className="mt-2 text-slate-600">
            La question demandée n'existe pas ou a été supprimée.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const relatedQuestions = questions.filter((item) => item.id !== question.id).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_360px]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {question.tag}
            </span>
            <span className="text-sm text-slate-500">Publié à {question.time}</span>
          </div>

          <h1 className="mt-4 text-xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {question.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
                {question.authorInitials}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{question.author}</p>
                <p className="text-sm text-slate-500">Auteur de la question</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                {question.votes} votes
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                {question.answers} réponses
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-50 p-5 sm:p-6">
            <p className="text-base leading-8 text-slate-700 sm:text-lg">
              {question.body}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Retour aux questions
            </Link>
            <Link
              to="/ajouter_question"
              className="inline-flex rounded-full bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Poser une question
            </Link>
          </div>
        </article>

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Infos rapides</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Statut</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                  {question.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Votes</span>
                <span className="font-semibold text-slate-900">{question.votes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Réponses</span>
                <span className="font-semibold text-slate-900">{question.answers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Catégorie</span>
                <span className="font-semibold text-slate-900">{question.tag}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Questions similaires</h2>
            <div className="mt-4 space-y-4">
              {relatedQuestions.map((item) => (
                <Link
                  key={item.id}
                  to={`/detail/${item.id}`}
                  className="block rounded-2xl border border-slate-200 p-4 transition hover:border-violet-200 hover:bg-violet-50"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.votes} votes • {item.answers} réponses
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Detail;
