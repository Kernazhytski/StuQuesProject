import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';


const store = new Store;
const PORT = 80
export const Context = createContext({
    store, 
})

app.listen(PORT)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{store}}>
        <App />        
    </Context.Provider>
);
