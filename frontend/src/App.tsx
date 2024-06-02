// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes,/*  Navigate */ } from 'react-router-dom';
import { AuthProvider, /* useAuth */ } from './context/auth-context';
import Layout from './layout/layout';
import Login from './components/users/login';
import MainContent from './components/MainContent';
import Register from './components/users/register';
import { Projects } from './pages/Projects';
import { Clients } from './pages/Clients';
import Landing from './pages/Landing';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/dashboard" element={<Layout><MainContent /></Layout>} />
          <Route path='/dashboard/projects' element={<Layout><Projects/></Layout>} />
          <Route path='/dashboard/clients' element={<Layout><Clients/></Layout>} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

/* const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
 */
export default App;
