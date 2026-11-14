// Contenido del sitio. Extraído tal cual del diseño original (design-html.html).
// Textos en 5 idiomas: es, en, it, de, fr.

// h: renglones del titular; {rot} = palabra que rota (cabeza, head, Kopf, tête → testa)
export const I18N = {
  es: { certs: 'Certificaciones y reconocimientos', press: 'Salimos en', pressMore: 'Ver nota ↗', faces: 'Somos 13 testas', casos: 'Casos', servicios: 'Servicios', testas: 'Las testas', proceso: 'Proceso', faq: 'FAQ', cta: 'Hablemos', ia: 'IA',
        wa: 'Escríbenos por WhatsApp', trusted: 'Trabajamos con', word: 'testa',
        h: ['Todas contestan.', 'Nosotros, con {rot}.'],
        sub: 'Agencia de marketing digital. Ads, SEO, web y redes para clientes en <b>+<span class="count">10</span> países</b>.' },
  // EN e IT juegan con "contest" / "contestare" y no tienen palabra que rote
  en: { certs: 'Certifications & recognition', press: 'As seen in', pressMore: 'Read article ↗', faces: 'We’re 13 testas', casos: 'Cases', servicios: 'Services', testas: 'The testas', proceso: 'Process', faq: 'FAQ', cta: "Let's talk", ia: 'AI',
        wa: 'Message us on WhatsApp', trusted: 'We work with', word: 'testa',
        h: ['<span class="brand-hl">Contest</span> your', 'competitors.'],
        sub: 'Digital marketing agency. Ads, SEO, web and social media for clients in <b><span class="count">10</span>+ countries</b>.' },
  it: { certs: 'Certificazioni e riconoscimenti', press: 'Parlano di noi', pressMore: 'Leggi ↗', faces: 'Siamo 13 teste', casos: 'Casi', servicios: 'Servizi', testas: 'Le teste', proceso: 'Processo', faq: 'FAQ', cta: 'Parliamone', ia: 'IA',
        wa: 'Scrivici su WhatsApp', trusted: 'Lavoriamo con', word: 'testa',
        h: ['<span class="brand-hl">Contesta</span> i tuoi', 'concorrenti.'],
        sub: 'Agenzia di marketing digitale. Ads, SEO, web e social per clienti in <b>+<span class="count">10</span> paesi</b>.' },
  de: { certs: 'Zertifikate und Auszeichnungen', press: 'Bekannt aus', pressMore: 'Artikel lesen ↗', faces: 'Wir sind 13 Testas', casos: 'Cases', servicios: 'Leistungen', testas: 'Die Testas', proceso: 'Prozess', faq: 'FAQ', cta: 'Lass uns reden', ia: 'KI',
        wa: 'Schreib uns auf WhatsApp', trusted: 'Wir arbeiten mit', word: 'Testa',
        h: ['Wir machen Marketing', 'mit {rot}.'],
        sub: 'Digitalmarketing-Agentur. Ads, SEO, Web und Social Media für Kunden in <b>+<span class="count">10</span> Ländern</b>.' },
  fr: { certs: 'Certifications et distinctions', press: 'Ils parlent de nous', pressMore: 'Lire l’article ↗', faces: 'Nous sommes 13 testas', casos: 'Cas clients', servicios: 'Services', testas: 'Les testas', proceso: 'Processus', faq: 'FAQ', cta: 'Parlons-en', ia: 'IA',
        wa: 'Écrivez-nous sur WhatsApp', trusted: 'Nous travaillons avec', word: 'testa',
        h: ['Nous faisons du marketing', 'avec {rot}.'],
        sub: 'Agence de marketing digital. Ads, SEO, web et réseaux sociaux pour des clients dans <b>+<span class="count">10</span> pays</b>.' },
};

export const ROTATION = ['cabeza', 'head', 'Kopf', 'tête'];

export const LANGS = [['es', 'Español'], ['en', 'English'], ['it', 'Italiano'], ['de', 'Deutsch'], ['fr', 'Français']];

// [archivo, nombre, alto en px]. El alto se ajusta a ojo por logo para igualar el peso visual, no es parejo a propósito.
export const CLIENTS = [
  ['simplestate', 'Simplestate', 21], ['topper', 'Topper', 40], ['segmahomes', 'Segma Homes', 30],
  ['iguana', 'Iguana', 50], ['sharky', 'Sharky', 18], ['innovia', 'Innovia', 44],
  ['superintendencia-salud', 'Superintendencia de Servicios de Salud', 30], ['ocsa', 'OCSA', 36], ['silenpro', 'SilenPro', 22], ['futbolme', 'Fútbolme', 46],
  ['filler', 'Filler', 32], ['donzapas', 'Don Zapas', 42], ['oriente10', 'Oriente 10', 20], ['la-comunidad', 'La Comunidad', 46],
  ['bio-e', 'Bio-E', 44], ['rental', 'Rental', 42],
];

// x, y: centro del marcador en % de la imagen. side: lado de la etiqueta; ly: altura de la etiqueta (% del busto)
export const SERVICES = [
  { id: 'ads', x: 44, y: 10, side: 'left', ly: 10 },
  { id: 'seo', x: 38.5, y: 21.5, side: 'left', ly: 30 },
  { id: 'geo', x: 36, y: 35.8, side: 'left', ly: 50 },
  { id: 'web', x: 36.5, y: 50.2, side: 'left', ly: 70 },
  { id: 'dev', x: 39.5, y: 65.9, side: 'left', ly: 90 },
  { id: 'social', x: 63.5, y: 7.2, side: 'right', ly: 10 },
  { id: 'branding', x: 71, y: 18.6, side: 'right', ly: 30 },
  { id: 'pr', x: 74, y: 31.5, side: 'right', ly: 50 },
  { id: 'influencers', x: 73, y: 45.9, side: 'right', ly: 70 },
  { id: 'ia', x: 70, y: 61.6, side: 'right', ly: 90 },
];

