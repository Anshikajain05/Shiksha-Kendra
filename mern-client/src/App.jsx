import { useState } from 'react'

import './App.css'
import {Outlet} from 'react-router-dom'
import Navbar from './component/Navbar'
import MyFooter from './component/myFooter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <Navbar/>
 <div className='min-h-screen'>
   <Outlet/>
   </div>
  <MyFooter/>
    </>
  )
}

export default App
