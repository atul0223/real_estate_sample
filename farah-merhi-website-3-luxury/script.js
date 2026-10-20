import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const { gsap, ScrollTrigger, Lenis } = window;
gsap.registerPlugin(ScrollTrigger);

// TODO: replace with the client's real WhatsApp number (country code, no +)
const WHATSAPP = '971500000000';

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const desktopLayout = () => window.matchMedia('(min-width: 900px)').matches;

/* ==========================================================
   i18n
   ========================================================== */
const dict = {
  en: {
    menu: 'Menu', brandWord: 'Farah Merhi', navCta: 'Private enquiry',
    navServices: 'Services', navNumbers: 'Why Dubai', navCollection: 'Collection', navAreas: 'Areas', navCircle: 'Investor Circle', navAbout: 'About',
    menuSide: 'Private real estate advisory for discerning investors.',
    c0over: 'Dr. Farah Merhi · Dubai', c0title: 'Rare assets.<br><em>Rarer access.</em>',
    c0text: 'Private real estate investments in Dubai — pre-launch allocations, joint ventures and profitable flips.',
    c1over: 'The advantage', c1title: 'Brilliance,<br><em>tax-free.</em>',
    c1text: '0% personal income tax and no capital gains tax on property. In Spain, the top rate reaches 47%.',
    c2over: 'Due diligence', c2title: 'Every facet,<br><em>considered.</em>',
    c2text: 'Location, developer, payment plan, exit — each examined before you commit a single dirham.',
    c3over: 'Structure', c3title: 'Value,<br><em>multiplied.</em>',
    c3text: 'Purchase groups and joint ventures unlock pricing usually reserved for the few.',
    c4over: 'Your move', c4title: 'Your invitation<br>to <em>Dubai.</em>',
    ctaEnquire: 'Make a private enquiry', ctaDiscover: 'Discover services',
    sideL: 'Est. Dubai · KASH Real Estate', scrollCue: 'Scroll',
    ribbon1: ['Pre-launch', 'Joint ventures', 'Profitable flips', 'Purchase groups'],
    ribbon2: ['Downtown', 'Palm Jebel Ali', 'Dubai Hills', 'Saadiyat', 'Yas Island'],
    svOver: 'Services', svTitle: 'The <em>art</em> of the deal.',
    sv1t: 'Pre-launch access', sv1d: 'Priority allocation in unique launches before public release — the earliest price tier and the best floors.', sv1tag: 'Off-plan',
    sv2t: 'Joint ventures', sv2d: 'Co-invest alongside partners on larger assets with transparent structures, shared upside and defined exits.', sv2tag: 'Co-investment',
    sv3t: 'Profitable flips', sv3d: 'Undervalued and early-stage units, held through value growth and resold at precisely the right moment.', sv3tag: 'Value-add',
    sv4t: 'Purchase groups', sv4d: 'Pooled buying power for bulk pricing and payment plans no single buyer is offered.', sv4tag: 'Collective',
    sv5t: 'Sales &amp; leasing', sv5d: "Ready-property buying, selling and leasing with KASH Real Estate's boutique team.", sv5tag: 'Secondary',
    nmOver: 'Why Dubai', nmTitle: 'Where capital <em>shines.</em>', nm0: 'Personal income tax',
    rSpain: 'Spain', rUk: 'United Kingdom', rDubai: 'Dubai', rNote: 'Approximate top personal income tax rates.',
    nm1: 'Foreign freehold ownership in designated zones', nmYrs: 'yrs', nm2: 'Golden Visa with property from AED 2M', nm3: 'Typical gross rental yields',
    fine: '*Indicative ranges only; yields vary by area, unit and market conditions. Not financial advice.',
    clOver: 'The collection', clTitle: 'Closings &amp; <em>distinctions.</em>', sold: 'Sold',
    lot1n: 'Lot 01 · Just sold', lot1t: 'Binghatti × Mercedes-Benz Places', lot1d: 'Branded residences, Downtown Dubai',
    lot2n: 'Lot 02 · Distinction', lot2t: 'Rising Star of November', lot2d: 'Awarded by KASH Real Estate, 2025',
    lot3n: 'Lot 03 · Closings', lot3t: 'Top agent closing', lot3d: 'Downtown Dubai &amp; Jebel Ali',
    lot4n: 'Lot 04 · Community', lot4t: 'An investor following', lot4d: 'On Instagram, @investindubai33',
    arOver: 'Addresses',
    ivSmall: 'By invitation', ivTitle: 'The Private<br><em>Investor Circle</em>',
    ivText: 'Purchase groups &amp; joint ventures · Limited allocations · Launch-day pricing',
    ccOver: 'Membership', ccTitle: 'Invest as <em>one.</em>',
    ccText: 'A private circle of investors who pool their buying power — for allocations, pricing and payment terms that individual buyers rarely see.',
    pk1: 'First look at pre-launch projects', pk2: 'Group pricing &amp; negotiated terms', pk3: 'Structured JV opportunities', ccCta: 'Request an invitation',
    pfCap: 'Rising Star', abOver: 'The advisor', abTitle: 'Dr. Farah <em>Merhi</em>',
    abLead: 'Dubai-based, with Lebanese roots — trusted by local and international investors for access, discretion and results.',
    abBody: "Working with KASH Real Estate's boutique team, Farah curates Dubai's most compelling opportunities — from pre-launch allocations to structured joint ventures — and guides every client personally, in English or Arabic.",
    ctOver: 'Private enquiry', ctTitle: 'Begin the<br><em>conversation.</em>',
    ctText: 'Share a few details. Farah will continue the conversation personally and privately on WhatsApp.',
    ctAddr: 'KASH Real Estate · Jumeirah, Al Mina, Dubai',
    fName: 'Your name', fInterest: 'Interest', fBudget: 'Budget', fMsg: 'Message (optional)', fSubmit: 'Continue on WhatsApp',
    o1: 'Pre-launch', o2: 'Joint venture', o3: 'Profitable flip', o4: 'Investor Circle', o5: 'Buy / lease',
    errName: 'Please add your name so Farah knows who to reply to.',
    waIntro: "Hello Dr. Farah, I'm", waInterest: 'Interest', waBudget: 'Budget',
    footTag: 'Rare assets. Rarer access.', footCredit: 'Concept by softwarethekedar.in',
    title: 'Dr. Farah Merhi — Rare Assets, Dubai'
  },
  ar: {
    menu: 'القائمة', brandWord: 'فرح مرعي', navCta: 'استفسار خاص',
    navServices: 'الخدمات', navNumbers: 'لماذا دبي', navCollection: 'المجموعة', navAreas: 'المناطق', navCircle: 'دائرة المستثمرين', navAbout: 'من أنا',
    menuSide: 'استشارات عقارية خاصة لمستثمرين يعرفون ما يريدون.',
    c0over: 'د. فرح مرعي · دبي', c0title: 'أصول نادرة.<br><em>ووصول أندر.</em>',
    c0text: 'استثمارات عقارية خاصة في دبي — حجوزات ما قبل الإطلاق، شراكات استثمارية وصفقات مربحة.',
    c1over: 'الميزة', c1title: 'بريق<br><em>بلا ضرائب.</em>',
    c1text: '0٪ ضريبة على الدخل الشخصي ولا ضريبة على أرباح العقارات. في إسبانيا يصل أعلى معدل إلى 47٪.',
    c2over: 'الدراسة', c2title: 'كل وجه<br><em>مدروس.</em>',
    c2text: 'الموقع، المطوّر، خطة الدفع، والخروج — كلها تُدرس قبل أن تلتزم بدرهم واحد.',
    c3over: 'الهيكلة', c3title: 'قيمة<br><em>مضاعفة.</em>',
    c3text: 'مجموعات الشراء والشراكات تفتح أسعاراً لا تُتاح عادةً إلا للقلة.',
    c4over: 'خطوتك', c4title: 'دعوتك<br>إلى <em>دبي.</em>',
    ctaEnquire: 'أرسل استفساراً خاصاً', ctaDiscover: 'اكتشف الخدمات',
    sideL: 'دبي · كاش العقارية', scrollCue: 'مرّر',
    ribbon1: ['ما قبل الإطلاق', 'شراكات استثمارية', 'صفقات مربحة', 'مجموعات شراء'],
    ribbon2: ['وسط المدينة', 'نخلة جبل علي', 'دبي هيلز', 'السعديات', 'جزيرة ياس'],
    svOver: 'الخدمات', svTitle: '<em>فنّ</em> الصفقة.',
    sv1t: 'الوصول قبل الإطلاق', sv1d: 'أولوية الحجز في مشاريع فريدة قبل طرحها للعامة — بأدنى سعر وأفضل الطوابق.', sv1tag: 'على المخطط',
    sv2t: 'شراكات استثمارية', sv2d: 'استثمر مع شركاء في أصول أكبر بهياكل شفافة وأرباح مشتركة وخطط خروج واضحة.', sv2tag: 'استثمار مشترك',
    sv3t: 'صفقات إعادة بيع مربحة', sv3d: 'وحدات بأقل من قيمتها أو في مراحلها الأولى، يُحتفظ بها حتى ترتفع قيمتها ثم تُباع في اللحظة المناسبة.', sv3tag: 'قيمة مضافة',
    sv4t: 'مجموعات شراء', sv4d: 'قوة شرائية مجمّعة لأسعار وخطط دفع لا تُعرض على المشتري الفردي.', sv4tag: 'جماعي',
    sv5t: 'البيع والتأجير', sv5d: 'شراء وبيع وتأجير العقارات الجاهزة مع فريق كاش العقارية.', sv5tag: 'السوق الثانوي',
    nmOver: 'لماذا دبي', nmTitle: 'حيث <em>يتألق</em> رأس المال.', nm0: 'ضريبة الدخل الشخصي',
    rSpain: 'إسبانيا', rUk: 'المملكة المتحدة', rDubai: 'دبي', rNote: 'أعلى معدلات تقريبية لضريبة الدخل الشخصي.',
    nm1: 'تملّك حر للأجانب في المناطق المخصصة', nmYrs: 'سنوات', nm2: 'إقامة ذهبية مع عقار من 2 مليون درهم', nm3: 'متوسط العائد الإيجاري الإجمالي',
    fine: '*نطاقات تقريبية فقط؛ تختلف العوائد حسب المنطقة والوحدة وظروف السوق. ليست نصيحة مالية.',
    clOver: 'المجموعة', clTitle: 'صفقات <em>وتكريمات.</em>', sold: 'بيع',
    lot1n: 'القطعة 01 · تم البيع', lot1t: 'بن غاطي × مرسيدس-بنز بليسز', lot1d: 'مساكن بعلامة تجارية، وسط مدينة دبي',
    lot2n: 'القطعة 02 · تكريم', lot2t: 'نجمة شهر نوفمبر الصاعدة', lot2d: 'من كاش العقارية، 2025',
    lot3n: 'القطعة 03 · صفقات', lot3t: 'إغلاق صفقات كأفضل وكيلة', lot3d: 'وسط مدينة دبي وجبل علي',
    lot4n: 'القطعة 04 · مجتمع', lot4t: 'مجتمع من المستثمرين', lot4d: 'على إنستغرام، @investindubai33',
    arOver: 'العناوين',
    ivSmall: 'بدعوة خاصة', ivTitle: 'دائرة<br><em>المستثمرين الخاصة</em>',
    ivText: 'مجموعات شراء وشراكات · حصص محدودة · أسعار يوم الإطلاق',
    ccOver: 'العضوية', ccTitle: 'استثمروا <em>معاً.</em>',
    ccText: 'دائرة خاصة من المستثمرين يجمعون قوتهم الشرائية — للحصول على حصص وأسعار وشروط دفع نادراً ما يحصل عليها المشتري الفردي.',
    pk1: 'اطلاع أول على مشاريع ما قبل الإطلاق', pk2: 'أسعار جماعية وشروط تفاوضية', pk3: 'فرص شراكة منظمة', ccCta: 'اطلب دعوة',
    pfCap: 'النجمة الصاعدة', abOver: 'المستشارة', abTitle: 'د. فرح <em>مرعي</em>',
    abLead: 'مقيمة في دبي وذات جذور لبنانية — يثق بها المستثمرون المحليون والدوليون للوصول والخصوصية والنتائج.',
    abBody: 'بالتعاون مع فريق كاش العقارية، تختار فرح أفضل فرص دبي — من حجوزات ما قبل الإطلاق إلى الشراكات المنظمة — وترافق كل عميل شخصياً، بالعربية أو الإنجليزية.',
    ctOver: 'استفسار خاص', ctTitle: 'لنبدأ<br><em>الحديث.</em>',
    ctText: 'شارك بعض التفاصيل، وستتابع فرح المحادثة شخصياً وبخصوصية عبر واتساب.',
    ctAddr: 'كاش العقارية · جميرا، الميناء، دبي',
    fName: 'اسمك', fInterest: 'الاهتمام', fBudget: 'الميزانية', fMsg: 'رسالة (اختياري)', fSubmit: 'المتابعة عبر واتساب',
    o1: 'ما قبل الإطلاق', o2: 'شراكة استثمارية', o3: 'صفقة إعادة بيع', o4: 'دائرة المستثمرين', o5: 'شراء / تأجير',
    errName: 'يرجى كتابة اسمك لتتمكن فرح من الرد عليك.',
    waIntro: 'مرحباً د. فرح، أنا', waInterest: 'الاهتمام', waBudget: 'الميزانية',
    footTag: 'أصول نادرة. ووصول أندر.', footCredit: 'تصميم softwarethekedar.in',
    title: 'د. فرح مرعي — أصول نادرة، دبي'
  }
};

