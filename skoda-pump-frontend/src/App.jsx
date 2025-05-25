import React from 'react';
import { useState } from "react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Skoda Pump Selector</h1>
      <form className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <div>
          <label className="block font-medium text-gray-700">Flow Rate (m³/h)</label>
          <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Head (m)</label>
          <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Viscosity (cP)</label>
          <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Liquid Type</label>
          <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Find Pump
        </button>
      </form>
    </div>
  );
}

export default App;
