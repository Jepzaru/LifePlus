import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarData } from './sidebardata';

function Sidenavbar() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className='sidebar'>
            <ul className='sidebarlist'>
                {SidebarData.map((val, key) => {
                    const isActive = pathname.startsWith(val.link);

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
