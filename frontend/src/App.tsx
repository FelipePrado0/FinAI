import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex gap-4 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-24 h-24 hover:scale-110 transition-transform" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24 h-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        FinAI Setup Complete! 🚀
      </h1>
      <div className="card p-6 bg-gray-800 rounded-xl shadow-lg text-center">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-400">
          Tailwind CSS & React working perfectly.
        </p>
      </div>
    </div>
  )
}

export default App