export const NAMES = { web: 'Web design', seo: 'SEO', ads: 'Ads', branding: 'Branding', social: 'Social media', pr: 'PR', influencers: 'Influencers' };

// Estos sí cambian con el idioma
export const NAMES_I18N = {
  geo: { es: 'Posicionamiento GEO', en: 'GEO (AI search)', it: 'Posizionamento GEO', de: 'GEO-Optimierung', fr: 'Référencement GEO' },
  dev: { es: 'Desarrollo', en: 'Development', it: 'Sviluppo', de: 'Entwicklung', fr: 'Développement' },
};

// Para sumar una nota: agregar el logo en img/prensa/ y una línea acá. [archivo, medio, alto en px, link]
export const PRESS = [
  ['la-nacion', 'La Nación', 20, 'https://www.lanacion.com.ar/lifestyle/tenia-sed-de-mundo-trazo-un-plan-y-aprovecho-un-rasgo-del-pais-para-alcanzar-su-meta-la-forma-de-nid21102026/'],
];

// Sellos de la web anterior (agenciacontesta.com), más la insignia de Sortlist
export const CERTS = [
  ['google-pm', 'Google Project Management Certificate', 143, 143],
  ['google-ux', 'Google UX Design Certificate · Gies College of Business', 201, 182],
  ['meta', 'Meta Social Media Marketing Professional Certificate', 138, 138, 'is-round'],
  ['50pros', '50Pros · Top Firm, Best in Industry 2025', 500, 500],
  ['ods', 'Objetivos de Desarrollo Sostenible (ONU)', 138, 138],
];

export const CASES_TITLE = { es: 'Casos con <em>testa</em>', en: 'Cases with <em>testa</em>', it: 'Casi con la <em>testa</em>', de: 'Cases mit <em>Testa</em>', fr: 'Cas avec <em>testa</em>' };

