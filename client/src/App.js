import { BrowserRouter } from 'react-router-dom'

import AppRouter from './components/AppRouter.js'

import './App.css'
import { Context } from './index.js';
import { useContext, useEffect } from 'react';
import {observer} from 'mobx-react-lite'

function App() {
  const {store} = useContext(Context);
  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth()
    }
  }, [])
  return (
      <div className="container">
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
      </div>
  );
}

export default observer(App);
