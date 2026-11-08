// Plantillas HTML de cada sección. Se usan al generar el sitio (una página por idioma),
// así el texto llega en el HTML y los buscadores lo leen. Son las mismas plantillas del diseño original.
import {
  I18N, CLIENTS, SERVICES, NAMES, NAMES_I18N, PRESS, CERTS, CASES_TITLE, CASES, QUOTE_MARKS, OPEN_UI, TAG_SVC,
  ICON_X, ICON_NEXT, SVC_ORDER, SVC_TEXT, SVC_ARROW, SVC_UI, SVC_CLIENTS, TEAM, OFFICES, OFFICE_IL, TEAM_TEXT,
  COUNTRIES, FACES, PERSON_SVG, PROCESS_TEXT, PROC_ICONS, PN, FAQ_TEXT, FAQ_PLUS, FAQ_AV, CONTACT_EMAIL, WA_NUMBER,
  FINAL_TEXT, CHECK_SVG, SEND_SVG, FOOT_TEXT, BLOG_URL, LANGS,
} from '../data/content.js';

export const WA_URL = 'https://wa.me/34603316674';
export const langPath = code => (code === 'es' ? '/' : `/${code}/`);

export const svcName = (id, code) =>
  id === 'ia' ? (I18N[code] || I18N.es).ia : NAMES_I18N[id] ? NAMES_I18N[id][code] || NAMES_I18N[id].es : NAMES[id];

// "Las testas" → "Las <em>testas</em>": la última palabra va destacada
const emLast = title => {
  const sp = title.lastIndexOf(' ');
  return sp > 0 ? `${title.slice(0, sp)} <em>${title.slice(sp + 1)}</em>` : `<em>${title}</em>`;
};
const stripTags = s => s.replace(/<[^>]+>/g, '');

/* ---------- Titular ---------- */
// Envuelve cada palabra en una máscara (.w > .wi) para revelarla de abajo hacia arriba.
// Los elementos (la palabra que rota, la marca destacada) cuentan como un solo bloque.
function splitWords(html) {
  const out = [];
  let i = 0;
  const word = inner => `<span class="w"><span class="wi">${inner}</span></span>`;
  while (i < html.length) {
    if (html.startsWith('<span', i)) {
      let depth = 0, j = i;
      do {
        const open = html.indexOf('<span', j), close = html.indexOf('</span>', j);
        if (open !== -1 && open < close) { depth++; j = open + 5; } else { depth--; j = close + 7; }
      } while (depth > 0);
      out.push(word(html.slice(i, j)));
      i = j;
    } else {
      const next = html.indexOf('<span', i);
      const text = html.slice(i, next === -1 ? html.length : next);
      text.split(/(\s+)/).forEach(part => { if (part) out.push(/^\s+$/.test(part) ? part : word(part)); });
      i = next === -1 ? html.length : next;
    }
  }
  return out.join('');
}

export function headline(code) {
  const t = I18N[code];
  const rot = `<span class="rot-box"><span class="rot-clip"><span class="rot-word">${t.word}</span></span><svg class="swoosh" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M4 13C46 7 112 4 196 9"/></svg></span>`;
  // La palabra que rota queda pegada a la anterior para que no salte sola de renglón
  const glue = s => s.replace(/(\S+ )?\{rot\}(\S*)/, (m, prev = '', post) => `<span class="rot-wrap">${prev}${rot}${post}</span>`);
  return {
    h1: t.h.map(l => `<span class="line">${splitWords(glue(l))}</span>`).join(''),
    label: stripTags(t.h.join(' ')).replace('{rot}', t.word),
    sub: glue(t.sub),
  };
}

/* ---------- Cabeza: ventanas de servicio y etiquetas ---------- */
export function focus(code) {
  const rtl = code === 'he';
  const windows = [], labels = [];
  SERVICES.forEach((s, i) => {
    const name = svcName(s.id, code);
    const num = String(i + 1).padStart(2, '0');
    // En hebreo se espeja la composición entera
    const x = rtl ? 100 - s.x : s.x;
    const side = rtl ? (s.side === 'left' ? 'right' : 'left') : s.side;
    windows.push(`<a class="focus ${side}" href="#servicio-${s.id}" aria-label="${name}" data-i="${i}" style="left:${x}%;top:${s.y}%"><span class="f-num">${num}</span><span class="f-name">${name}</span></a>`);
    labels.push(`<a class="label ${side}" href="#servicio-${s.id}" data-i="${i}" data-ly="${s.ly}"><small>${num}</small><span>${name}</span></a>`);
  });
  return { windows: windows.join(''), labels: labels.join('') };
}

