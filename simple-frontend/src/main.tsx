
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import {  QueryClientProvider } from '@tanstack/react-query'
import { client } from './App servise/ReactQuery/index.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <QueryClientProvider client={client}>
     <App />
  </QueryClientProvider>
   
  </BrowserRouter>,
)
