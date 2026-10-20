import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const { gsap, ScrollTrigger, Lenis } = window;
gsap.registerPlugin(ScrollTrigger);

// TODO: replace with the client's real WhatsApp number (country code, no +)
const WHATSAPP = '971500000000';

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ==========================================================
   i18n
   ========================================================== */
const dict = {
  en: {
    navServices: 'Services', navWhy: 'Why Dubai', navRecord: 'Track record', navAreas: 'Areas', navAbout: 'About', navCta: 'Private consultation',
    c0kicker: 'Private Real Estate Advisory · Dubai',
    c0title: 'The art of <em>investing</em><br>in Dubai.',
    c0m1: 'Pre-launch allocations', c0m2: 'Joint ventures', c0m3: 'Profitable flips',
    c1kicker: 'The advantage', c1title: 'Keep what<br>you <em>earn.</em>',
    c1text: "0% personal income tax and no capital gains tax on property — while Spain's top rate reaches 47%.",
    c2kicker: 'Pre-launch', c2title: 'Watch it rise<br>from <em>day one.</em>',
    c2text: 'Secure units in unique projects at launch pricing — before the skyline, and the price, catch up.',
    c3kicker: 'Structure', c3title: 'Invest <em>together,</em><br>exit precisely.',
    c3text: 'Joint ventures and purchase groups give you developer-level pricing and a clear path to profit.',
    c4kicker: 'Begin', c4title: 'Your address<br>in <em>Dubai</em> awaits.',
    ctaConsult: 'Book a private consultation', ctaExplore: 'Explore services',
    ch0: 'Overview', ch1: 'Advantage', ch2: 'Pre-launch', ch3: 'Structure', ch4: 'Begin',
    stKicker: 'A note from Farah',
    statement: 'Dubai rewards those who arrive *early* and choose *carefully.* My role is to bring you in before the market does — with structures that protect your capital and returns that *speak for themselves.*',
    stSign: 'Investment Advisor · KASH Real Estate',
    svKicker: 'Services', svTitle: 'Five ways to build<br>a <em>Dubai portfolio.</em>',
    sv1t: 'Pre-launch access', sv1d: 'Priority allocation in unique off-plan launches before public release — the earliest price tier, the best floors, the strongest upside.',
    sv1a: 'Launch-day pricing', sv1b: 'Developer payment plans', sv1c: 'Hand-picked units',
    sv2t: 'Joint ventures', sv2d: 'Co-invest alongside partners on larger assets with transparent structures, shared upside and defined exits.',
    sv2a: 'Clear ownership split', sv2b: 'Larger, better assets', sv2c: 'Shared due diligence',
    sv3t: 'Profitable flips', sv3d: 'Identify undervalued and early-stage units, hold through value growth, and resell at the right moment.',
    sv3a: 'Entry below market', sv3b: 'Timed resale strategy', sv3c: 'Buyer network',
    sv4t: 'Purchase groups', sv4d: 'Combine buying power with other investors to unlock bulk pricing and better payment plans than buying alone.',
    sv4a: 'Bulk-buy discounts', sv4b: 'Priority inventory', sv4c: 'Negotiated terms',
    sv5t: 'Sales &amp; leasing', sv5d: "Ready-property buying, selling and leasing with KASH Real Estate's boutique team — handled end to end.",
    sv5a: 'Ready &amp; secondary', sv5b: 'Tenant sourcing', sv5c: 'Full paperwork',
    whyKicker: 'Why Dubai', whyTitle: 'Built for <em>capital.</em>',
    whySub: 'Few cities combine tax efficiency, ownership freedom and residency benefits the way Dubai does.',
    b1l: 'Personal income tax', b1d: 'Rental income and resale profit stay yours.',
    b2l: 'Freehold ownership', b2d: 'For foreign buyers in designated zones.',
    b3l: 'Golden Visa', b3u: 'yrs', b3d: 'Residency with property from AED 2M.',
    b4l: 'Typical gross yields*', b4d: 'Among the strongest of global gateway cities.',
    b5l: 'Top income tax rate, approx.', cSpain: 'Spain', cUk: 'United Kingdom', cDubai: 'Dubai',
    footnote: '*Indicative ranges only; yields vary by area, unit and market conditions. Not financial advice.',
    justSold: 'Just sold', ftKicker: 'Featured closing', ftTitle: 'Binghatti × Mercedes-Benz Places',
    ftText: "Branded residences in Downtown Dubai — one of the city's most talked-about launches.",
    trKicker: 'Track record', trTitle: 'Quiet results,<br><em>loud returns.</em>',
    aw1t: 'Rising Star of November', aw1d: 'KASH Real Estate', awOngoing: 'Ongoing',
    aw2t: 'Top agent closing', aw2d: 'Downtown Dubai &amp; Jebel Ali',
    aw3t: 'Investor community', aw3d: 'Following on Instagram',
    arKicker: 'Areas', arTitle: 'The coast of <em>opportunity.</em>',
    mapAbu: 'ABU DHABI', mapDubai: 'DUBAI', mapGulf: 'Arabian Gulf',
    prKicker: 'How it works', prTitle: 'Four steps to <em>the keys.</em>',
    p1t: 'Discovery', p1d: 'Goals, budget, timeline and risk appetite — understood in a single conversation.',
    p2t: 'Shortlist', p2d: 'Pre-launch and off-market options matched to your numbers, with projected returns.',
    p3t: 'Secure', p3d: 'Solo, JV or purchase group — negotiated, reserved and documented end to end.',
    p4t: 'Exit or hold', p4d: 'Resell at the right moment or lease for yield, with ongoing market guidance.',
    abKicker: 'About', abTitle: 'Dr. Farah <em>Merhi.</em>',
    abLead: "Dubai-based, with Lebanese roots — advising local and international investors on the city's most compelling opportunities.",
    abText: "Working with KASH Real Estate's boutique team, Farah pairs sharp market intelligence with a personal, discreet approach. From pre-launch allocations to structured joint ventures, every recommendation starts with your numbers — in English or Arabic.",
    capTitle: 'Rising Star',
    ctKicker: 'Private consultation', ctTitle: "Let's talk about<br>your <em>next address.</em>",
    ctSub: "Tell Farah what you're looking for. The conversation continues privately on WhatsApp.",
    ctOfficeL: 'Office', ctOffice: 'KASH Real Estate · Jumeirah, Al Mina, Dubai', ctLangL: 'Languages',
    fInterest: "I'm interested in", fBudget: 'Budget', fName: 'Your name', fMsg: 'Anything else? (optional)', fSubmit: 'Continue on WhatsApp',
    o1: 'Pre-launch', o2: 'Joint venture', o3: 'Profitable flip', o4: 'Purchase group', o5: 'Buy / lease',
    errName: 'Please add your name so Farah knows who to reply to.',
    waIntro: "Hello Dr. Farah, I'm", waInterest: 'Interested in', waBudget: 'Budget',
    footLine: 'Dubai, considered.', toTop: 'Back to top ↑', footCredit: 'Concept by softwarethekedar.in',
    title: 'Dr. Farah Merhi — Private Real Estate Advisory, Dubai'
  },
  ar: {
    navServices: 'الخدمات', navWhy: 'لماذا دبي', navRecord: 'الإنجازات', navAreas: 'المناطق', navAbout: 'من أنا', navCta: 'استشارة خاصة',
    c0kicker: 'استشارات عقارية خاصة · دبي',
    c0title: 'فنّ <em>الاستثمار</em><br>في دبي.',
    c0m1: 'حجوزات ما قبل الإطلاق', c0m2: 'شراكات استثمارية', c0m3: 'صفقات مربحة',
    c1kicker: 'الميزة', c1title: 'احتفظ بكل<br>ما <em>تكسبه.</em>',
    c1text: '0٪ ضريبة على الدخل الشخصي ولا ضريبة على أرباح العقارات — بينما يصل أعلى معدل في إسبانيا إلى 47٪.',
    c2kicker: 'ما قبل الإطلاق', c2title: 'شاهد استثمارك يرتفع<br>من <em>اليوم الأول.</em>',
    c2text: 'احجز وحدات في مشاريع فريدة بأسعار الإطلاق — قبل أن ترتفع الأبراج والأسعار.',
    c3kicker: 'الهيكلة', c3title: 'استثمر <em>معاً،</em><br>واخرج بدقة.',
    c3text: 'الشراكات ومجموعات الشراء تمنحك أسعاراً بمستوى المطوّر ومساراً واضحاً للربح.',
    c4kicker: 'ابدأ', c4title: 'عنوانك<br>في <em>دبي</em> بانتظارك.',
    ctaConsult: 'احجز استشارة خاصة', ctaExplore: 'استعرض الخدمات',
    ch0: 'نظرة عامة', ch1: 'الميزة', ch2: 'ما قبل الإطلاق', ch3: 'الهيكلة', ch4: 'ابدأ',
    stKicker: 'كلمة من فرح',
    statement: 'دبي تكافئ من يصل *مبكراً* ويختار *بعناية.* دوري أن أُدخلك قبل السوق — بهياكل تحمي رأس مالك وعوائد *تتحدث عن نفسها.*',
    stSign: 'مستشارة استثمار · كاش العقارية',
    svKicker: 'الخدمات', svTitle: 'خمس طرق لبناء<br><em>محفظتك في دبي.</em>',
    sv1t: 'الوصول قبل الإطلاق', sv1d: 'أولوية الحجز في مشاريع فريدة قبل طرحها للعامة — بأدنى شريحة سعرية وأفضل الطوابق وأعلى فرص النمو.',
    sv1a: 'أسعار يوم الإطلاق', sv1b: 'خطط دفع من المطوّر', sv1c: 'وحدات مختارة',
    sv2t: 'شراكات استثمارية', sv2d: 'استثمر مع شركاء في أصول أكبر بهياكل شفافة وأرباح مشتركة وخطط خروج واضحة.',
    sv2a: 'تقسيم ملكية واضح', sv2b: 'أصول أكبر وأفضل', sv2c: 'دراسة مشتركة',
    sv3t: 'صفقات إعادة بيع مربحة', sv3d: 'اكتشاف وحدات بأقل من قيمتها أو في مراحلها الأولى، والاحتفاظ بها مع نمو قيمتها، ثم بيعها في الوقت المناسب.',
    sv3a: 'دخول بأقل من السوق', sv3b: 'توقيت مدروس للبيع', sv3c: 'شبكة مشترين',
    sv4t: 'مجموعات شراء', sv4d: 'اجمع قوتك الشرائية مع مستثمرين آخرين للحصول على أسعار وخطط دفع أفضل من الشراء منفرداً.',
    sv4a: 'خصومات الشراء بالجملة', sv4b: 'أولوية في الوحدات', sv4c: 'شروط تفاوضية',
    sv5t: 'البيع والتأجير', sv5d: 'شراء وبيع وتأجير العقارات الجاهزة مع فريق كاش العقارية — من البداية حتى النهاية.',
    sv5a: 'جاهز وسوق ثانوي', sv5b: 'إيجاد المستأجرين', sv5c: 'إنجاز كامل للأوراق',
    whyKicker: 'لماذا دبي', whyTitle: 'مدينة صُممت <em>لرأس المال.</em>',
    whySub: 'قليلة هي المدن التي تجمع بين الكفاءة الضريبية وحرية التملك ومزايا الإقامة كما تفعل دبي.',
    b1l: 'ضريبة الدخل الشخصي', b1d: 'دخل الإيجار وأرباح البيع تبقى لك.',
    b2l: 'تملّك حر', b2d: 'للمشترين الأجانب في المناطق المخصصة.',
    b3l: 'الإقامة الذهبية', b3u: 'سنوات', b3d: 'إقامة عند التملك العقاري من 2 مليون درهم.',
    b4l: 'متوسط العائد الإجمالي*', b4d: 'من بين الأقوى بين المدن العالمية.',
    b5l: 'أعلى معدل لضريبة الدخل تقريباً', cSpain: 'إسبانيا', cUk: 'المملكة المتحدة', cDubai: 'دبي',
    footnote: '*نطاقات تقريبية فقط؛ تختلف العوائد حسب المنطقة والوحدة وظروف السوق. ليست نصيحة مالية.',
    justSold: 'تم البيع', ftKicker: 'صفقة مميزة', ftTitle: 'بن غاطي × مرسيدس-بنز بليسز',
    ftText: 'مساكن بعلامة تجارية في وسط مدينة دبي — من أكثر المشاريع حديثاً في المدينة.',
    trKicker: 'الإنجازات', trTitle: 'نتائج هادئة،<br><em>وعوائد واضحة.</em>',
    aw1t: 'نجمة شهر نوفمبر الصاعدة', aw1d: 'كاش العقارية', awOngoing: 'مستمر',
    aw2t: 'إغلاق صفقات كأفضل وكيلة', aw2d: 'وسط مدينة دبي وجبل علي',
    aw3t: 'مجتمع المستثمرين', aw3d: 'متابعون على إنستغرام',
    arKicker: 'المناطق', arTitle: 'ساحل <em>الفرص.</em>',
    mapAbu: 'أبوظبي', mapDubai: 'دبي', mapGulf: 'الخليج العربي',
    prKicker: 'كيف نعمل', prTitle: 'أربع خطوات <em>نحو المفتاح.</em>',
    p1t: 'التعارف', p1d: 'أهدافك وميزانيتك وجدولك الزمني ومدى تقبّلك للمخاطر — في محادثة واحدة.',
    p2t: 'قائمة مختارة', p2d: 'خيارات ما قبل الإطلاق وخارج السوق تناسب أرقامك، مع العوائد المتوقعة.',
    p3t: 'الحجز', p3d: 'فردي أو شراكة أو مجموعة شراء — تفاوض وحجز وتوثيق كامل.',
    p4t: 'البيع أو الاحتفاظ', p4d: 'بِع في الوقت المناسب أو أجّر لتحقيق دخل، مع متابعة مستمرة للسوق.',
    abKicker: 'من أنا', abTitle: 'د. فرح <em>مرعي.</em>',
    abLead: 'مقيمة في دبي وذات جذور لبنانية — تقدّم المشورة للمستثمرين المحليين والدوليين حول أفضل فرص المدينة.',
    abText: 'بالتعاون مع فريق كاش العقارية، تجمع فرح بين المعرفة العميقة بالسوق وأسلوب شخصي يتسم بالخصوصية. من حجوزات ما قبل الإطلاق إلى الشراكات المنظمة، تبدأ كل توصية من أرقامك — بالعربية أو الإنجليزية.',
    capTitle: 'النجمة الصاعدة',
    ctKicker: 'استشارة خاصة', ctTitle: 'لنتحدث عن<br><em>عنوانك القادم.</em>',
    ctSub: 'أخبر فرح بما تبحث عنه، وتستمر المحادثة بخصوصية عبر واتساب.',
    ctOfficeL: 'المكتب', ctOffice: 'كاش العقارية · جميرا، الميناء، دبي', ctLangL: 'اللغات',
    fInterest: 'أنا مهتم بـ', fBudget: 'الميزانية', fName: 'اسمك', fMsg: 'تفاصيل أخرى؟ (اختياري)', fSubmit: 'المتابعة عبر واتساب',
    o1: 'ما قبل الإطلاق', o2: 'شراكة استثمارية', o3: 'صفقة إعادة بيع', o4: 'مجموعة شراء', o5: 'شراء / تأجير',
    errName: 'يرجى كتابة اسمك لتتمكن فرح من الرد عليك.',
    waIntro: 'مرحباً د. فرح، أنا', waInterest: 'مهتم بـ', waBudget: 'الميزانية',
    footLine: 'دبي، باختيار مدروس.', toTop: 'العودة للأعلى ↑', footCredit: 'تصميم softwarethekedar.in',
    title: 'د. فرح مرعي — استشارات عقارية خاصة، دبي'
  }
};

