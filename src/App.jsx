import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Dashboard  from './pages/Dashboard';
import Inventory from './pages/Inventory';
import FormInventory from './pages/FormInventory';
import FormStock from './pages/FormStock';
import FormDelete from './pages/FormDelete';
import Report from './pages/Report';
import Scanner from './components/Scanner';

const App = () => {
  return (
    <div>
      <Router>
        <Sidebar />
        <main className='main'>
          <Routes>
            <Route path='/' element={ <Dashboard />} />
            <Route>
              <Route path='/inventory' element={<Inventory />} />
              <Route path='/inventory/update' element={<FormInventory />} />
              <Route path='/inventory/delete' element={<FormDelete />} />
            </Route>
            <Route>
              <Route path='/stock/in' element={<FormStock />} />
              <Route path='/stock/out' element={<FormStock />} />
            </Route>
            <Route path='/scan' element={<Scanner />} />
            <Route path='/report' element={<Report />} />
            <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />

          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App