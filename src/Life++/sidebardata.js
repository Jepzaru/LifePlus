import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SportsIcon from '@mui/icons-material/Sports';
import SettingsIcon from '@mui/icons-material/Settings';


export const SidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/index/dashboard",
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
        title: "Pricing",
        icon: <LocalOfferIcon />,
        link: "/index/pricing",
    },
    {
        title: "Coaches",
        icon: <SportsIcon />,
        link: "/index/coaches",
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/index/settings",
    }
   
];