const AREAS = [
  { en: 'Downtown Dubai', ar: 'وسط مدينة دبي', em: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Prime · Iconic', ar: 'راقٍ · أيقوني' },
    d: { en: 'The Burj Khalifa district — branded residences and strong short-stay demand.', ar: 'منطقة برج خليفة — مساكن بعلامات تجارية وطلب قوي على الإيجار القصير.' } },
  { en: 'Palm Jebel Ali', ar: 'نخلة جبل علي', em: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Waterfront · Early stage', ar: 'واجهة بحرية · مرحلة مبكرة' },
    d: { en: "Nakheel's new Palm — waterfront villas with early-stage upside.", ar: 'نخلة نخيل الجديدة — فلل على الواجهة البحرية بفرص نمو مبكرة.' } },
  { en: 'Dubai Hills Estate', ar: 'دبي هيلز إستيت', em: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Family · Green', ar: 'عائلي · أخضر' },
    d: { en: "Emaar's green master community around a championship golf course.", ar: 'مجتمع إعمار المتكامل حول ملعب غولف عالمي.' } },
  { en: 'Expo City & D3', ar: 'إكسبو سيتي وحي التصميم', em: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Future districts', ar: 'مناطق المستقبل' },
    d: { en: 'Future-facing districts around Expo City and Dubai Design District.', ar: 'مناطق المستقبل حول مدينة إكسبو وحي دبي للتصميم.' } },
  { en: 'Saadiyat Island', ar: 'جزيرة السعديات', em: { en: 'Abu Dhabi', ar: 'أبوظبي' }, tag: { en: 'Culture · Beach', ar: 'ثقافة · شاطئ' },
    d: { en: "Abu Dhabi's cultural island — beaches, museums and prime villas.", ar: 'جزيرة أبوظبي الثقافية — شواطئ ومتاحف وفلل راقية.' } },
  { en: 'Yas Island', ar: 'جزيرة ياس', em: { en: 'Abu Dhabi', ar: 'أبوظبي' }, tag: { en: 'Leisure · Yield', ar: 'ترفيه · عائد' },
    d: { en: 'Theme parks and the F1 circuit — a leisure island built for rental yield.', ar: 'مدن ترفيهية وحلبة الفورمولا 1 — جزيرة ترفيهية مثالية للعائد الإيجاري.' } }
];