// text: [titular, texto del número, qué hicimos]. Las reseñas sin traducción se muestran en su idioma original
export const CASES = [
  { id: 'mabra', img: 'mabra-google-ads', client: 'Mabra', tags: ['Google Ads'], n: 32, person: 'David Abramson',
    role: { es: 'fundador de Mabra', en: 'founder of Mabra', it: 'fondatore di Mabra', de: 'Gründer von Mabra', fr: 'fondateur de Mabra' },
    quote: {
      es: 'Crecimos gracias a las campañas y estamos vendiendo más.',
      en: 'We grew thanks to the campaigns and we’re selling more.',
      it: 'Siamo cresciuti grazie alle campagne e stiamo vendendo di più.',
      de: 'Dank der Kampagnen sind wir gewachsen und verkaufen mehr.',
      fr: 'Nous avons grandi grâce aux campagnes et nous vendons plus.',
    },
    open: {
      es: ['Quería posicionarse online y vender más, pero sus campañas no le hablaban al problema real de sus clientes.', 'Redefinimos el público y su pain point, optimizamos las keywords y renovamos los creativos de Google Ads.', '+32% de conversiones en 3 meses.'],
      en: ['It wanted to build its online presence and sell more, but its campaigns weren’t speaking to its customers’ real problem.', 'We redefined the audience and its pain point, optimized the keywords and renewed the Google Ads creatives.', '+32% conversions in 3 months.'],
      it: ['Voleva posizionarsi online e vendere di più, ma le sue campagne non parlavano del vero problema dei suoi clienti.', 'Abbiamo ridefinito il pubblico e il suo pain point, ottimizzato le keyword e rinnovato le creatività di Google Ads.', '+32% di conversioni in 3 mesi.'],
      de: ['Mabra wollte online sichtbar werden und mehr verkaufen, aber die Kampagnen trafen nicht das eigentliche Problem der Kunden.', 'Wir haben die Zielgruppe und ihren Pain Point neu definiert, die Keywords optimiert und die Creatives für Google Ads erneuert.', '+32 % Conversions in 3 Monaten.'],
      fr: ['Mabra voulait se positionner en ligne et vendre davantage, mais ses campagnes ne parlaient pas du vrai problème de ses clients.', 'Nous avons redéfini le public et son pain point, optimisé les mots-clés et renouvelé les créas Google Ads.', '+32 % de conversions en 3 mois.'],
    },
    text: {
    es: ['El pain point que Mabra no estaba nombrando', 'de conversiones en 3 meses', 'Redefinimos el target y su pain point, optimizamos las keywords y mejoramos los creativos.'],
    en: ['The pain point Mabra wasn’t naming', 'conversions in 3 months', 'We redefined the target and its pain point, optimized the keywords and improved the creatives.'],
    it: ['Il pain point che Mabra non stava nominando', 'di conversioni in 3 mesi', 'Abbiamo ridefinito il target e il suo pain point, ottimizzato le keyword e migliorato le creatività.'],
    de: ['Der Pain Point, den Mabra nicht benannte', 'Conversions in 3 Monaten', 'Wir haben die Zielgruppe und ihren Pain Point neu definiert, die Keywords optimiert und die Creatives verbessert.'],
    fr: ['Le pain point que Mabra ne nommait pas', 'de conversions en 3 mois', 'Nous avons redéfini la cible et son pain point, optimisé les mots-clés et amélioré les créas.'],
  } },
  { id: 'cantus', img: 'cantus-web', client: 'Cantus', tags: ['SEO', 'Web'], n: 120, person: 'Zachary Ernst',
    role: { es: 'founder de Cantus Works', en: 'founder of Cantus Works', it: 'founder di Cantus Works', de: 'Founder von Cantus Works', fr: 'fondateur de Cantus Works' },
    quote: { es: 'ConTesta entendió rápido qué necesitábamos y lo ejecutó con criterio. Estamos muy conformes con el trabajo.' },
    open: {
      es: ['No aparecía en Google.', 'Optimizamos la estructura del sitio y mejoramos el domain rating.', '+120% de clics orgánicos en 5 meses.'],
      en: ['It didn’t show up on Google.', 'We optimized the site structure and improved the domain rating.', '+120% organic clicks in 5 months.'],
      it: ['Non compariva su Google.', 'Abbiamo ottimizzato la struttura del sito e migliorato il domain rating.', '+120% di clic organici in 5 mesi.'],
      de: ['Cantus tauchte bei Google nicht auf.', 'Wir haben die Seitenstruktur optimiert und das Domain Rating verbessert.', '+120 % organische Klicks in 5 Monaten.'],
      fr: ['Cantus n’apparaissait pas sur Google.', 'Nous avons optimisé la structure du site et amélioré le domain rating.', '+120 % de clics organiques en 5 mois.'],
    },
    text: {
    es: ['De invisible a encontrado en Google', 'de clics orgánicos en 5 meses', 'Optimizamos la estructura del sitio y mejoramos el domain rating.'],
    en: ['From invisible to found on Google', 'organic clicks in 5 months', 'We optimized the site structure and improved the domain rating.'],
    it: ['Da invisibile a trovato su Google', 'di clic organici in 5 mesi', 'Abbiamo ottimizzato la struttura del sito e migliorato il domain rating.'],
    de: ['Von unsichtbar zu gefunden bei Google', 'organische Klicks in 5 Monaten', 'Wir haben die Seitenstruktur optimiert und das Domain Rating verbessert.'],
    fr: ['D’invisible à trouvé sur Google', 'de clics organiques en 5 mois', 'Nous avons optimisé la structure du site et amélioré le domain rating.'],
  } },
  { id: 'thirteen', img: 'thirteen-web', client: 'Thirteen GmbH', tags: ['SEO'], n: 39, person: 'Maxim Holzapfel',
    role: { es: 'director general de Thirteen GmbH', en: 'CEO of Thirteen GmbH', it: 'CEO di Thirteen GmbH', de: 'CEO von Thirteen GmbH', fr: 'CEO de Thirteen GmbH' },
    open: {
      es: ['Necesitaban crecer en Google con SEO.', 'Los acompañamos con una estrategia de SEO de punta a punta.', '+39% de clics en 5 meses: crecieron muchísimo.'],
      en: ['They needed to grow on Google with SEO.', 'We supported them with an end-to-end SEO strategy.', '+39% clicks in 5 months: they grew enormously.'],
      it: ['Dovevano crescere su Google con la SEO.', 'Li abbiamo accompagnati con una strategia SEO completa.', '+39% di clic in 5 mesi: sono cresciuti moltissimo.'],
      de: ['Sie wollten mit SEO bei Google wachsen.', 'Wir haben sie mit einer durchgängigen SEO-Strategie begleitet.', '+39 % Klicks in 5 Monaten: Sie sind enorm gewachsen.'],
      fr: ['Ils devaient se développer sur Google grâce au SEO.', 'Nous les avons accompagnés avec une stratégie SEO de bout en bout.', '+39 % de clics en 5 mois : ils ont énormément progressé.'],
    },
    quote: {
      es: 'Trabajar con ConTesta no solo fue profesional, sino también eficiente. Nos sentimos valorados como clientes, bien informados y con pocas dudas que resolver.',
      en: 'Working with ConTesta was professional and incredibly efficient. We felt valued, well-informed, and no time was needed on clarifications.',
    },
    text: {
    es: ['Crecieron en Google con SEO', 'de clics en 5 meses', null],
    en: ['They grew on Google with SEO', 'clicks in 5 months', null],
    it: ['Sono cresciuti su Google con la SEO', 'di clic in 5 mesi', null],
    de: ['Mit SEO bei Google gewachsen', 'Klicks in 5 Monaten', null],
    fr: ['Ils ont grandi sur Google grâce au SEO', 'de clics en 5 mois', null],
  } },
];

export const QUOTE_MARKS = { de: ['„', '“'], fr: ['« ', ' »'] };

// Un campo sin dato no se muestra
export const OPEN_UI = {
  es: { more: 'Ver caso', problem: 'Problema', did: 'Qué hicimos', result: 'Resultado', close: 'Cerrar', next: 'Siguiente caso' },
  en: { more: 'View case', problem: 'Problem', did: 'What we did', result: 'Result', close: 'Close', next: 'Next case' },
  it: { more: 'Vedi il caso', problem: 'Problema', did: 'Cosa abbiamo fatto', result: 'Risultato', close: 'Chiudi', next: 'Caso successivo' },
  de: { more: 'Case ansehen', problem: 'Problem', did: 'Was wir gemacht haben', result: 'Ergebnis', close: 'Schließen', next: 'Nächster Case' },
  fr: { more: 'Voir le cas', problem: 'Problème', did: 'Ce que nous avons fait', result: 'Résultat', close: 'Fermer', next: 'Cas suivant' },
};

export const TAG_SVC = { 'Google Ads': 'ads', SEO: 'seo', Web: 'web' };
export const ICON_X = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9"/></svg>';
export const ICON_NEXT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

// Primero los servicios principales
export const SVC_ORDER = ['ads', 'seo', 'geo', 'web', 'dev', 'social', 'branding', 'pr', 'influencers', 'ia'];

