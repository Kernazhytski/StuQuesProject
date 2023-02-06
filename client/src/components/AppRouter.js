import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { MAIN_ROUTE } from '../utils/routes';

import { userRotues } from './routes'

const AppRouter = () => {
  return (
    <Routes>
        {userRotues.map(route => 
            <Route key={uuidv4()} path={route.path} element={<route.component />} />
        )}
        <Route path='*' element={<Navigate to={MAIN_ROUTE} />}/>
    </Routes>
  )
}

export default AppRouter