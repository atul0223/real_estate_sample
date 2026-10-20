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

/* ==========================================================
   i18n — English / Arabic
   ========================================================== */
const dict = {
  en: {
    brand: 'Dr. Farah Merhi', brandSub: 'Invest in Dubai',
    navWhy: 'Why Dubai', navServices: 'Services', navRecord: 'Track record', navAreas: 'Areas', navAbout: 'About', navCta: 'Book a call',
    s0eyebrow: 'Dr. Farah Merhi · Dubai Real Estate',
    s0title: 'Invest in Dubai,<br><em>intelligently.</em>',
    s0text: 'Pre-launch access, joint ventures and profitable flips — curated for investors who expect more from every dirham.',
    s1eyebrow: '01 — The advantage',
    s1title: 'Spain taxes up to 47%.<br>Dubai: <em>0%.</em>',
    s1text: 'No personal income tax, no capital gains tax on property, and full freehold ownership for foreigners in designated zones.',
    s2eyebrow: '02 — Pre-launch',
    s2title: 'Enter before<br>the <em>market</em> does.',
    s2text: 'Unique off-plan projects at launch pricing — floor by floor, the stage where the strongest returns are made.',
    s3eyebrow: '03 — Structure',
    s3title: 'Joint ventures.<br>Purchase groups.<br><em>Profitable flips.</em>',
    s3text: 'Pool capital, negotiate as one, and exit with precision.',
    s4eyebrow: '04 — Your move',
    s4title: 'Your Dubai portfolio<br>starts with <em>one call.</em>',
    ctaWhatsapp: 'Start on WhatsApp', ctaServices: 'View services', scrollHint: 'Scroll to explore',
    whyEyebrow: 'Why Dubai', whyTitle: 'A market built<br>for <em>investors.</em>',
    stat1: 'Personal income tax', stat2: 'Foreign ownership in freehold zones', statYr: 'yr',
    stat3: 'Golden Visa from AED 2M in property', stat4: 'Typical gross rental yields',
    taxTitle: 'Top personal income tax rate', taxNote: 'Approximate top marginal rates',
    taxSpain: 'Spain', taxUk: 'United Kingdom', taxDubai: 'Dubai, UAE',
    footnote: '*Indicative ranges only. Yields vary by area, unit and market conditions. Not financial advice.',
    svEyebrow: 'Services', svTitle: 'Five ways to <em>grow</em> in Dubai.',
    sv1tag: 'Off-plan', sv1t: 'Pre-launch access', sv1d: 'Priority allocation in unique off-plan launches before public release, at the earliest price tier.',
    sv2tag: 'Co-investment', sv2t: 'Joint ventures', sv2d: 'Co-invest with partners on larger assets — clear structures, shared upside and defined exits.',
    sv3tag: 'Value-add', sv3t: 'Profitable flips', sv3d: 'Identify undervalued or early-stage units, hold through value growth, and resell at the right moment.',
    sv4tag: 'Collective', sv4t: 'Purchase groups', sv4d: 'Combine buying power with other investors to unlock bulk pricing and better payment plans.',
    sv5tag: 'Secondary', sv5t: 'Sales &amp; leasing', sv5d: "Ready-property buying, selling and leasing with KASH Real Estate's boutique team.",
    trEyebrow: 'Track record', trTitle: 'Results that speak <em>quietly.</em>',
    trSub: 'Recent highlights from the field — closings, recognition and the deals clients ask about most.',
    tr1k: 'Just sold', tr1t: 'Binghatti × Mercedes-Benz Places', tr1d: 'Downtown Dubai · Branded residences',
    tr2k: 'Recognition', tr2t: 'Rising Star of November', tr2d: 'Awarded by KASH Real Estate · 2025',
    tr3k: 'Closings', tr3t: 'Top agent closing', tr3d: 'Downtown Dubai &amp; Jebel Ali transactions',
    arEyebrow: 'Areas', arTitle: 'Where the <em>opportunity</em> is.',
    prEyebrow: 'How it works', prTitle: 'From first call<br>to <em>keys in hand.</em>',
    p1t: 'Discovery call', p1d: 'Your goals, budget, timeline and risk appetite — understood in one conversation.',
    p2t: 'Curated shortlist', p2d: 'Pre-launch and off-market options matched to your numbers, with projected returns.',
    p3t: 'Structure &amp; secure', p3d: 'Solo, JV or purchase group — we negotiate, reserve and handle paperwork end to end.',
    p4t: 'Exit or hold', p4d: 'Resell at the right moment or lease for yield — with ongoing market guidance.',
    badgeTop: 'Rising Star',
    abEyebrow: 'About', abTitle: 'Meet <em>Dr. Farah Merhi.</em>',
    abText1: "Dubai-based with Lebanese roots, Dr. Farah Merhi helps local and international investors access the city's most compelling opportunities — from pre-launch allocations to structured joint ventures.",
    abText2: "Working with KASH Real Estate's boutique team, she pairs sharp market intelligence with a personal, discreet approach — in English and Arabic.",
    fact1: 'Instagram community', fact2: 'Languages', fact3: 'Markets covered',
    ctEyebrow: 'Contact', ctTitle: "Let's find your<br><em>next deal.</em>",
    ctSub: 'Share a few details and continue the conversation on WhatsApp — usually answered the same day.',
    ctOffice: 'KASH Real Estate · Jumeirah, Al Mina, Dubai',
    fName: 'Full name', fNamePh: 'Your name', fBudget: 'Budget', fInterest: 'Interest', fMsg: 'Message',
    fMsgPh: 'Preferred area, timeline, questions…', fSubmit: 'Continue on WhatsApp',
    o1: 'Pre-launch', o2: 'Joint venture', o3: 'Profitable flip', o4: 'Purchase group', o5: 'Buy / lease',
    errName: 'Please add your name so Farah knows who to reply to.',
    waIntro: "Hello Dr. Farah, I'm", waBudget: 'Budget', waInterest: 'Interest',
    footRights: 'Invest in Dubai', footCredit: 'Concept by softwarethekedar.in'
  },
  ar: {
    brand: 'د. فرح مرعي', brandSub: 'استثمر في دبي',
    navWhy: 'لماذا دبي', navServices: 'الخدمات', navRecord: 'الإنجازات', navAreas: 'المناطق', navAbout: 'من أنا', navCta: 'احجز استشارة',
    s0eyebrow: 'د. فرح مرعي · عقارات دبي',
    s0title: 'استثمر في دبي<br><em>بذكاء.</em>',
    s0text: 'وصول مبكر للمشاريع قبل الإطلاق، شراكات استثمارية وصفقات إعادة بيع مربحة — لمستثمرين يتوقعون المزيد من كل درهم.',
    s1eyebrow: '01 — الميزة',
    s1title: 'إسبانيا: ضرائب حتى 47٪.<br>دبي: <em>0٪.</em>',
    s1text: 'لا ضريبة على الدخل الشخصي، ولا ضريبة على أرباح العقارات، وتملّك حر كامل للأجانب في المناطق المخصصة.',
    s2eyebrow: '02 — ما قبل الإطلاق',
    s2title: 'ادخل قبل<br><em>السوق.</em>',
    s2text: 'مشاريع فريدة على المخطط بأسعار الإطلاق — طابقاً بطابق، حيث تُصنع أقوى العوائد.',
    s3eyebrow: '03 — الهيكلة',
    s3title: 'شراكات استثمارية.<br>مجموعات شراء.<br><em>صفقات مربحة.</em>',
    s3text: 'اجمع رأس المال، فاوض كجهة واحدة، واخرج بدقة.',
    s4eyebrow: '04 — خطوتك',
    s4title: 'محفظتك في دبي<br>تبدأ <em>بمكالمة واحدة.</em>',
    ctaWhatsapp: 'ابدأ عبر واتساب', ctaServices: 'استعرض الخدمات', scrollHint: 'مرّر للاستكشاف',
    whyEyebrow: 'لماذا دبي', whyTitle: 'سوق صُمّم<br>من أجل <em>المستثمرين.</em>',
    stat1: 'ضريبة الدخل الشخصي', stat2: 'تملّك للأجانب في مناطق التملك الحر', statYr: 'سنوات',
    stat3: 'إقامة ذهبية عند الاستثمار العقاري من 2 مليون درهم', stat4: 'متوسط العائد الإيجاري الإجمالي',
    taxTitle: 'أعلى معدل لضريبة الدخل الشخصي', taxNote: 'معدلات تقريبية',
    taxSpain: 'إسبانيا', taxUk: 'المملكة المتحدة', taxDubai: 'دبي، الإمارات',
    footnote: '*نطاقات تقريبية فقط. تختلف العوائد حسب المنطقة والوحدة وظروف السوق. ليست نصيحة مالية.',
    svEyebrow: 'الخدمات', svTitle: 'خمس طرق <em>للنمو</em> في دبي.',
    sv1tag: 'على المخطط', sv1t: 'الوصول قبل الإطلاق', sv1d: 'أولوية الحجز في مشاريع فريدة قبل طرحها للعامة، وبأدنى شريحة سعرية.',
    sv2tag: 'استثمار مشترك', sv2t: 'شراكات استثمارية', sv2d: 'استثمر مع شركاء في أصول أكبر — بهيكلة واضحة وأرباح مشتركة وخطط خروج محددة.',
    sv3tag: 'قيمة مضافة', sv3t: 'صفقات إعادة بيع مربحة', sv3d: 'اكتشاف وحدات بأقل من قيمتها أو في مراحلها الأولى، والاحتفاظ بها حتى ترتفع قيمتها ثم بيعها في الوقت المناسب.',
    sv4tag: 'جماعي', sv4t: 'مجموعات شراء', sv4d: 'اجمع قوتك الشرائية مع مستثمرين آخرين للحصول على أسعار أفضل وخطط دفع مميزة.',
    sv5tag: 'السوق الثانوي', sv5t: 'البيع والتأجير', sv5d: 'شراء وبيع وتأجير العقارات الجاهزة مع فريق كاش العقارية المتميز.',
    trEyebrow: 'الإنجازات', trTitle: 'نتائج تتحدث <em>بهدوء.</em>',
    trSub: 'أبرز الإنجازات الأخيرة — صفقات مغلقة، تكريمات، والمشاريع الأكثر طلباً.',
    tr1k: 'تم البيع', tr1t: 'بن غاطي × مرسيدس-بنز بليسز', tr1d: 'وسط مدينة دبي · مساكن بعلامة تجارية',
    tr2k: 'تكريم', tr2t: 'نجمة شهر نوفمبر الصاعدة', tr2d: 'من كاش العقارية · 2025',
    tr3k: 'صفقات', tr3t: 'إغلاق صفقات كأفضل وكيلة', tr3d: 'صفقات في وسط مدينة دبي وجبل علي',
    arEyebrow: 'المناطق', arTitle: 'حيث تكمن <em>الفرص.</em>',
    prEyebrow: 'كيف نعمل', prTitle: 'من المكالمة الأولى<br>حتى <em>استلام المفتاح.</em>',
    p1t: 'مكالمة تعارف', p1d: 'أهدافك وميزانيتك وجدولك الزمني ومدى تقبّلك للمخاطر — في محادثة واحدة.',
    p2t: 'قائمة مختارة', p2d: 'خيارات ما قبل الإطلاق وخارج السوق تناسب أرقامك، مع العوائد المتوقعة.',
    p3t: 'الهيكلة والحجز', p3d: 'استثمار فردي أو شراكة أو مجموعة شراء — نتفاوض ونحجز ونتولى الأوراق بالكامل.',
    p4t: 'البيع أو الاحتفاظ', p4d: 'بِع في الوقت المناسب أو أجّر لتحقيق دخل — مع متابعة مستمرة للسوق.',
    badgeTop: 'النجمة الصاعدة',
    abEyebrow: 'من أنا', abTitle: 'تعرّف على <em>د. فرح مرعي.</em>',
    abText1: 'مقيمة في دبي وذات جذور لبنانية، تساعد د. فرح مرعي المستثمرين المحليين والدوليين على الوصول إلى أفضل الفرص في المدينة — من الحجوزات قبل الإطلاق إلى الشراكات الاستثمارية المنظمة.',
    abText2: 'بالتعاون مع فريق كاش العقارية، تجمع بين المعرفة العميقة بالسوق وأسلوب شخصي يتسم بالخصوصية — باللغتين العربية والإنجليزية.',
    fact1: 'مجتمع إنستغرام', fact2: 'اللغات', fact3: 'الأسواق',
    ctEyebrow: 'تواصل', ctTitle: 'لنجد معاً<br><em>صفقتك القادمة.</em>',
    ctSub: 'شارك بعض التفاصيل وأكمل المحادثة عبر واتساب — عادةً نرد في اليوم نفسه.',
    ctOffice: 'كاش العقارية · جميرا، الميناء، دبي',
    fName: 'الاسم الكامل', fNamePh: 'اسمك', fBudget: 'الميزانية', fInterest: 'الاهتمام', fMsg: 'رسالتك',
    fMsgPh: 'المنطقة المفضلة، الجدول الزمني، أسئلتك…', fSubmit: 'المتابعة عبر واتساب',
    o1: 'ما قبل الإطلاق', o2: 'شراكة استثمارية', o3: 'صفقة إعادة بيع', o4: 'مجموعة شراء', o5: 'شراء / تأجير',
    errName: 'يرجى كتابة اسمك لتتمكن فرح من الرد عليك.',
    waIntro: 'مرحباً د. فرح، أنا', waBudget: 'الميزانية', waInterest: 'الاهتمام',
    footRights: 'استثمر في دبي', footCredit: 'تصميم softwarethekedar.in'
  }
};

