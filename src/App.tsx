import './App.css'
import { AppHeader } from './components/layout/header'
import { Tabs, type Tab } from './components/layout/tab'
import { WindowCalculator } from './components/pages/windowCalculator';

function App() {

  const tabs: Tab[] = [
    {
      legend: "P-65",
      renderer: <WindowCalculator modern={true} buttonStyle={"emerald"}/>,
      tabStyle: " bg-emerald-600 dark:bg-emerald-900",
      tabBtnStyle: "bg-emerald-600 text-white dark:bg-emerald-800 dark:text-gray-200 hover:bg-emerald-700 dark:hover:bg-emerald-900",
    },
    {
      legend: "Tradicional",
      renderer: <WindowCalculator modern={false} />,
      tabStyle: "bg-slate-600 dark:bg-slate-900",
      tabBtnStyle: "bg-slate-500 text-white dark:bg-slate-800 dark:text-gray-200 hover:bg-slate-700 dark:hover:bg-slate-950",
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