const AREAS = [
  { en: 'Downtown Dubai', ar: 'وسط مدينة دبي', tag: { en: 'Prime · Iconic', ar: 'راقٍ · أيقوني' }, x: 702, y: 168 },
  { en: 'Dubai Hills Estate', ar: 'دبي هيلز إستيت', tag: { en: 'Family · Green', ar: 'عائلي · أخضر' }, x: 646, y: 214 },
  { en: 'Palm Jebel Ali', ar: 'نخلة جبل علي', tag: { en: 'Waterfront · Growth', ar: 'بحري · نمو' }, x: 462, y: 214 },
  { en: 'Expo City & D3', ar: 'مدينة إكسبو وحي التصميم', tag: { en: 'Future districts', ar: 'مناطق المستقبل' }, x: 530, y: 306 },
  { en: 'Saadiyat Island', ar: 'جزيرة السعديات', tag: { en: 'Culture · Beach', ar: 'ثقافة · شاطئ' }, x: 150, y: 350 },
  { en: 'Yas Island', ar: 'جزيرة ياس', tag: { en: 'Leisure · Yield', ar: 'ترفيه · عائد' }, x: 212, y: 392 }
];

let lang = 'en';
try { lang = localStorage.getItem('fm2-lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }

let activeArea = 0;

function buildStatement() {
  const el = document.getElementById('statementText');
  // *word* marks an emphasised run
  let em = false;
  el.innerHTML = dict[lang].statement.split(' ').map(word => {
    const starts = word.startsWith('*');
    const ends = word.endsWith('*') || word.endsWith('*.') || word.endsWith('*,');
    if (starts) em = true;
    const clean = word.replace(/\*/g, '');
    const html = `<span class="w${em ? ' is-em' : ''}">${clean}</span>`;
    if (ends) em = false;
    return html;
  }).join(' ');
}

function buildAreas() {
  document.getElementById('areaList').innerHTML = AREAS.map((a, i) => `
    <li><button class="area-btn${i === activeArea ? ' is-active' : ''}" type="button" data-area="${i}">
      <span class="n">${String(i + 1).padStart(2, '0')}</span>
      <span class="name">${a[lang]}</span>
      <span class="tag">${a.tag[lang]}</span>
    </button></li>`).join('');

  const rtl = lang === 'ar';
  document.getElementById('mapMarkers').innerHTML = AREAS.map((a, i) => `
    <g class="marker${i === activeArea ? ' is-active' : ''}" data-area="${i}" transform="translate(${a.x} ${a.y})">
      <circle class="ring" r="10"/>
      <circle class="dot" r="5"/>
      <text class="label" x="${rtl ? -14 : 14}" y="5" text-anchor="${rtl ? 'end' : 'start'}">${a[lang]}</text>
    </g>`).join('');
}

function setArea(i) {
  activeArea = i;
  document.querySelectorAll('.area-btn').forEach(b => b.classList.toggle('is-active', Number(b.dataset.area) === i));
  document.querySelectorAll('.marker').forEach(m => m.classList.toggle('is-active', Number(m.dataset.area) === i));
}

function applyLang(next) {
  lang = next;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[lang][el.dataset.i18n];
    if (v != null) el.innerHTML = v;
  });
  document.title = dict[lang].title;
  buildStatement();
  buildAreas();
  try { localStorage.setItem('fm2-lang', lang); } catch (e) { /* storage unavailable */ }
}

