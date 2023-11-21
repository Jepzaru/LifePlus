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
        link: "/coach-index/courses",
    },
    {
        title: "Challenges",
        icon: <ExtensionIcon />,
        link: "/coach-index/challenges",
    },
    {
        title: "Points Shop",
        icon: <LocalOfferIcon />,
        link: "/coach-index/pointsshop",
    },
    {
        title: "Quests",
        icon: <SportsIcon />,
        link: "/coach-index/quests",
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/coach-index/settings",
    }
   
];