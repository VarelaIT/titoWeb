import './App.css'
import { AppHeader } from './components/layout/header'
import { Tabs, type Tab } from './components/layout/tab'
import { WindowCalculator } from './components/pages/windowCalculator';

function App() {

  const tabs: Tab[] = [
    {
      legend: "Moderna",
      renderer: <WindowCalculator modern={true}/>
    },
    {
      legend: "Clasica",
      renderer: <WindowCalculator modern={false}/>
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