applyLang(lang);
document.getElementById('year').textContent = new Date().getFullYear();

/* ==========================================================
   Smooth scroll
   ========================================================== */
let lenis = null;
if (!reduceMotion && Lenis) {
  lenis = new Lenis({ duration: 1.2, smoothWheel: true, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

function scrollToTarget(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.8 });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

/* ==========================================================
   3D — a Palm island maquette that builds itself
   ========================================================== */
const rand = (a, b) => a + Math.random() * (b - a);
const smooth = (a, b, x) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };

function radialTexture(inner, outer) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, inner);
  grd.addColorStop(1, outer);
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function initScene() {
  const canvas = document.getElementById('webgl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch (e) {
    document.body.classList.add('no-webgl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // The sun never moves, so shadows only need re-rendering while buildings grow
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;

  const PAPER = 0xf4efe6;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(PAPER);
  scene.fog = new THREE.Fog(PAPER, 160, 560);

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.5, 1400);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // Daylight
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8c8aa, 1.1));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
  sun.position.set(-90, 130, 70);
  sun.castShadow = true;
  sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -110, right: 110, top: 110, bottom: -110, near: 10, far: 420 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);

  // Sea + shallows
  const sea = new THREE.Mesh(
    new THREE.PlaneGeometry(2400, 2400),
    new THREE.MeshStandardMaterial({ color: 0xbcd7d3, roughness: 0.18, metalness: 0.05, envMapIntensity: 0.7 })
  );
  sea.rotation.x = -Math.PI / 2;
  sea.receiveShadow = true;
  scene.add(sea);
  const shallows = new THREE.Mesh(
    new THREE.PlaneGeometry(220, 220),
    new THREE.MeshBasicMaterial({ map: radialTexture('rgba(226,240,235,0.95)', 'rgba(226,240,235,0)'), transparent: true, depthWrite: false })
  );
  shallows.rotation.x = -Math.PI / 2;
  shallows.position.set(0, 0.05, 12);
  scene.add(shallows);

  const sandMat = new THREE.MeshStandardMaterial({ color: 0xeadfc8, roughness: 0.95, metalness: 0 });

  // Mainland
  const land = new THREE.Mesh(new THREE.BoxGeometry(1400, 1.2, 600), sandMat);
  land.position.set(0, 0, 70 + 300);
  land.receiveShadow = true;
  scene.add(land);

  // Palm: trunk, fronds, crescent
  const palm = new THREE.Group();
  scene.add(palm);
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 78), sandMat);
  trunk.position.set(0, 0, 31);
  trunk.receiveShadow = trunk.castShadow = true;
  palm.add(trunk);

  const fronds = [];
  const FR = 8;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < FR; i++) {
      const z0 = -6 + i * 6;
      const ang = THREE.MathUtils.degToRad(28 + i * 10.5);
      const len = 30 + 12 * Math.sin(Math.PI * (i + 0.5) / FR);
      const dir = new THREE.Vector3(Math.sin(ang) * side, 0, -Math.cos(ang));
      const origin = new THREE.Vector3(side * 4.5, 0, z0);
      const geo = new THREE.CapsuleGeometry(1.7, len, 4, 12);
      geo.rotateX(Math.PI / 2);
      geo.scale(1, 0.36, 1);
      const m = new THREE.Mesh(geo, sandMat);
      const mid = origin.clone().addScaledVector(dir, len / 2);
      m.position.copy(mid);
      m.rotation.y = Math.atan2(dir.x, dir.z);
      m.receiveShadow = m.castShadow = true;
      palm.add(m);
      fronds.push({ origin, dir, len });
    }
  }

  const crescentGeo = new THREE.TorusGeometry(60, 2.6, 8, 120, THREE.MathUtils.degToRad(240));
  crescentGeo.rotateZ(THREE.MathUtils.degToRad(-30));
  crescentGeo.rotateX(-Math.PI / 2);
  crescentGeo.scale(1, 0.3, 1);
  const crescent = new THREE.Mesh(crescentGeo, sandMat);
  crescent.position.set(0, 0, 10);
  crescent.receiveShadow = crescent.castShadow = true;
  palm.add(crescent);

  // Buildings — each grows from the sand as you scroll
  const items = { villa: [], tower: [], glass: [] };
  const up = new THREE.Vector3(0, 1, 0);
  fronds.forEach(f => {
    const n = new THREE.Vector3().crossVectors(up, f.dir).normalize();
    for (let t = 4; t < f.len - 1; t += 2.4) {
      for (const s of [-1, 1]) {
        const p = f.origin.clone().addScaledVector(f.dir, t).addScaledVector(n, s * 0.95);
        items.villa.push({ x: p.x, z: p.z, w: 1.25, h: rand(0.8, 1.3), d: 1.25, ry: Math.atan2(f.dir.x, f.dir.z), base: 0.62 });
      }
    }
  });
  for (let z = -8; z < 66; z += 4.2) {
    for (const s of [-1, 1]) {
      const h = z < 10 ? rand(5, 9) : rand(3, 16);
      items.tower.push({ x: s * 2.6, z, w: 2.6, h, d: 3, ry: 0, base: 0.6 });
    }
  }
  for (let a = -30; a <= 210; a += 7) {
    const r = THREE.MathUtils.degToRad(a);
    items.tower.push({ x: Math.cos(r) * 60, z: 10 - Math.sin(r) * 60, w: 2.6, h: rand(2.5, 6), d: 2.6, ry: -r, base: 0.6 });
  }
  const shoreCount = isMobile ? 70 : 150;
  for (let i = 0; i < shoreCount; i++) {
    const x = rand(-260, 260);
    if (Math.abs(x) < 12) continue;
    // Keep the camera's flight corridor along the shore clear
    const z = Math.abs(x) < 140 ? rand(135, 200) : rand(80, 170);
    const near = 1 - Math.min(Math.abs(x) / 260, 1);
    items.glass.push({ x, z, w: rand(4, 8), h: rand(8, 24) + near * rand(10, 50), d: rand(4, 8), ry: 0, base: 0.6 });
  }

  const box = new THREE.BoxGeometry(1, 1, 1);
  box.translate(0, 0.5, 0); // grow upward from the base
  const mats = {
    villa: new THREE.MeshStandardMaterial({ color: 0xfbf8f2, roughness: 0.7 }),
    tower: new THREE.MeshStandardMaterial({ color: 0xf6f1e8, roughness: 0.55, metalness: 0.05 }),
    glass: new THREE.MeshStandardMaterial({ color: 0xeef1ee, roughness: 0.22, metalness: 0.25, envMapIntensity: 0.9 })
  };
  const meshes = {};
  const dummy = new THREE.Object3D();
  Object.keys(items).forEach(k => {
    const list = items[k];
    list.forEach(it => {
      const dist = Math.hypot(it.x, it.z - 25);
      it.delay = Math.min(1, dist / 90) * 0.65 + Math.random() * 0.35;
    });
    const mesh = new THREE.InstancedMesh(box, mats[k], list.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    meshes[k] = mesh;
    scene.add(mesh);
  });

  let lastBuild = -1;
  function applyBuild(build) {
    if (Math.abs(build - lastBuild) < 0.0015) return;
    lastBuild = build;
    Object.keys(items).forEach(k => {
      const mesh = meshes[k];
      items[k].forEach((it, i) => {
        const g = smooth(it.delay * 0.6, it.delay * 0.6 + 0.4, build);
        dummy.position.set(it.x, it.base, it.z);
        dummy.rotation.set(0, it.ry, 0);
        dummy.scale.set(it.w, Math.max(0.001, it.h * g), it.d);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    });
    renderer.shadowMap.needsUpdate = true;
  }

  // Signature tower at the trunk gate
  const sig = new THREE.Group();
  const sigMat = new THREE.MeshStandardMaterial({ color: 0xf2ebdf, roughness: 0.35, metalness: 0.2 });
  const bronzeMat = new THREE.MeshStandardMaterial({ color: 0xb08d57, roughness: 0.3, metalness: 0.9 });
  const sigBody = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 3.2, 34, 6, 1), sigMat);
  sigBody.geometry.translate(0, 17, 0);
  const sigCrown = new THREE.Mesh(new THREE.ConeGeometry(1.6, 9, 6), bronzeMat);
  sigCrown.position.y = 38.5;
  sig.add(sigBody, sigCrown);
  sig.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
  sig.position.set(0, 0.6, 72);
  scene.add(sig);

  // Clouds — visible from the satellite view, they part as we descend
  const cloudTex = radialTexture('rgba(255,255,255,0.95)', 'rgba(255,255,255,0)');
  const clouds = [];
  for (let i = 0; i < (isMobile ? 7 : 12); i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, transparent: true, depthWrite: false, opacity: 0.85 }));
    s.position.set(rand(-140, 140), rand(95, 150), rand(-110, 130));
    const k = rand(50, 110);
    s.scale.set(k, k * 0.6, 1);
    s.userData = { drift: rand(0.6, 1.4), x0: s.position.x };
    scene.add(s);
    clouds.push(s);
  }

  // Camera path: satellite → swoop → orbit → cinematic close
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 235, 60),
    new THREE.Vector3(110, 135, 140),
    new THREE.Vector3(78, 42, 102),
    new THREE.Vector3(-46, 22, 78),
    new THREE.Vector3(-120, 62, -40)
  ], false, 'centripetal');
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 14),
    new THREE.Vector3(0, 0, 14),
    new THREE.Vector3(0, 4, 26),
    new THREE.Vector3(0, 8, 30),
    new THREE.Vector3(0, 2, 18)
  ], false, 'centripetal');

  const state = { progress: 0, smooth: 0, intro: reduceMotion ? 0 : 1, active: true };
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const camPos = new THREE.Vector3();
  const lookAt = new THREE.Vector3();
  const clock = new THREE.Clock();

  if (finePointer) {
    window.addEventListener('pointermove', e => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
  }

  function fitCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.fov = aspect < 0.8 ? 58 : aspect < 1.2 ? 48 : 38;
    // On portrait screens the chapter card covers the lower half, so frame the scene higher
    if (aspect < 0.8) camera.setViewOffset(window.innerWidth, window.innerHeight, 0, window.innerHeight * 0.16, window.innerWidth, window.innerHeight);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  fitCamera();
  window.addEventListener('resize', () => {
    fitCamera();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  applyBuild(0);

  // Adaptive quality: if the first frames are slow (weak GPU), drop shadows and resolution
  const perf = { frames: 0, start: 0, downgraded: false };
  function checkPerf() {
    if (perf.downgraded) return;
    const now = performance.now();
    if (perf.frames === 0) perf.start = now;
    perf.frames++;
    if (perf.frames === 90) {
      const avg = (now - perf.start) / 89;
      if (avg > 26) {
        perf.downgraded = true;
        renderer.shadowMap.enabled = false;
        scene.traverse(o => { if (o.material) o.material.needsUpdate = true; });
        renderer.setPixelRatio(1);
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!state.active) return;
    checkPerf();
    const t = clock.getElapsedTime();

    state.smooth += (state.progress - state.smooth) * 0.065;
    const p = Math.min(Math.max(state.smooth, 0), 1);
    mouse.sx += (mouse.x - mouse.sx) * 0.04;
    mouse.sy += (mouse.y - mouse.sy) * 0.04;

    camPath.getPoint(p, camPos);
    lookPath.getPoint(p, lookAt);
    // Intro: start further up in the clouds
    camPos.y += state.intro * 160;
    camPos.z += state.intro * 40;
    camPos.x += mouse.sx * 4;
    camPos.y -= mouse.sy * 2;
    camera.position.copy(camPos);
    camera.lookAt(lookAt);

    // Build the city between the first and third chapters
    applyBuild(smooth(0.08, 0.62, p));
    const s = smooth(0.18, 0.52, p);
    if (Math.abs(sig.scale.y - Math.max(0.001, s)) > 0.001) {
      sig.scale.set(1, Math.max(0.001, s), 1);
      renderer.shadowMap.needsUpdate = true;
    }

    clouds.forEach(c => {
      c.position.x = c.userData.x0 + Math.sin(t * 0.05 * c.userData.drift) * 20;
      c.material.opacity = 0.85 * (1 - smooth(0.05, 0.3, p)) + 0.25 * state.intro;
    });

    renderer.render(scene, camera);
  }
  frame();

  return state;
}

const scene3d = initScene();

/* ==========================================================
   Scroll choreography
   ========================================================== */
// Story chapters
const chapters = gsap.utils.toArray('.chapter');
const chFill = document.querySelector('.chapters-fill');
const chLabels = gsap.utils.toArray('.chapters-labels li');
const storyTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#story',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    onUpdate: self => {
      if (scene3d) scene3d.progress = self.progress;
      chFill.style.transform = `scaleX(${self.progress})`;
      const active = Math.min(chapters.length - 1, Math.floor(self.progress * storyTl.duration() + 0.15));
      chLabels.forEach((li, i) => li.classList.toggle('is-active', i === active));
    }
  }
});
chapters.forEach((ch, i) => {
  if (i > 0) storyTl.fromTo(ch, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i - 0.15);
  if (i < chapters.length - 1) storyTl.to(ch, { autoAlpha: 0, y: -60, duration: 0.3, ease: 'power2.in' }, i + 0.55);
});

