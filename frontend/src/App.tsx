import { Route, createBrowserRouter, createRoutesFromElements,/*  Navigate */ } from 'react-router-dom';
import Layout from './layout/layout';
import Login from './components/users/login';
import MainContent from './components/MainContent';
import Register from './components/users/register';
import { Projects } from './pages/Projects';
import { Clients } from './pages/Clients';
import TimeTrackerPage from './pages/TimeTracker';
import Landing from './pages/Landing';
import ProtectedRoutes from './routes/PrivateRoute';
import PublicRoutes from './routes/PublicRoutes';
const App =

  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/' element={<ProtectedRoutes />} >
          <Route path="/dashboard" element={<Layout><MainContent /></Layout>} />
          <Route path='/dashboard/time-tracker' element={<Layout><TimeTrackerPage /></Layout>} />
          <Route path='/dashboard/history' element={<Layout><h1>history</h1></Layout>} />
          <Route path='/dashboard/report' element={<Layout><h1>report</h1></Layout>} />
          <Route path='/dashboard/projects' element={<Layout><Projects /></Layout>} />
          <Route path='/dashboard/teams' element={<Layout><h1>teams</h1></Layout>} />
          <Route path='/dashboard/clients' element={<Layout><Clients /></Layout>} />
          <Route path="*" element={<Landing />} />
        </Route>
      </>
    )
  )

export default App;
