import './App.css'
import { AppHeader } from './components/layout/header'
import { Tabs, type Tab } from './components/layout/tab'
import { ClassicWindow } from './components/pages/classicWindow';

function App() {

  const tabs: Tab[] = [
    {
      legend: "Nuevo",
      renderer: <p className='text-white'>Estamos trabajando en este modulo; pronto estara disponible.</p>
    },
    {
      legend: "Ventana Clasica",
      renderer: <ClassicWindow/>
    },
  ];

  return (
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
      <div className='relative p-4'>
          <Tabs tabs={tabs}/>
      </div>
    </main>
  )
}

export default App