if (scene3d) {
  ScrollTrigger.create({
    trigger: '#story',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: self => { scene3d.active = self.isActive; }
  });
}

// Statement — words light up as you read
let statementTween = null;
function setupStatement() {
  if (statementTween) statementTween.scrollTrigger.kill(), statementTween.kill();
  const words = document.querySelectorAll('#statementText .w');
  if (reduceMotion) { gsap.set(words, { opacity: 1 }); return; }
  statementTween = gsap.to(words, {
    opacity: 1,
    stagger: 0.08,
    ease: 'none',
    scrollTrigger: { trigger: '#statementText', start: 'top 80%', end: 'bottom 45%', scrub: true }
  });
}
setupStatement();

// Stacking service cards — each recedes as the next arrives
const cards = gsap.utils.toArray('.stack-card');
if (!reduceMotion) {
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card, {
      scale: 0.93 - (cards.length - i) * 0.005,
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true }
    });
  });
}

function setupReveals() {
  gsap.utils.toArray('.mask > span').forEach(el => {
    gsap.from(el, { yPercent: 110, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el.parentElement, start: 'top 88%' } });
  });
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  gsap.utils.toArray('[data-count]').forEach(el => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(obj.v); } })
    });
  });
  gsap.utils.toArray('.compare-bar i').forEach(el => {
    gsap.to(el, { width: el.dataset.w + '%', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });
  // Featured tower rises with scroll
  gsap.from('.feature-tower i', {
    scaleY: 0, transformOrigin: 'bottom', stagger: 0.12, ease: 'none',
    scrollTrigger: { trigger: '.feature', start: 'top 85%', end: 'center 50%', scrub: true }
  });
  gsap.fromTo('.portrait-frame', { yPercent: 8 }, {
    yPercent: -8, ease: 'none',
    scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true }
  });
  gsap.fromTo('.footer-sig', { yPercent: 30, opacity: 0.2 }, {
    yPercent: 0, opacity: 1, ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });
}

