import { ToastContainer } from 'react-toastify';
import './App.css'
import { AppHeader } from './components/layout/header'
import Dashboard from './components/pages/dashboard';
import Providers from './components/providers';

function App() {
  return (
    <Providers>
      <main
        className={
          "h-screen w-screen bg-stone-100 "
          + "bg-stone-200 text-gray-800 dark:bg-stone-900 dark:text-gray-200 "
          + "overflow-auto "
        }
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <AppHeader />
        <div className='relative p-4 max-w-screen grid gap-8'>
          <Dashboard />
        </div>
      </main>
      <ToastContainer/>
    </Providers>
  )
}

export default App