export const SVC_TEXT = {
  es: { title: '¿Qué te está faltando?', intro: 'Nosotros ponemos la <b>testa</b>.', d: {
    ads: 'Campañas en Google, Meta, TikTok, LinkedIn y los nuevos anuncios en ChatGPT, medidas por ventas y leads, no por clics.',
    seo: 'Que te encuentren en Google cuando te buscan: técnica, contenido y autoridad.',
    geo: 'Trabajamos tu marca para que aparezca en las respuestas de ChatGPT, Gemini y Perplexity cuando alguien pregunta por lo que vendes.',
    web: 'Sitios rápidos, claros y pensados para vender, en WordPress, Webflow o Shopify.',
    dev: 'Software a medida: apps, plataformas e integraciones. Lo que tu negocio necesita y no viene en una plantilla.',
    social: 'Estrategia, contenido y comunidad en Instagram, TikTok, LinkedIn y Meta, con reporte mensual.',
    branding: 'Una marca que se reconoce y se recuerda: nombre, identidad visual y manual de marca.',
    pr: 'Notas, entrevistas y apariciones en los medios que construyen confianza.',
    influencers: 'Creadores afines que hablan de tu marca con su voz. Los elegimos, negociamos y medimos.',
    ia: 'Automatizaciones e IA aplicadas a tu marketing: contenido, atención y análisis de datos.',
  } },
  en: { title: 'What’s missing?', intro: 'We bring the <b>testa</b>.', d: {
    ads: 'Campaigns on Google, Meta, TikTok, LinkedIn and the new ChatGPT ads, measured by sales and leads, not clicks.',
    seo: 'Get found on Google when people search for you: technical SEO, content and authority.',
    geo: 'We work on your brand so it shows up in ChatGPT, Gemini and Perplexity answers when someone asks about what you sell.',
    web: 'Fast, clear websites built to sell, on WordPress, Webflow or Shopify.',
    dev: 'Custom software: apps, platforms and integrations. What your business needs and no template offers.',
    social: 'Strategy, content and community on Instagram, TikTok, LinkedIn and Meta, with a monthly report.',
    branding: 'A brand people recognize and remember: name, visual identity and brand guidelines.',
    pr: 'Articles, interviews and features in the media that build trust.',
    influencers: 'Like-minded creators who talk about your brand in their own voice. We choose them, negotiate and measure.',
    ia: 'Automation and AI applied to your marketing: content, customer service and data analysis.',
  } },
  it: { title: 'Cosa ti manca?', intro: 'La <b>testa</b> ce la mettiamo noi.', d: {
    ads: 'Campagne su Google, Meta, TikTok, LinkedIn e i nuovi annunci su ChatGPT, misurate in vendite e lead, non in clic.',
    seo: 'Farti trovare su Google quando ti cercano: aspetti tecnici, contenuti e autorevolezza.',
    geo: 'Lavoriamo sul tuo brand perché compaia nelle risposte di ChatGPT, Gemini e Perplexity quando qualcuno chiede di ciò che vendi.',
    web: 'Siti veloci, chiari e pensati per vendere, su WordPress, Webflow o Shopify.',
    dev: 'Software su misura: app, piattaforme e integrazioni. Quello che serve al tuo business e nessun template offre.',
    social: 'Strategia, contenuti e community su Instagram, TikTok, LinkedIn e Meta, con report mensile.',
    branding: 'Un brand che si riconosce e si ricorda: nome, identità visiva e manuale del brand.',
    pr: 'Articoli, interviste e uscite sui media che costruiscono fiducia.',
    influencers: 'Creator affini che parlano del tuo brand con la loro voce. Li scegliamo, negoziamo e misuriamo i risultati.',
    ia: 'Automazioni e IA applicate al tuo marketing: contenuti, assistenza clienti e analisi dei dati.',
  } },
  de: { title: 'Was fehlt deiner Marke?', intro: 'Die <b>Testa</b> bringen wir mit.', d: {
    ads: 'Kampagnen auf Google, Meta, TikTok, LinkedIn und die neuen ChatGPT-Anzeigen – gemessen an Verkäufen und Leads, nicht an Klicks.',
    seo: 'Damit du bei Google gefunden wirst, wenn man dich sucht: Technik, Content und Autorität.',
    geo: 'Wir sorgen dafür, dass deine Marke in den Antworten von ChatGPT, Gemini und Perplexity auftaucht, wenn jemand nach deinem Angebot fragt.',
    web: 'Schnelle, klare Websites, die verkaufen – mit WordPress, Webflow oder Shopify.',
    dev: 'Individuelle Software: Apps, Plattformen und Integrationen. Was dein Business braucht und kein Template bietet.',
    social: 'Strategie, Content und Community auf Instagram, TikTok, LinkedIn und Meta, mit monatlichem Report.',
    branding: 'Eine Marke, die man erkennt und sich merkt: Name, visuelle Identität und Brand Guidelines.',
    pr: 'Artikel, Interviews und Auftritte in Medien, die Vertrauen schaffen.',
    influencers: 'Passende Creator, die mit ihrer eigenen Stimme über deine Marke sprechen. Wir wählen sie aus, verhandeln und messen.',
    ia: 'Automatisierung und KI für dein Marketing: Content, Kundenservice und Datenanalyse.',
  } },
  fr: { title: 'Qu’est-ce qui manque à votre marque ?', intro: 'La <b>testa</b>, on s’en charge.', d: {
    ads: 'Campagnes sur Google, Meta, TikTok, LinkedIn et les nouvelles annonces ChatGPT, mesurées en ventes et en leads, pas en clics.',
    seo: 'Être trouvé sur Google quand on vous cherche : technique, contenu et autorité.',
    geo: 'Nous travaillons votre marque pour qu’elle apparaisse dans les réponses de ChatGPT, Gemini et Perplexity quand quelqu’un cherche ce que vous vendez.',
    web: 'Des sites rapides, clairs et pensés pour vendre, sur WordPress, Webflow ou Shopify.',
    dev: 'Logiciel sur mesure : applis, plateformes et intégrations. Ce dont votre entreprise a besoin et qu’aucun template n’offre.',
    social: 'Stratégie, contenu et communauté sur Instagram, TikTok, LinkedIn et Meta, avec un reporting mensuel.',
    branding: 'Une marque qu’on reconnaît et dont on se souvient : nom, identité visuelle et charte de marque.',
    pr: 'Articles, interviews et passages dans les médias qui inspirent confiance.',
    influencers: 'Des créateurs en affinité qui parlent de votre marque avec leur propre voix. Nous les choisissons, négocions et mesurons.',
    ia: 'Automatisations et IA appliquées à votre marketing : contenu, service client et analyse de données.',
  } },
};

