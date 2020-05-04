// let's go!
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Match, Miss} from 'react-router';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';
import Modal from './components/Modal';
import './css/style.css';


const Root = () => {
return (
        <BrowserRouter>
          <div>
             <Match exactly pattern="/" component={StorePicker}/>
             <Match exactly pattern="/store/:storeId" component={App}/>
             <Miss component={NotFound}/>
          </div>
        </BrowserRouter>
   );
}


ReactDOM.render(<Root />, document.getElementById("main"));