let lang = 'en';
try { lang = localStorage.getItem('fm3-lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }
let areaIndex = 0;

function buildRibbons() {
  const row = (words, solidEvery) => {
    const parts = words.map((w, i) => `<span class="${i % solidEvery === 1 ? 'solid' : ''}">${w}</span><span class="sep">◆</span>`).join('');
    return parts + parts + parts;
  };
  document.getElementById('ribbon1').innerHTML = row(dict[lang].ribbon1, 2);
  document.getElementById('ribbon2').innerHTML = row(dict[lang].ribbon2, 2);
}

function buildAreas() {
  document.getElementById('areaNames').innerHTML = AREAS.map((a, i) =>
    `<li class="${i === areaIndex ? 'is-on' : ''}">${a[lang]}<span class="area-desc">${a.d[lang]}</span></li>`).join('');
  fillAreaCard(areaIndex, false);
}

function fillAreaCard(i, animate = true) {
  const a = AREAS[i];
  const apply = () => {
    document.getElementById('acEmirate').textContent = a.em[lang];
    document.getElementById('acName').textContent = a[lang];
    document.getElementById('acText').textContent = a.d[lang];
    document.getElementById('acTag').textContent = a.tag[lang];
    document.getElementById('acIdx').textContent = String(i + 1).padStart(2, '0');
  };
  if (!animate || reduceMotion) { apply(); return; }
  const card = document.getElementById('areaCard');
  gsap.timeline()
    .to(card.children, { autoAlpha: 0, y: -12, duration: 0.25, stagger: 0.02, ease: 'power2.in', overwrite: true })
    .add(apply)
    .to(card.children, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'expo.out' });
}

function applyLang(next) {
  lang = next;
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[lang][el.dataset.i18n];
    if (typeof v === 'string') el.innerHTML = v;
  });
  document.title = dict[lang].title;
  buildRibbons();
  buildAreas();
  try { localStorage.setItem('fm3-lang', lang); } catch (e) { /* storage unavailable */ }
}