export const SVC_ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

export const SVC_UI = {
  es: ['Qué hacemos', 'Con quién lo trabajamos'], en: ['What we do', 'Who we do it with'], it: ['Cosa facciamo', 'Con chi lo facciamo'],
  de: ['Was wir machen', 'Für wen wir es machen'], fr: ['Ce que nous faisons', 'Avec qui nous le faisons'],
};

export const SVC_CLIENTS = {
  ads: ['Mabra', 'Bellaria', 'Oriente10'], seo: ['Thirteen', 'Emme Art'], geo: ['Cantus', 'Thirteen'],
  web: ['Consultora Plan B', 'Barbonni'], dev: ['Cantus', 'SegmaHomes'], social: ['Lenovo', 'Motorola', 'Topper'],
  branding: ['Aura Energy Studio', 'Consultora Plan B', 'Mabra'], pr: ['Kinsai', 'Aldea Calma'], influencers: ['Topper', 'Bellaria', 'Mabra'], ia: ['Vertix', 'Oriente10'],
};

// dx/dy: hacia dónde sale la cara desde su punto, para que las cercanas no se pisen.
export const TEAM = [
  { id: 'us',  lon: -80.2, lat: 25.7,  dx: 3,    dy: 8,   hi: 'Hi!',      cc: 'US', tz: 'America/New_York' },
  { id: 'co',  lon: -74.0, lat: 40.7,  dx: 4,    dy: -9,  hi: 'Hi!',      cc: 'US', tz: 'America/New_York' },
  { id: 'mx',  lon: -99.1, lat: 19.4,  dx: -7,   dy: 3,   hi: '¡Hola!',   cc: 'MX', tz: 'America/Mexico_City' },
  { id: 'ar',  lon: -58.4, lat: -34.7, dx: -6,   dy: 3,   hi: '¡Hola!',   cc: 'AR', tz: 'America/Argentina/Buenos_Aires' },
  { id: 'uy',  lon: -56.2, lat: -35.0, dx: 8,    dy: -3,  hi: '¡Hola!',   cc: 'UY', tz: 'America/Montevideo' },
  { id: 'es1', lon: -3.7,  lat: 40.4,  dx: -8,   dy: 4,   hi: '¡Hola!',   cc: 'ES', tz: 'Europe/Madrid' },
  { id: 'es2', lon: 2.2,   lat: 41.3,  dx: 5,    dy: 8,   hi: '¡Hola!',   cc: 'ES', tz: 'Europe/Madrid' },
  { id: 'fr',  lon: 2.3,   lat: 48.8,  dx: -3.5, dy: -10, hi: 'Bonjour!', cc: 'FR', tz: 'Europe/Paris' },
  { id: 'de2', lon: 11.6,  lat: 48.1,  dx: 9.5,  dy: 0,   hi: 'Hallo!',   cc: 'DE', tz: 'Europe/Berlin' },
  { id: 'de1', lon: 13.4,  lat: 52.5,  dx: 5,    dy: -9,  hi: 'Hallo!',   cc: 'DE', tz: 'Europe/Berlin' },
];

// Sedes: se muestran solo en el footer.
export const OFFICES = [
  { city: 'Madrid', hq: true, addr: 'Calle de Villaviciosa', tz: 'Europe/Madrid' },
  { city: 'Buenos Aires', addr: 'Maipú', tz: 'America/Argentina/Buenos_Aires' },
  { city: 'Miami', addr: 'Northeast 2nd Avenue', tz: 'America/New_York' },
];

export const TEAM_TEXT = {
  es: { intro: 'Somos un equipo joven e internacional.', stat: 'testas', hq: 'Sede central', hint: 'Arrastra para girar' },
  en: { intro: 'We’re a young, international team.', stat: 'testas', hq: 'Headquarters', hint: 'Drag to spin' },
  it: { intro: 'Siamo un team giovane e internazionale.', stat: 'teste', hq: 'Sede centrale', hint: 'Trascina per ruotare' },
  de: { intro: 'Wir sind ein junges, internationales Team.', stat: 'Testas', hq: 'Hauptsitz', hint: 'Ziehen zum Drehen' },
  fr: { intro: 'Nous sommes une équipe jeune et internationale.', stat: 'testas', hq: 'Siège', hint: 'Glissez pour faire tourner' },
};

