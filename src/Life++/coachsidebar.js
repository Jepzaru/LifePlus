import React from 'react';
import "../LifeCss/lifeindex.css";
import { CoachSidebarData } from './coachsidedata';
import { useNavigate, useLocation } from 'react-router-dom';

function CoachSidenavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='coachsidebar'>
            <ul className='coachsidebarlist'>
                {CoachSidebarData.map((val, key) => {
                    const isActive = location.pathname === val.link;

                    return (
                        <li
                            key={key}
                            className={`c-row ${isActive ? "active" : ""}`}
                            onClick={() => {
                                navigate(val.link);
                            }}
                        >
                            <div id='c-icon'>{val.icon}</div>
                            <div id='c-title'>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default CoachSidenavbar;
