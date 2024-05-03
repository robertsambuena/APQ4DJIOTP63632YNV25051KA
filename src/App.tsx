import { Route, Routes } from 'react-router-dom'
import './App.css'
import { SearchPage } from './components/SearchPage'

function App() {
  return (
    <Routes>
      <Route path="/organization" element={<SearchPage />} />
      <Route path="*" element={<SearchPage />} />
    </Routes>
  )
}

export default App
