import BudgetForm from './components/BudgetForm'
import './index.css'

function App() {

  return (
    <>
      <header className='bg-blue-600 py-8 max-h-72'>
        <h1 className='text-center text-4xl text-white uppercase font-black'>
          Planificador de Gastos
        </h1>
      </header>

      <div className='bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10 p-10'>
        <BudgetForm />
      </div>
    </>
  )
}

export default App