export const COUNTRIES = {
  es: { US: 'Estados Unidos', MX: 'México', CO: 'Colombia', UY: 'Uruguay', AR: 'Argentina', FR: 'Francia', DE: 'Alemania', ES: 'España' },
  en: { US: 'United States', MX: 'Mexico', CO: 'Colombia', UY: 'Uruguay', AR: 'Argentina', FR: 'France', DE: 'Germany', ES: 'Spain' },
  it: { US: 'Stati Uniti', MX: 'Messico', CO: 'Colombia', UY: 'Uruguay', AR: 'Argentina', FR: 'Francia', DE: 'Germania', ES: 'Spagna' },
  de: { US: 'Vereinigte Staaten', MX: 'Mexiko', CO: 'Kolumbien', UY: 'Uruguay', AR: 'Argentinien', FR: 'Frankreich', DE: 'Deutschland', ES: 'Spanien' },
  fr: { US: 'États-Unis', MX: 'Mexique', CO: 'Colombie', UY: 'Uruguay', AR: 'Argentine', FR: 'France', DE: 'Allemagne', ES: 'Espagne' },
};

export const FACES = ['es1', 'ar', 'de1', 'us', 'fr'];
export const PERSON_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="9" r="4.2"/><path d="M3.5 22c.6-5 4.1-7.6 8.5-7.6s7.9 2.6 8.5 7.6z"/></svg>';

// center: frase que acompaña a las caras del equipo.
export const PROCESS_TEXT = {
  es: { title: 'Cómo trabajamos', intro: 'Trabajamos en cinco pasos, sin sorpresas.', hint: 'Desliza para recorrerlo', step: 'Paso', center: 'Te acompañamos personalmente en cada paso del proceso.', steps: [
    ['Consulta inicial', 'Entendemos tu marca, tu mercado y lo que te falta.'], ['Estrategia', 'Definimos objetivos, canales y quién coordina cada parte.'],
    ['Diseño y ejecución', 'Nuestros especialistas ponen manos a la obra.'], ['Lanzamiento', 'Salimos al aire y medimos desde el primer día.'],
    ['Optimización', 'Ajustamos con datos y escalamos lo que funciona.']] },
  en: { title: 'How we work', intro: 'We work in five steps, no surprises.', hint: 'Scroll to follow the path', step: 'Step', center: 'We’re with you personally at every step of the process.', steps: [
    ['Initial consultation', 'We get to know your brand, your market and what’s missing.'], ['Strategy', 'We set goals, channels and who coordinates each part.'],
    ['Design & execution', 'Our specialists get to work.'], ['Launch', 'We go live and measure from day one.'],
    ['Optimization', 'We adjust with data and scale what works.']] },
  it: { title: 'Come lavoriamo', intro: 'Lavoriamo in cinque passi, senza sorprese.', hint: 'Scorri per seguire il percorso', step: 'Fase', center: 'Ti accompagniamo personalmente in ogni fase del processo.', steps: [
    ['Consulenza iniziale', 'Conosciamo il tuo brand, il tuo mercato e cosa ti manca.'], ['Strategia', 'Definiamo obiettivi, canali e chi coordina ogni parte.'],
    ['Design ed esecuzione', 'I nostri specialisti si mettono al lavoro.'], ['Lancio', 'Andiamo online e misuriamo dal primo giorno.'],
    ['Ottimizzazione', 'Aggiustiamo con i dati e scaliamo ciò che funziona.']] },
  de: { title: 'So arbeiten wir', intro: 'Wir arbeiten in fünf Schritten, ohne Überraschungen.', hint: 'Scrolle, um den Weg zu sehen', step: 'Schritt', center: 'Wir begleiten dich persönlich bei jedem Schritt.', steps: [
    ['Erstberatung', 'Wir lernen deine Marke, deinen Markt und deine Lücken kennen.'], ['Strategie', 'Wir legen Ziele, Kanäle und Verantwortlichkeiten fest.'],
    ['Design & Umsetzung', 'Unsere Spezialisten legen los.'], ['Launch', 'Wir gehen live und messen ab Tag eins.'],
    ['Optimierung', 'Wir justieren mit Daten nach und skalieren, was funktioniert.']] },
  fr: { title: 'Notre méthode', intro: 'Nous travaillons en cinq étapes, sans surprise.', hint: 'Faites défiler pour suivre le parcours', step: 'Étape', center: 'Nous vous accompagnons personnellement à chaque étape.', steps: [
    ['Consultation initiale', 'Nous découvrons votre marque, votre marché et ce qui vous manque.'], ['Stratégie', 'Nous fixons objectifs, canaux et qui coordonne chaque partie.'],
    ['Design et exécution', 'Nos spécialistes passent à l’action.'], ['Lancement', 'Nous mettons en ligne et mesurons dès le premier jour.'],
    ['Optimisation', 'Nous ajustons avec les données et amplifions ce qui marche.']] },
};

export const PROC_ARROW = '<span class="arrow" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>';

// Íconos de cada paso (trazo, caja de 16): conversación, objetivo, diseño, lanzamiento, crecimiento
export const PROC_ICONS = [
  'M2.8 4.2a1.4 1.4 0 0 1 1.4-1.4h7.6a1.4 1.4 0 0 1 1.4 1.4v5.2a1.4 1.4 0 0 1-1.4 1.4H7.2L4.3 13.2v-2.4h-.1a1.4 1.4 0 0 1-1.4-1.4zM5.6 6.8h4.8',
  'M8 2.4a5.6 5.6 0 1 0 5.6 5.6M8 5.2A2.8 2.8 0 1 0 10.8 8M8 8l5.2-5.2M11.2 2.4v2.4h2.4',
  'M10.4 2.8l2.8 2.8-7.6 7.6H2.8v-2.8zM8.8 4.4l2.8 2.8',
  'M13.4 2.6L2.6 7.2l4.4 1.8 1.8 4.4zM7 9l3.2-3.2',
  'M2.6 13.4h10.8M4.2 10.6l2.6-2.8 2.2 2 4-4.4M10.2 5.4h2.8v2.8',
];

