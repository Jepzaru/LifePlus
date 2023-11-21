import React from 'react';
import "../LifeCss/lifeindex.css";
import { CoachSidebarData } from './coachsidedata';
import { useNavigate, useLocation } from 'react-router-dom';

function CoachSidenavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='sidebar'>
            <ul className='sidebarlist'>
                {CoachSidebarData.map((val, key) => {
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

export default CoachSidenavbar;
