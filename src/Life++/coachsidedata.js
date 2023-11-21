import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
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
        link: "/index/courses",
    },
    {
        title: "Challenges",
        icon: <ExtensionIcon />,
        link: "/index/challenges",
    },
    {
        title: "Points Shop",
        icon: <LocalOfferIcon />,
        link: "/index/pricing",
    },
    {
        title: "Quests",
        icon: <SportsIcon />,
        link: "/index/coaches",
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/index/settings",
    }
   
];