applyLang(lang);
document.getElementById('year').textContent = new Date().getFullYear();

/* ==========================================================
   Smooth scroll
   ========================================================== */
let lenis = null;
if (!reduceMotion && Lenis) {
  lenis = new Lenis({ duration: 1.3, smoothWheel: true, wheelMultiplier: 0.85 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
function scrollToTarget(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 2 });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

/* ==========================================================
   3D — a brilliant-cut diamond that shatters into facets
   ========================================================== */
const rand = (a, b) => a + Math.random() * (b - a);
const smooth = (a, b, x) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };

function glowTexture(stops) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach(([o, col]) => grd.addColorStop(o, col));
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function diamondGeometry() {
  // Brilliant-cut profile: culet → pavilion → girdle → crown → table
  const profile = [
    new THREE.Vector2(0.001, -1.6),
    new THREE.Vector2(0.78, -0.9),
    new THREE.Vector2(1.52, -0.1),
    new THREE.Vector2(1.52, 0.06),
    new THREE.Vector2(1.22, 0.38),
    new THREE.Vector2(0.86, 0.6),
    new THREE.Vector2(0.001, 0.6)
  ];
  const geo = new THREE.LatheGeometry(profile, 16).toNonIndexed();
  const pos = geo.attributes.position;
  const count = pos.count;
  const dirs = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), centre = new THREE.Vector3();
  for (let i = 0; i < count; i += 3) {
    a.fromBufferAttribute(pos, i);
    b.fromBufferAttribute(pos, i + 1);
    c.fromBufferAttribute(pos, i + 2);
    centre.copy(a).add(b).add(c).divideScalar(3);
    const dir = centre.clone().normalize();
    dir.x += rand(-0.25, 0.25); dir.y += rand(-0.25, 0.25); dir.z += rand(-0.25, 0.25);
    const r = Math.random();
    for (let k = 0; k < 3; k++) {
      dirs.set([dir.x, dir.y, dir.z], (i + k) * 3);
      rnd[i + k] = r;
    }
  }
  geo.setAttribute('aDir', new THREE.BufferAttribute(dirs, 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
  geo.computeVertexNormals();
  return geo;
}

function withExplode(material, uniforms) {
  material.onBeforeCompile = shader => {
    shader.uniforms.uExplode = uniforms.uExplode;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute vec3 aDir;\nattribute float aRand;\nuniform float uExplode;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += aDir * uExplode * (0.55 + aRand * 0.9);');
  };
  return material;
}

function initScene() {
  const canvas = document.getElementById('webgl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) {
    document.body.classList.add('no-webgl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050807);
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 9);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;

  // Gold glow behind the stone — refracted through the facets
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture([[0, 'rgba(240,210,150,0.38)'], [0.4, 'rgba(214,170,100,0.12)'], [1, 'rgba(214,170,100,0)']]),
    transparent: true, depthWrite: false
  }));
  glow.scale.set(7.5, 7.5, 1);
  glow.position.z = -4;
  scene.add(glow);
  const emeraldHaze = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture([[0, 'rgba(30,90,70,0.6)'], [1, 'rgba(30,90,70,0)']]),
    transparent: true, depthWrite: false
  }));
  emeraldHaze.scale.set(26, 26, 1);
  emeraldHaze.position.z = -10;
  scene.add(emeraldHaze);

  const uniforms = { uExplode: { value: 0 } };
  const geo = diamondGeometry();
  const gemGlass = withExplode(new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 1,
    thickness: 1.6,
    ior: 2.4,
    iridescence: 0.5,
    iridescenceIOR: 1.8,
    clearcoat: 1,
    envMapIntensity: 1.5,
    specularIntensity: 1,
    flatShading: true,
    side: THREE.DoubleSide
  }), uniforms);
  // Fallback for slow GPUs: mirror-polished facets, no transmission pass
  const gemLite = withExplode(new THREE.MeshPhysicalMaterial({
    color: 0xeae6f2, metalness: 0.55, roughness: 0.06, envMapIntensity: 1.4,
    iridescence: 0.7, iridescenceIOR: 1.7, clearcoat: 1, clearcoatRoughness: 0.05,
    emissive: 0x2a2012, emissiveIntensity: 0.6, flatShading: true, side: THREE.DoubleSide
  }), uniforms);

  const gem = new THREE.Group();
  const gemMesh = new THREE.Mesh(geo, isMobile ? gemLite : gemGlass);
  gem.add(gemMesh);
  scene.add(gem);

  // Gold orbit rings
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd6b476, metalness: 1, roughness: 0.18, envMapIntensity: 1.6 });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.012, 8, 220), goldMat);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.95, 0.008, 8, 220), goldMat);
  gem.add(ring1, ring2);

  // Gold dust
  const pc = isMobile ? 500 : 1100;
  const pos = new Float32Array(pc * 3);
  for (let i = 0; i < pc; i++) {
    const r = rand(2, 14), th = Math.random() * Math.PI * 2, ph = Math.acos(rand(-1, 1));
    pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.7, r * Math.sin(ph) * Math.sin(th) - 3], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xf0dcae, size: 0.028, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending
  }));
  scene.add(dust);

  // Key lights for sparkle
  const key = new THREE.PointLight(0xfff2d8, 14, 30, 2); key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.PointLight(0x9fd8c0, 10, 30, 2); rim.position.set(-5, -2, 3); scene.add(rim);

  let composer = null;
  function makeComposer() {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.38, 0.4, 0.9));
    composer.addPass(new OutputPass());
  }
  if (!isMobile) makeComposer();

  // Stone choreography per chapter: x, y, scale (x mirrors in RTL)
  const keysDesktop = [
    { x: 2.3, y: 0.15, s: 1 },
    { x: -2.3, y: 0.1, s: 0.95 },
    { x: 0, y: -1.05, s: 0.8 },
    { x: 2.3, y: 0.1, s: 1 },
    { x: 0, y: 2.05, s: 0.38 }
  ];
  const keysMobile = [
    { x: 0, y: 1.25, s: 0.62 },
    { x: 0, y: 1.25, s: 0.62 },
    { x: 0, y: 0.2, s: 0.62 },
    { x: 0, y: 1.25, s: 0.62 },
    { x: 0, y: 1.9, s: 0.4 }
  ];

  const state = { progress: 0, smooth: 0, intro: reduceMotion ? 0 : 1, active: true, mirror: 1 };
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  if (finePointer) {
    window.addEventListener('pointermove', e => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
  }

  function fit() {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    camera.fov = aspect < 0.8 ? 52 : aspect < 1.2 ? 42 : 35;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
  }
  fit();
  window.addEventListener('resize', fit);

  // Adaptive quality: drop bloom, then transmission, if frames are slow
  const perf = { frames: 0, start: 0, level: 0 };
  function checkPerf() {
    if (perf.level >= 2) return;
    const now = performance.now();
    if (perf.frames === 0) perf.start = now;
    perf.frames++;
    if (perf.frames === 75) {
      const avg = (now - perf.start) / 74;
      if (avg > 24) {
        perf.level++;
        if (perf.level === 1) { composer = null; }
        if (perf.level === 2) { gemMesh.material = gemLite; renderer.setPixelRatio(1); fit(); }
      }
      perf.frames = 0;
    }
  }

  const clock = new THREE.Clock();
  function frame() {
    requestAnimationFrame(frame);
    if (!state.active) return;
    checkPerf();
    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.elapsedTime;
    // Frame-rate independent easing toward the scroll position
    state.smooth += (state.progress - state.smooth) * (1 - Math.exp(-dt * 4.5));
    const p = Math.min(Math.max(state.smooth, 0), 1);
    const m = 1 - Math.exp(-dt * 3);
    mouse.sx += (mouse.x - mouse.sx) * m;
    mouse.sy += (mouse.y - mouse.sy) * m;

    // Interpolate the chapter keyframes
    const keys = window.innerWidth / window.innerHeight < 0.9 ? keysMobile : keysDesktop;
    const f = p * (keys.length - 1);
    const i0 = Math.min(Math.floor(f), keys.length - 2);
    const k = smooth(0, 1, f - i0);
    const A = keys[i0], B = keys[i0 + 1];
    const x = (A.x + (B.x - A.x) * k) * state.mirror;
    const y = A.y + (B.y - A.y) * k;
    const s = (A.s + (B.s - A.s) * k) * (1 - state.intro * 0.5);
    gem.position.set(x, y - state.intro * 0.6, 0);
    gem.scale.setScalar(s);
    glow.position.x = x * 0.9;
    glow.position.y = y;

    gemMesh.rotation.y = t * 0.22 + p * Math.PI * 3 + state.intro * 2;
    gemMesh.rotation.x = 0.38 + Math.sin(p * Math.PI) * 0.25 + mouse.sy * 0.15;
    gemMesh.rotation.z = mouse.sx * 0.12;
    ring1.rotation.set(Math.PI / 2 + 0.35 + p * 0.8, t * 0.15, 0);
    ring2.rotation.set(Math.PI / 2 - 0.5 - p * 0.6, -t * 0.1, 0.4);

    const e = smooth(0.38, 0.5, p) * (1 - smooth(0.6, 0.72, p));
    uniforms.uExplode.value = e * 1.7;
    ring1.scale.setScalar(1 + e * 0.35);
    ring2.scale.setScalar(1 + e * 0.55);

    dust.rotation.y = t * 0.02;
    camera.position.x = mouse.sx * 0.35;
    camera.position.y = -mouse.sy * 0.25;
    camera.lookAt(0, 0, 0);

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }
  frame();
  return state;
}