if (reduceMotion) {
  gsap.utils.toArray('.compare-bar i').forEach(el => { el.style.width = el.dataset.w + '%'; });
  gsap.utils.toArray('[data-count]').forEach(el => { el.textContent = el.dataset.count; });
} else {
  setupReveals();
}

// Active pill link per section
['services', 'why', 'record', 'areas', 'about'].forEach(id => {
  const link = document.querySelector(`.pill a[href="#${id}"]`);
  ScrollTrigger.create({
    trigger: '#' + id,
    start: 'top 50%',
    end: 'bottom 50%',
    onToggle: self => link.classList.toggle('is-active', self.isActive)
  });
});

/* ==========================================================
   Interactions
   ========================================================== */
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-hidden', y > lastY + 2 && y > window.innerHeight && !document.body.classList.contains('menu-open'));
  if (y < lastY - 2) nav.classList.remove('is-hidden');
  lastY = y;
}, { passive: true });

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  if (lenis) open ? lenis.stop() : lenis.start();
}
burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));

document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    scrollToTarget(href);
  });
});

// Areas ↔ map
let areaTimer = null;
let areaPaused = false;
function startAreaCycle() {
  clearInterval(areaTimer);
  if (reduceMotion) return;
  areaTimer = setInterval(() => { if (!areaPaused) setArea((activeArea + 1) % AREAS.length); }, 2800);
}
const areasSection = document.querySelector('.areas-grid');
areasSection.addEventListener('pointerover', e => {
  const t = e.target.closest('[data-area]');
  if (t) setArea(Number(t.dataset.area));
});
areasSection.addEventListener('focusin', e => {
  const t = e.target.closest('[data-area]');
  if (t) setArea(Number(t.dataset.area));
});
areasSection.addEventListener('click', e => {
  const t = e.target.closest('[data-area]');
  if (t) setArea(Number(t.dataset.area));
});
areasSection.addEventListener('pointerenter', () => { areaPaused = true; });
areasSection.addEventListener('pointerleave', () => { areaPaused = false; });
ScrollTrigger.create({
  trigger: '.areas', start: 'top 70%', end: 'bottom 30%',
  onToggle: self => (self.isActive ? startAreaCycle() : clearInterval(areaTimer))
});

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(lang === 'en' ? 'ar' : 'en');
  setupStatement();
  ScrollTrigger.refresh();
});

