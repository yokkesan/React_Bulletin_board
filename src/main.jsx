import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'//ルーティング機能
import App from './App'
import ThreadForm from './components/ThreadForm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />   
      <Route path="/threads/new" element={<ThreadForm />} />
    </Routes>
  </BrowserRouter>
)