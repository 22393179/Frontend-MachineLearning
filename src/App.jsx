import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Predicción de Adicción a Redes Sociales
          </h1>
          <p className="text-lg text-gray-600">
            Modelos de Machine Learning integrados con React
          </p>
        </header>

        <main>
          <PredictionForm />
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;