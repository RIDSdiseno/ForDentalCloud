import { Wallet, TrendingUp, CalendarRange, Building2, CalendarClock, Users, ClipboardList, Receipt, Stethoscope, FileImage, History } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import PlatformsOverview from '../components/PlatformsOverview.jsx'
import FeatureSection from '../components/FeatureSection.jsx'
import ShowcaseImage from '../components/ShowcaseImage.jsx'
import CTASection from '../components/CTASection.jsx'
import Footer from '../components/Footer.jsx'
import bannerFinanzas from '../assets/brand/banner-finanzas.jpg'
import bannerAgenda from '../assets/brand/banner-agenda.jpg'
import bannerFichas from '../assets/brand/banner-fichas.jpg'

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
        visual={<ShowcaseImage src={bannerFinanzas} alt="Panel de finanzas, pagos y reportes de forDentalCloud" tint="from-slate-200 via-slate-100" />}
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
        visual={<ShowcaseImage src={bannerAgenda} alt="Agenda semanal por profesional en forDentalCloud" />}
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
        visual={<ShowcaseImage src={bannerFichas} alt="Ficha clínica digital de un paciente en forDentalCloud" />}
        tint="bg-white"
      />

      <CTASection />
      <Footer />
    </div>
  )
}