/* ---------- Franjas de logos ---------- */
export function clientsMarquee() {
  const group = hidden => `<div class="marquee-group"${hidden ? ' aria-hidden="true"' : ''}>${CLIENTS.map(([id, name, h]) =>
    `<span class="brand"><img src="/img/clientes/${id}.svg" alt="${hidden ? '' : name}" style="--h:${h}" draggable="false" loading="lazy"></span>`).join('')}</div>`;
  return group(false) + group(true);
}

export function pressList(code) {
  const more = (I18N[code] || I18N.es).pressMore;
  return PRESS.map(([f, name, h, url]) =>
    `<li><a href="${url}" target="_blank" rel="noopener"><img src="/img/prensa/${f}.svg" alt="${name}" style="--h:${h}" loading="lazy"><span class="press-more">${more}</span></a></li>`).join('');
}

// Cuatro pasadas: la franja da la vuelta en la mitad, y dos pasadas ya cubren cualquier ancho
export function certTrack() {
  return [0, 1, 2, 3].map(pass => {
    const hide = pass ? ' aria-hidden="true"' : '';
    return CERTS.map(([f, alt, w, h, c]) => `<li class="cert-item"${hide}><img${c ? ` class="${c}"` : ''} src="/img/sellos/${f}.png" alt="${pass ? '' : alt}" width="${w}" height="${h}" draggable="false" loading="lazy"></li>`).join('')
      + `<li class="cert-item"${hide}><div class="sortlist-badge"></div></li>`;
  }).join('');
}

/* ---------- Casos ---------- */
const personName = (c, code) => (c.personI18n && c.personI18n[code]) || c.person || null;

export const casesTitle = code => CASES_TITLE[code] || CASES_TITLE.es;

export function cases(code) {
  const more = (OPEN_UI[code] || OPEN_UI.es).more;
  const [qo, qc] = QUOTE_MARKS[code] || ['“', '”'];
  return CASES.map((c, i) => {
    const [h, stat, did] = c.text[code] || c.text.es;
    const quote = c.quote && (c.quote[code] || c.quote.es);
    return `
      <article class="case" data-case="${i}" tabindex="0" role="button" aria-haspopup="dialog">
        <div class="case-media"><img src="/img/casos/${c.img}.jpg" alt="" loading="lazy" width="1400" height="1050">
          <span class="case-client"><i>${c.client[0]}</i>${c.client}</span>
          <span class="case-more"><i>+</i>${more}</span></div>
        <div class="case-body">
          <div class="case-top"><span class="case-n">0${i + 1}</span><span class="case-tags">${c.tags.map(t => `<span>${t}</span>`).join('')}</span></div>
          ${h ? `<h3 dir="auto">${h}</h3>` : ''}
          <div class="case-stat"><b>+<span class="cnt" data-to="${c.n}">${c.n}</span><em>%</em></b><span dir="auto">${stat}</span></div>
          ${did ? `<p dir="auto">${did}</p>` : ''}
          ${quote ? `<figure class="case-quote"><blockquote dir="auto">${qo}${quote}${qc}</blockquote><figcaption><b>${personName(c, code)}</b> · ${c.role[code] || c.role.es}</figcaption></figure>` : ''}
        </div>
      </article>`;
  }).join('');
}

