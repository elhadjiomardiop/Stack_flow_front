import { useState } from "react";
import { FaBold, FaItalic, FaCode, FaLink, FaListUl, FaTag, FaTimes, FaInfoCircle, FaSpinner } from "react-icons/fa";

const SUGGESTED_TAGS = [
  "javascript", "python", "react", "node.js", "css", "html",
  "mongodb", "typescript", "express", "docker", "git", "api",
];

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Validation
  const validate = () => {
    const errs = {};
    if (!title.trim() || title.trim().length < 15)
      errs.title = "Le titre doit contenir au moins 15 caractères.";
    if (!description.trim() || description.trim().length < 30)
      errs.description = "La description doit contenir au moins 30 caractères.";
    if (tags.length === 0)
      errs.tags = "Ajoutez au moins un tag.";
    return errs;
  };

  // ── Soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setIsSubmitting(true);
    // Remplacer par votre vrai appel API :
    // await fetch("/api/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, description, tags }) });
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  // ── Insérer markdown dans le textarea
  const insertMarkdown = (before, after = before) => {
    const ta = document.getElementById("description");
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = description.slice(start, end) || "texte";
    const newText = description.slice(0, start) + before + selected + after + description.slice(end);
    setDescription(newText);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  // ── Tags
  const addTag = (tag) => {
    const clean = tag.trim().toLowerCase();
    if (!clean || tags.includes(clean) || tags.length >= 5) return;
    setTags([...tags, clean]);
    setTagInput("");
    if (errors.tags) setErrors((p) => ({ ...p, tags: undefined }));
  };

  const removeTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleTagKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      if (tagInput.trim()) addTag(tagInput);
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  // ── Succès
  if (submitted) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Question publiée !</h2>
          <p className="mt-2 text-slate-500">Votre question est en ligne et en attente de réponses.</p>
          <button
            onClick={() => { setTitle(""); setDescription(""); setTags([]); setErrors({}); setSubmitted(false); }}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Poser une autre question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">

      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Poser une question</h1>
        <p className="mt-1 text-sm text-slate-500">Soyez précis pour obtenir de meilleures réponses.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">

        {/* ── TITRE */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label htmlFor="title" className="block text-sm font-semibold text-slate-800">
            Titre <span className="text-red-500">*</span>
          </label>
          <p className="mt-0.5 mb-2 text-xs text-slate-400">
            Formulez votre problème clairement (min. 15 caractères).
          </p>
          <input
            id="title"
            type="text"
            value={title}
            maxLength={150}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
            }}
            placeholder="ex: Comment filtrer un tableau d'objets en JavaScript ?"
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-400 bg-red-50" : "border-slate-300"
            }`}
          />
          <div className="mt-1.5 flex items-center justify-between">
            {errors.title ? (
              <p className="flex items-center gap-1 text-xs text-red-600">
                <FaInfoCircle size={11} /> {errors.title}
              </p>
            ) : <span />}
            <span className="text-xs text-slate-400">{title.length}/150</span>
          </div>
        </div>

        {/* ── DESCRIPTION */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-800">
            Description <span className="text-red-500">*</span>
          </label>
          <p className="mt-0.5 mb-2 text-xs text-slate-400">
            Décrivez votre problème en détail. Markdown supporté (min. 30 caractères).
          </p>

          {/* Barre outils Markdown */}
          <div className="flex flex-wrap gap-1 rounded-t-lg border border-b-0 border-slate-200 bg-slate-50 px-2 py-1.5">
            {[
              { title: "Gras",     icon: <FaBold size={12} />,    before: "**",  after: "**"     },
              { title: "Italique", icon: <FaItalic size={12} />,  before: "*",   after: "*"      },
              { title: "Code",     icon: <FaCode size={12} />,    before: "`",   after: "`"      },
              { title: "Lien",     icon: <FaLink size={12} />,    before: "[",   after: "](url)" },
              { title: "Liste",    icon: <FaListUl size={12} />,  before: "\n- ", after: ""      },
            ].map(({ title: t, icon, before, after }) => (
              <button
                key={t}
                type="button"
                title={t}
                onClick={() => insertMarkdown(before, after)}
                className="flex h-7 w-7 items-center justify-center rounded text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              >
                {icon}
              </button>
            ))}
            <div className="mx-1 w-px self-stretch bg-slate-200" />
            <button
              type="button"
              title="Bloc de code"
              onClick={() => insertMarkdown("```\n", "\n```")}
              className="rounded px-2 py-1 font-mono text-xs text-slate-500 hover:bg-slate-200"
            >
              {"</>"}
            </button>
          </div>

          <textarea
            id="description"
            value={description}
            rows={10}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
            }}
            placeholder={"Décrivez votre problème ici...\n\n- Contexte du problème\n- Ce que vous avez essayé\n- Message d'erreur exact\n\n```js\n// Votre code ici\n```"}
            className={`w-full resize-y rounded-b-lg border px-4 py-3 font-mono text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.description ? "border-red-400 bg-red-50" : "border-slate-300"
            }`}
          />

          <div className="mt-1.5 flex items-center justify-between">
            {errors.description ? (
              <p className="flex items-center gap-1 text-xs text-red-600">
                <FaInfoCircle size={11} /> {errors.description}
              </p>
            ) : <span />}
            <span className={`text-xs ${description.length >= 30 ? "text-green-600" : "text-slate-400"}`}>
              {description.length} car.
            </span>
          </div>
        </div>

        {/* ── TAGS */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
              <FaTag size={12} className="text-slate-400" />
              Tags <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-slate-400">{tags.length}/5</span>
          </div>
          <p className="mt-0.5 mb-3 text-xs text-slate-400">
            Appuyez sur Entrée ou virgule pour valider. Maximum 5 tags.
          </p>

          {/* Tags sélectionnés */}
          {tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-blue-200"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-blue-400 hover:text-blue-700">
                    <FaTimes size={9} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {tags.length < 5 && (
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="ex: javascript, react…"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors.tags ? "border-red-400 bg-red-50" : "border-slate-300"
              }`}
            />
          )}

          {errors.tags && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <FaInfoCircle size={11} /> {errors.tags}
            </p>
          )}

          {/* Tags suggérés */}
          <div className="mt-3">
            <p className="mb-1.5 text-xs text-slate-400">Suggestions :</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).map((t) => (
                <button
                  key={t}
                  type="button"
                  disabled={tags.length >= 5}
                  onClick={() => addTag(t)}
                  className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200 hover:bg-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOUTONS */}
        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => { setTitle(""); setDescription(""); setTags([]); setErrors({}); }}
            className="w-full rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 sm:w-auto"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" size={13} />
                Publication…
              </>
            ) : "Publier la question"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default QuestionForm;
