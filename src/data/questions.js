import {
  FiCheckCircle,
  FiHelpCircle,
  FiMessageCircle,
  FiUsers,
} from 'react-icons/fi';

export const questions = [
  {
    id: 1,
    title: 'Comment utiliser useEffect dans React pour récupérer des données ?',
    excerpt:
      "Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect.",
    body:
      "Je débute avec React et je souhaite récupérer des données depuis une API avec useEffect. J'aimerais aussi savoir comment gérer le chargement, les erreurs et le nettoyage dans un vrai projet.",
    time: '09:15',
    author: 'Aminata Ndiaye',
    authorInitials: 'AN',
    tag: 'React',
    status: 'Résolue',
    votes: 128,
    answers: 12,
  },
  {
    id: 2,
    title: 'Pourquoi mon serveur Express retourne une erreur 404 ?',
    excerpt:
      "J'ai créé une route GET /users mais lorsque je fais une requête depuis Postman, je reçois une erreur 404.",
    body:
      "J'ai créé une route GET /users mais lorsque je fais une requête depuis Postman, je reçois une erreur 404. Je voudrais comprendre si le souci vient du router, du middleware ou de l'ordre d'enregistrement des routes.",
    time: '10:30',
    author: 'Mamadou Diallo',
    authorInitials: 'MD',
    tag: 'Express',
    status: 'En attente',
    votes: 87,
    answers: 5,
  },
  {
    id: 3,
    title: 'Comment connecter Spring Boot à une base de données MySQL ?',
    excerpt:
      "Mon application Spring Boot ne parvient pas à se connecter à MySQL.",
    body:
      "Mon application Spring Boot ne parvient pas à se connecter à MySQL. Je cherche une configuration propre pour application.properties et une méthode fiable pour diagnostiquer les erreurs de connexion.",
    time: '11:45',
    author: 'Fatou Sow',
    authorInitials: 'FS',
    tag: 'Java',
    status: 'Populaire',
    votes: 56,
    answers: 9,
  },
  {
    id: 4,
    title: 'Quelle est la différence entre let, const et var en JavaScript ?',
    excerpt:
      'Je vois souvent ces trois mots-clés dans les exemples JavaScript.',
    body:
      "Je vois souvent ces trois mots-clés dans les exemples JavaScript. J'aimerais une explication simple avec des cas d'usage modernes et les pièges à éviter.",
    time: '14:20',
    author: 'Cheikh Ba',
    authorInitials: 'CB',
    tag: 'JavaScript',
    status: 'Tendance',
    votes: 214,
    answers: 17,
  },
  {
    id: 5,
    title: 'Comment créer une authentification JWT avec Node.js ?',
    excerpt:
      "Je développe une API avec Express et je souhaite sécuriser mes routes avec JWT.",
    body:
      "Je développe une API avec Express et je souhaite sécuriser mes routes avec JWT. Je veux comprendre la mise en place du login, la génération du token et la protection des routes privées.",
    time: '16:05',
    author: 'Khadija Fall',
    authorInitials: 'KF',
    tag: 'Auth',
    status: 'Nouveau',
    votes: 95,
    answers: 8,
  },
];

export const communityStats = [
  { label: 'Questions', value: '128', accent: 'text-violet-600', icon: FiHelpCircle },
  { label: 'Réponses', value: '412', accent: 'text-fuchsia-600', icon: FiMessageCircle },
  { label: 'Membres', value: '56', accent: 'text-emerald-600', icon: FiUsers },
  { label: 'Résolues', value: '89%', accent: 'text-sky-600', icon: FiCheckCircle },
];

export const getQuestionById = (id) =>
  questions.find((question) => question.id === Number(id));
