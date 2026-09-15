import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar"><NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>OctoFit <em>Tracker</em></span></NavLink><nav><NavLink to="/activities">Activities</NavLink><NavLink to="/workouts">Workouts</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/users">People</NavLink></nav><span className="status-dot">Live</span></header>
        <main><Routes><Route path="/" element={<Activities />} /><Route path="/activities" element={<Activities />} /><Route path="/workouts" element={<Workouts />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/users" element={<Users />} /></Routes></main>
        <footer><span>OCTOFIT / 2026</span><span>Move with intention.</span></footer>
      </div>
    </BrowserRouter>
  )
}

export default App
