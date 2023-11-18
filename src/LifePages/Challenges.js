import React from 'react';
import '../LifeCss/Challenges.css';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import { IoExtensionPuzzle } from "react-icons/io5";


function Challenges(){

    return(
        
        <div className="appind">
            <Header />
            <Sidenavbar />
             <div className='cha'>
        <h1><IoExtensionPuzzle style={{ marginRight:'15px', marginBottom:'-5px', color:'#FF64B4'}} />Challenges</h1>
        </div> 
        <div className='chal'>
        <h1><IoExtensionPuzzle style={{ marginRight:'15px', marginBottom:'-5px', color:'#FF64B4'}} />Challenge</h1>
        </div>       
      
        </div>
            
    );

}
export default Challenges;