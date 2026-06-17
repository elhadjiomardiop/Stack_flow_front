import Navbar from './../../composants/Navbar';
import Footer from './../../composants/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const UserLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default UserLayout
