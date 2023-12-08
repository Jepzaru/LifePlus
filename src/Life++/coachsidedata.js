import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import StoreIcon from '@mui/icons-material/Store';
import SportsIcon from '@mui/icons-material/Sports';
import SettingsIcon from '@mui/icons-material/Settings';


export const CoachSidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/coach-index/dashboard",
    },
    {
        title: "Courses",
        icon: <SchoolIcon />,
        link: "/coach-index/courses",
    },
    {
        title: "Challenges",
        icon: <SportsIcon/>,
        link: "/coach-index/challenges",
    },
    {
        title: "Points Shop",
        icon: <StoreIcon />,
        link: "/coach-index/pointsshop",
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/coach-index/settings",
    }
   
];