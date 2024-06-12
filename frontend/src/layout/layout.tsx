import React, { useState } from 'react';
import { Box, CssBaseline, Divider } from '@mui/material';
import Sidebar from '../components/sidebar/sidebar';
import { Header } from '../components/Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleChangeOfStatus = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header 
          open={open} 
          handleChangeOfStatus={handleChangeOfStatus} 
        />
        <Sidebar 
          open={open} 
          handleChangeOfStatus={handleChangeOfStatus} 
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>

      </Box>

    </>
  );
};

export default Layout;
