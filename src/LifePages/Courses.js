import React, { useEffect, useState } from 'react';
import '../LifeCss/Courses.css';
import HashLoader from 'react-spinners/HashLoader';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import { RiGraduationCapFill } from "react-icons/ri";


function Courses(){
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);
    return(
        
        <div className="appind">
            {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
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
       </>
       )}
        </div>
            
    );

}
export default Courses;