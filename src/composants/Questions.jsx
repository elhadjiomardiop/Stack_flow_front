import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import QuestionCard from './QuestionCard';
import { communityStats } from '../data/questions';
import { getQuestions } from '../services/questionService';

const Questions = () => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();

      console.log("Questions récupérées :", data);

      setQuestions(data.questions);
    } catch (error) {
      console.error("Erreur lors du chargement des questions :", error);
    }
  };

  fetchQuestions();
}, []);

  return (
    <section className="w-full space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Questions récentes
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
            Parcours les discussions de la communauté et ouvre une question pour voir tous ses détails.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="whitespace-nowrap">Trier par :</span>
          <select className="rounded-full border border-slate-200 bg-white px-4 py-2 text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100">
            <option>Les plus récentes</option>
            <option>Les plus votées</option>
            <option>Les plus répondues</option>
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {communityStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50 text-lg">
                <stat.icon className={`h-5 w-5 ${stat.accent}`} aria-hidden="true" />
              </span>
              <div>
                <p className={`text-xl font-black ${stat.accent}`}>{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {questions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <NavLink
          to="/ajouter_question"
          className="inline-flex items-center rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50"
        >
          Voir toutes les questions
        </NavLink>
      </div>
    </section>
  );
};

export default Questions;
