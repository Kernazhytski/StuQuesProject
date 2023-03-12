import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store/store';


const store = new Store;

export const Context = createContext({
    store, 
})

app.listen(5000, () => {
	console.log('App listening on port 5000')
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{store}}>
        <App />        
    </Context.Provider>
);
