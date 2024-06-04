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
import { Tasks } from './tasks/components/Tasks';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path="/dashboard" element={<Layout><MainContent /></Layout>} />
          <Route path='/dashboard/projects' element={<Layout><Projects /></Layout>} />
          <Route path='/dashboard/clients' element={<Layout><Clients /></Layout>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