const scene3d = initScene();
if (scene3d) scene3d.mirror = lang === 'ar' ? -1 : 1;

/* ==========================================================
   Scroll choreography
   ========================================================== */
const mm = gsap.matchMedia();

// Areas — pinned scroller on desktop (created early so later triggers account for it)
mm.add('(min-width: 900px)', () => {
  const list = document.getElementById('areaNames');
  const place = (i, instant) => {
    const li = list.children[0];
    const h = li ? li.offsetHeight : 100;
    gsap.to(list, { y: -(i + 0.5) * h, duration: instant ? 0 : 0.9, ease: 'expo.out', overwrite: true });
  };
  place(areaIndex, true);
  ScrollTrigger.create({
    trigger: '.areas',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => {
      const i = Math.min(AREAS.length - 1, Math.floor(self.progress * AREAS.length));
      if (i !== areaIndex) {
        areaIndex = i;
        [...list.children].forEach((li, n) => li.classList.toggle('is-on', n === i));
        fillAreaCard(i);
        place(i);
      }
    },
    onRefresh: () => place(areaIndex, true)
  });
});

// Story
const chapters = gsap.utils.toArray('.chapter');
const storyBar = document.querySelector('.story-progress span');
const storyCurrent = document.querySelector('.story-current');
const storyTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: 0.7,
    onUpdate: self => {
      if (scene3d) scene3d.progress = self.progress;
      storyBar.style.transform = `scaleX(${self.progress})`;
      const a = Math.min(chapters.length - 1, Math.floor(self.progress * storyTl.duration() + 0.15));
      storyCurrent.textContent = String(a + 1).padStart(2, '0');
    }
  }
});
chapters.forEach((ch, i) => {
  if (i > 0) storyTl.fromTo(ch, { autoAlpha: 0, y: 50, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' }, i - 0.15);
  if (i < chapters.length - 1) storyTl.to(ch, { autoAlpha: 0, y: -50, filter: 'blur(8px)', duration: 0.3, ease: 'power2.in' }, i + 0.55);
});
storyTl.to('.scroll-cue', { autoAlpha: 0, duration: 0.2 }, 0.2);

if (scene3d) {
  ScrollTrigger.create({
    trigger: '#story', start: 'top bottom', end: 'bottom top',
    onToggle: self => { scene3d.active = self.isActive; }
  });
}

// Ribbons drift against each other with scroll
if (!reduceMotion) {
  gsap.fromTo('#ribbon1', { xPercent: 0 }, { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.ribbon', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('#ribbon2', { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.ribbon', start: 'top bottom', end: 'bottom top', scrub: true } });
}

function setupReveals() {
  gsap.utils.toArray('.mask > span').forEach(el => {
    gsap.from(el, { yPercent: 115, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: el.parentElement, start: 'top 88%' } });
  });
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  gsap.utils.toArray('.index-row').forEach((row, i) => {
    gsap.from(row, { y: 40, autoAlpha: 0, duration: 1.2, delay: i * 0.05, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 92%' } });
  });
  gsap.utils.toArray('[data-count]').forEach(el => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: 2.2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(obj.v); } })
    });
  });
  gsap.utils.toArray('.ruler-line i').forEach(el => {
    gsap.to(el, { width: el.dataset.w + '%', duration: 2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
  });
  gsap.fromTo('.hn-figure', { scale: 0.86, letterSpacing: '0.02em' }, {
    scale: 1, letterSpacing: '-0.06em', ease: 'none',
    scrollTrigger: { trigger: '.hero-number', start: 'top bottom', end: 'center 55%', scrub: true }
  });
  gsap.fromTo('.portrait-art', { clipPath: 'inset(100% 0 0 0)' }, {
    clipPath: 'inset(0% 0 0 0)', ease: 'expo.out', duration: 1.8,
    scrollTrigger: { trigger: '.portrait', start: 'top 80%' }
  });
  gsap.fromTo('.footer-mono', { yPercent: 35, opacity: 0.2 }, {
    yPercent: 0, opacity: 1, ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });
}
if (reduceMotion) {
  gsap.utils.toArray('.ruler-line i').forEach(el => { el.style.width = el.dataset.w + '%'; });
  gsap.utils.toArray('[data-count]').forEach(el => { el.textContent = el.dataset.count; });
} else {
  setupReveals();
}

/* ==========================================================
   Interactions
   ========================================================== */
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-solid', y > 60);
  if (y > lastY + 4 && y > window.innerHeight && !document.body.classList.contains('menu-open')) nav.classList.add('is-hidden');
  else if (y < lastY - 4) nav.classList.remove('is-hidden');
  lastY = y;
}, { passive: true });

