import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './layouts/Sidebar';
import Dashboard  from './pages/Dashboard';
import Inventory from './pages/Inventory';
import FormInventory from './pages/FormInventory';
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
              <Route path='/inventory/add' element={<FormInventory />} />
              <Route path='/inventory/update' element={<FormInventory />} />
              <Route path='/inventory/delete' element={<FormInventory />} />
            </Route>
            <Route>
              <Route path='/stock' element={<Inventory />} />
              <Route path='/stock/in' element={<Inventory />} />
              <Route path='/stock/out' element={<Inventory />} />
            </Route>
            <Route path='/scan' element={<Scanner />} />

          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App