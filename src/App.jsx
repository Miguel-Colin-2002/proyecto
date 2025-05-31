import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Actividad11 from './components/Actividad11';
import Actividad12 from './components/Actividad12';
import Actividad13 from './components/Actividad13';
import Actividad14 from './components/Actividad14';
import Actividad15 from './components/Actividad15';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actividad11" element={<Actividad11 />} />
          <Route path="/actividad12" element={<Actividad12 />} />
          <Route path="/actividad13" element={<Actividad13 />} />
          <Route path="/actividad14" element={<Actividad14 />} />
          <Route path="/actividad15" element={<Actividad15 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