const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  if (lenis) open ? lenis.stop() : lenis.start();
  if (open && !reduceMotion) {
    gsap.fromTo('.menu-links a', { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.06, ease: 'expo.out', delay: 0.25 });
  }
}
burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
window.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });

document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    scrollToTarget(href);
  });
});

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(lang === 'en' ? 'ar' : 'en');
  if (scene3d) scene3d.mirror = lang === 'ar' ? -1 : 1;
  ScrollTrigger.refresh();
});

// Services — floating preview follows the cursor
const preview = document.getElementById('preview');
const pvs = preview.querySelectorAll('.pv');
if (finePointer && !reduceMotion) {
  const pX = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
  const pY = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
  const inner = preview.querySelector('.preview-inner');
  let lastX = 0;
  const index = document.getElementById('serviceIndex');
  index.addEventListener('pointermove', e => {
    pX(e.clientX);
    pY(e.clientY);
    const vx = gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6);
    gsap.to(inner, { rotate: vx, duration: 0.6, ease: 'power3.out' });
    lastX = e.clientX;
  });
  index.addEventListener('pointerover', e => {
    const row = e.target.closest('.index-row');
    if (!row) return;
    preview.classList.add('is-on');
    pvs.forEach((pv, i) => pv.classList.toggle('is-on', i === Number(row.dataset.preview)));
  });
  index.addEventListener('pointerleave', () => preview.classList.remove('is-on'));
}