// Panel del caso abierto. Se arma en el navegador al abrir (usa el idioma de la página)
function caseData(i, code) {
  const c = CASES[i], [h, stat] = c.text[code] || c.text.es, [problem, did, result] = c.open[code] || c.open.es;
  return { img: c.img, client: c.client, tags: c.tags, h: h || c.client, n: c.n, stat, problem, did, result,
    person: personName(c, code), role: c.role && (c.role[code] || c.role.es), quote: c.quote && (c.quote[code] || c.quote.es) };
}
export function caseOpen(i, code) {
  const total = CASES.length;
  const d = caseData(i, code), u = OPEN_UI[code] || OPEN_UI.es, nx = caseData((i + 1) % total, code);
  const line = (label, txt) => txt ? `<div class="co-line"><small>${label}</small><p dir="auto">${txt}</p></div>` : '';
  return `
      <div class="co-bar">
        <div class="co-left"><span class="co-client"><i>${d.client[0]}</i>${d.client}</span>
          <span class="case-tags">${d.tags.map(t => `<a href="#servicio-${TAG_SVC[t]}">${t}</a>`).join('')}</span></div>
        <button class="co-close" type="button" aria-label="${u.close}">${ICON_X}</button>
      </div>
      <div class="co-hero">
        <div class="co-media"><img src="/img/casos/${d.img}.jpg" alt="" width="1400" height="1050"></div>
        <div class="co-head">
          <span class="case-n">0${i + 1} / 0${total}</span>
          <h3 id="co-title" dir="auto">${d.h}</h3>
          <div class="case-stat"><b>+<span class="cnt">${d.n}</span><em>%</em></b><span dir="auto">${d.stat}</span></div>
        </div>
      </div>
      <div class="co-lines">
        ${line(u.problem, d.problem)}
        ${line(u.did, d.did)}
        ${line(u.result, d.result)}
      </div>
      ${d.quote ? `<figure class="co-quote">
        <span class="co-face" aria-hidden="true">${d.person ? d.person[0] : d.client[0]}</span>
        <div><blockquote dir="auto">${d.quote}</blockquote>
          ${d.person ? `<figcaption><b>${d.person}</b>${d.role ? ' · ' + d.role : ''}</figcaption>` : ''}</div>
      </figure>` : ''}
      <div class="co-foot">
        <a class="btn btn-blue" href="#contacto"><span>${(I18N[code] || I18N.es).cta}</span><span class="arrow" aria-hidden="true">${ICON_NEXT}</span></a>
        <button class="co-next" type="button"><span><small>${u.next}</small>${nx.client}</span><i>${ICON_NEXT}</i></button>
      </div>`;
}

/* ---------- Servicios ---------- */
export function services(code) {
  const t = SVC_TEXT[code] || SVC_TEXT.es, ui = SVC_UI[code] || SVC_UI.es;
  const cta = (I18N[code] || I18N.es).cta;
  return {
    title: t.title,
    intro: t.intro,
    list: SVC_ORDER.map((id, i) => {
      const name = svcName(id, code), on = i === 0, clients = SVC_CLIENTS[id] || [];
      return `
      <div class="svc-item${on ? ' is-active' : ''}" id="servicio-${id}">
        <button class="svc-row" type="button" aria-expanded="${on}" aria-controls="svc-card-${id}">
          <span class="svc-num">${String(i + 1).padStart(2, '0')}</span><span class="svc-name">${name}</span><span class="svc-arrow">${SVC_ARROW}</span>
        </button>
        <div class="svc-card" id="svc-card-${id}"><article class="svc-card-in">
          <div class="svc-body">
            <div class="svc-desc"><small>${ui[0]}</small><p dir="auto">${t.d[id]}</p></div>
            ${clients.length ? `<div><small>${ui[1]}</small><div class="svc-clients">${clients.map(c => `<span class="svc-client"><i>${c[0]}</i>${c}</span>`).join('')}</div></div>` : ''}
            <a class="btn btn-blue" href="#contacto" data-ask="${id}"><span>${cta}</span><span class="arrow" aria-hidden="true">${SVC_ARROW}${SVC_ARROW}</span></a>
          </div>
        </article></div>
      </div>`;
    }).join(''),
  };
}

/* ---------- Las testas ---------- */
export const facesRow = n => FACES.slice(0, n).map(id => `<span class="face"><img src="/img/equipo/${id}.png" alt="" width="100" height="100" loading="lazy"></span>`).join('');

export function team(code) {
  const t = TEAM_TEXT[code] || TEAM_TEXT.es, names = COUNTRIES[code] || COUNTRIES.es;
  const words = [...new Set(TEAM.map(m => m.hi)), 'Ciao!', 'שלום!'];
  return {
    title: emLast((I18N[code] || I18N.es).testas),
    intro: t.intro,
    stat: t.stat,
    hint: t.hint,
    hello: [0, 1].map(() => words.map(w => `<span>${w}</span>`).join('')).join(''),
    pins: TEAM.map((m, i) => `
      <button class="gp" type="button" data-member="${i}" aria-label="${names[m.cc]}">
        <span class="gp-face${m.noPhoto ? ' gp-ph' : ''}">${m.noPhoto ? PERSON_SVG : `<img src="/img/equipo/${m.id}.png" alt="" loading="lazy" draggable="false">`}</span>
        <span class="gp-hi">${m.hi}<small>${names[m.cc]} · <time data-tz="${m.tz}"></time></small></span>
      </button>`).join(''),
  };
}