const AREAS = [
  { en: 'Downtown Dubai', ar: 'وسط مدينة دبي', city: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Prime · Iconic', ar: 'موقع راقٍ · أيقوني' } },
  { en: 'Palm Jebel Ali', ar: 'نخلة جبل علي', city: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Waterfront · Growth', ar: 'واجهة بحرية · نمو' } },
  { en: 'Dubai Hills Estate', ar: 'دبي هيلز إستيت', city: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Family · Green', ar: 'عائلي · مساحات خضراء' } },
  { en: 'Expo City & D3', ar: 'مدينة إكسبو وحي التصميم', city: { en: 'Dubai', ar: 'دبي' }, tag: { en: 'Future districts', ar: 'مناطق المستقبل' } },
  { en: 'Saadiyat Island', ar: 'جزيرة السعديات', city: { en: 'Abu Dhabi', ar: 'أبوظبي' }, tag: { en: 'Culture · Beach', ar: 'ثقافة · شاطئ' } },
  { en: 'Yas Island', ar: 'جزيرة ياس', city: { en: 'Abu Dhabi', ar: 'أبوظبي' }, tag: { en: 'Leisure · Yield', ar: 'ترفيه · عائد' } }
];

let lang = 'en';
try { lang = localStorage.getItem('fm-lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }

const arrowSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function buildAreas() {
  document.getElementById('areasList').innerHTML = AREAS.map((a, i) => `
    <li class="area" data-reveal>
      <span class="area-idx">${String(i + 1).padStart(2, '0')}</span>
      <span class="area-name">${a[lang]}</span>
      <span class="area-meta"><b>${a.city[lang]}</b>${a.tag[lang]}</span>
      <span class="area-arrow">${arrowSvg}</span>
    </li>`).join('');

  const names = AREAS.map(a => `<span>${a[lang]}</span>`).join('');
  // Two identical halves so the loop is seamless
  document.getElementById('marquee').innerHTML = names + names + names + names;
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
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = dict[lang][el.dataset.i18nPh];
    if (v != null) el.placeholder = v;
  });
  document.title = lang === 'ar' ? 'د. فرح مرعي — استثمر في دبي' : 'Dr. Farah Merhi — Invest in Dubai';
  buildAreas();
  try { localStorage.setItem('fm-lang', lang); } catch (e) { /* storage unavailable */ }
}

applyLang(lang);
document.getElementById('year').textContent = new Date().getFullYear();

/* ==========================================================
   Smooth scroll
   ========================================================== */
let lenis = null;
if (!reduceMotion && Lenis) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

function scrollToTarget(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: sel === '#top' ? 0 : -10, duration: 1.6 });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}

/* ==========================================================
   3D scene — gold tower in a night skyline
   ========================================================== */
const rand = (a, b) => a + Math.random() * (b - a);
const smooth = (a, b, x) => { const t = Math.min(Math.max((x - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); };

function makeWindowTexture() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#000';
  g.fillRect(0, 0, 64, 128);
  for (let y = 4; y < 124; y += 8) {
    for (let x = 4; x < 60; x += 8) {
      if (Math.random() < 0.36) {
        const hot = Math.random() > 0.86;
        g.fillStyle = hot ? '#fff1d2' : `rgba(232, 186, 112, ${0.25 + Math.random() * 0.5})`;
        g.fillRect(x, y, 4, 5);
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function initScene() {
  const canvas = document.getElementById('webgl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
  } catch (e) {
    document.body.classList.add('no-webgl');
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0a08);
  scene.fog = new THREE.FogExp2(0x0b0a08, isMobile ? 0.0105 : 0.0085);

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 900);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // Lights — warm dusk
  scene.add(new THREE.HemisphereLight(0x8a6a44, 0x060504, 0.55));
  const sun = new THREE.DirectionalLight(0xffc68a, 1.7);
  sun.position.set(-80, 60, -60);
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x9fb4ff, 0.35);
  rim.position.set(60, 30, 80);
  scene.add(rim);
  const glow = new THREE.PointLight(0xe3b56a, 60, 70, 2);
  glow.position.set(0, 10, 10);
  scene.add(glow);

  // Ground + grid
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 900),
    new THREE.MeshStandardMaterial({ color: 0x0c0a08, roughness: 0.85, metalness: 0.3, envMapIntensity: 0.2 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const grid = new THREE.GridHelper(420, 105, 0xc9a86a, 0xc9a86a);
  grid.material.transparent = true;
  grid.material.opacity = 0.07;
  grid.position.y = 0.02;
  scene.add(grid);

  // Gold halo at the tower base
  const halo = new THREE.Mesh(
    new THREE.RingGeometry(7.5, 7.75, 96),
    new THREE.MeshBasicMaterial({ color: 0xe3c48a, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = 0.05;
  scene.add(halo);

  // City — instanced boxes grouped by height so window textures tile correctly
  const winTex = makeWindowTexture();
  const buckets = new Map();
  const dummy = new THREE.Object3D();
  const target = isMobile ? 170 : 400;
  let placed = 0, guard = 0;
  while (placed < target && guard < 8000) {
    guard++;
    const ang = Math.random() * Math.PI * 2;
    const r = rand(15, 160);
    const x = Math.cos(ang) * r;
    const z = Math.sin(ang) * r;
    if (Math.abs(x) < 8 && z > 10 && z < 100) continue; // keep the approach corridor clear
    const near = 1 - Math.min(r / 160, 1);
    const h = rand(3, 10) + Math.pow(near, 1.5) * rand(4, 36) * (Math.random() < 0.7 ? 1 : 0.35);
    const w = rand(2.4, 5.6), d = rand(2.4, 5.6);
    const key = Math.max(1, Math.min(9, Math.round(h / 5)));
    if (!buckets.has(key)) buckets.set(key, []);
    dummy.position.set(x, h / 2, z);
    dummy.rotation.y = Math.random() < 0.5 ? 0 : rand(0, Math.PI);
    dummy.scale.set(w, h, d);
    dummy.updateMatrix();
    buckets.get(key).push(dummy.matrix.clone());
    placed++;
  }
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  buckets.forEach((list, key) => {
    const tex = winTex.clone();
    tex.repeat.set(1, key * 0.6);
    tex.needsUpdate = true;
    const mat = new THREE.MeshStandardMaterial({
      color: 0x16120d, roughness: 0.55, metalness: 0.6, envMapIntensity: 0.35,
      emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.95
    });
    const mesh = new THREE.InstancedMesh(boxGeo, mat, list.length);
    list.forEach((m, i) => mesh.setMatrixAt(i, m));
    scene.add(mesh);
  });

  // Hero tower — stacked hexagonal floors that separate on scroll
  const tower = new THREE.Group();
  scene.add(tower);
  const floors = [];
  const N = 34, segH = 1.7;
  const towerMat = new THREE.MeshStandardMaterial({
    color: 0x2b241b, metalness: 0.95, roughness: 0.22, envMapIntensity: 1.3,
    emissive: 0x3b2a12, emissiveIntensity: 0.3
  });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xe3c48a, transparent: true, opacity: 0.65 });
  for (let i = 0; i < N; i++) {
    const rb = 0.7 + 5.2 * Math.pow(1 - i / N, 1.25);
    const rt = 0.7 + 5.2 * Math.pow(1 - (i + 1) / N, 1.25);
    const geo = new THREE.CylinderGeometry(rt, rb, segH * 0.9, 6, 1);
    const seg = new THREE.Group();
    seg.add(new THREE.Mesh(geo, towerMat), new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));
    const baseY = segH * 0.5 + i * segH;
    const rot0 = i * 0.055;
    const a = Math.random() * Math.PI * 2;
    seg.position.y = baseY;
    seg.rotation.y = rot0;
    floors.push({ seg, baseY, rot0, i, dx: Math.cos(a) * rand(0.5, 2), dz: Math.sin(a) * rand(0.5, 2), dr: rand(-0.7, 0.7) });
    tower.add(seg);
  }
  const topY = N * segH;
  const crown = new THREE.Group();
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.55, 14, 6), towerMat);
  spire.position.y = 7;
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xfff1cf }));
  beacon.position.y = 14.2;
  crown.add(spire, beacon);
  crown.position.y = topY;
  tower.add(crown);

  // Gold dust
  const pc = isMobile ? 600 : 1600;
  const pos = new Float32Array(pc * 3);
  for (let i = 0; i < pc; i++) {
    pos[i * 3] = rand(-130, 130);
    pos[i * 3 + 1] = rand(0, 130);
    pos[i * 3 + 2] = rand(-130, 130);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xe7c98f, size: 0.32, transparent: true, opacity: 0.55,
    depthWrite: false, blending: THREE.AdditiveBlending
  }));
  scene.add(dust);

  // Bloom (desktop only)
  let composer = null;
  if (!isMobile) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.7, 0.78));
    composer.addPass(new OutputPass());
  }

  // Camera choreography across the story
  const camPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 7, 96),
    new THREE.Vector3(34, 20, 54),
    new THREE.Vector3(26, 36, 26),
    new THREE.Vector3(-26, 60, 30),
    new THREE.Vector3(-8, 140, 62)
  ], false, 'centripetal');
  const lookPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 26, 0),
    new THREE.Vector3(0, 30, 0),
    new THREE.Vector3(0, 36, 0),
    new THREE.Vector3(0, 46, 0),
    new THREE.Vector3(0, 18, 0)
  ], false, 'centripetal');

  const state = { progress: 0, smooth: 0, intro: reduceMotion ? 0 : 60, active: true };
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
    camera.fov = aspect < 0.8 ? 54 : aspect < 1.2 ? 48 : 42;
    camera.updateProjectionMatrix();
  }
  fitCamera();

  window.addEventListener('resize', () => {
    fitCamera();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
  });

  // Adaptive quality: if the first frames are slow (weak GPU), drop bloom and resolution
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
        composer = null;
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

    state.smooth += (state.progress - state.smooth) * 0.07;
    const p = Math.min(Math.max(state.smooth, 0), 1);
    mouse.sx += (mouse.x - mouse.sx) * 0.05;
    mouse.sy += (mouse.y - mouse.sy) * 0.05;

    camPath.getPoint(p, camPos);
    lookPath.getPoint(p, lookAt);
    camPos.z += state.intro;
    camPos.y += state.intro * 0.15;
    camPos.x += mouse.sx * 3;
    camPos.y -= mouse.sy * 1.5;
    camera.position.copy(camPos);
    camera.lookAt(lookAt);

    // Explode between steps 2 and 3, reassemble before the end
    const e = smooth(0.3, 0.5, p) * (1 - smooth(0.7, 0.88, p));
    for (const f of floors) {
      f.seg.position.set(f.dx * e * 2.4, f.baseY + e * f.i * 0.8, f.dz * e * 2.4);
      f.seg.rotation.y = f.rot0 + e * f.dr + t * 0.04;
    }
    crown.position.y = topY + e * N * 0.8;
    edgeMat.opacity = 0.55 + e * 0.4;
    halo.scale.setScalar(1 + e * 0.5 + Math.sin(t * 1.4) * 0.02);
    halo.material.opacity = 0.35 + e * 0.4;
    beacon.material.color.setHSL(0.11, 0.9, 0.82 + Math.sin(t * 3) * 0.08);
    dust.rotation.y = t * 0.012;
    dust.position.y = Math.sin(t * 0.3) * 1.5;

    if (composer) composer.render();
    else renderer.render(scene, camera);
  }
  frame();

  return state;
}

