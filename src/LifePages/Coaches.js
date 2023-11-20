import React from 'react';
import '../LifeCss/Coaches.css';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import SportsIcon from '@mui/icons-material/Sports';

function Coaches(){

    return(
        
        <div className="appindex">
            <Header />
            <Sidenavbar />
             <div className='coa'>
        <h1>Coaches</h1>
        </div>
        <div className='coa-title'>
        <h1><SportsIcon style={{ fontSize: '4rem',marginRight: '15px', marginBottom: '-15px', color: '#FF64B4' }}/>Coaches</h1>
        </div> 
        <div className='coa-container'>
            </div>
          
        </div>
            
    );

}
export default Coaches;