// El recorrido (viewBox 600 × 560): baja en S por los 5 pasos y termina en el paso 05
export const PN = [[150, 96], [452, 190], [150, 288], [452, 384], [170, 476]];

export const FAQ_TEXT = {
  es: { title: 'Preguntas frecuentes', sub: '¿Otra duda? Escríbenos.', fast: 'Te respondemos rápido por WhatsApp', items: [
    ['¿Cuánto cuesta?', 'Depende del alcance. Después de una primera charla te pasamos un presupuesto cerrado.'],
    ['¿En cuánto tiempo veo resultados?', 'En Ads vemos resultados en semanas. En SEO, entre 3 y 6 meses. Una web la entregamos entre unas semanas y un par de meses, según la complejidad.'],
    ['¿Cómo es el acompañamiento? ¿Con quién hablo?', 'Un equipo con un project manager a cargo de tu cuenta, reportes claros y respuesta rápida por el canal que elijas.'],
    ['¿Por qué una agencia y no un equipo interno?', 'Ponemos a todos nuestros especialistas a tu disposición, sin el costo fijo de contratarlos.'],
    ['¿Cómo empezamos?', 'Nos escribes, hacemos una llamada y te enviamos una propuesta.']] },
  en: { title: 'Frequently asked questions', sub: 'Another question? Write to us.', fast: 'We reply quickly on WhatsApp', items: [
    ['How much does it cost?', 'It depends on the scope. After a first call we send you a fixed quote.'],
    ['How soon will I see results?', 'With Ads, we see results in weeks. With SEO, in 3 to 6 months. We deliver a website in a few weeks to a couple of months, depending on complexity.'],
    ['What’s the support like? Who do I talk to?', 'A team with a project manager in charge of your account, clear reports and quick replies on the channel you choose.'],
    ['Why an agency and not an in-house team?', 'We put all our specialists at your disposal, without the fixed cost of hiring them.'],
    ['How do we start?', 'You write to us, we have a call and we send you a proposal.']] },
  it: { title: 'Domande frequenti', sub: 'Altre domande? Scrivici.', fast: 'Ti rispondiamo rapidamente su WhatsApp', items: [
    ['Quanto costa?', 'Dipende dal progetto. Dopo una prima chiacchierata ti inviamo un preventivo chiuso.'],
    ['In quanto tempo vedo i risultati?', 'Con gli Ads vediamo risultati in poche settimane. Con la SEO, tra 3 e 6 mesi. Un sito web lo consegniamo in qualche settimana o un paio di mesi, a seconda della complessità.'],
    ['Come funziona l’assistenza? Con chi parlo?', 'Un team con un project manager responsabile del tuo account, report chiari e risposte rapide sul canale che preferisci.'],
    ['Perché un’agenzia e non un team interno?', 'Mettiamo a tua disposizione tutti i nostri specialisti, senza il costo fisso di assumerli.'],
    ['Come iniziamo?', 'Ci scrivi, facciamo una call e ti inviamo una proposta.']] },
  de: { title: 'Häufige Fragen', sub: 'Noch Fragen? Schreib uns.', fast: 'Wir antworten schnell per WhatsApp', items: [
    ['Was kostet das?', 'Das hängt vom Umfang ab. Nach einem ersten Gespräch schicken wir dir ein verbindliches Angebot.'],
    ['Wann sehe ich Ergebnisse?', 'Bei Ads sehen wir Ergebnisse nach wenigen Wochen. Bei SEO nach 3 bis 6 Monaten. Eine Website liefern wir je nach Komplexität in einigen Wochen bis ein paar Monaten.'],
    ['Wie läuft die Betreuung? Wer ist mein Ansprechpartner?', 'Ein Team mit einem Projektmanager für deinen Account, klare Reports und schnelle Antworten über den Kanal deiner Wahl.'],
    ['Warum eine Agentur statt eines internen Teams?', 'Wir stellen dir alle unsere Spezialisten zur Verfügung – ohne die Fixkosten, sie einzustellen.'],
    ['Wie fangen wir an?', 'Du schreibst uns, wir telefonieren und schicken dir ein Angebot.']] },
  fr: { title: 'Questions fréquentes', sub: 'Une autre question ? Écrivez-nous.', fast: 'Nous répondons vite sur WhatsApp', items: [
    ['Combien ça coûte ?', 'Cela dépend du périmètre. Après un premier échange, nous vous envoyons un devis ferme.'],
    ['En combien de temps je vois des résultats ?', 'Avec les Ads, nous voyons des résultats en quelques semaines. En SEO, entre 3 et 6 mois. Nous livrons un site web en quelques semaines à deux mois, selon la complexité.'],
    ['Comment se passe l’accompagnement ? Qui est mon interlocuteur ?', 'Une équipe avec un chef de projet dédié à votre compte, des rapports clairs et des réponses rapides sur le canal de votre choix.'],
    ['Pourquoi une agence plutôt qu’une équipe interne ?', 'Nous mettons tous nos spécialistes à votre disposition, sans le coût fixe de les recruter.'],
    ['Comment on commence ?', 'Vous nous écrivez, nous faisons un appel et nous vous envoyons une proposition.']] },
};

export const FAQ_PLUS = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8 2.5v11M2.5 8h11"/></svg>';
export const FAQ_AV = '<span class="faq-av" aria-hidden="true"><svg viewBox="-11.7 -15.7 23.4 29.4"><path d="M-5.66 2.99A9 9 0 1 1 5.66 2.99" fill="none" stroke="currentColor" stroke-width="5"/><rect x="-5" y="9.5" width="10" height="4" fill="currentColor"/></svg></span>';

