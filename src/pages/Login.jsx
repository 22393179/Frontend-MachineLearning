import React from 'react';
import { FaUser, FaVenusMars, FaFlag } from 'react-icons/fa';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          ¡Bienvenido!
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Completa tu información para continuar
        </p>

        <form className="space-y-5">
          {/* Edad */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              placeholder="Edad"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Género */}
          <div className="relative">
            <FaVenusMars className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Género"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Nacionalidad */}
          <div className="relative">
            <FaFlag className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Nacionalidad"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
