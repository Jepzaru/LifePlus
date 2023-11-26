import React, { useEffect, useState } from 'react';
import '../LifeCss/Coaches.css';
import HashLoader from 'react-spinners/HashLoader';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import SportsIcon from '@mui/icons-material/Sports';

function Coaches(){
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);
    return(
        
        <div className="appindex">
            {loading ? (
        <div className="hash">
          <HashLoader size={100} color={'#FF64B4'} loading={loading} />
        </div>
      ) : (
        <>
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
            </>
      )}
        </div>
            
    );

}
export default Coaches;