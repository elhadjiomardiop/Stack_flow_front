const QuestionCard = ({ question }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold leading-7 text-slate-900 sm:text-xl">
            {question.titre}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            {question.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500 sm:flex-col sm:items-end sm:text-sm">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
            {question.auteur}
          </span>
          <span>{question.heure}</span>
        </div>
      </div>
    </article>
  );
};

export default QuestionCard;
