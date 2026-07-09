import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import PlaceholderApp from './pages/PlaceholderApp.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <PlaceholderApp
            tag="DentalOS"
            tagClass="bg-slate-900 text-white"
            title="Aquí vivirá el dashboard administrativo"
            description="Finanzas, operaciones y agenda general de la clínica. Esta pantalla es un placeholder listo para conectar con la app real."
          />
        }
      />
      <Route
        path="/pacientes"
        element={
          <PlaceholderApp
            tag="DentalCloud"
            tagClass="bg-cyan-600 text-white"
            title="Aquí vivirá la gestión de pacientes"
            description="Agenda por profesional, fichas clínicas, presupuestos y cartola de pago. Esta pantalla es un placeholder listo para conectar con la app real."
          />
        }
      />
    </Routes>
  )
}
