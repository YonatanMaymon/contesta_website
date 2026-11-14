// PENDIENTE: textos legales listos pero sin publicar (Agus decide más adelante si van y con qué datos del titular).
// Para activarlos, crear las páginas que usen src/components/Legal.astro y enlazarlas en el footer.
// Textos legales (RGPD y LSSI). Español es la versión de referencia; inglés sirve a las demás versiones.
// Datos del titular en un solo lugar para que coincidan en todas las páginas.
export const OWNER = {
  name: 'Agustín Zaid',
  brand: 'ConTesta',
  taxId: 'B6794290',
  address: 'C. de Málaga, 5, Chamberí, 28003 Madrid, España',
  addressEn: 'C. de Málaga, 5, Chamberí, 28003 Madrid, Spain',
  email: 'agustin@agenciacontesta.com',
  phone: '+34 603 31 66 74',
  updated: { es: '14 de noviembre de 2026', en: 'November 14, 2026' },
};

// Rutas de cada página legal por idioma. IT, DE y FR enlazan a la versión en inglés.
export const LEGAL_PATHS = {
  es: { privacy: '/privacidad/', cookies: '/cookies/', notice: '/aviso-legal/' },
  en: { privacy: '/en/privacy/', cookies: '/en/cookies/', notice: '/en/legal-notice/' },
};
export const legalPaths = lang => (lang === 'es' ? LEGAL_PATHS.es : LEGAL_PATHS.en);

// Etiquetas del pie y la línea del formulario, en los 5 idiomas
export const LEGAL_UI = {
  es: { privacy: 'Privacidad', cookies: 'Cookies', notice: 'Aviso legal',
        formLine: 'Al enviar, aceptas que usemos tus datos para responderte, según nuestra <a href="{p}">política de privacidad</a>.',
        back: 'Volver a la web' },
  en: { privacy: 'Privacy', cookies: 'Cookies', notice: 'Legal notice',
        formLine: 'By sending, you agree that we use your data to reply to you, as described in our <a href="{p}">privacy policy</a>.',
        back: 'Back to the site' },
  it: { privacy: 'Privacy', cookies: 'Cookie', notice: 'Note legali',
        formLine: 'Inviando, accetti che usiamo i tuoi dati per risponderti, secondo la nostra <a href="{p}">privacy policy</a>.',
        back: 'Torna al sito' },
  de: { privacy: 'Datenschutz', cookies: 'Cookies', notice: 'Impressum',
        formLine: 'Mit dem Absenden stimmst du zu, dass wir deine Daten nutzen, um dir zu antworten, wie in unserer <a href="{p}">Datenschutzerklärung</a> beschrieben.',
        back: 'Zurück zur Website' },
  fr: { privacy: 'Confidentialité', cookies: 'Cookies', notice: 'Mentions légales',
        formLine: 'En envoyant, vous acceptez que nous utilisions vos données pour vous répondre, selon notre <a href="{p}">politique de confidentialité</a>.',
        back: 'Retour au site' },
};

const O = OWNER;

