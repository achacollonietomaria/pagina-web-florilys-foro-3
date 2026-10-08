import Main from '../components/layout/Main.jsx'
import PageIntro from '../components/ui/PageIntro.jsx'
import Field from '../components/ui/Field.jsx'
import Button from '../components/ui/Button.jsx'
import Section from '../components/ui/Section.jsx'

export default function ContactPage({ showToast }) {
  const submit = (event) => {
    event.preventDefault()
    event.currentTarget.reset()
    showToast('Mensaje enviado. Te responderemos pronto.')
  }

  return <Main>
    <PageIntro eyebrow="Estamos para escucharte" title="Hablemos" description="Cuéntanos qué imaginas y le daremos vida con flores." />
    <Section className="container" container={false}><div className="contact-grid"><div className="form-panel"><form onSubmit={submit}><Field id="contact-name" label="Nombre completo"><input id="contact-name" name="name" autoComplete="name" required /></Field><div className="form-grid"><Field id="contact-email" label="Correo electrónico"><input id="contact-email" name="email" type="email" autoComplete="email" required /></Field><Field id="contact-phone" label="Teléfono"><input id="contact-phone" name="phone" type="tel" autoComplete="tel" /></Field></div><Field id="contact-reason" label="Motivo"><select id="contact-reason" name="reason" required defaultValue=""><option value="">Seleccionar</option><option>Bodas y eventos</option><option>Ramo para regalo</option><option>Otras consultas</option></select></Field><Field id="contact-message" label="Tu mensaje"><textarea id="contact-message" name="message" rows="5" required /></Field><Button type="submit">Enviar mensaje <span>→</span></Button></form></div><div><div className="eyebrow">Encuéntranos</div><h2>Una visita, una conversación, una flor.</h2><div className="info-list"><div className="info-item"><strong>Taller Floral Florilys</strong><span className="text-muted">Cochabamba, Bolivia<br />Visitas solo con cita previa</span></div><div className="info-item"><strong>Horarios</strong><span className="text-muted">Lun - Sáb · 9:00 - 18:00</span></div><div className="info-item"><strong>Escríbenos</strong><span className="text-muted">+591 700 00000<br />@florilys.bo</span></div></div></div></div></Section>
  </Main>
}