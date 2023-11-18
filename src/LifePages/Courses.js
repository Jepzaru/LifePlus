import React from 'react';
import '../LifeCss/Courses.css';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import { RiGraduationCapFill } from "react-icons/ri";


function Courses(){

    return(
        
        <div className="appind">
            <Header />
            <Sidenavbar />
             <div className='cou'>
        <h1><RiGraduationCapFill style={{marginRight:'15px', marginBottom:'-5px', color:'#FF64B4'}}/>Courses</h1>
        </div>  
        <div className='cour'>
        <h1><RiGraduationCapFill style={{marginRight:'15px', marginBottom:'-5px', color:'#FF64B4'}}/>Courses</h1>
        </div>  
        <div className='cou-con'>

            </div>  
            <div className='up-act'>
                <p>Upcoming Activities</p>
            </div>
      
        </div>
            
    );

}
export default Courses;