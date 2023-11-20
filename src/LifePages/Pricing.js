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
        <div className='pric'>
        <h1><LocalOfferIcon style={{ fontSize: '60px', color: '#FF64B4', marginBottom: '-10px', marginRight: '10px'}} />Premium Plans</h1>
        </div> 
        <div className='free-con'>
           <div className='free-con1'> 
            <div className='plan'>
        <h1>Free</h1>
        <h1>Plan</h1>
            </div> 
            <div className='price'>
                <h1>P0.00</h1>
            </div>
            </div>
            <div className='free-con2'>
                <div className='desc'>
            <ul>
                <li>Free Features</li>
                <li>Free Challenges</li>
                <li>Free Course</li>
            </ul>  
            </div>  
               <div className='button1'>
                
               </div>
            </div>  
        </div>
        <div className='three-month'>
        <h1>3 Month Plan</h1>    
        </div>    
        <div className='month'>
        <h1>Monthly Plan</h1>    
        </div>
        
        </div>
            
    );

}
export default Price;