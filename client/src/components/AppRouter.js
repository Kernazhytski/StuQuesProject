import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { userRotues } from './routes'

const AppRouter = () => {
  return (
    <Routes>
        {userRotues.map(route => 
            <Route key={uuidv4()} path={route.path} element={<route.component />} />
        )}
    </Routes>
  )
}

export default AppRouter