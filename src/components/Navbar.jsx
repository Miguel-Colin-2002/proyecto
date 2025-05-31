import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:underline">Inicio</Link></li>
        <li><Link to="/actividad11" className="hover:underline">Actividad 11</Link></li>
        <li><Link to="/actividad12" className="hover:underline">Actividad 12</Link></li>
        <li><Link to="/actividad13" className="hover:underline">Actividad 13</Link></li>
        <li><Link to="/actividad14" className="hover:underline">Actividad 14</Link></li>
        <li><Link to="/actividad15" className="hover:underline">Actividad 15</Link></li>
      </ul>
    </nav>
  );
}
