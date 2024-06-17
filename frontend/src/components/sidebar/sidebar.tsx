import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Theme, Toolbar, styled, useTheme, } from '@mui/material';
import { Home as HomeIcon, AccessTime as AccessTimeIcon, History as HistoryIcon, BarChart as BarChartIcon, Assessment as AssignmentIcon, Group as GroupIcon, Business as BusinessIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { stateSideBarProps } from '../../types';

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Sidebar = ({ open, handleChangeOfStatus }: stateSideBarProps) => {
  const theme = useTheme()
  const navigate = useNavigate()


  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleChangeOfStatus}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Toolbar />
      <List>
        <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Panel"  />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/dashboard/time-tracker')}>
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="Control del tiempo" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/dashboard/history")}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Historial" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/dashboard/report")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reporte" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/dashboard/projects')} >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Projectos" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/dashboard/teams")}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Equipos" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('/dashboard/clients')}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes"  />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;


