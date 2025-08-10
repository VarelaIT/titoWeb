import './App.css'
import { Page } from './components/elements/pages'
import { AppHeader } from './components/layout/header'

function App() {

  return (
    <main
      className={
        "h-screen w-screen bg-stone-100 "
        + "bg-stone-200 text-gray-800 dark:bg-stone-900 dark:text-gray-200 "
      }
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <AppHeader />
      <div className='relative p-4'>
        <Page className='flex flex-wrap justify-center items-center w-full h-full'>
          <h1>Ventarela</h1>
        </Page>
      </div>

    </main>
  )
}

export default App