/* ---------- Cómo trabajamos ---------- */
const procIco = i => `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="${PROC_ICONS[i]}"/></svg>`;
// El recorrido (viewBox 600 × 560): baja en S por los 5 pasos y termina en el paso 05
const procPts = [[40, -30], ...PN];
export const procD = (() => {
  let d = `M${procPts[0][0]} ${procPts[0][1]}`;
  for (let i = 0; i < procPts.length - 1; i++) {   // Catmull-Rom a Bézier: curva suave por todos los puntos
    const p0 = procPts[i - 1] || procPts[i], p1 = procPts[i], p2 = procPts[i + 1], p3 = procPts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d;
})();

export const procStep = (code, i) => {
  const t = PROCESS_TEXT[code] || PROCESS_TEXT.es;
  return `<div class="pnow-num proc-l"><b>0${i + 1}</b><sup>/05</sup></div><h3 class="proc-l" dir="auto">${t.steps[i][0]}</h3><p class="proc-l" dir="auto">${t.steps[i][1]}</p>`;
};

export function processSection(code) {
  const t = PROCESS_TEXT[code] || PROCESS_TEXT.es;
  return {
    title: emLast(t.title),
    intro: t.intro,
    center: t.center,
    hint: t.hint,
    step: procStep(code, 0),
    svg: `
    <defs>
      <filter id="pn-shadow" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#0e1116" flood-opacity=".16"/></filter>
    </defs>
    <path class="proc-base" d="${procD}"/>
    <path class="proc-line-glow" d="${procD}"/>
    <path class="proc-line" d="${procD}"/>
    <path class="proc-trail-glow" d="${procD}"/>
    <path class="proc-trail" d="${procD}"/>
    ${PN.map(([x, y], i) => `<g class="pn" data-step="${i}" transform="translate(${x} ${y})"><circle class="pn-pulse" r="30"/><circle class="pn-ring" r="35"/><circle class="pn-bg" r="29" filter="url(#pn-shadow)"/><g class="pn-ico" transform="translate(-12 -12) scale(1.5)"><path d="${PROC_ICONS[i]}"/></g></g>`).join('')}
    <g class="proc-orb"><circle class="proc-orb-halo" r="30"/><g class="proc-orb-r"><circle class="proc-orb-wave" r="14"/><circle class="proc-orb-glass" r="11"/><circle class="proc-orb-edge" r="14.5"/></g><g class="proc-orb-c"><circle class="proc-orb-core" r="2.6"/><circle class="proc-orb-dot" r="1.2"/></g></g>`,
    // Etiquetas junto a cada paso: a la derecha si el paso está a la izquierda, y al revés
    chips: PN.map(([x, y], i) => {
      const left = x > 300;
      return `<button class="pchip${left ? ' is-left' : ''}" type="button" data-step="${i}" style="left:${(left ? x - 46 : x + 46) / 6}%;top:${y / 5.6}%"><em>0${i + 1}</em><span dir="auto">${t.steps[i][0]}</span></button>`;
    }).join(''),
    segs: t.steps.map((s, i) => `<button class="proc-seg" type="button" data-step="${i}" aria-label="${s[0]}"><span>0${i + 1}</span><i><b></b></i></button>`).join(''),
    list: `<span class="proc-track"></span><span class="proc-fill" id="proc-fill"></span><span class="proc-dot" id="proc-dot"></span>` +
      t.steps.map(([h, d], i) => `<article class="pm"><span class="pm-n">${procIco(i)}</span><small class="proc-k">${t.step} 0${i + 1}</small><h3 dir="auto">${h}</h3><p dir="auto">${d}</p></article>`).join(''),
  };
}

/* ---------- FAQ ---------- */
export function faq(code) {
  const t = FAQ_TEXT[code] || FAQ_TEXT.es;
  return {
    title: emLast(t.title),
    sub: `${t.sub}<small>${t.fast}</small>`,
    items: t.items.map(([q, a], i) => `
      <div class="faq-item" data-faq="${i}">
        <button class="faq-q" type="button" id="faq-q-${i}" aria-expanded="false" aria-controls="faq-a-${i}">
          <span class="faq-n">0${i + 1}</span><span class="faq-qt" dir="auto">${q}</span><span class="faq-ic">${FAQ_PLUS}</span>
        </button>
        <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
          <div class="faq-a-in">${FAQ_AV}<div class="faq-bubble"><span class="faq-typing" aria-hidden="true"><i></i><i></i><i></i></span>
            <p dir="auto">${a.split(' ').map(w => `<span>${w} </span>`).join('')}</p></div></div>
        </div>
      </div>`).join(''),
    // Datos estructurados para que Google muestre las preguntas
    schema: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.items.map(([q, a]) => ({ '@type': 'Question', name: stripTags(q), acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })) },
  };
}

