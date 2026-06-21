import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const QuestionCard = ({ question }) => {
  return (
    <Link
      to={`/detail/${question.id}`}
      className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-violet-100"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          Question #{question.id}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
          <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
          {question.time}
        </span>
      </div>

      <h2 className="mt-4 text-base font-semibold leading-7 text-slate-900 transition group-hover:text-violet-700 sm:text-lg">
        {question.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 sm:text-base">
        {question.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-sm font-bold text-white">
            {question.authorInitials}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">{question.author}</p>
            <p className="text-xs text-slate-500">{question.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-orange-700">
          <span className="font-semibold">Voir plus</span>
          <FiArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
};

export default QuestionCard;
