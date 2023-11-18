import React from 'react';
import '../LifeCss/Pricing.css';
import Sidenavbar from "../Life++/sidenavbar";
import Header from "../Life++/Header";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

function Price(){

    return(
        
        <div className="appind">
            <Header />
            <Sidenavbar />
             <div className='pri'>
        <h1><LocalOfferIcon style={{fontSize: '60px', color: '#FF64B4', marginBottom: '-10px', marginRight: '10px'}} />Premium Plans</h1>
        </div>
        <div className='free-con'>
        </div>

            <div className='three-month'>
                </div>    
        <div className='month'>
            
        </div>
        
        </div>
            
    );

}
export default Price;