/* ---------- Contacto: el examen ---------- */
export function finalSection(code) {
  const t = FINAL_TEXT[code] || FINAL_TEXT.es, [a, old, b, nw, c] = t.t;
  const words = s => s.split(/(\s+)/).map(w => (w.trim() ? `<span class="w">${w}</span>` : w)).join('');
  const slot = (k, type, ph, auto) => `<span class="slot" data-k="${k}">${k === 'falta'
    ? `<textarea id="f-${k}" name="${k}" rows="1" placeholder="${ph}" required aria-label="${t.l[2]}" spellcheck="false"></textarea>`
    : `<input id="f-${k}" name="${k}" type="${type}" placeholder="${ph}" autocomplete="${auto}" required aria-label="${t.l[['nombre', 'email'].indexOf(k)]}" spellcheck="false">`}<span class="slot-ok">${CHECK_SVG}</span></span>`;
  return {
    title: `${words(a)}<span class="w g-old">${old}</span>${words(b)}<span class="w g-new">${nw}</span>${c}`,
    line: `${t.l[0]} <span class="nw">${slot('nombre', 'text', t.ph[0], 'name')}.</span> ${t.l[1]} <span class="nw">${slot('email', 'email', t.ph[1], 'email')}.</span> ${t.l[2]} <span class="nw">${slot('falta', 'text', '', 'off')}.</span>`,
    // Sugerencias: los servicios, en el mismo orden que en el resto de la página
    ideas: SVC_ORDER.map(id => `<button type="button" data-id="${id}" aria-pressed="false">${svcName(id, code)}</button>`).join(''),
    send: `${t.send}<i>${SEND_SVG}</i>`,
    alt: `<span>${t.wa} <a href="${WA_URL}" target="_blank" rel="noopener" dir="ltr">${WA_NUMBER}</a></span><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`,
  };
}

/* ---------- Footer ---------- */
export function footer(code) {
  const t = FOOT_TEXT[code] || FOOT_TEXT.es, ui = I18N[code] || I18N.es;
  const link = (href, txt, ext) => `<li><a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${txt}</a></li>`;
  const nav = [['#casos', ui.casos], ['#servicios', ui.servicios], ['#testas', ui.testas], ['#proceso', ui.proceso], ['#faq', ui.faq],
    ...(BLOG_URL ? [[BLOG_URL, code === 'he' ? 'בלוג' : 'Blog']] : [])];
  return {
    pitch: `${t.pitch[0]}<em>${t.pitch[1]}</em>${t.pitch[2]}`,
    cta: ui.cta,
    cols: `
      <div class="foot-col"><h3>${t.nav}</h3><ul>${nav.map(([h, x]) => link(h, x, h === BLOG_URL)).join('')}</ul></div>
      <div class="foot-col"><h3>${ui.servicios}</h3><ul>${SVC_ORDER.map(id => link('#servicio-' + id, svcName(id, code))).join('')}</ul></div>
      <div class="foot-col"><h3>${t.offices}</h3>${(code === 'he' ? [...OFFICES, OFFICE_IL] : OFFICES).map((o, i) => `<div class="foot-office"><b>${o.city}<time data-tz="${o.tz}"></time></b><span dir="auto">${o.hq ? (TEAM_TEXT[code] || TEAM_TEXT.es).hq + ' · ' : ''}${t.c[i]}</span>${o.addr ? `<span dir="ltr">${o.addr}</span>` : ''}</div>`).join('')}</div>
      <div class="foot-col"><h3>${t.contact}</h3><ul>
        ${link(WA_URL, `WhatsApp&nbsp;<span dir="ltr">${WA_NUMBER}</span>`, true)}
        ${link('mailto:' + CONTACT_EMAIL, CONTACT_EMAIL)}
        ${link('https://www.instagram.com/agenciacontesta', 'Instagram', true)}
        ${link('https://www.linkedin.com/company/agencia-con-testa/', 'LinkedIn', true)}</ul></div>`,
    rights: `© ${new Date().getFullYear()} Contesta. ${t.rights}`,
    top: t.top,
  };
}

/* ---------- Idiomas ---------- */
export function langMenu(code) {
  return LANGS.map(([c, name]) =>
    `<li><a href="${langPath(c)}" hreflang="${c}" lang="${c}" aria-current="${c === code}"><bdi>${name}</bdi><small>${c.toUpperCase()}</small></a></li>`).join('');
}
export function menuLangs(code) {
  return LANGS.map(([c, name]) => `<a href="${langPath(c)}" hreflang="${c}" lang="${c}" title="${name}" aria-current="${c === code}">${c.toUpperCase()}</a>`).join('');
}