// Collection — drag, buttons, progress
const gallery = document.getElementById('gallery');
const galBar = document.getElementById('galBar');
function updateGalBar() {
  const max = gallery.scrollWidth - gallery.clientWidth;
  const ratio = gallery.clientWidth / gallery.scrollWidth;
  const prog = max > 0 ? Math.abs(gallery.scrollLeft) / max : 0;
  galBar.style.width = ratio * 100 + '%';
  const dirSign = document.documentElement.dir === 'rtl' ? -1 : 1;
  galBar.style.transform = `translateX(${dirSign * prog * (1 / ratio - 1) * 100}%)`;
}
gallery.addEventListener('scroll', updateGalBar, { passive: true });
window.addEventListener('resize', updateGalBar);
updateGalBar();
const step = () => (gallery.querySelector('.lot').offsetWidth + 30) * (document.documentElement.dir === 'rtl' ? -1 : 1);
document.getElementById('galNext').addEventListener('click', () => gallery.scrollBy({ left: step(), behavior: 'smooth' }));
document.getElementById('galPrev').addEventListener('click', () => gallery.scrollBy({ left: -step(), behavior: 'smooth' }));
if (finePointer) {
  let down = false, sx = 0, sl = 0, moved = false;
  gallery.addEventListener('pointerdown', e => { down = true; moved = false; sx = e.clientX; sl = gallery.scrollLeft; });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 4) { moved = true; gallery.classList.add('is-dragging'); }
    gallery.scrollLeft = sl - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    gallery.classList.remove('is-dragging');
  });
  gallery.addEventListener('click', e => { if (moved) e.preventDefault(); }, true);
}