export const LEGAL_PAGES = {
  es: {
    privacy: {
      title: 'Política de privacidad',
      description: 'Cómo trata ConTesta los datos personales de quienes visitan su web o la contactan.',
      html: `
<p class="lg-date">Última actualización: ${O.updated.es}</p>
<p>En ConTesta tratamos tus datos con el mismo cuidado con el que trabajamos tus campañas. Aquí te contamos qué datos recogemos, para qué y qué derechos tienes, conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos (LOPDGDD).</p>
<h2>1. Quién es el responsable</h2>
<p>${O.name}, con CIF ${O.taxId} y domicilio en ${O.address}, que opera bajo la marca ${O.brand}. Contacto: <a href="mailto:${O.email}">${O.email}</a>.</p>
<h2>2. Qué datos recogemos</h2>
<ul>
<li><strong>Formulario de contacto:</strong> tu nombre, tu email y lo que nos cuentes en el mensaje.</li>
<li><strong>WhatsApp y email:</strong> los datos que nos envíes si nos escribes por esos canales.</li>
<li><strong>Navegación:</strong> datos de uso de la web mediante cookies de Google Analytics (ver <a href="/cookies/">política de cookies</a>).</li>
</ul>
<p>No pedimos datos sensibles y no hace falta que nos los envíes.</p>
<h2>3. Para qué los usamos y con qué base legal</h2>
<table>
<thead><tr><th>Finalidad</th><th>Base legal</th></tr></thead>
<tbody>
<tr><td>Responder tu consulta y preparar una propuesta</td><td>Medidas precontractuales que tú solicitas (art. 6.1.b RGPD)</td></tr>
<tr><td>Gestionar la relación si pasas a ser cliente</td><td>Ejecución del contrato (art. 6.1.b RGPD)</td></tr>
</tbody>
</table>
<p>La medición de visitas con Google Analytics se explica en la <a href="/cookies/">política de cookies</a>. No vendemos tus datos ni los usamos para enviarte publicidad sin tu permiso.</p>
<h2>4. Cuánto tiempo los guardamos</h2>
<p>Los datos de contacto, hasta 2 años desde nuestra última comunicación si no llegamos a trabajar juntos. Si eres cliente, mientras dure la relación y después el tiempo que exijan las obligaciones legales y fiscales. Las cookies, el plazo indicado en la política de cookies.</p>
<h2>5. Con quién los compartimos</h2>
<p>Solo con proveedores que necesitamos para funcionar y que tratan los datos por cuenta nuestra: Cloudflare (alojamiento de la web y recepción del formulario), Google (email y analítica) y Meta (WhatsApp). Nuestro equipo trabaja en remoto desde varios países, entre ellos Argentina, que cuenta con una decisión de adecuación de la Comisión Europea. Las transferencias a Estados Unidos se hacen con proveedores adheridos al Marco de Privacidad de Datos UE-EE. UU. o con cláusulas contractuales tipo.</p>
<h2>6. Tus derechos</h2>
<p>Puedes pedir acceso a tus datos, corregirlos, borrarlos, oponerte a su uso, limitarlo o llevártelos a otro proveedor. Para las cookies, ver la política de cookies. Escríbenos a <a href="mailto:${O.email}">${O.email}</a> y te respondemos en un plazo máximo de un mes.</p>
<p>Si crees que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>) o la autoridad de tu país.</p>
<h2>7. Seguridad</h2>
<p>Usamos conexión cifrada (HTTPS) y limitamos el acceso a tus datos a las personas del equipo que los necesitan para atenderte.</p>
<h2>8. Menores</h2>
<p>Nuestros servicios están dirigidos a empresas y profesionales. No recogemos a sabiendas datos de menores de 14 años.</p>
<h2>9. Cambios</h2>
<p>Si cambiamos esta política, publicaremos la nueva versión aquí con su fecha.</p>`,
    },
    cookies: {
      title: 'Política de cookies',
      description: 'Qué cookies usa la web de ConTesta y cómo bloquearlas.',
      html: `
<p class="lg-date">Última actualización: ${O.updated.es}</p>
<p>Las cookies son pequeños archivos que la web guarda en tu navegador. Esta web usa Google Analytics para saber cuánta gente la visita y qué secciones mira.</p>
<table>
<thead><tr><th>Nombre</th><th>Proveedor</th><th>Tipo</th><th>Para qué</th><th>Duración</th></tr></thead>
<tbody>
<tr><td><code>_ga</code></td><td>Google Analytics</td><td>Analítica</td><td>Distinguir visitantes</td><td>2 años</td></tr>
<tr><td><code>_ga_XKVG9RW7S2</code></td><td>Google Analytics</td><td>Analítica</td><td>Mantener el estado de la sesión</td><td>2 años</td></tr>
</tbody>
</table>
<h2>Cómo bloquearlas</h2>
<p>Puedes borrar o bloquear las cookies desde la configuración de tu navegador, o desactivar Google Analytics con el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">complemento oficial de Google</a>. La web funciona igual sin ellas.</p>
<p>Más información sobre cómo tratamos tus datos en la <a href="/privacidad/">política de privacidad</a>.</p>`,
    },
    notice: {
      title: 'Aviso legal',
      description: 'Datos del titular de la web de ConTesta y condiciones de uso.',
      html: `
<h2>Titular de la web</h2>
<p>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI):</p>
<ul>
<li>Titular: ${O.name} (${O.brand})</li>
<li>CIF: ${O.taxId}</li>
<li>Domicilio: ${O.address}</li>
<li>Email: <a href="mailto:${O.email}">${O.email}</a></li>
<li>Teléfono: ${O.phone}</li>
</ul>
<h2>Uso de la web</h2>
<p>Esta web presenta los servicios de ConTesta. Su contenido es informativo y no constituye una oferta vinculante: cada propuesta se acuerda por escrito con el cliente.</p>
<h2>Propiedad intelectual</h2>
<p>Los textos, el diseño, la marca ConTesta y el logotipo pertenecen a su titular. Los logotipos de clientes se muestran para identificar trabajos realizados y pertenecen a sus respectivos dueños. No se permite reproducirlos sin autorización.</p>
<h2>Enlaces</h2>
<p>No somos responsables del contenido de las webs de terceros a las que enlazamos.</p>
<h2>Privacidad y cookies</h2>
<p>Ver la <a href="/privacidad/">política de privacidad</a> y la <a href="/cookies/">política de cookies</a>.</p>`,
    },
  },
  en: {
    privacy: {
      title: 'Privacy policy',
      description: 'How ConTesta handles the personal data of people who visit its website or contact it.',
      html: `
<p class="lg-date">Last updated: ${O.updated.en}</p>
<p>At ConTesta we treat your data with the same care we put into your campaigns. Here is what data we collect, why, and what rights you have under the General Data Protection Regulation (GDPR). The Spanish version of this policy prevails in case of discrepancy.</p>
<h2>1. Data controller</h2>
<p>${O.name}, tax ID (CIF) ${O.taxId}, ${O.addressEn}, operating under the ${O.brand} brand. Contact: <a href="mailto:${O.email}">${O.email}</a>.</p>
<h2>2. What data we collect</h2>
<ul>
<li><strong>Contact form:</strong> your name, your email and whatever you tell us in your message.</li>
<li><strong>WhatsApp and email:</strong> the data you send us if you write to us through those channels.</li>
<li><strong>Browsing:</strong> website usage data through Google Analytics cookies (see the <a href="/en/cookies/">cookie policy</a>).</li>
</ul>
<p>We do not ask for sensitive data and you do not need to send it to us.</p>
<h2>3. Why we use it and on what legal basis</h2>
<table>
<thead><tr><th>Purpose</th><th>Legal basis</th></tr></thead>
<tbody>
<tr><td>Replying to your enquiry and preparing a proposal</td><td>Pre-contractual steps you request (art. 6.1.b GDPR)</td></tr>
<tr><td>Managing the relationship if you become a client</td><td>Performance of a contract (art. 6.1.b GDPR)</td></tr>
</tbody>
</table>
<p>Visit measurement with Google Analytics is explained in the <a href="/en/cookies/">cookie policy</a>. We do not sell your data or use it to send you advertising without your permission.</p>
<h2>4. How long we keep it</h2>
<p>Contact data, up to 2 years after our last exchange if we do not end up working together. If you are a client, for as long as the relationship lasts and then for the time required by legal and tax obligations. Cookies, for the period stated in the cookie policy.</p>
<h2>5. Who we share it with</h2>
<p>Only with providers we need to operate, who process the data on our behalf: Cloudflare (website hosting and contact form), Google (email and analytics) and Meta (WhatsApp). Our team works remotely from several countries, including Argentina, which has an adequacy decision from the European Commission. Transfers to the United States are made with providers certified under the EU-US Data Privacy Framework or under standard contractual clauses.</p>
<h2>6. Your rights</h2>
<p>You can ask to access, correct or delete your data, object to or restrict its use, or take it to another provider. For cookies, see the cookie policy. Write to <a href="mailto:${O.email}">${O.email}</a> and we will reply within one month at the latest.</p>
<p>If you believe we have not handled your data properly, you can complain to the Spanish Data Protection Agency (<a href="https://www.aepd.es" target="_blank" rel="noopener">aepd.es</a>) or the authority in your country.</p>
<h2>7. Security</h2>
<p>We use an encrypted connection (HTTPS) and limit access to your data to the team members who need it to help you.</p>
<h2>8. Minors</h2>
<p>Our services are aimed at companies and professionals. We do not knowingly collect data from children under 14.</p>
<h2>9. Changes</h2>
<p>If we change this policy, we will publish the new version here with its date.</p>`,
    },
    cookies: {
      title: 'Cookie policy',
      description: 'Which cookies the ConTesta website uses and how to block them.',
      html: `
<p class="lg-date">Last updated: ${O.updated.en}</p>
<p>Cookies are small files the website stores in your browser. This site uses Google Analytics to learn how many people visit it and which sections they view.</p>
<table>
<thead><tr><th>Name</th><th>Provider</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
<tbody>
<tr><td><code>_ga</code></td><td>Google Analytics</td><td>Analytics</td><td>Distinguish visitors</td><td>2 years</td></tr>
<tr><td><code>_ga_XKVG9RW7S2</code></td><td>Google Analytics</td><td>Analytics</td><td>Keep the session state</td><td>2 years</td></tr>
</tbody>
</table>
<h2>How to block them</h2>
<p>You can delete or block cookies in your browser settings, or turn off Google Analytics with <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google’s official add-on</a>. The site works just the same without them.</p>
<p>More about how we handle your data in the <a href="/en/privacy/">privacy policy</a>.</p>`,
    },
    notice: {
      title: 'Legal notice',
      description: 'Owner details and terms of use of the ConTesta website.',
      html: `
<h2>Website owner</h2>
<p>As required by Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI):</p>
<ul>
<li>Owner: ${O.name} (${O.brand})</li>
<li>Tax ID (CIF): ${O.taxId}</li>
<li>Address: ${O.addressEn}</li>
<li>Email: <a href="mailto:${O.email}">${O.email}</a></li>
<li>Phone: ${O.phone}</li>
</ul>
<h2>Use of the website</h2>
<p>This website presents ConTesta’s services. Its content is for information only and is not a binding offer: every proposal is agreed in writing with the client.</p>
<h2>Intellectual property</h2>
<p>The texts, design, the ConTesta brand and logo belong to their owner. Client logos are shown to identify work we have done and belong to their respective owners. They may not be reproduced without permission.</p>
<h2>Links</h2>
<p>We are not responsible for the content of third-party websites we link to.</p>
<h2>Privacy and cookies</h2>
<p>See the <a href="/en/privacy/">privacy policy</a> and the <a href="/en/cookies/">cookie policy</a>.</p>`,
    },
  },
};
