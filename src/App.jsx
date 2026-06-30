import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Connexion from './app/pages/Connexion';
import Inscription from './app/pages/Inscription';
import UserLayout from './app/layout/UserLayout';
import Accueil from './app/pages/Accueil';
import Profil from './app/pages/Profil';
import Detail from './app/pages/Detail';
import QuestionForm from './app/pages/QuestionForm';
import ErrorBoundary from './composants/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true,              element: <Accueil /> },
      { path: '/connexion',       element: <Connexion />,    errorElement: <ErrorBoundary /> },
      { path: '/inscription',     element: <Inscription />,  errorElement: <ErrorBoundary /> },
      { path: '/profil',          element: <Profil />,       errorElement: <ErrorBoundary /> },
      { path: '/ajouter_question',element: <QuestionForm />, errorElement: <ErrorBoundary /> },
      { path: '/detail/:id',      element: <Detail />,       errorElement: <ErrorBoundary /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
