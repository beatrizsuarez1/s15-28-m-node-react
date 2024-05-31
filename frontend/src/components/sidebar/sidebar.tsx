import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import {Home as HomeIcon, AccessTime as AccessTimeIcon, History as HistoryIcon, BarChart as BarChartIcon, Assessment as AssignmentIcon, Group as GroupIcon, Business as BusinessIcon} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" onClick={() => navigate('/dashboard')} />
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="Time Tracker" />
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" onClick={() => navigate('/dashboard/projects')}/>
        </ListItemButton>
        <ListItemButton >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Teams" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" onClick={() => navigate('/dashboard/clients')} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