const scene3d = initScene();

/* ==========================================================
   Scroll animations
   ========================================================== */
const mm = gsap.matchMedia();

// Services — horizontal pinned track on desktop (created first so later triggers account for the pin)
mm.add('(min-width: 900px)', () => {
  const track = document.querySelector('.h-track');
  const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
  const rtl = () => document.documentElement.dir === 'rtl';
  // RTL reverses the card order, so start at the far end and travel back to 0
  gsap.fromTo(track,
    { x: () => (rtl() ? -dist() : 0) },
    {
      x: () => (rtl() ? 0 : -dist()),
      ease: 'none',
      scrollTrigger: {
        trigger: '.services',
        start: 'top top',
        end: () => '+=' + dist(),
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });
});

// Story — steps, progress rail and 3D camera
const steps = gsap.utils.toArray('.step');
const railFill = document.querySelector('.rail-fill');
const railCurrent = document.querySelector('.rail-current');
const storyTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#story',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.6,
    onUpdate: self => {
      if (scene3d) scene3d.progress = self.progress;
      railFill.style.transform = `scaleY(${self.progress})`;
      const active = Math.min(steps.length - 1, Math.floor(self.progress * storyTl.duration() + 0.15));
      railCurrent.textContent = String(active + 1).padStart(2, '0');
    }
  }
});
steps.forEach((step, i) => {
  if (i > 0) storyTl.fromTo(step, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i - 0.15);
  if (i < steps.length - 1) storyTl.to(step, { autoAlpha: 0, y: -70, duration: 0.3, ease: 'power2.in' }, i + 0.55);
});
storyTl.to('.scroll-hint', { autoAlpha: 0, duration: 0.2 }, 0.3);

