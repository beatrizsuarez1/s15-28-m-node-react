import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
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
        <Box
          width='90vw'
          component="main"
          marginTop={6}
          sx={{ flexGrow: 1, p: 3 }}
          >
          {children}
        </Box>
      </Box>
   </>
  );
};

export default Layout;


<Box
marginTop={6}
width='90vw'
height='100vh'
display="flex"
alignItems="center"
justifyContent="center"
component="section" 
sx={{ p: 4, border: '1px dashed grey' }}>
This Box renders as an HTML section element.
</Box>