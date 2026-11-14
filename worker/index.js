// Worker de la web: sirve los archivos estáticos de dist/ y recibe el formulario de contacto en /api/contact.
// El formulario llega por mail a agustin@agenciacontesta.com (binding EMAIL, con Email Routing de Cloudflare).
// Protección antispam: Turnstile (secreto TURNSTILE_SECRET) + un campo trampa invisible.
import { EmailMessage } from 'cloudflare:email';

const TO = 'agustin@agenciacontesta.com';
const FROM = 'web@agenciacontesta.com';
const SITE = 'agenciacontesta.com';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
});

const b64 = s => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
// Encabezado con acentos (RFC 2047)
const encWord = s => `=?UTF-8?B?${b64(s)}?=`;
const clean = (s, max) => String(s || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const wrap76 = s => s.replace(/.{1,76}/g, '$&\r\n');

function buildMime({ nombre, email, falta, idioma, pagina }) {
  const subject = `Nuevo contacto desde la web: ${nombre}`;
  const text = [
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    `A su marca le falta: ${falta}`,
    `Idioma de la página: ${idioma}`,
    pagina ? `Página: ${pagina}` : '',
    '',
    'Respondé este mail para escribirle directamente.',
  ].filter(l => l !== '').join('\n');
  const id = `<${crypto.randomUUID()}@${SITE}>`;
  return [
    `From: ${encWord('Web ConTesta')} <${FROM}>`,
    `To: <${TO}>`,
    `Reply-To: ${encWord(nombre)} <${email}>`,
    `Subject: ${encWord(subject)}`,
    `Message-ID: ${id}`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    wrap76(b64(text)),
  ].join('\r\n');
}

async function verifyTurnstile(token, ip, secret) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = await r.json();
  return !!data.success;
}

async function contact(request, env) {
  let d;
  try { d = await request.json(); } catch { return json({ ok: false, error: 'bad_request' }, 400); }
  // Campo trampa: las personas no lo ven, los bots lo completan
  if (d.web) return json({ ok: true });
  const nombre = clean(d.nombre, 120), email = clean(d.email, 200), falta = clean(d.falta, 2000);
  const idioma = clean(d.idioma, 5) || 'es', pagina = clean(d.pagina, 300);
  if (!nombre || !falta || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ ok: false, error: 'invalid' }, 422);

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(String(d.token || ''), request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET);
    if (!ok) return json({ ok: false, error: 'captcha' }, 403);
  }
  if (!env.EMAIL) return json({ ok: false, error: 'not_configured' }, 503);
  try {
    await env.EMAIL.send(new EmailMessage(FROM, TO, buildMime({ nombre, email, falta, idioma, pagina })));
  } catch (err) {
    console.error('send failed', err && err.message);
    return json({ ok: false, error: 'send_failed' }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      return contact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
