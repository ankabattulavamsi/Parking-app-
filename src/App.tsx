import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Parking from './components/Parking';
import ParkingContext from './ParkingConext';
import ParkingDetails from './components/ParkingDetails';


// export const store = createContext()

function App() {
  const [parkingSlots, setParkingSlots] = useState<any[]>([])
  return (
    // <store.Provider value={[parkingSlots, setParkingSlots]}>
    <ParkingContext>
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/parking' element={<Parking />} />
        <Route path='/parkingDetails' element={<ParkingDetails />} />
      </Routes>
      </BrowserRouter>
    </div>
    </ParkingContext>
    // </store.Provider>
  );
}

export default App;
