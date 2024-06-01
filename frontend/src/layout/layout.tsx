import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Header } from '../components/Header';
// import Sidebar from '../components/sidebar/Sidebar';
// import { useAuth } from '../context/auth-context';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { isLoggedIn } = useAuth();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse'}}>
        <CssBaseline />
        <Header />
        {/* <Sidebar /> */}
      </Box>
      {children}
    </>
  );
};

export default Layout;
