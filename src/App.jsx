//rafce
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'
import AppRouters from './routes/AppRouters'

export const App = () => {
  return (
    <>
    <ToastContainer/>
      <AppRouters/>
    </>
  )
}
export default App