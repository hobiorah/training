import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// everything is created in the root div so it may play a role in width and height
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/*" element ={<App/>}>
              {/* <App /> */}
          </Route>
        </Routes>
        
    </Router>
   
  </React.StrictMode>
);