// Only render WebGL while the story is on screen
if (scene3d) {
  ScrollTrigger.create({
    trigger: '#story',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: self => { scene3d.active = self.isActive; }
  });
}

// Marquee — continuous drift, nudged by scroll velocity
const marquee = document.getElementById('marquee');
const marqueeTween = gsap.to(marquee, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
if (!reduceMotion) {
  ScrollTrigger.create({
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: self => {
      const v = gsap.utils.clamp(-4, 4, self.getVelocity() / 400);
      gsap.to(marqueeTween, { timeScale: 1 + Math.abs(v), duration: 0.3, overwrite: true });
    }
  });
} else {
  marqueeTween.pause();
}

function setupReveals() {
  gsap.utils.toArray('.mask > span').forEach(el => {
    gsap.from(el, {
      yPercent: 110, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: el.parentElement, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 46, autoAlpha: 0, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  gsap.utils.toArray('[data-count]').forEach(el => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(obj.v); } })
    });
  });

  gsap.utils.toArray('.tax-fill').forEach(el => {
    gsap.to(el, {
      width: el.dataset.w + '%', duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%' }
    });
  });

  gsap.to('.process-line span', {
    scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '.process', start: 'top 70%', end: 'bottom 60%', scrub: true }
  });

  gsap.fromTo('.footer-word', { yPercent: 40 }, {
    yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });
}

