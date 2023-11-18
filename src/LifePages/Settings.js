import React from 'react';
import '../LifeCss/Settings.css';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";

function Setting(){

    return(
        
        <div className="appind">
            <Header />
            <Sidenavbar />
             <div className='set'>
        <h1>Settings</h1>
        </div>    
      
        </div>
            
    );

}
export default Setting;