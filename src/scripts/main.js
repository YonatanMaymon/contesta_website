// Movimiento e interacción de la página. El HTML ya llega armado desde el servidor en el idioma de la página;
// acá solo se agregan animaciones, el globo, el recorrido del proceso, el formulario, etc.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  I18N, ROTATION, SERVICES, TEAM, PROCESS_TEXT, PN, FINAL_TEXT, SVC_ORDER, CONTACT_EMAIL, WA_NUMBER,
} from '../data/content.js';
import { LAND_BITS } from '../data/land.js';
import { svcName, caseOpen as renderCaseOpen, procStep, WA_URL } from '../lib/render.js';

const $ = id => document.getElementById(id);

export function start() {
  gsap.registerPlugin(ScrollTrigger);
  const code = document.documentElement.lang || 'es';
  const rtl = code === 'he';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Mientras está la pantalla de carga, las animaciones de GSAP esperan
  const loaderDone = window.__loader || Promise.resolve();
  gsap.globalTimeline.pause();
  loaderDone.then(() => gsap.globalTimeline.resume());
  const narrow = matchMedia('(max-width: 860px)');
  const FORM_ENDPOINT = import.meta.env.PUBLIC_FORM_ENDPOINT || '';

  /* ---------- Titular: la palabra sube y cambia de idioma ---------- */
  (() => {
    const t = I18N[code];
    const word = document.querySelector('.rot-word');
    const swoosh = document.querySelector('.swoosh path');
    if (reduced || !word) return;
    const dir = rtl ? -1 : 1;
    const len = swoosh ? swoosh.getTotalLength() : 0;
    if (swoosh) gsap.set(swoosh, { strokeDasharray: len, strokeDashoffset: len, autoAlpha: 0 });
    const rotTl = gsap.timeline({ delay: 1.4 });
    [...ROTATION, t.word].forEach((w, i, arr) => {
      rotTl.call(() => { word.textContent = w; })
        .fromTo(word, { yPercent: 100 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .5, ease: 'power3.out' });
      if (i < arr.length - 1) rotTl.to(word, { yPercent: -100 * dir, opacity: 0, duration: .35, ease: 'power2.in' }, '+=.55');
    });
    // Cuando queda "testa", se dibuja el subrayado
    if (swoosh) rotTl.set(swoosh, { autoAlpha: 1 }, '+=.05').to(swoosh, { strokeDashoffset: 0, duration: .7, ease: 'power2.inOut' });
  })();

  /* ---------- Cabeza: ventanas en foco ---------- */
  const stage = $('stage');
  const brain = $('brain');
  const base = brain.querySelector('.brain-base');
  const wires = $('wires');
  let active = 0, hovering = false;
  const parts = [...brain.querySelectorAll('.focus')].map(f => {
    const i = +f.dataset.i;
    const label = stage.querySelector(`.label[data-i="${i}"]`);
    [f, label].forEach(n => {
      n.addEventListener('mouseenter', () => { hovering = true; setActive(i); });
      n.addEventListener('mouseleave', () => { hovering = false; });
      n.addEventListener('focus', () => setActive(i));
    });
    return { s: SERVICES[i], f, label, side: label.classList.contains('left') ? 'left' : 'right' };
  });

  // Desplazamiento actual de la cabeza (flotación + paralaje)
  const float = { x: 0, y: 0 };
  // Conector curvo: sale del borde de la ventana y llega suave a la etiqueta.
  // El punto de salida acompaña a la cabeza; la etiqueta queda fija.
  function drawWire(p) {
    if (!p.geo || !p.wire) return;
    const { sx, sy, lx, ly } = p.geo;
    const x0 = sx + float.x, y0 = sy + float.y;
    const mx = (x0 + lx) / 2;
    p.wire.setAttribute('d', `M${x0} ${y0}C${mx} ${y0} ${mx} ${ly} ${lx} ${ly}`);
  }

  const NS = 'http://www.w3.org/2000/svg';
  let pulse = null;
  function layout() {
    wires.textContent = '';
    if (narrow.matches) return;
    const st = stage.getBoundingClientRect();
    const br = brain.getBoundingClientRect();
    wires.setAttribute('viewBox', `0 0 ${st.width} ${st.height}`);
    // Las medidas se toman sin el desplazamiento de la flotación, que se suma después en cada frame
    const ox = float.x, oy = float.y;
    const bx = br.left - st.left - ox, by = br.top - st.top - oy;
    const gap = Math.min(96, (st.width - br.width) / 2 - 240);
    parts.forEach(p => {
      // Posición de la ventana sin su escala de animación (las ocultas están achicadas)
      const fl = bx + p.f.offsetLeft, ft = by + p.f.offsetTop;
      const left = p.side === 'left';
      const sx = left ? fl : fl + p.f.offsetWidth;
      const sy = ft + p.f.offsetHeight / 2;
      const lx = left ? bx - gap : bx + br.width + gap;
      const ly = by + br.height * p.s.ly / 100;
      p.geo = { sx, sy, lx, ly };
      p.wire = document.createElementNS(NS, 'path');
      p.wire.setAttribute('class', 'wire');
      drawWire(p);
      p.end = document.createElementNS(NS, 'circle');
      p.end.setAttribute('class', 'wire-end');
      p.end.setAttribute('cx', lx);
      p.end.setAttribute('cy', ly);
      p.end.setAttribute('r', 3.5);
      wires.append(p.wire, p.end);
      p.label.style.left = `${lx + (left ? -8 : 8)}px`;
      p.label.style.top = `${ly}px`;
    });
    // Pulso que viaja por el conector activo
    pulse = document.createElementNS(NS, 'circle');
    pulse.setAttribute('class', 'pulse');
    pulse.setAttribute('r', 3);
    pulse.setAttribute('opacity', 0);
    wires.append(pulse);
    applyStep();
    setActive(active);
  }

  function setActive(i) {
    active = i;
    parts.forEach((p, j) => [p.f, p.label, p.wire, p.end].forEach(n => n && n.classList.toggle('is-on', j === i && isLoaded(j))));
  }
  // Recorre solo los servicios ya visibles, mientras nadie interactúa
  if (!reduced) setInterval(() => {
    if (hovering) return;
    const loaded = SERVICES.map((_, j) => j).filter(isLoaded);
    if (!loaded.length) return;
    const k = loaded.indexOf(active);
    setActive(loaded[(k + 1) % loaded.length]);
  }, 2200);

  /* ---------- Los servicios aparecen de a pares al entrar (el scroll no se fija) ---------- */
  // Pares (uno de cada lado): cada servicio de la izquierda con el de la misma altura a la derecha
  const PAIRS = [[0, 5], [1, 6], [2, 7], [3, 8], [4, 9]];
  let step = reduced ? PAIRS.length : 0;
  function isLoaded(j) { return PAIRS.slice(0, step).some(pair => pair.includes(j)); }
  function applyStep() {
    parts.forEach((p, j) => [p.f, p.label, p.wire, p.end].forEach(n => n && n.classList.toggle('is-loaded', isLoaded(j))));
  }
  function goStep(n) {
    if (n === step) return;
    step = n;
    applyStep();
    // Al aparecer un par nuevo, se enciende el primero de ese par
    setActive(PAIRS[n - 1][0]);
  }

  /* ---------- Pasarelas de marcas y sellos ---------- */
  // Avance manual por cuadro: permite ir para los dos lados, frenar y arrastrar sin cortes.
  // loop: segundos por vuelta completa. dir: sentido (en hebreo, al revés).
  const wrap01 = gsap.utils.wrap(0, 1);
  function setupMarquee(track, loop, dir) {
    const el = track.parentElement;
    const baseDir = dir;
    let dragging = false, moved = false, lastX = 0, vel = 0;
    const m = { prog: 0, speed: dir };
    if (!reduced) {
      gsap.ticker.add((t, dt) => {
        if (!dragging) m.prog = wrap01(m.prog + m.speed * (dt / 1000) / loop);
        gsap.set(track, { xPercent: -50 * m.prog });
      });
    }
    // Al pasar el mouse frena suave
    el.addEventListener('mouseenter', () => !dragging && gsap.to(m, { speed: baseDir * .25, duration: .6, overwrite: true }));
    el.addEventListener('mouseleave', () => !dragging && gsap.to(m, { speed: baseDir, duration: .6, overwrite: true }));

    // Arrastrable: se puede mover con el mouse o el dedo, y al soltar sigue con inercia.
    // Captura recién al moverse, para que un toque sobre un link siga siendo un clic.
    el.addEventListener('pointerdown', e => {
      if (reduced) return;
      dragging = true; moved = false; lastX = e.clientX; vel = 0;
      gsap.killTweensOf(m);
    });
    el.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      if (!moved) {
        if (Math.abs(dx) < 4) return;
        moved = true;
        el.classList.add('is-dragging');
        el.setPointerCapture(e.pointerId);
      }
      lastX = e.clientX;
      vel = dx;
      m.prog = wrap01(m.prog - dx / (track.offsetWidth / 2));
    });
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      // Impulso según la velocidad del arrastre, que después vuelve al ritmo normal
      m.speed = gsap.utils.clamp(-16, 16, -vel / 2) || baseDir;
      gsap.to(m, { speed: el.matches(':hover') ? baseDir * .25 : baseDir, duration: 1.8, ease: 'power3.out' });
    };
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('dragstart', e => e.preventDefault()); // la insignia de Sortlist no trae draggable="false"
  }
  setupMarquee($('marquee-track'), 48, rtl ? -1 : 1);
  const certTrack = $('cert-track');
  // El script de Sortlist puede llenar una sola insignia: cuando aparece, se copia a las demás
  const slBadges = [...certTrack.querySelectorAll('.sortlist-badge')];
  const slObserver = new MutationObserver(() => {
    const done = slBadges.find(n => n.childNodes.length);
    if (!done) return;
    slObserver.disconnect();
    slBadges.forEach(n => { if (!n.childNodes.length) n.innerHTML = done.innerHTML; });
  });
  slBadges.forEach(n => slObserver.observe(n, { childList: true }));
  setupMarquee(certTrack, 36, rtl ? -1 : 1);

  /* ---------- Casos ---------- */
  const casesTrack = $('cases-track');
  const countedCases = new Set();
  // Cuenta el número de una tarjeta la primera vez que aparece
  function countCase(i) {
    if (countedCases.has(i) || reduced) return;
    countedCases.add(i);
    const el = casesTrack.querySelector(`[data-case="${i}"] .cnt`);
    if (!el) return;
    const n = { v: 0 };
    gsap.to(n, { v: +el.dataset.to, duration: 1.4, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(n.v)) });
  }
  // Las tarjetas suben al entrar en pantalla; el scroll sigue normal
  let caseTriggers = [];
  function setupCases() {
    caseTriggers.forEach(t => t.kill());
    caseTriggers = [];
    if (reduced) return;
    caseTriggers = [...casesTrack.children].map((card, i) => ScrollTrigger.create({
      trigger: card, start: 'top 88%', once: true,
      onEnter: () => {
        countCase(i);
        gsap.from(card, { y: 48, opacity: 0, duration: .9, delay: i * .08, ease: 'expo.out', clearProps: 'transform,opacity' });
      },
    }));
  }

  /* ---------- Caso expandido: se abre desde la tarjeta, sin página aparte ---------- */
  const caseOpen = $('case-open'), caseVeil = $('case-veil');
  const coScroll = caseOpen.querySelector('.co-scroll');
  let openIdx = -1, openBusy = false, openReturn = null;
  const caseTotal = () => casesTrack.children.length;
  const renderOpen = i => { coScroll.innerHTML = renderCaseOpen(i, code); };
  // El panel ocupa su lugar final y se recorta con la forma de la tarjeta: al abrir, el recorte se suelta
  function cardClip(card) {
    const r = card.getBoundingClientRect(), t = caseOpen.getBoundingClientRect();
    const rad = parseFloat(getComputedStyle(card).borderRadius) || 24;
    return `inset(${r.top - t.top}px ${t.right - r.right}px ${t.bottom - r.bottom}px ${r.left - t.left}px round ${rad}px)`;
  }
  const openParts = () => [...coScroll.children];
  function countOpen() {
    const el = coScroll.querySelector('.cnt');
    if (!el || reduced) return;
    const n = { v: 0 }, to = +el.textContent;
    gsap.to(n, { v: to, duration: 1.3, ease: 'power2.out', delay: .35, onUpdate: () => (el.textContent = Math.round(n.v)) });
  }
  function lockPage(on) {
    const sb = innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.toggle('case-locked', on);
    document.body.style.paddingRight = on && sb > 0 ? sb + 'px' : '';
  }
  function openCase(i) {
    if (openIdx >= 0 || openBusy) return;
    const card = casesTrack.children[i];
    if (!card) return;
    openIdx = i; openBusy = true; openReturn = document.activeElement;
    renderOpen(i);
    lockPage(true);
    coScroll.scrollTop = 0;
    gsap.set(caseOpen, { visibility: 'visible', opacity: 1, clipPath: reduced ? 'none' : cardClip(card) });
    const done = () => { openBusy = false; gsap.set(caseOpen, { clearProps: 'clipPath' }); coScroll.querySelector('.co-close').focus({ preventScroll: true }); };
    if (reduced) {
      gsap.timeline({ onComplete: done }).to(caseVeil, { autoAlpha: 1, duration: .2 }, 0).fromTo(caseOpen, { opacity: 0 }, { opacity: 1, duration: .2 }, 0);
      return;
    }
    gsap.timeline({ onComplete: done })
      .to(caseVeil, { autoAlpha: 1, duration: .5, ease: 'power2.out' }, 0)
      .call(() => (card.style.opacity = 0), null, .05)
      .to(caseOpen, { clipPath: 'inset(0px 0px 0px 0px round 30px)', duration: .9, ease: 'expo.inOut' }, 0)
      .from(coScroll.querySelector('.co-media img'), { scale: 1.25, duration: 1.4, ease: 'power3.out' }, .1)
      .from(openParts(), { y: 36, opacity: 0, duration: .7, ease: 'power3.out', stagger: .07 }, .42);
    countOpen();
  }
  function closeCase(instant) {
    if (openIdx < 0) return;
    const card = casesTrack.children[openIdx];
    const finish = () => {
      gsap.set(caseOpen, { visibility: 'hidden', clearProps: 'clipPath,opacity' });
      gsap.set(caseVeil, { autoAlpha: 0 });
      if (card) card.style.opacity = '';
      lockPage(false);
      openIdx = -1; openBusy = false;
      if (!instant && openReturn && openReturn.focus) openReturn.focus({ preventScroll: true });
    };
    gsap.killTweensOf([caseOpen, caseVeil]);
    if (instant || reduced || !card) { finish(); return; }
    openBusy = true;
    gsap.timeline({ onComplete: finish })
      .to(openParts(), { opacity: 0, duration: .25, ease: 'power1.out' }, 0)
      .fromTo(caseOpen, { clipPath: 'inset(0px 0px 0px 0px round 30px)' }, { clipPath: cardClip(card), duration: .75, ease: 'expo.inOut' }, .05)
      .to(caseVeil, { autoAlpha: 0, duration: .5, ease: 'power2.inOut' }, .3);
  }
  function nextCase() {
    if (openBusy) return;
    openBusy = true;
    const n = (openIdx + 1) % caseTotal();
    gsap.to(openParts(), { opacity: 0, y: -16, duration: .28, ease: 'power2.in', stagger: .03, onComplete: () => {
      casesTrack.children[openIdx].style.opacity = '';
      casesTrack.children[n].style.opacity = 0;
      openIdx = n; renderOpen(n); coScroll.scrollTop = 0;
      gsap.from(openParts(), { y: 30, opacity: 0, duration: .6, ease: 'power3.out', stagger: .06, onComplete: () => (openBusy = false) });
      gsap.from(coScroll.querySelector('.co-media img'), { scale: 1.15, duration: 1.2, ease: 'power3.out' });
      countOpen();
    } });
  }
  casesTrack.addEventListener('click', e => {
    const c = e.target.closest('.case');
    if (c) openCase([...casesTrack.children].indexOf(c));
  });
  casesTrack.addEventListener('keydown', e => {
    const c = e.target.closest('.case');
    if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openCase([...casesTrack.children].indexOf(c)); }
  });
  caseOpen.addEventListener('click', e => {
    if (e.target.closest('.co-close')) return closeCase();
    if (e.target.closest('.co-next')) return nextCase();
    // Etiquetas y "Hablemos": cierra al instante y deja que el link haga lo suyo
    if (e.target.closest('a[href^="#"]')) closeCase(true);
  });
  caseVeil.addEventListener('click', () => closeCase());
  document.addEventListener('keydown', e => {
    if (openIdx < 0) return;
    if (e.key === 'Escape') closeCase();
    if (e.key === 'Tab') { // el foco no se escapa del panel
      const f = [...caseOpen.querySelectorAll('a, button')];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- Servicios ---------- */
  const svcList = $('svc-list');
  function setService(id) {
    svcList.querySelectorAll('.svc-item').forEach(it => {
      const on = it.id === 'servicio-' + id;
      it.classList.toggle('is-active', on);
      it.querySelector('.svc-row').setAttribute('aria-expanded', on);
    });
  }
  const rowId = el => { const r = el.closest('.svc-row'); return r && r.parentElement.id.slice(9); };
  // Con mouse alcanza con pasar por encima; con el dedo o el teclado, al tocar o enfocar
  svcList.addEventListener('pointerover', e => { const id = e.pointerType === 'mouse' && rowId(e.target); if (id) setService(id); });
  svcList.addEventListener('click', e => { const id = rowId(e.target); if (id) setService(id); });
  svcList.addEventListener('focusin', e => { const id = rowId(e.target); if (id) setService(id); });
  // Los links a un servicio (#servicio-...) bajan al servicio y lo dejan abierto
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#servicio-"]');
    if (!a) return;
    const item = document.getElementById(a.getAttribute('href').slice(1));
    if (!item) return;
    e.preventDefault();
    setService(item.id.slice(9));
    (narrow.matches ? item : svcList).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: narrow.matches ? 'start' : 'center' });
  });
  function revealServices() {
    if (reduced) return;
    gsap.from('.svc-head > *', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: '#servicios', start: 'top 78%' } });
    gsap.from('#svc-list .svc-row', { y: 40, opacity: 0, duration: .8, ease: 'power3.out', stagger: .06, clearProps: 'transform,opacity', scrollTrigger: { trigger: '#svc-list', start: 'top 82%' } });
  }

  /* ---------- Las testas: globo que se gira con el mouse o el dedo ---------- */
  const RAD = Math.PI / 180;
  // 30.000 puntos repartidos parejo sobre la esfera (espiral de Fibonacci); cada bit dice si cae en tierra
  const dots = (() => {
    const N = 30000, out = [], ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      if (!((parseInt(LAND_BITS[i >> 2], 16) >> (3 - (i & 3))) & 1)) continue;
      const lat = Math.asin(1 - (i + .5) / N * 2);
      const lon = i * ga;
      out.push(Math.cos(lat), Math.sin(lat), Math.cos(lon), Math.sin(lon));
    }
    return new Float32Array(out);
  })();

  const globeEl = $('team-globe');
  const globeCv = $('globe');
  const gctx = globeCv.getContext('2d');
  const rot = { lam: -38 * RAD, phi: 24 * RAD };   // centro de la vista: Atlántico, un poco al norte
  let gW = 0, gR = 0, gDpr = 1, activeMember = -1;
  const pinEls = [...$('globe-pins').querySelectorAll('.gp')];
  pinEls.forEach(el => (el._a = { v: reduced ? 1 : 0 }));

  function project(cosLat, sinLat, cosLon, sinLon, alt = 1) {
    const cl = Math.cos(rot.lam), sl = Math.sin(rot.lam), cp = Math.cos(rot.phi), sp = Math.sin(rot.phi);
    const cd = cosLon * cl + sinLon * sl, sd = sinLon * cl - cosLon * sl;
    return { x: gW / 2 + gR * alt * cosLat * sd, y: gW / 2 - gR * alt * (cp * sinLat - sp * cosLat * cd), z: sp * sinLat + cp * cosLat * cd };
  }
  const projLL = (lon, lat, alt) => project(Math.cos(lat * RAD), Math.sin(lat * RAD), Math.cos(lon * RAD), Math.sin(lon * RAD), alt);

  function drawGlobe(time) {
    const c = gctx, cx = gW / 2, R = gR;
    c.setTransform(gDpr, 0, 0, gDpr, 0, 0);
    c.clearRect(0, 0, gW, gW);
    // Cara de atrás, apenas visible a través del globo
    const cl = Math.cos(rot.lam), sl = Math.sin(rot.lam), cp = Math.cos(rot.phi), sp = Math.sin(rot.phi);
    const back = new Path2D(), front = [new Path2D(), new Path2D(), new Path2D(), new Path2D()], night = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    const k = R / 300;
    // Posición del sol ahora mismo: la tierra de día se ve clara y la de noche, apagada
    const now = new Date(), doy = (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - Date.UTC(now.getUTCFullYear(), 0, 0)) / 864e5;
    const sunLon = (12 - (now.getUTCHours() + now.getUTCMinutes() / 60)) * 15 * RAD, sunLat = -23.44 * Math.cos(2 * Math.PI * (doy + 10) / 365) * RAD;
    const sx = Math.cos(sunLat) * Math.cos(sunLon), sy = Math.cos(sunLat) * Math.sin(sunLon), sz = Math.sin(sunLat);
    for (let i = 0; i < dots.length; i += 4) {
      const cosLat = dots[i], sinLat = dots[i + 1], cd = dots[i + 2] * cl + dots[i + 3] * sl, sd = dots[i + 3] * cl - dots[i + 2] * sl;
      const x = cx + R * cosLat * sd, y = cx - R * (cp * sinLat - sp * cosLat * cd), z = sp * sinLat + cp * cosLat * cd;
      if (z < 0) { back.rect(x - .6 * k, y - .6 * k, 1.2 * k, 1.2 * k); continue; }
      const r = (.5 + .85 * z) * k, b = Math.min(3, (z * 4) | 0);
      const set = cosLat * (dots[i + 2] * sx + dots[i + 3] * sy) + sinLat * sz > 0 ? front : night;
      set[b].moveTo(x + r, y); set[b].arc(x, y, r, 0, 6.2832);
    }
    c.fillStyle = 'rgba(160,190,220,.12)'; c.fill(back);
    // Esfera
    c.fillStyle = '#123a53'; c.beginPath(); c.arc(cx, cx, R, 0, 7); c.fill();
    c.strokeStyle = 'rgba(120,200,240,.28)'; c.lineWidth = 1; c.stroke();
    // Meridianos y paralelos muy tenues
    c.strokeStyle = 'rgba(255,255,255,.045)'; c.beginPath();
    for (let lon = -180; lon < 180; lon += 30) {
      let pen = false;
      for (let lat = -90; lat <= 90; lat += 6) { const p = projLL(lon, lat); if (p.z > 0) { pen ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y); pen = true; } else pen = false; }
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      let pen = false;
      for (let lon = -180; lon <= 180; lon += 6) { const p = projLL(lon, lat); if (p.z > 0) { pen ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y); pen = true; } else pen = false; }
    }
    c.stroke();
    // Tierra
    ['rgba(244,238,226,.3)', 'rgba(244,238,226,.5)', 'rgba(244,238,226,.72)', 'rgba(244,238,226,.95)'].forEach((col, b) => { c.fillStyle = col; c.fill(front[b]); });
    ['rgba(70,150,195,.22)', 'rgba(70,150,195,.36)', 'rgba(70,150,195,.5)', 'rgba(70,150,195,.62)'].forEach((col, b) => { c.fillStyle = col; c.fill(night[b]); });
    // Integrantes: punto en la superficie y línea hasta la cara
    const pulse = (time * .0012) % 1;
    TEAM.forEach((m, i) => {
      const p = projLL(m.lon, m.lat), el = pinEls[i];
      const vis = gsap.utils.clamp(0, 1, (p.z - .05) / .25);
      const ox = m.dx * R * .028, oy = m.dy * R * .028;
      if (vis > 0) {
        c.strokeStyle = `rgba(120,200,240,${.55 * vis})`; c.lineWidth = 1;
        c.beginPath(); c.moveTo(p.x, p.y); c.lineTo(p.x + ox, p.y + oy); c.stroke();
        c.fillStyle = `rgba(3,147,208,${vis})`; c.beginPath(); c.arc(p.x, p.y, 3.2 * Math.max(.8, k), 0, 7); c.fill();
        c.strokeStyle = `rgba(3,147,208,${(1 - pulse) * .7 * vis})`; c.beginPath(); c.arc(p.x, p.y, (3 + pulse * 12) * Math.max(.8, k), 0, 7); c.stroke();
      }
      if (el) {
        el.style.transform = `translate(${p.x + ox}px, ${p.y + oy}px) translate(-50%, -30%) scale(${.72 + .28 * vis})`;
        el.style.opacity = vis * el._a.v;
        el.style.zIndex = Math.round(p.z * 100) + (activeSet.includes(i) ? 200 : 100);
        el.style.pointerEvents = vis > .5 ? 'auto' : 'none';
      }
    });
  }

  function sizeGlobe() {
    gW = globeEl.clientWidth; if (!gW) return;
    gDpr = Math.min(2, devicePixelRatio || 1);
    globeCv.width = Math.round(gW * gDpr); globeCv.height = Math.round(gW * gDpr);
    gR = gW * (gW < 520 ? .44 : .41);
    drawGlobe(performance.now());
  }

  // Acepta una persona o varias (una sede con más de un integrante)
  let activeSet = [];
  function setActiveMember(i) {
    activeSet = [].concat(i).filter(k => k >= 0);
    activeMember = activeSet.length ? activeSet[activeSet.length - 1] : -1;
    pinEls.forEach((el, k) => el.classList.toggle('is-active', activeSet.includes(k)));
  }
  // Gira el globo hasta dejar un punto al frente (por el camino más corto)
  let globeTween = null;
  function spinTo(lon, lat, dur = 1.6) {
    let d = (lon * RAD - rot.lam) % (2 * Math.PI);
    if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI;
    globeTween && globeTween.kill();
    const phi = gsap.utils.clamp(-30, 45, lat) * RAD;
    if (reduced) { rot.lam += d; rot.phi = phi; drawGlobe(performance.now()); return; }
    globeTween = gsap.to(rot, { lam: rot.lam + d, phi, duration: dur, ease: 'power3.inOut' });
  }
  function focusMember(i, user) {
    const m = TEAM[i];
    setActiveMember(i);
    spinTo(m.lon, m.lat);
    if (user) pauseTour();
  }
  // Recorrido automático por el equipo cuando nadie toca el globo
  let tourIdx = -1, tourCall = null, tourOn = false;
  function nextTour() {
    if (!tourOn) return;
    tourIdx = (tourIdx + 1) % TEAM.length;
    focusMember(tourIdx);
    tourCall = gsap.delayedCall(3.6, nextTour);
  }
  function startTour(delay = 0) {
    if (reduced) return;
    tourCall && tourCall.kill();
    tourOn = true;
    tourCall = gsap.delayedCall(delay, nextTour);
  }
  function pauseTour() {
    tourCall && tourCall.kill();
    tourOn = false;
    tourCall = gsap.delayedCall(7, () => { tourIdx = Math.max(-1, activeMember); startTour(); });
  }

  // Arrastre con inercia (en celular solo horizontal: el scroll vertical de la página sigue andando)
  let drag = null, spinV = 0;
  globeEl.addEventListener('pointerdown', e => {
    if (e.target.closest('.gp')) return;
    drag = { x: e.clientX, y: e.clientY, t: performance.now(), touch: e.pointerType !== 'mouse' };
    spinV = 0; globeTween && globeTween.kill(); pauseTour();
    globeEl.classList.add('is-dragging', 'was-dragged');
    globeEl.setPointerCapture && globeEl.setPointerCapture(e.pointerId);
  });
  globeEl.addEventListener('pointermove', e => {
    if (!drag) return;
    const now = performance.now(), dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    rot.lam -= dx / gR;
    if (!drag.touch) rot.phi = gsap.utils.clamp(-60 * RAD, 60 * RAD, rot.phi + dy / gR);
    spinV = -dx / gR / Math.max(8, now - drag.t) * 16;
    drag.x = e.clientX; drag.y = e.clientY; drag.t = now;
    pauseTour();
  });
  const endGlobeDrag = () => { if (!drag) return; drag = null; globeEl.classList.remove('is-dragging'); };
  globeEl.addEventListener('pointerup', endGlobeDrag);
  globeEl.addEventListener('pointercancel', endGlobeDrag);
  globeEl.addEventListener('click', e => { const p = e.target.closest('.gp'); if (p) focusMember(+p.dataset.member, true); });

  // Solo dibuja mientras la sección está en pantalla
  let globeOn = false, lastT = 0;
  function globeTick() {
    const now = performance.now(), dt = Math.min(64, now - (lastT || now)); lastT = now;
    if (!drag) {
      if (Math.abs(spinV) > .00005) { rot.lam += spinV * dt / 16; spinV *= Math.pow(.94, dt / 16); }
      else if (!globeTween || !globeTween.isActive()) rot.lam -= .00005 * dt;   // deriva lenta
    }
    drawGlobe(now);
  }
  function globeRun(on) {
    if (on === globeOn) return;
    globeOn = on; lastT = 0;
    on ? gsap.ticker.add(globeTick) : gsap.ticker.remove(globeTick);
  }
  new ResizeObserver(sizeGlobe).observe(globeEl);
  new IntersectionObserver(es => globeRun(es[0].isIntersecting && !reduced), { rootMargin: '120px' }).observe(globeEl);

  // Saludos gigantes de fondo, en los idiomas del equipo
  if (!reduced) gsap.to('#team-hello', { xPercent: -50, duration: 46, ease: 'none', repeat: -1 });

  // Entrada simple: textos y globo suben; después aparecen las caras, cuenta el 13 y arranca el recorrido
  function revealTeam() {
    if (reduced) { pinEls.forEach(el => (el._a.v = 1)); return; }
    $('team-cnt').textContent = '0';
    const st = { trigger: '#testas', start: 'top 70%', once: true };
    gsap.from('.team-head > *, .team-stat', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .08, scrollTrigger: st });
    gsap.from(globeEl, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: st });
    ScrollTrigger.create({ trigger: globeEl, start: 'top 70%', once: true, onEnter: () => {
      pinEls.forEach((el, i) => gsap.to(el._a, { v: 1, duration: .6, delay: .3 + i * .07, ease: 'power2.out' }));
      const cnt = $('team-cnt'), n = { v: 0 };
      gsap.to(n, { v: 13, duration: 1.6, ease: 'power2.out', onUpdate: () => (cnt.textContent = Math.round(n.v)) });
      startTour(1.8);
    } });
  }

  /* ---------- Cómo trabajamos ---------- */
  const procSvg = $('proc-svg');
  const procLine = procSvg.querySelector('.proc-line'), procGlowLine = procSvg.querySelector('.proc-line-glow');
  const procTrails = [...procSvg.querySelectorAll('.proc-trail, .proc-trail-glow')];
  const procOrb = procSvg.querySelector('.proc-orb');
  const procOrbR = procOrb.querySelector('.proc-orb-r'), procOrbC = procOrb.querySelector('.proc-orb-c'), procOrbH = procOrb.querySelector('.proc-orb-halo');
  const procOrbGlass = procOrb.querySelector('.proc-orb-glass');
  const procLen = procLine.getTotalLength();
  const PROC_TRAIL = 120;
  // Dónde cae cada paso sobre el trazo (fracción del largo total)
  const procAt = PN.map(([x, y]) => {
    let best = 0, bd = 1e9;
    for (let l = 0; l <= procLen; l += 2) { const p = procLine.getPointAtLength(l); const d = (p.x - x) ** 2 + (p.y - y) ** 2; if (d < bd) { bd = d; best = l; } }
    return best / procLen;
  });
  [procLine, procGlowLine].forEach(p => { p.style.strokeDasharray = procLen; p.style.strokeDashoffset = procLen; });
  procTrails.forEach(p => { p.style.strokeDasharray = `${PROC_TRAIL} ${procLen * 2}`; });
  const procNodes = [...procSvg.querySelectorAll('.pn')];
  const procCard = $('proc-card');
  const procChips = [...$('proc-chips').querySelectorAll('.pchip')];
  const procSegs = [...$('proc-segs').querySelectorAll('.proc-seg')];
  let procCur = 0, procST = null;
  const PROC_END = .9;   // el recorrido llega al paso 05 un poco antes del final, para que se lea

  function procReached(p) {
    const f = Math.min(1, p / PROC_END);
    let r = -1; procAt.forEach((a, i) => { if (f >= a - .004) r = i; });
    return r;
  }
  // Cambia el bloque grande (paso actual) con una transición de líneas
  function setProcStep(i, instant) {
    if (i === procCur) return;
    const el = $('proc-step');
    const html = procStep(code, i);
    const dir = i > procCur ? 1 : -1;
    procCur = i;
    $('proc-count').textContent = '0' + Math.min(5, i + 1);
    if (instant || reduced) { el.innerHTML = html; return; }
    gsap.to(el.querySelectorAll('.proc-l'), { y: -34 * dir, opacity: 0, duration: .22, ease: 'power2.in', stagger: .03, overwrite: true,
      onComplete: () => {
        el.innerHTML = html;
        gsap.fromTo(el.querySelectorAll('.proc-l'), { y: 60 * dir, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'expo.out', stagger: .06 });
      } });
  }
  function paintProcess(p, instant) {
    const f = Math.min(1, p / PROC_END), L = procLen * f;
    procLine.style.strokeDashoffset = procLen - L;
    procGlowLine.style.strokeDashoffset = procLen - L;
    procTrails.forEach(t => { t.style.strokeDashoffset = PROC_TRAIL - L; t.style.opacity = f > .002 && f < .999 ? 1 : 0; });
    const pt = procLine.getPointAtLength(Math.max(.01, L));
    procOrb.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
    // Al llegar a un paso, el aro crece y lo rodea por fuera; el centro desaparece para no tapar el ícono
    const near = Math.min(...PN.map(([x, y]) => Math.hypot(pt.x - x, pt.y - y)));
    const k = gsap.utils.clamp(0, 1, 1 - (near - 6) / 46), ke = k * k * (3 - 2 * k);
    procOrbR.setAttribute('transform', `scale(${1 + ke * 2.55})`);
    procOrbC.style.opacity = 1 - ke;
    procOrbGlass.style.fillOpacity = 1 - ke;
    procOrbH.setAttribute('transform', `scale(${1 + ke * .9})`);
    procOrb.style.opacity = f >= .999 ? 0 : 1;
    const r = procReached(p);
    procNodes.forEach((n, i) => { n.classList.toggle('is-on', i <= r); n.classList.toggle('is-cur', i === r); });
    procChips.forEach((n, i) => { n.classList.toggle('is-on', i <= r); n.classList.toggle('is-cur', i === r); });
    // Cada tramo de la barra se llena entre su paso y el siguiente
    procSegs.forEach((s, i) => {
      const a = i === 0 ? 0 : procAt[i - 1], b = procAt[i];
      s.querySelector('b').style.transform = `scaleX(${gsap.utils.clamp(0, 1, (f - a) / (b - a))})`;
      s.classList.toggle('is-on', i <= r); s.classList.toggle('is-cur', i === r);
    });
    setProcStep(Math.max(0, r), instant);
  }

  const PROC_DESKTOP = '(min-width: 981px)';
  function setupProcess() {
    procST && procST.kill(); procST = null;
    if (reduced || !matchMedia(PROC_DESKTOP).matches) { setupProcessMobile(); if (reduced) paintProcess(1, true); return; }
    procST = ScrollTrigger.create({
      trigger: '#proceso', start: 'top top', end: () => '+=' + innerHeight * 2.2,
      pin: '#proc-pin', scrub: .3, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: self => paintProcess(self.progress),
    });
    // Entrada: la tarjeta sube girando un poco y los textos llegan escalonados
    gsap.from('#proc-card-wrap', { y: 110, scale: .94, opacity: 0, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: '#proceso', start: 'top 75%', once: true } });
    gsap.from('.proc-eyebrow, .proc-side h2, .proc-intro, .proc-human, .proc-now, .proc-segs', { y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08,
      scrollTrigger: { trigger: '#proceso', start: 'top 75%', once: true } });
    paintProcess(0, true);
  }
  // Clic en un paso (nodo, etiqueta o tramo de la barra): baja hasta ese punto del recorrido
  $('proceso').addEventListener('click', e => {
    const n = e.target.closest('[data-step]');
    if (!n || !procST) return;
    const p = procAt[+n.dataset.step] * PROC_END;
    scrollTo({ top: procST.start + (procST.end - procST.start) * p + 2, behavior: reduced ? 'auto' : 'smooth' });
  });
  // La tarjeta se inclina apenas siguiendo el mouse
  if (!reduced && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const rx = gsap.quickTo(procCard, 'rotationX', { duration: .9, ease: 'power3' }), ry = gsap.quickTo(procCard, 'rotationY', { duration: .9, ease: 'power3' });
    $('proc-pin').addEventListener('mousemove', e => {
      if (!procST || !procST.isActive) return;
      const r = procCard.getBoundingClientRect();
      rx(gsap.utils.clamp(-1, 1, (e.clientY - r.top - r.height / 2) / r.height) * -6);
      ry(gsap.utils.clamp(-1, 1, (e.clientX - r.left - r.width / 2) / r.width) * 8);
    });
    $('proc-pin').addEventListener('mouseleave', () => { rx(0); ry(0); });
  }

  // Celular: la línea se llena con el scroll y cada paso se enciende al alcanzarlo
  let procMobileST = [];
  function setupProcessMobile() {
    procMobileST.forEach(t => t.kill()); procMobileST = [];
    if (matchMedia(PROC_DESKTOP).matches) return;
    const list = $('proc-list'), fill = $('proc-fill'), dot = $('proc-dot');
    const items = [...list.querySelectorAll('.pm')];
    if (reduced) { items.forEach(i => i.classList.add('is-on')); fill.style.transform = 'scaleY(1)'; return; }
    procMobileST.push(ScrollTrigger.create({
      trigger: list, start: 'top 62%', end: 'bottom 62%', scrub: .5,
      onUpdate: self => {
        fill.style.transform = `scaleY(${self.progress})`;
        const h = list.offsetHeight - 52;
        dot.style.transform = `translateY(${self.progress * h}px)`;
        items.forEach(it => it.classList.toggle('is-on', it.offsetTop <= self.progress * h + 16));
      },
    }));
  }

  /* ---------- FAQ ---------- */
  const faqList = $('faq-list');
  let faqOpen = -1;
  // Abre una pregunta (y cierra la anterior); la respuesta llega como un mensaje: escribiendo… y después palabra por palabra
  function toggleFaq(i, instant) {
    const items = [...faqList.children];
    const prev = faqOpen;
    faqOpen = prev === i ? -1 : i;
    items.forEach((it, k) => {
      const open = k === faqOpen, a = it.querySelector('.faq-a');
      it.classList.toggle('is-open', open);
      it.querySelector('.faq-q').setAttribute('aria-expanded', open);
      if (reduced || instant) { a.style.height = open ? 'auto' : '0px'; return; }
      if (open) {
        const bubble = it.querySelector('.faq-bubble'), words = it.querySelectorAll('.faq-bubble p span');
        gsap.killTweensOf([a, words]);
        bubble.classList.add('is-typing');
        gsap.to(a, { height: 'auto', duration: .6, ease: 'power3.inOut' });
        gsap.fromTo(it.querySelector('.faq-a-in'), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .5, delay: .15, ease: 'power3.out' });
        gsap.delayedCall(.75, () => {
          if (faqOpen !== k) return;
          bubble.classList.remove('is-typing');
          gsap.fromTo(words, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out', stagger: .025 });
        });
      } else if (k === prev) {
        gsap.to(a, { height: 0, duration: .5, ease: 'power3.inOut' });
      }
    });
  }
  faqList.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (q) toggleFaq(+q.closest('.faq-item').dataset.faq);
  });
  // Entrada: las preguntas suben escalonadas y la primera se abre sola
  function revealFaq() {
    if (reduced) { toggleFaq(0, true); return; }
    gsap.from('.faq-side > *', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .08, scrollTrigger: { trigger: '#faq', start: 'top 75%', once: true } });
    gsap.from('#faq-list > .faq-item', { y: 60, opacity: 0, duration: .9, ease: 'expo.out', stagger: .08, clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#faq-list', start: 'top 80%', once: true, onEnter: () => gsap.delayedCall(.7, () => { if (faqOpen < 0) toggleFaq(0); }) } });
  }

  /* ---------- Contacto: el examen ---------- */
  const t = FINAL_TEXT[code] || FINAL_TEXT.es;
  const convo = $('convo');
  const fFalta = $('f-falta');
  // "A mi marca le falta": cada píldora se suma a la frase y, tocada de nuevo, se saca.
  let picks = [], pickedText = '';
  const pickPhrase = () => {
    const names = picks.map(p => SVC_ORDER.includes(p) ? svcName(p, code) : p);
    try { return new Intl.ListFormat(code, { type: 'conjunction' }).format(names); } catch (e) { return names.join(', '); }
  };
  function syncPicks() {
    pickedText = pickPhrase();
    fFalta.value = pickedText; fitSlot(fFalta); checkAll(false);
    document.querySelectorAll('#convo-ideas button').forEach(b => {
      const on = picks.includes(b.dataset.id);
      b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on);
    });
  }
  function togglePick(id, keepOn) {
    const typed = fFalta.value.trim();
    // Si se escribió algo a mano, queda primero en la lista
    if (typed !== pickedText) picks = typed ? [typed] : [];
    const i = picks.indexOf(id);
    if (i < 0) picks.push(id); else if (!keepOn) picks.splice(i, 1);
    syncPicks();
  }
  // Cada hueco se estira con lo que se escribe
  const measureCtx = document.createElement('canvas').getContext('2d');
  function fitSlot(inp) {
    const cs = getComputedStyle(inp);
    measureCtx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const ls = parseFloat(cs.letterSpacing) || 0, w = txt => measureCtx.measureText(txt).width + ls * txt.length + parseFloat(cs.fontSize) * .24;
    // "A mi marca le falta" vacío: ancho fijo del ejemplo más largo, así el texto que se escribe solo no mueve la frase
    const px = !inp.value && inp.id === 'f-falta' ? Math.max(...t.rot.map(w)) : w(inp.value || inp.placeholder || '    ');
    inp.style.width = Math.ceil(px) + 'px';
    if (inp.tagName === 'TEXTAREA') {
      // Si no entra en el renglón, toma el ancho disponible y baja de línea
      const max = inp.closest('.convo-line').clientWidth - 24;
      if (px > max) inp.style.width = max + 'px';
      inp.style.height = 'auto';
      inp.style.height = inp.scrollHeight + 'px';
    }
  }
  const fitAll = () => convo.querySelectorAll('input, textarea').forEach(fitSlot);
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validOf(inp) { const v = inp.value.trim(); return inp.type === 'email' ? EMAIL_RE.test(v) : v.length >= 2; }
  function checkAll(showErrors) {
    const inputs = [...convo.querySelectorAll('input, textarea')];
    let n = 0;
    inputs.forEach(inp => {
      const ok = validOf(inp), slot = inp.parentElement;
      slot.classList.toggle('is-ok', ok); if (ok) n++;
      let err = slot.querySelector('.slot-err');
      const bad = showErrors && !ok;
      slot.classList.toggle('is-bad', bad);
      inp.setAttribute('aria-invalid', bad);
      if (bad) { if (!err) { err = document.createElement('span'); err.className = 'slot-err'; slot.appendChild(err); } err.textContent = inp.type === 'email' && inp.value.trim() ? t.bad : t.req; }
      else if (err) err.remove();
    });
    convo.classList.toggle('is-ready', n === 3);
    return n === 3;
  }
  fitAll(); checkAll(false);
  document.fonts && document.fonts.ready.then(fitAll);
  convo.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.matches('textarea')) { e.preventDefault(); convo.requestSubmit(); }
  });
  convo.addEventListener('input', e => {
    if (!e.target.matches('input, textarea')) return;
    fitSlot(e.target);
    const slot = e.target.parentElement;
    checkAll(slot.classList.contains('is-bad'));
  });
  $('convo-ideas').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    togglePick(b.dataset.id);
    if (!reduced) gsap.fromTo(fFalta, { color: '#f4eee2' }, { color: '#ffffff', duration: 1.2, ease: 'power2.out' });
  });
  // El ejemplo de "A mi marca le falta" se escribe y se borra solo mientras el campo está vacío
  (() => {
    let ri = 0, ci = 0, del = false;
    const step = () => {
      if (!fFalta.value && document.activeElement !== fFalta) {
        const word = t.rot[ri % 3];
        ci += del ? -1 : 1;
        fFalta.placeholder = word.slice(0, Math.max(0, ci));
        if (!del && ci >= word.length) { del = true; return setTimeout(step, 1600); }
        if (del && ci <= 0) { del = false; ri++; return setTimeout(step, 350); }
        return setTimeout(step, del ? 28 : 60);
      }
      if (!fFalta.value) { fFalta.placeholder = t.rot[ri % 3]; fitSlot(fFalta); }
      setTimeout(step, 600);
    };
    if (reduced) { fFalta.placeholder = t.rot[0]; fitSlot(fFalta); }
    else setTimeout(step, 1200);
  })();
  convo.addEventListener('submit', async e => {
    e.preventDefault();
    if (!checkAll(true)) { const bad = convo.querySelector('[aria-invalid="true"]'); bad && bad.focus(); return; }
    const data = { nombre: $('f-nombre').value.trim(), email: $('f-email').value.trim(), falta: fFalta.value.trim(), idioma: code };
    const mailto = () => `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(`${t.l[0]} ${data.nombre}. ${t.l[1]} ${data.email}. ${t.l[2]} ${data.falta}.`)}`;
    // Sin servidor configurado, se abre el mail con los datos ya escritos
    if (FORM_ENDPOINT) {
      const send = $('convo-send');
      send.disabled = true;
      try {
        const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(res.status);
      } catch (err) { location.href = mailto(); }
      send.disabled = false;
    } else location.href = mailto();
    const done = $('convo-done');
    done.innerHTML = `${t.done.replace('{n}', data.nombre.replace(/[<>&"]/g, ''))}<small>${t.wa} <a href="${WA_URL}" target="_blank" rel="noopener" dir="ltr">${WA_NUMBER}</a></small>`;
    convo.hidden = true; done.hidden = false;
    if (!reduced) gsap.from(done, { y: 30, opacity: 0, duration: .8, ease: 'expo.out' });
  });

  // CTA por servicio: baja al formulario con ese servicio sumado a "A mi marca le falta"
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-ask]'); if (!b) return;
    e.preventDefault();
    togglePick(b.dataset.ask, true);
    $('contacto').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    $('f-nombre').focus({ preventScroll: true });
  });

  // Entrada: el título aparece palabra por palabra y el formulario sube desde la derecha
  function revealFinal() {
    if (reduced) return;
    ScrollTrigger.create({ trigger: '#contacto', start: 'top 65%', once: true, onEnter: () => {
      gsap.from('#final-title .w', { yPercent: 60, opacity: 0, duration: .9, ease: 'expo.out', stagger: .045 });
      gsap.from('.final-form', { x: 80, opacity: 0, duration: 1.2, ease: 'expo.out', delay: .25 });
      gsap.from('.convo > *', { y: 30, opacity: 0, duration: .9, ease: 'power3.out', stagger: .08, delay: .5 });
    } });
  }

  /* ---------- Footer ---------- */
  // Hora local de cada oficina y de cada integrante
  function tickClocks() {
    document.querySelectorAll('.foot-office time, .gp-hi time').forEach(el => {
      try { el.textContent = new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: el.dataset.tz }).format(new Date()); }
      catch (e) { el.remove(); }
    });
  }
  tickClocks();
  setInterval(tickClocks, 20000);
  // Volver arriba, con un aro que muestra cuánto se recorrió de la página
  const footRing = document.querySelector('.foot-ring .r-fg'), FOOT_RING = 2 * Math.PI * 19;
  footRing.style.strokeDasharray = FOOT_RING;
  const paintRing = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    footRing.style.strokeDashoffset = FOOT_RING * (1 - (max > 0 ? scrollY / max : 0));
  };
  addEventListener('scroll', paintRing, { passive: true }); paintRing();
  $('foot-top').addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  function revealFooter() {
    if (reduced) return;
    gsap.from('.foot-pitch > *, .foot-col', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', stagger: .07, scrollTrigger: { trigger: '.foot', start: 'top 80%', once: true } });
  }

  /* ---------- Nav ---------- */
  const nav = $('nav');
  const lang = $('lang');
  const langBtn = lang.querySelector('.lang-btn');
  const burger = nav.querySelector('.burger');

  // El header queda siempre fijo; con scroll toma fondo liso.
  // El fondo de la página es el de la sección clara que ocupa el centro de la pantalla: cambia de color al scrollear.
  const bgSections = [...document.querySelectorAll('[data-bg]')];
  const sectionAt = y => bgSections.find(sec => { const r = sec.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
  let pageBg = '--bg', painting = false;
  function paintPage() {
    painting = false;
    nav.classList.toggle('is-scrolled', scrollY > 10);
    const mid = sectionAt(innerHeight * .5);
    if (mid && !mid.hasAttribute('data-dark')) pageBg = mid.dataset.bg;
    document.body.style.backgroundColor = `var(${pageBg})`;
    // El header toma el color de lo que tiene debajo
    const under = sectionAt(nav.offsetHeight / 2);
    const dark = !!under && under.hasAttribute('data-dark');
    nav.classList.toggle('on-dark', dark);
    document.documentElement.style.setProperty('--page', `var(${dark ? under.dataset.bg : pageBg})`);
  }
  const onScroll = () => { if (!painting) { painting = true; requestAnimationFrame(paintPage); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  paintPage();

  const toggleLang = open => {
    lang.classList.toggle('is-open', open);
    langBtn.setAttribute('aria-expanded', open);
  };
  langBtn.addEventListener('click', e => { e.stopPropagation(); toggleLang(!lang.classList.contains('is-open')); toggleMenu(false); });
  // Al cambiar de idioma se queda en la misma sección
  document.querySelectorAll('#lang-menu a, #menu-langs a').forEach(a => a.addEventListener('click', () => {
    if (location.hash) a.href = a.getAttribute('href') + location.hash;
  }));

  function toggleMenu(open) {
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
  }
  burger.addEventListener('click', e => { e.stopPropagation(); toggleMenu(!nav.classList.contains('menu-open')); toggleLang(false); });
  $('menu').addEventListener('click', e => { if (e.target.closest('a')) toggleMenu(false); });
  document.addEventListener('click', e => {
    if (!lang.contains(e.target)) toggleLang(false);
    if (!nav.contains(e.target)) toggleMenu(false);
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') { toggleLang(false); toggleMenu(false); } });

  // Las posiciones se recalculan si cambia el escenario (fuentes que terminan de cargar, resize, etc.)
  layout();
  document.fonts && document.fonts.ready.then(layout);
  new ResizeObserver(layout).observe(stage);
  addEventListener('load', layout);
  narrow.addEventListener('change', layout);

  /* ---------- Movimiento ---------- */
  if (!reduced) {
    // Flotación de la cabeza + paralaje suave del mouse; los conectores lo siguen en cada frame
    const mouse = { x: 0, y: 0 }, par = { x: 0, y: 0 };
    addEventListener('mousemove', e => {
      mouse.x = (e.clientX / innerWidth - .5) * -14;
      mouse.y = (e.clientY / innerHeight - .5) * -10;
    }, { passive: true });
    gsap.ticker.add(time => {
      par.x += (mouse.x - par.x) * .04;
      par.y += (mouse.y - par.y) * .04;
      float.x = par.x + Math.sin(time * .45) * 4;
      float.y = par.y + Math.sin(time * .9) * 11;
      // Inclinación 3D leve según el mouse
      gsap.set(brain, {
        x: float.x, y: float.y, rotation: Math.sin(time * .6) * .6,
        rotationY: par.x * -.35, rotationX: par.y * .4, transformPerspective: 1100,
      });
      parts.forEach(drawWire);
      // Pulso: recorre el conector del servicio activo, de la ventana a la etiqueta
      const p = parts[active];
      if (pulse && p && p.wire && p.wire.isConnected && isLoaded(active)) {
        const L = p.wire.getTotalLength();
        const k = (time % 1.6) / 1.6;
        const pt = p.wire.getPointAtLength(L * k);
        pulse.setAttribute('cx', pt.x);
        pulse.setAttribute('cy', pt.y);
        pulse.setAttribute('opacity', Math.sin(k * Math.PI).toFixed(2));
      }
    });

    // Los servicios de la cabeza aparecen de a pares
    PAIRS.forEach((_, i) => gsap.delayedCall(1.3 + (i + 1) * .4, () => goStep(i + 1)));

    // Contador del +10
    document.querySelectorAll('.count').forEach(el => {
      const n = { v: 0 };
      gsap.to(n, { v: +el.textContent, duration: 1.6, ease: 'power2.out', delay: 1.1, onUpdate: () => (el.textContent = Math.round(n.v)) });
    });

    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (fine) {
      // Cursor propio: punto + aro que crece sobre lo clickeable; negro o blanco según el fondo
      const dot = $('cursor-dot'), ring = $('cursor-ring');
      document.documentElement.classList.add('has-cursor');
      const dx = gsap.quickTo(dot, 'x', { duration: .1 }), dy = gsap.quickTo(dot, 'y', { duration: .1 });
      const rx = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
      addEventListener('mousemove', e => {
        dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        gsap.to([dot, ring], { opacity: 1, duration: .3, overwrite: 'auto' });
      }, { passive: true });
      document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: .3 }));
      // Blanco sobre lo oscuro (secciones, fotos, botones azules); negro sobre el resto
      const DARK = '[data-dark], .nav.on-dark, .faq-item.is-open, .co-quote, .btn-blue, .convo-send, .pchip.is-cur, .co-close, .case-media, .co-media, .svc-item.is-active .svc-arrow, .case-veil';
      const LIGHT = '.gp-hi, .convo.is-ready .convo-send, .foot-top-btn .foot-ring';
      document.addEventListener('mouseover', e => {
        ring.classList.toggle('is-hover', !!e.target.closest('a, button, .case'));
        const light = !!e.target.closest(DARK) && !e.target.closest(LIGHT);
        dot.classList.toggle('is-light', light); ring.classList.toggle('is-light', light);
      });

      // Botones magnéticos: se acercan un poco al cursor
      document.querySelectorAll('.btn, .lang-btn').forEach(el => {
        const mx = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' });
        const my = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          mx((e.clientX - r.left - r.width / 2) * .25);
          my((e.clientY - r.top - r.height / 2) * .35);
        });
        el.addEventListener('mouseleave', () => { mx(0); my(0); });
      });

      // Menú: la píldora se desliza hasta el link bajo el mouse
      const menu = $('menu');
      const hl = document.createElement('span');
      hl.className = 'menu-hl';
      menu.prepend(hl);
      menu.querySelectorAll('a').forEach(a => a.addEventListener('mouseenter', () => {
        if (narrow.matches) return;
        gsap.to(hl, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1, duration: .45, ease: 'power3.out' });
      }));
      menu.addEventListener('mouseleave', () => gsap.to(hl, { opacity: 0, duration: .3 }));
    }

    // Al abrir o recargar, siempre arriba: el celular restauraba el scroll antes de armar las
    // secciones fijadas y caía en Servicios. La barra del navegador que se oculta tampoco recalcula.
    if (!location.hash) {
      history.scrollRestoration = 'manual';
      ScrollTrigger.clearScrollMemory('manual');
      scrollTo(0, 0);
    }
    ScrollTrigger.config({ ignoreMobileResize: true });
    setupCases();
    revealServices();
    revealTeam();
    setupProcess();
    revealFaq();
    revealFinal();
    revealFooter();
    matchMedia('(min-width: 861px)').addEventListener('change', () => { setupCases(); setupProcess(); ScrollTrigger.refresh(); });
    matchMedia(PROC_DESKTOP).addEventListener('change', () => { setupProcess(); ScrollTrigger.refresh(); });
    // Si la pantalla de carga todavía está, el cálculo se rehace al terminar
    loaderDone.then(() => { if (!location.hash) scrollTo(0, 0); ScrollTrigger.refresh(); });

    gsap.timeline()
      .from(nav, { y: -24, opacity: 0, duration: .9, ease: 'power3.out', clearProps: 'transform' })
      .from('.logo, .menu li, .actions > *', { y: -8, opacity: 0, duration: .6, ease: 'power3.out', stagger: .05, clearProps: 'transform' }, .25)
      // Titular palabra por palabra, desde abajo
      .from('.hero h1 .wi', { yPercent: 115, rotation: 4, duration: 1.1, ease: 'expo.out', stagger: .07 }, .3)
      .from('.hero-sub', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, .75)
      .from(base, { opacity: 0, scale: .94, duration: 1.4, ease: 'power3.out' }, .35)
      .from('.hero-cta > *', { y: 16, opacity: 0, duration: .7, ease: 'power3.out', stagger: .08, clearProps: 'transform,opacity' }, 1.2)
      .from('.trust', { opacity: 0, y: 24, duration: .9, ease: 'power3.out' }, 1.5)
      .from('.trust-label > *', { opacity: 0, x: -12, duration: .6, ease: 'power3.out', stagger: .08 }, 1.75)
      .from('.marquee-group:first-child .brand', { opacity: 0, y: 14, duration: .6, ease: 'power3.out', stagger: .04, clearProps: 'opacity,transform' }, 1.8);
  } else {
    // Con movimiento reducido: todo visible y sin recorridos fijados
    setupCases(); setupProcess(); revealTeam(); revealFaq(); revealFinal();
  }
}