if (reduceMotion) {
  gsap.utils.toArray('.tax-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
  gsap.utils.toArray('[data-count]').forEach(el => { el.textContent = el.dataset.count; });
  gsap.set('.process-line span', { scaleY: 1 });
} else {
  setupReveals();
}

/* ==========================================================
   Interactions
   ========================================================== */
// Nav state
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 40);
  nav.classList.toggle('is-hidden', y > lastY && y > window.innerHeight * 1.2 && !document.body.classList.contains('menu-open'));
  lastY = y;
}, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  if (lenis) open ? lenis.stop() : lenis.start();
}
burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));

// Anchor links
document.querySelectorAll('[data-scroll]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    scrollToTarget(href);
  });
});

// Language toggle
document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(lang === 'en' ? 'ar' : 'en');
  // New area rows need their own reveal state
  gsap.set('#areasList [data-reveal]', { autoAlpha: 1, y: 0 });
  ScrollTrigger.refresh();
});

// Custom cursor, magnetic buttons and 3D tilt (pointer devices only)
if (finePointer && !reduceMotion) {
  const cursor = document.querySelector('.cursor');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
  window.addEventListener('pointermove', e => {
    cursor.classList.add('is-visible');
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerover', e => {
    cursor.classList.toggle('is-hover', !!e.target.closest('a, button, [data-tilt], .area, input, select, textarea'));
  });

  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: 'power3.out' });
    });
    btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }));
  });

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 12, rotateX: -py * 12, transformPerspective: 900, duration: 0.6, ease: 'power3.out' });
    });
    card.addEventListener('pointerleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1, 0.5)' }));
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
  const lines = [
    `${d.waIntro} ${name}.`,
    `${d.waBudget}: ${form.budget.value}`,
    `${d.waInterest}: ${interest}`,
    form.message.value.trim()
  ].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
});

/* ==========================================================
   Loader → intro
   ========================================================== */
const loaderState = { v: 0 };
const countEl = document.querySelector('.loader-count');
const barEl = document.querySelector('.loader-bar span');

Promise.all([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise(res => gsap.to(loaderState, {
    v: 100,
    duration: reduceMotion ? 0.2 : 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      countEl.textContent = Math.round(loaderState.v);
      barEl.style.transform = `scaleX(${loaderState.v / 100})`;
    },
    onComplete: res
  }))
]).then(() => {
  document.body.classList.remove('is-loading');
  if (lenis) lenis.start();
  ScrollTrigger.refresh();

  const intro = gsap.timeline();
  intro.to('.loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' })
    .set('.loader', { display: 'none' });

  if (!reduceMotion) {
    if (scene3d) intro.to(scene3d, { intro: 0, duration: 2.6, ease: 'expo.out' }, 0.35);
    intro.from('.nav', { autoAlpha: 0, duration: 1, ease: 'power2.out', clearProps: 'opacity,visibility' }, 0.8)
      .from('.step-0 > *', { y: 60, autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' }, 0.75)
      .from('.scroll-hint, .rail', { autoAlpha: 0, duration: 0.8 }, 1.4);
  }
});