// Sin servidor todavía: si FORM_ENDPOINT está vacío, se abre el mail con los datos ya escritos.
export const FORM_ENDPOINT = '';
export const CONTACT_EMAIL = 'agustin@agenciacontesta.com';
export const WA_NUMBER = '+34 603 31 66 74';

export const FINAL_TEXT = {
  es: { t: ['Tu marca sacó un ', '6/10', '. Vamos por el ', '10/10', '.'], l: ['Hola, me llamo', 'Mi email es', 'A mi marca le falta'],
        ph: ['tu nombre', 'tu@email.com'], rot: ['SEO', 'Branding', 'Google Ads'], brand: 'Tu marca',
        send: 'Contéstame', wa: '¿Prefieres WhatsApp?', done: '¡Gracias, {n}! Te contestamos pronto.', err: 'No pudimos enviar el mensaje. Escríbenos por WhatsApp o por email y te respondemos enseguida.', req: 'Completa este campo', bad: 'Revisa el email',
        subject: 'Nuevo contacto desde la web' },
  en: { t: ['Your brand scored a ', '6/10', '. Let’s go for ', '10/10', '.'], l: ['Hi, my name is', 'My email is', 'My brand needs'],
        ph: ['your name', 'you@email.com'], rot: ['SEO', 'Branding', 'Google Ads'], brand: 'Your brand',
        send: 'Get back to me', wa: 'Prefer WhatsApp?', done: 'Thanks, {n}! We’ll get back to you soon.', err: 'We couldn’t send your message. Write to us on WhatsApp or by email and we’ll reply right away.', req: 'Please fill this in', bad: 'Check your email',
        subject: 'New contact from the website' },
  it: { t: ['Il tuo brand ha preso ', '6/10', '. Puntiamo al ', '10/10', '.'], l: ['Ciao, mi chiamo', 'La mia email è', 'Al mio brand manca'],
        ph: ['il tuo nome', 'tu@email.com'], rot: ['SEO', 'Branding', 'Google Ads'], brand: 'Il tuo brand',
        send: 'Rispondimi', wa: 'Preferisci WhatsApp?', done: 'Grazie, {n}! Ti rispondiamo presto.', err: 'Non siamo riusciti a inviare il messaggio. Scrivici su WhatsApp o via email e ti rispondiamo subito.', req: 'Compila questo campo', bad: 'Controlla l’email',
        subject: 'Nuovo contatto dal sito' },
  de: { t: ['Deine Marke hat eine ', '6/10', '. Holen wir die ', '10/10', '.'], l: ['Hallo, ich heiße', 'Meine E‑Mail ist', 'Meiner Marke fehlt'],
        ph: ['dein Name', 'du@email.com'], rot: ['SEO', 'Branding', 'Google Ads'], brand: 'Deine Marke',
        send: 'Antwortet mir', wa: 'Lieber WhatsApp?', done: 'Danke, {n}! Wir melden uns bald.', err: 'Deine Nachricht konnte nicht gesendet werden. Schreib uns per WhatsApp oder E-Mail, wir antworten sofort.', req: 'Bitte ausfüllen', bad: 'E-Mail prüfen',
        subject: 'Neuer Kontakt über die Website' },
  fr: { t: ['Votre marque a eu ', '6/10', '. Visons ', '10/10', '.'], l: ['Bonjour, je m’appelle', 'Mon email est', 'Il manque à ma marque'],
        ph: ['votre nom', 'vous@email.com'], rot: ['SEO', 'Branding', 'Google Ads'], brand: 'Votre marque',
        send: 'Répondez-moi', wa: 'Vous préférez WhatsApp ?', done: 'Merci, {n} ! Nous vous répondons vite.', err: 'Nous n’avons pas pu envoyer votre message. Écrivez-nous sur WhatsApp ou par email, nous vous répondons tout de suite.', req: 'Champ obligatoire', bad: 'Vérifiez l’email',
        subject: 'Nouveau contact depuis le site' },
};

export const CHECK_SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>';
export const SEND_SVG = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

export const FOOT_TEXT = {
  es: { pitch: ['¿Vamos por el ', '10/10', '?'], nav: 'Navegación', offices: 'Oficinas', contact: 'Contacto', rights: 'Todos los derechos reservados.', top: 'Volver arriba', c: ['España', 'Argentina', 'EE. UU.'] },
  en: { pitch: ['Shall we go for ', '10/10', '?'], nav: 'Navigation', offices: 'Offices', contact: 'Contact', rights: 'All rights reserved.', top: 'Back to top', c: ['Spain', 'Argentina', 'USA'] },
  it: { pitch: ['Puntiamo al ', '10/10', '?'], nav: 'Navigazione', offices: 'Uffici', contact: 'Contatti', rights: 'Tutti i diritti riservati.', top: 'Torna su', c: ['Spagna', 'Argentina', 'USA'] },
  de: { pitch: ['Holen wir die ', '10/10', '?'], nav: 'Navigation', offices: 'Büros', contact: 'Kontakt', rights: 'Alle Rechte vorbehalten.', top: 'Nach oben', c: ['Spanien', 'Argentinien', 'USA'] },
  fr: { pitch: ['On vise le ', '10/10', ' ?'], nav: 'Navigation', offices: 'Bureaux', contact: 'Contact', rights: 'Tous droits réservés.', top: 'Haut de page', c: ['Espagne', 'Argentine', 'États-Unis'] },
};

export const BLOG_URL = ''; // Con la dirección cargada, aparece "Blog" en la navegación del footer
