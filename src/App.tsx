
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Todo from './pages/todo/Todo'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Todo />}/>
        </Route>
      </Routes>
    </QueryClientProvider>
    </>
  )
}

export default App
