import React from 'react';
import "../LifeCss/lifeindex.css";
import { SidebarData } from './sidebardata';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidenavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='sidebar'>
            <ul className='sidebarlist'>
                {SidebarData.map((val, key) => {
                    const isActive = location.pathname === val.link;

                    return (
                        <li
                            key={key}
                            className={`row ${isActive ? "active" : ""}`}
                            onClick={() => {
                                navigate(val.link);
                            }}
                        >
                            <div id='icon'>{val.icon}</div>
                            <div id='title'>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidenavbar;