// Cursor, magnetic buttons, tilt
if (finePointer && !reduceMotion) {
  const cursor = document.querySelector('.cursor');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.3, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.3, ease: 'power3' });
  window.addEventListener('pointermove', e => { cursor.classList.add('is-visible'); xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('pointerover', e => {
    cursor.classList.toggle('is-hover', !!e.target.closest('a, button, .index-row, .lot, input, select, textarea, [data-tilt]'));
  });
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.5, ease: 'power3.out' });
    });
    btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }));
  });
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 14, rotateX: -py * 14, transformPerspective: 1000, duration: 0.8, ease: 'power3.out' });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }));
  });
}

// Lead form → WhatsApp
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
  const interest = form.interest.options[form.interest.selectedIndex].textContent;
  const lines = [`${d.waIntro} ${name}.`, `${d.waInterest}: ${interest}`, `${d.waBudget}: ${form.budget.value}`, form.message.value.trim()].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

/* ==========================================================
   Loader → intro
   ========================================================== */
const countEl = document.querySelector('.loader-count');
const loaderState = { v: 0 };
gsap.to('.loader-gem path', { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', stagger: 0.25 });

Promise.all([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise(res => gsap.to(loaderState, {
    v: 100, duration: reduceMotion ? 0.2 : 2.2, ease: 'power2.inOut',
    onUpdate: () => { countEl.textContent = Math.round(loaderState.v); },
    onComplete: res
  }))
]).then(() => {
  document.body.classList.remove('is-loading');
  if (lenis) lenis.start();
  ScrollTrigger.refresh();

  const intro = gsap.timeline();
  intro.to('.loader-gem, .loader-text', { autoAlpha: 0, y: -20, duration: 0.6, ease: 'power2.in' })
    .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.2, ease: 'expo.inOut' }, '-=0.1')
    .set('.loader', { display: 'none' });

  if (!reduceMotion) {
    if (scene3d) intro.to(scene3d, { intro: 0, duration: 2.8, ease: 'expo.out' }, 0.6);
    intro.from('.nav', { autoAlpha: 0, duration: 1.2, ease: 'power2.out', clearProps: 'opacity,visibility' }, 1.3)
      .from('.ch-0 > *', { y: 60, autoAlpha: 0, filter: 'blur(10px)', duration: 1.6, stagger: 0.14, ease: 'expo.out' }, 1.1)
      .from('.story-side, .scroll-cue', { autoAlpha: 0, duration: 1 }, 1.8);
  } else if (scene3d) {
    scene3d.intro = 0;
  }
});
