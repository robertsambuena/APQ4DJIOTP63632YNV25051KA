import { Route, Routes } from 'react-router-dom'
import './App.css'
import { SearchPage } from './components/SearchPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path="/organization" element={<SearchPage />} />

        {/* Future expansion for a sign in page */}
        <Route path="*" element={<SearchPage />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
