import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Pokemons from './pages/Pokemons';
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./component/ProtectedRoute";


export default function Home() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Pokemons />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