if (finePointer && !reduceMotion) {
  const cursor = document.querySelector('.cursor');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
  window.addEventListener('pointermove', e => {
    cursor.classList.add('is-visible');
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerover', e => {
    cursor.classList.toggle('is-hover', !!e.target.closest('a, button, label, .marker, input, textarea'));
  });
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.5, ease: 'power3.out' });
    });
    btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }));
  });
}

document.getElementById('leadForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.currentTarget;
  const err = document.getElementById('formError');
  const name = form.name.value.trim();
  if (!name) {
    err.textContent = dict[lang].errName;
    form.name.focus();
    return;
  }
  err.textContent = '';
  const d = dict[lang];
  const interestInput = form.querySelector('input[name="interest"]:checked');
  const interest = interestInput ? interestInput.nextElementSibling.textContent : '';
  const budget = (form.querySelector('input[name="budget"]:checked') || {}).value || '';
  const lines = [`${d.waIntro} ${name}.`, `${d.waInterest}: ${interest}`, `${d.waBudget}: ${budget}`, form.message.value.trim()].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

/* ==========================================================
   Loader → intro
   ========================================================== */
const countEl = document.querySelector('.loader-count');
const loaderState = { v: 0 };

const loaderIn = gsap.timeline();
loaderIn.to('.loader-word', { y: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' }, 0.1);

Promise.all([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise(res => gsap.to(loaderState, {
    v: 100,
    duration: reduceMotion ? 0.2 : 2,
    ease: 'power2.inOut',
    onUpdate: () => { countEl.textContent = String(Math.round(loaderState.v)).padStart(3, '0'); },
    onComplete: res
  }))
]).then(() => {
  document.body.classList.remove('is-loading');
  if (lenis) lenis.start();
  ScrollTrigger.refresh();

  const intro = gsap.timeline();
  intro.to('.loader-word', { yPercent: -110, duration: 0.8, stagger: 0.06, ease: 'expo.in' })
    .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.2')
    .set('.loader', { display: 'none' });

  if (!reduceMotion) {
    if (scene3d) intro.to(scene3d, { intro: 0, duration: 3.2, ease: 'expo.out' }, 0.5);
    intro.from('.nav', { autoAlpha: 0, duration: 1, ease: 'power2.out', clearProps: 'opacity,visibility' }, 1.1)
      .from('.chapter-hero > *', { y: 50, autoAlpha: 0, duration: 1.3, stagger: 0.12, ease: 'expo.out' }, 1.05)
      .from('.chapters-bar', { autoAlpha: 0, duration: 0.8 }, 1.6);
  } else if (scene3d) {
    scene3d.intro = 0;
  }
});
