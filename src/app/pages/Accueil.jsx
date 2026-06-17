import {  NavLink, useNavigate } from 'react-router-dom';
import Questions from './../../composants/Questions';



const Accueil = () => {
    const token = localStorage.getItem("token");
       const navigate = useNavigate();
   

    const  VerificationToken = () => {
        if(token) {
           return navigate('/ajouter_question');
        }
        navigate('/connexion')
    }


  return (
     <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
         <div className="mb-6 flex justify-end">
             <NavLink
               onClick={() => VerificationToken()}
               className="inline-flex items-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
             >
               Ajouter question
             </NavLink>
         </div>

         <Questions />
    </div>
  )
}

export default Accueil
