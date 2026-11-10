import { Wallet, TrendingUp, CalendarRange, Building2, CalendarClock, Users, ClipboardList, Receipt, Stethoscope, FileImage, History } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import PlatformsOverview from '../components/PlatformsOverview.jsx'
import FeatureSection from '../components/FeatureSection.jsx'
import ProductShot from '../components/ProductShot.jsx'
import CTASection from '../components/CTASection.jsx'
import Footer from '../components/Footer.jsx'
// Captura real de Dental Demo (Caja operativa) con datos de ejemplo (10-11-2026).
import bannerFinanzas from '../assets/brand/dd_caja.jpg'
import ddCardBalance from '../assets/brand/dd_card_balance.png'
import ddCardIngresos from '../assets/brand/dd_card_ingresos.png'
// Captura real de DentalCloud (Agenda diaria) + citas reales recortadas (10-11-2026).
import bannerAgenda from '../assets/brand/dc_agenda_diaria.jpg'
import dcCitaAtencion from '../assets/brand/dc_cita_atencion.png'
import dcCitaEspera from '../assets/brand/dc_cita_espera.png'
// Captura real de DentalCloud (ficha de paciente ficticia) + recortes reales (10-11-2026).
import bannerFichas from '../assets/brand/dc_ficha.jpg'
import dcFichaPaciente from '../assets/brand/dc_ficha_paciente.png'
import dcFichaAvance from '../assets/brand/dc_ficha_avance.png'

const ADMIN_ITEMS = [
  { icon: Wallet, title: 'Finanzas', text: 'Ingresos, gastos y liquidaciones de cada profesional en un solo panel.' },
  { icon: TrendingUp, title: 'Operaciones', text: 'Ocupación, metas y desempeño por sede en tiempo real.' },
  { icon: CalendarRange, title: 'Agenda general', text: 'Vista consolidada de la agenda de toda la clínica.' },
  { icon: Building2, title: 'Multi-sede', text: 'Administra varias sedes desde una sola cuenta.' },
]

const OPERATIONAL_ITEMS = [
  { icon: CalendarClock, title: 'Agenda por profesional', text: 'Cada odontólogo gestiona sus propias horas y bloques.' },
  { icon: Users, title: 'Fichas de pacientes', text: 'Datos clínicos, evoluciones y documentos por paciente.' },
  { icon: ClipboardList, title: 'Presupuestos', text: 'Planes de tratamiento con seguimiento de avance.' },
  { icon: Receipt, title: 'Cartola y pagos', text: 'Abonos, ajustes y saldos siempre al día.' },
]

const CLINICAL_ITEMS = [
  { icon: Stethoscope, title: 'Odontograma interactivo', text: 'Estado de cada pieza dental, tratada, con caries o ausente.' },
  { icon: FileImage, title: 'Radiografías', text: 'Carga y consulta de imágenes clínicas por paciente.' },
  { icon: History, title: 'Historia clínica', text: 'Registro cronológico de controles y tratamientos.' },
  { icon: ClipboardList, title: 'Seguimiento de tratamientos', text: 'Avance de cada tratamiento activo, sin perder el hilo.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <PlatformsOverview />

      <FeatureSection
        id="administrativo"
        index="01"
        badgeClass="bg-slate-900"
        eyebrow="DentalOS · Administración"
        eyebrowClass="text-slate-500"
        iconClass="text-slate-500"
        title="El control de tu clínica hacia tu propio equipo"
        description="Todo lo que el administrador y los dueños de la clínica necesitan para tomar decisiones: dinero, ocupación y agenda global."
        items={ADMIN_ITEMS}
        visual={
          <ProductShot
            src={bannerFinanzas}
            alt="Caja operativa de Dental Demo: ingresos, gastos y balance del mes por categoría"
            tint="from-slate-200 via-slate-100"
            panel="from-slate-100 to-white"
            callouts={[
              { src: ddCardIngresos, alt: 'Ingresos del mes: $4.790.000', className: 'bottom-0 left-0 w-[40%] sm:w-[34%]' },
              { src: ddCardBalance, alt: 'Balance del mes: $2.988.000', className: 'bottom-6 right-3 w-[40%] sm:bottom-10 sm:-right-4 sm:w-[34%]' },
            ]}
          />
        }
      />

      <FeatureSection
        id="operacional"
        index="02"
        badgeClass="bg-cyan-600"
        eyebrow="DentalGOP · Operación"
        eyebrowClass="text-cyan-600"
        iconClass="text-cyan-600"
        title="La atención diaria a tus pacientes, ordenada"
        description="Cada odontólogo trabaja con su propia agenda, fichas y presupuestos, sin perder de vista los pagos pendientes."
        items={OPERATIONAL_ITEMS}
        visual={
          <ProductShot
            src={bannerAgenda}
            alt="Agenda diaria de DentalCloud con las citas del día, su profesional y sillón"
            callouts={[
              { src: dcCitaAtencion, alt: 'Cita en atención: 09:00 a 10:00, Dra. Valentina Soto, Sillón 3', className: 'bottom-0 right-0 w-[52%] sm:w-[46%]' },
              { src: dcCitaEspera, alt: 'Paciente en espera: 09:30, Dra. Camila Rojas, Sillón 1', className: 'top-[34%] -left-1 w-[48%] sm:-left-4 sm:w-[42%]' },
            ]}
          />
        }
        tint="bg-cyan-50/50"
        reverse
      />

      <FeatureSection
        id="fichas-clinicas"
        index="03"
        badgeClass="bg-cyan-600"
        eyebrow="DentalGOP · Ficha clínica"
        eyebrowClass="text-cyan-600"
        iconClass="text-cyan-600"
        title="Toda la información clínica del paciente, en un solo lugar"
        description="Odontograma, radiografías, historia y tratamientos activos, siempre a la mano del profesional que atiende."
        items={CLINICAL_ITEMS}
        visual={
          <ProductShot
            src={bannerFichas}
            alt="Ficha de paciente en DentalCloud con sus presupuestos y avance de tratamiento"
            callouts={[
              { src: dcFichaPaciente, alt: 'Cabecera de la ficha con alerta de alergia a la penicilina', className: 'bottom-0 left-0 w-[56%] sm:-left-4 sm:w-[48%]' },
              { src: dcFichaAvance, alt: 'Avance del tratamiento: 50% tratado', className: 'top-[12%] right-2 w-[34%] sm:-right-4 sm:w-[28%]' },
            ]}
          />
        }
        tint="bg-white"
      />

      <CTASection />
      <Footer />
    </div>
  )
}
