import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuestionById } from '../../services/questionService';
import { createAnswer } from "../../services/answerService";
import { toast } from 'react-toastify';

const Detail = () => {
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);


  const handleSubmitAnswer = async (e) => {
      e.preventDefault();

      if (!content.trim()) {
        toast.warning("Veuillez écrire une réponse.");
        return;
      }

      try {
        setSending(true);

        const data = await createAnswer(question._id, content);

        console.log("Réponse créée :", data);
        toast.success("Réponse publiée avec succès !");

        setAnswers((prev) => [...prev, data.answer]);

        setContent("");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setSending(false);
      }
};

  useEffect(() => {


  const fetchQuestion = async () => {
    try {
      setLoading(true);

      const data = await getQuestionById(id);

      console.log("Question reçue :", data);

      setQuestion(data.question);
      setAnswers(data.answers || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger cette question.");
    } finally {
      setLoading(false);
    }
  };

  fetchQuestion();
}, [id]);

  if (loading) {
  return (
    <div className="mx-auto max-w-7xl p-8 text-center">
      Chargement en cours ...
    </div>
  );
}

if (error) {
  return (
    <div className="mx-auto max-w-7xl p-8 text-center text-red-600">
      {error}
    </div>
  );
}



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

  // const relatedQuestions = question.filter((item) => item.id !== question.id).slice(0, 3);

  console.log("Auteur :", question?.author?._id);
  console.log("Utilisateur connecté :", currentUser?.id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_360px]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              {question.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
                >
                  {tag}
                </span>
              ))}
            </span>
            <span className="text-sm text-slate-500">Publié le {new Date(question.createdAt).toLocaleDateString("fr-FR")}</span>
          </div>

          <h1 className="mt-4 text-xl font-bold leading-tight text-slate-900 sm:text-3xl">
            {question.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
                {question.author?.prenom?.charAt(0)}
                {question.author?.nom?.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{question.author?.prenom} {question.author?.nom}</p>
                <p className="text-sm text-slate-500">Auteur de la question</p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                0 votes
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                {answers.length} réponses 
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-50 p-5 sm:p-6">
            <p className="text-base leading-8 text-slate-700 sm:text-lg">
              {question.description}
            </p>
          </div>

          <section className="mt-10">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Réponses ({answers.length})
            </h2>

            {answers.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500">
                Aucune réponse pour le moment.
                Soyez le premier à répondre !
              </div>
            ) : (
              <div className="space-y-5">
                {answers.map((answer) => (
                  <div
                    key={answer._id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <p className="text-slate-700 leading-7">
                      {answer.content}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <span className="font-semibold">
                        {answer.author?.prenom} {answer.author?.nom}
                      </span>

                      <span className="text-sm text-slate-500">
                        {new Date(answer.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Ajouter une réponse
            </h2>

            

              {token ? (
              <form onSubmit={handleSubmitAnswer} className="mt-6 space-y-3">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Écrire votre réponse..."
                  className="w-full rounded-lg border p-3 text-sm"
                  rows={5}
                />

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white"
                >
                  {sending ? "Envoi..." : "Publier la réponse"}
                </button>
              </form>
            ) : (
              <div className="mt-6 rounded-xl border bg-orange-50 p-4 text-center">
                <p className="text-slate-700">
                  Connectez-vous pour répondre à cette question.
                </p>

                <Link
                  to="/connexion"
                  className="mt-3 inline-block rounded-lg bg-orange-600 px-4 py-2 text-white"
                >
                  Se connecter
                </Link>
              </div>
            )}

          </section>


          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Retour aux questions
            </Link>

            {currentUser && question.author._id === currentUser.id && (
              <Link
                to={`/modifier_question/${question._id}`}
                className="inline-flex rounded-full bg-yellow-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-yellow-700"
              >
                Modifier
              </Link>
            )}

            <Link
              to="/ajouter_question"
              className="inline-flex rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
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

          {/* <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
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
          </div> */}
        </aside>
      </div>
    </div>
  );
};

export default Detail;
