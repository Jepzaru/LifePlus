import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
//import Aboutus from './ForumConnect/about';
//import JeepCodes from './JeepCodes';
//import Notes from './NotesApp/Notes';
//import Page from './ForumConnect/ForumPage'
//import ForumMain from './ForumConnect/ForumMain';
//import Sing from './Singer';
//import Forum from './Forum';
//import ReactBingo from './ReactBingo'
//import Lyrics from './Lyrics'
//import TheContext from './TheContext';
// import TheRef from './TheRef';
// import TheEffect from './TheEffect';
import LifeRoutes from './Life++/LifeRoutes';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    {/*<Sing />*/}
    {/*<Aboutus />*/}
    {/*<ForumLogIn />*/}
    {/*<JeepCodes />*/}
  {/*<ForumMain />*/}
  <LifeRoutes />
    {/*<Notes />*/}
    {/*<Page />*/}
    {/*<ForumCreateAccount />*/}
    {/*<ForumIndex />*/}
    {/*<Forum />*/}
    {/*<Lyrics />*/}
    {/*<ReactBingo />*/}
    {/* <TheEffect/> */}
    {/* <TheRef/> */}
    {/*<TheContext/>*/}
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
