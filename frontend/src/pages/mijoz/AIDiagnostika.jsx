import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight, Bot, CheckCircle2, Droplets, Fan, Flame, Lightbulb,
  PlugZap, Send, ShieldAlert, Sparkles, Wrench, Paperclip, Image,
  Mic, Video, Volume2, Square, X, SwitchCamera, VolumeX, Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  SOZLAMALAR                                                         */
/* ------------------------------------------------------------------ */
// Haqiqiy AI (Claude/GPT) backend manzili. Bo'sh qoldirilsa, kod ichidagi
// lokal bilim bazasi javob beradi. Backend quyidagi formatda javob qaytarishi kerak:
//   POST { message, category, history, images } -> { reply: "matn", category?: "elektrik", urgent?: false }
// DIQQAT: API kalitni hech qachon frontend kodiga yozmang — faqat backendda saqlang.
const AI_ENDPOINT = ''; // masalan: '/api/chat'
const MAX_VIDEO_SECONDS = 60;
const MAX_AUDIO_SECONDS = 120;

const options = [
  { id: 'santexnika', label: 'Santexnika', icon: Droplets },
  { id: 'elektrik', label: 'Elektrik', icon: PlugZap },
  { id: 'konditsioner', label: 'Konditsioner', icon: Fan },
  { id: 'isitish', label: 'Isitish', icon: Flame },
  { id: 'boshqa', label: 'Boshqa', icon: Wrench },
];

const quickQuestions = [
  'Kranim tomchilayapti, nima qilay?',
  'Rozetkadan uchqun chiqdi',
  'Konditsioner sovutmayapti',
  'Radiator iliq emas',
];

/* ------------------------------------------------------------------ */
/*  LOKAL BILIM BAZASI (backend bo'lmaganda ishlaydi)                  */
/* ------------------------------------------------------------------ */
const normalize = (s = '') =>
  s.toLowerCase().replace(/[‘’ʻʼ`´]/g, "'").replace(/\s+/g, ' ').trim();

const URGENT = /gaz hidi|gaz chiq|tutun|uchqun|yong'in|yongin|tok ur|sim ochiq|suv tosh|toshib|quvur yoril|portla|kuy(di|moqda)|дым|искр|запах газа|пожар|прорвал/;

const KB = {
  santexnika: {
    words: /suv|kran|quvur|rakovina|unitaz|vanna|dush|sifon|tiqil|to'sil|смесител|кран|труба|вода|унитаз/,
    problems: [
      {
        re: /tomchi|oqy|oqad|oqib|капа|течёт|течет/,
        title: 'kran yoki ulanishdan suv sizishi',
        steps: [
          'Kran ostidagi yoki oqayotgan joy oldidagi burchak ventilini soat yo‘nalishida yoping.',
          'Oqayotgan joyni quruq latta bilan artib, qayerdan tomayotganini aniqlang (kran tanasi, gayka, shlang ulanishi).',
          'Rezina prokladka eskirgan bo‘lsa, almashtirish kerak bo‘ladi; gaykani haddan tashqari tortmang.',
          'Idish qo‘yib, suv yig‘ilishini nazorat qiling.',
        ],
      },
      {
        re: /tiqil|to'sil|ketmay|o'tmay|засор/,
        title: 'kanalizatsiya yoki sifon tiqilishi',
        steps: [
          'Kimyoviy tozalagich va qaynoq suvni bir vaqtda ishlatmang.',
          'Vantuz bilan 15–20 marta bosib ko‘ring, rakovinada ortiqcha teshikni nam latta bilan yoping.',
          'Sifonni ochish mumkin bo‘lsa, ostiga paqir qo‘yib tozalang.',
          'Natija bo‘lmasa, quvur tizimi uchun mutaxassis chaqiring.',
        ],
      },
      {
        re: /bosim|kuchsiz|past|sekin|давлени/,
        title: 'suv bosimining pastligi',
        steps: [
          'Boshqa kranlarda ham bosim pastmi, tekshiring — shunga qarab muammo umumiy yoki bitta nuqtada ekanini bilasiz.',
          'Kran aeratori (to‘rcha) ni burab oling va ohakdan tozalang.',
          'Asosiy ventil to‘liq ochiqligini tekshiring.',
        ],
      },
      {
        re: /unitaz|bachok|смыв/,
        title: 'unitaz bachogi muammosi',
        steps: [
          'Bachokka suv kirishini burchak ventili bilan to‘xtating.',
          'Qopqoqni ochib, floater (qalqovuch) va rezina klapanni tekshiring.',
          'Eskirgan rezina klapanni almashtirish odatda muammoni hal qiladi.',
        ],
      },
    ],
    fallback: 'Suv oqayotgan bo‘lsa, asosiy yoki burchak ventilni yoping va elektr jihozlarini suvdan uzoqlashtiring.',
  },
  elektrik: {
    words: /tok|rozetka|sim\b|simlar|elektr|chiroq|avtomat|svet|lampochka|vilka|schyotchik|ток|розетк|свет|провод/,
    problems: [
      {
        re: /uchqun|kuy|qiz(iy|ib|di)|issiq|hid|искр|горит/,
        title: 'rozetka yoki simning qizishi/uchqun chiqarishi',
        steps: [
          'Darhol shu liniya avtomatini (shitdagi) o‘chiring.',
          'Rozetkaga qo‘lingiz bilan tegmang, jihozlarni vilkadan uzing (faqat o‘chirilgandan keyin).',
          'Kuygan hid yoki tutun bo‘lsa, xonani shamollating va yonuvchi narsalarni uzoqlashtiring.',
          'Liniyani elektrik tekshirmaguncha qayta yoqmang.',
        ],
      },
      {
        re: /o'chdi|o'chib|ketdi|tushib|avtomat|yo'q|свет пропал|выбива/,
        title: 'avtomat tushishi yoki svet o‘chishi',
        steps: [
          'Qaysi avtomat tushganini aniqlang va avval shu liniyadagi barcha jihozlarni vilkadan uzing.',
          'Avtomatni bitta marta yoqib ko‘ring. Darhol yana tushsa, qayta yoqavermang.',
          'Jihozlarni birma-bir ulab, qaysi biri sababchi ekanini aniqlang.',
          'Sabab topilmasa, qisqa tutashuv bo‘lishi mumkin — elektrik chaqiring.',
        ],
      },
      {
        re: /miltil|chaq|lampochka|chiroq/,
        title: 'chiroqning miltillashi',
        steps: [
          'Lampochkani almashtirib ko‘ring (avval o‘chirib, sovishini kuting).',
          'Patron va kalitni tekshiring.',
          'Almashtirgandan keyin ham miltillasa, ulanishlarda muammo bor — mutaxassis kerak.',
        ],
      },
    ],
    fallback: 'Nam joydagi rozetka yoki ochiq simga yaqinlashmang. Xavfsiz bo‘lsa, elektrni avtomatdan o‘chiring.',
  },
  konditsioner: {
    words: /konditsioner|kondisioner|sovut|split|ichki blok|tashqi blok|кондиц|сплит/,
    problems: [
      {
        re: /sovutmay|sovuq emas|issiq havo|не холод|не охлажд/,
        title: 'konditsioner sovutmayapti',
        steps: [
          'Pultda rejim "Sovutish" va harorat xona haroratidan past qo‘yilganini tekshiring.',
          'Ichki blok filtrini oling va iliq suvda yuvib quriting — iflos filtr eng ko‘p uchraydigan sabab.',
          'Tashqi blok atrofi to‘silmaganini va ventilyator aylanayotganini ko‘ring.',
          'Yordam bermasa, freon yetishmasligi mumkin — mutaxassis kerak.',
        ],
      },
      {
        re: /suv|tom(ay|chi)|oqay|капа|течёт|течет/,
        title: 'ichki blokdan suv tomishi',
        steps: [
          'Qurilmani o‘chiring.',
          'Drenaj shlangi bukilmagan yoki tiqilmaganini tekshiring.',
          'Filtrni tozalang, chunki u ham suv tomishiga sabab bo‘ladi.',
          'Ichki qismlarni ochmang, drenaj tozalash uchun usta kerak.',
        ],
      },
      {
        re: /shovqin|tovush|gumbur|vibr|шум/,
        title: 'qurilmadan g‘alati shovqin chiqishi',
        steps: [
          'Qurilmani o‘chiring va tashqi blokning mahkamlanishini tekshiring.',
          'Ventilyator oldida begona narsa yo‘qligiga ishonch hosil qiling.',
          'Shovqin davom etsa, kompressor yoki podshipnik tekshiruvi kerak.',
        ],
      },
    ],
    fallback: 'Qurilmani o‘chirib, filtrini tekshiring. Ichki qismlarini ochishdan oldin mutaxassisni kuting.',
  },
  isitish: {
    words: /radiator|isitish|qozon|kotyol|batareya|gaz|termostat|отоплен|радиатор|котел|котёл|батаре/,
    problems: [
      {
        re: /iliq emas|sovuq|issiq emas|isimay|не греет|холодн/,
        title: 'radiator yoki batareya isimayapti',
        steps: [
          'Radiatorning yuqori qismini paypaslang: yuqori sovuq, pastki issiq bo‘lsa, ichida havo yig‘ilgan.',
          'Mayevskiy kranini ozgina ochib havoni chiqaring (idish va latta tayyorlang), suv chiqishi bilan yoping.',
          'Radiator kranlari to‘liq ochiqligini tekshiring.',
          'Tizim bosimi (manometr) normadan pastmi, qarang.',
        ],
      },
      {
        re: /bosim|manometr|xato|error|ошибк|давлени/,
        title: 'qozon bosimi yoki xato kodi',
        steps: [
          'Qozonni o‘chirib, xato kodini yozib oling.',
          'Bosim 1–1.5 bar atrofida bo‘lishi kerak; undan past/yuqori bo‘lsa o‘zingiz sozlamang.',
          'Gaz hidi sezilsa, darhol chiqib ketib, gaz xizmatiga qo‘ng‘iroq qiling.',
        ],
      },
    ],
    fallback: 'Tizimni o‘chirib, bosim yoki haroratni o‘zboshimchalik bilan o‘zgartirmang.',
  },
  boshqa: {
    words: /^$/,
    problems: [],
    fallback: 'Muammo joyini xavfsiz saqlang va shikastlangan qurilmani ishlatishni vaqtincha to‘xtating.',
  },
};

const GREET = /^(salom|assalom|assalomu alaykum|hello|hi|привет|здравствуй|hayrli|qalay|yaxshimisiz)/;
const THANKS = /rahmat|raxmat|tashakkur|спасибо|thanks/;
const PRICE = /narx|qancha tur|necha pul|to'lov|pul|нарх|цена|сколько стоит/;
const TIME = /qachon|necha soat|qancha vaqt|tez|когда/;
const HOWTO = /qanday|nima qil|nima qilay|nimaga|как /;

function scoreCategory(t, selected) {
  let best = selected;
  let bestScore = 0;
  Object.entries(KB).forEach(([id, item]) => {
    if (id === 'boshqa') return;
    const m = t.match(new RegExp(item.words.source, 'g'));
    const score = m ? m.length : 0;
    if (score > bestScore) { best = id; bestScore = score; }
  });
  return { category: best, matched: bestScore > 0 };
}

function localAnswer(rawText, selected, hasMedia) {
  const t = normalize(rawText);
  const onlyTag = /^\[[^\]]+\]$/.test(rawText.trim());
  const urgent = URGENT.test(t);

  if (!urgent && !onlyTag && t.length < 30) {
    if (GREET.test(t)) {
      return { text: 'Salom! Qanday muammo bor? Kran, rozetka, konditsioner yoki isitish tizimi haqida yozing, ovoz bilan ayting yoki rasm/video yuboring.' };
    }
    if (THANKS.test(t)) {
      return { text: 'Arzimaydi! Yana savol bo‘lsa, yozing. Xavfsizlikka e’tiborli bo‘ling.' };
    }
  }
  if (!urgent && PRICE.test(t) && !scoreCategory(t, selected).matched) {
    return { text: 'Narx ish turiga, qurilma holatiga va ehtiyot qismlarga bog‘liq. Aniq narxni mutaxassis ko‘rib chiqqandan keyin aytadi. Muammoni yozsangiz, qaysi usta kerakligini aniqlab, buyurtma berishingizga yordam beraman.' };
  }
  if (!urgent && TIME.test(t) && !scoreCategory(t, selected).matched) {
    return { text: 'Usta kelish vaqti hududingiz va band ustalarga bog‘liq. Buyurtma berishda manzil va qulay vaqtni ko‘rsatsangiz, mutaxassis siz bilan bog‘lanadi.' };
  }

  if (onlyTag && hasMedia) {
    const label = KB[selected] ? options.find((o) => o.id === selected)?.label : 'Mutaxassis';
    return {
      text: `Fayl qabul qilindi. Lokal rejimda rasm va videoni tahlil qila olmayman, shuning uchun muammoni qisqa yozing yoki ovoz bilan ayting (masalan: "kran tagidan suv sizyapti"). Hozircha tanlangan yo‘nalish: ${label.toLocaleLowerCase('uz')}.\n\n${KB[selected].fallback}`,
    };
  }

  const { category, matched } = scoreCategory(t, selected);
  const kb = KB[category];
  const problem = kb.problems.find((p) => p.re.test(t));
  const label = options.find((o) => o.id === category)?.label || 'Mutaxassis';

  let body;
  if (problem) {
    body = `Taxminiy muammo: ${problem.title}.\n\nNima qilish kerak:\n${problem.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
  } else if (matched || HOWTO.test(t)) {
    body = `${kb.fallback}\n\nAniqroq maslahat berishim uchun muammoni batafsilroq yozing: nima sodir bo‘lyapti, qachondan beri va qayerda?`;
  } else {
    body = `Muammoni to‘liq tushunmadim. ${kb.fallback}\n\nIltimos, nima buzilganini bir-ikki jumlada yozing yoki yuqoridan yo‘nalishni tanlang.`;
  }

  const warn = urgent
    ? '⚠️ Xavfsizlikni birinchi o‘ringa qo‘ying. Xavf bo‘lsa, joyni tark etib, tegishli favqulodda xizmatga (101, 102, 103, gaz xizmati) qo‘ng‘iroq qiling.\n\n'
    : '';
  const tail = `\n\nAvtomatik aniqlandi: ${label.toLocaleLowerCase('uz')} mutaxassisi kerak bo‘lishi mumkin. Quyidagi tugma orqali buyurtma berishingiz mumkin.`;

  return {
    text: `${warn}${body}${tail}`,
    result: { category, urgent, title: problem?.title || null },
  };
}

/* ------------------------------------------------------------------ */
/*  YORDAMCHI FUNKSIYALAR                                              */
/* ------------------------------------------------------------------ */
function pickMime(kind) {
  if (typeof MediaRecorder === 'undefined') return '';
  const list = kind === 'video'
    ? ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm', 'video/mp4']
    : ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return list.find((t) => MediaRecorder.isTypeSupported(t)) || '';
}

const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1]);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });

function micErrorText(err) {
  switch (err?.name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return 'Ruxsat berilmadi. Brauzer manzil satridagi qulf belgisi orqali mikrofon/kamerani yoqing.';
    case 'NotFoundError':
      return 'Mikrofon yoki kamera topilmadi. Qurilmani ulang va qayta urining.';
    case 'NotReadableError':
      return 'Qurilma boshqa ilova tomonidan band. Uni yoping va qayta urining.';
    default:
      return 'Qurilmaga ulanib bo‘lmadi. Sayt HTTPS orqali ochilganini tekshiring.';
  }
}

const greeting = {
  id: 'welcome',
  from: 'bot',
  text: 'Assalomu alaykum! Uyingizdagi muammoni yozing, mikrofon orqali ayting yoki rasm/video yuboring. Men dastlabki tahlil va xavfsizlik bo‘yicha tavsiya beraman.',
};

const SpeechRecognition =
  typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : undefined;

/* ------------------------------------------------------------------ */
/*  KUTISH ANIMATSIYASI VA YOZILISH EFFEKTI                            */
/* ------------------------------------------------------------------ */
const ANIM_CSS = `
@keyframes hf-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.12); } }
@keyframes hf-ring { 0% { transform: scale(.85); opacity: .7; } 100% { transform: scale(1.8); opacity: 0; } }
@keyframes hf-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes hf-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
@keyframes hf-spin { to { transform: rotate(360deg); } }
@keyframes hf-caret { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .hf-anim, .hf-anim * { animation: none !important; } }
`;

const buildPhases = (hasMedia) => [
  'Biroz kuting, savolingiz o‘rganilmoqda',
  hasMedia ? 'Biriktirilgan fayl ko‘rib chiqilmoqda' : 'Muammo mazmuni tahlil qilinmoqda',
  'Muammo turi va usta yo‘nalishi aniqlanmoqda',
  'Xavfsizlik bo‘yicha tekshiruv o‘tkazilmoqda',
  'Maslahat tayyorlanmoqda',
];

function ThinkingIndicator({ phases, onGrow }) {
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => setStep((s) => Math.min(s + 1, phases.length - 1)), 1300);
    const clock = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => { clearInterval(stepTimer); clearInterval(clock); };
  }, [phases.length]);

  const slow = elapsed >= 8;
  useEffect(() => { onGrow?.(); }, [step, slow, onGrow]);

  return (
    <div className="hf-anim flex items-start gap-2" role="status" aria-live="polite">
      <span className="relative mt-1 flex h-8 w-8 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-xl bg-emerald-300/60" style={{ animation: 'hf-ring 1.6s ease-out infinite' }} />
        <span
          className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#00a987] shadow-sm"
          style={{ animation: 'hf-pulse 1.4s ease-in-out infinite' }}
        >
          <Sparkles size={16} />
        </span>
      </span>

      <div className="w-full max-w-[88%] rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm sm:max-w-[360px]">
        <p key={step} className="flex items-center gap-2 text-xs font-semibold text-[#102f50] sm:text-sm" style={{ animation: 'hf-fade .35s ease-out' }}>
          {phases[step]}
          <span className="flex gap-1">
            <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" />
            <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:120ms]" />
            <i className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:240ms]" />
          </span>
        </p>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#00b894] to-[#164a70]" style={{ animation: 'hf-bar 1.3s ease-in-out infinite' }} />
        </div>

        <ul className="mt-3 space-y-1.5">
          {phases.slice(0, step + 1).map((p, i) => {
            const done = i < step;
            return (
              <li key={p} className={`flex items-center gap-2 text-[11px] ${done ? 'text-slate-400' : 'text-slate-600'}`} style={{ animation: 'hf-fade .3s ease-out' }}>
                {done ? (
                  <CheckCircle2 size={13} className="text-emerald-500" />
                ) : (
                  <span className="h-3 w-3 rounded-full border-2 border-emerald-500 border-t-transparent" style={{ animation: 'hf-spin .8s linear infinite' }} />
                )}
                {p}
              </li>
            );
          })}
        </ul>

        {elapsed >= 8 && (
          <p className="mt-3 text-[11px] text-amber-700" style={{ animation: 'hf-fade .3s ease-out' }}>
            Biroz ko‘proq vaqt ketmoqda, iltimos kuting...
          </p>
        )}
      </div>
    </div>
  );
}

function TypedText({ text, animate, onTick, onDone }) {
  const [count, setCount] = useState(animate ? 0 : text.length);
  const tickRef = useRef(onTick);
  const doneRef = useRef(onDone);
  tickRef.current = onTick;
  doneRef.current = onDone;

  useEffect(() => {
    if (!animate) { setCount(text.length); return undefined; }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setCount(text.length);
      doneRef.current?.();
      return undefined;
    }
    let raf = 0;
    let last = -1;
    const start = performance.now();
    // Uzun matn ham ~3 soniyada to'liq chiqadi
    const charsPerSec = Math.max(80, text.length / 3);
    const frame = (now) => {
      const n = Math.min(text.length, Math.floor(((now - start) / 1000) * charsPerSec));
      if (n !== last) {
        last = n;
        setCount(n);
        tickRef.current?.();
      }
      if (n >= text.length) { doneRef.current?.(); return; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [text, animate]);

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && (
        <span className="ml-0.5 inline-block h-3.5 w-0.5 translate-y-0.5 bg-[#00a987]" style={{ animation: 'hf-caret .8s step-end infinite' }} />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ASOSIY KOMPONENT                                                   */
/* ------------------------------------------------------------------ */
export default function AIDiagnostika() {
  const [category, setCategory] = useState('santexnika');
  const [messages, setMessages] = useState([greeting]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [notice, setNotice] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [phases, setPhases] = useState(() => buildPhases(false));
  const [doneIds, setDoneIds] = useState(() => new Set());

  const isDone = (m) => !m.animate || doneIds.has(m.id);
  const markDone = (id) => setDoneIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));

  // Ovoz yozish
  const [isRecording, setIsRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const [liveText, setLiveText] = useState('');

  // Dumaloq video
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSeconds, setVideoSeconds] = useState(0);
  const [facing, setFacing] = useState('user');

  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const stickRef = useRef(true);
  const rafRef = useRef(0);
  const fileInputRef = useRef(null);
  const liveVideoRef = useRef(null);
  const urlsRef = useRef([]);
  const noticeTimer = useRef(null);

  const audioRef = useRef({ recorder: null, stream: null, chunks: [], timer: null, recog: null, transcript: '', cancelled: false, active: false });
  const videoRef = useRef({ recorder: null, chunks: [], timer: null, cancelled: false });
  const voicesRef = useRef([]);
  const messagesRef = useRef(messages);
  const categoryRef = useRef(category);
  const submitRef = useRef(null);

  messagesRef.current = messages;
  categoryRef.current = category;

  const showNotice = useCallback((text) => {
    setNotice(text);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 6000);
  }, []);

  const trackUrl = (blob) => {
    const url = URL.createObjectURL(blob);
    urlsRef.current.push(url);
    return url;
  };

  /* ----- avto-skroll (faqat chat ichida, sahifani siljitmaydi) ----- */
  const scrollNow = useCallback(() => {
    if (!stickRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // Foydalanuvchi yuqoriga o'tgan bo'lsa, majburan pastga tortmaymiz
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
  };

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.from === 'user') stickRef.current = true;
    scrollNow();
  }, [messages, sending, scrollNow]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  /* ----- ovozlarni yuklash (TTS) ----- */
  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined;
    const load = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', load);
  }, []);

  /* ----- jonli video preview ----- */
  useEffect(() => {
    if (liveVideoRef.current) {
      liveVideoRef.current.srcObject = videoStream;
      if (videoStream) liveVideoRef.current.play?.().catch(() => {});
    }
  }, [videoStream, videoOpen]);

  /* ----- tozalash ----- */
  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    clearTimeout(noticeTimer.current);
    const a = audioRef.current;
    a.cancelled = true;
    clearInterval(a.timer);
    try { a.recog?.abort(); } catch { /* ignore */ }
    a.stream?.getTracks().forEach((tr) => tr.stop());
    const v = videoRef.current;
    v.cancelled = true;
    clearInterval(v.timer);
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  /* ================================================================ */
  /*  OVOZLI O'QISH (TTS)                                              */
  /* ================================================================ */
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
  };

  const speakText = (text, id = 'manual') => {
    if (!('speechSynthesis' in window)) {
      showNotice('Brauzeringiz ovozli o‘qishni qo‘llab-quvvatlamaydi.');
      return;
    }
    if (speakingId === id) { stopSpeaking(); return; }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[⚠️]/g, '').replace(/\n+/g, '. ');
    const u = new SpeechSynthesisUtterance(clean);
    const voices = voicesRef.current;
    const voice =
      voices.find((v) => v.lang?.toLowerCase().startsWith('uz')) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith('tr')) ||
      voices.find((v) => v.lang?.toLowerCase().startsWith('ru'));
    if (voice) { u.voice = voice; u.lang = voice.lang; } else { u.lang = 'uz-UZ'; }
    u.rate = 0.95;
    u.onend = () => setSpeakingId(null);
    u.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(u);
  };

  /* ================================================================ */
  /*  XABAR YUBORISH + AI JAVOBI                                       */
  /* ================================================================ */
  const askAI = async (text, media) => {
    const history = messagesRef.current
      .filter((m) => m.id !== 'welcome')
      .slice(-10)
      .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    if (AI_ENDPOINT) {
      try {
        const images = [];
        if (media?.type === 'image' && media.blob && media.blob.size < 4 * 1024 * 1024) {
          images.push({ mediaType: media.blob.type || 'image/jpeg', data: await blobToBase64(media.blob) });
        }
        const res = await fetch(AI_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, category: categoryRef.current, history, images }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const reply = data.reply || data.text;
        if (!reply) throw new Error('Bo‘sh javob');
        const cat = KB[data.category] ? data.category : scoreCategory(normalize(`${text} ${reply}`), categoryRef.current).category;
        const urgent = typeof data.urgent === 'boolean' ? data.urgent : URGENT.test(normalize(`${text} ${reply}`));
        return { text: reply, result: { category: cat, urgent, title: null } };
      } catch {
        showNotice('AI serveriga ulanib bo‘lmadi, lokal tahlil ishlatildi.');
      }
    }
    await new Promise((r) => setTimeout(r, 700));
    return localAnswer(text, categoryRef.current, Boolean(media));
  };

  const submit = async ({ text, media, transcript }) => {
    const typed = (text || '').trim();
    const asked = typed || transcript || '';
    const tag = media
      ? ({ image: '[Rasm biriktirildi]', video: media.isRound ? '[Dumaloq video yuborildi]' : '[Video yuborildi]', audio: '[Ovozli xabar]' }[media.type] || '[Fayl yuklandi]')
      : '';
    const shownText = typed || transcript || tag;
    if (!shownText) return;

    setMessages((cur) => [
      ...cur,
      { id: `user-${Date.now()}`, from: 'user', text: shownText, media: media || null, transcript: media?.type === 'audio' ? transcript : undefined },
    ]);
    setDraft('');
    setMediaPreview(null);
    setPhases(buildPhases(Boolean(media)));
    setSending(true);

    try {
      const started = Date.now();
      const reply = await askAI(asked || tag, media);
      // Animatsiya ko'rinib turishi uchun kamida ~3.5 soniya kutamiz
      const wait = 3500 - (Date.now() - started);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      const botMsg = {
        id: `answer-${Date.now()}`,
        from: 'bot',
        description: asked || shownText,
        result: reply.result,
        text: reply.text,
        animate: true,
      };
      if (reply.result?.category) setCategory(reply.result.category);
      setMessages((cur) => [...cur, botMsg]);
      if (autoSpeak) speakText(reply.text, botMsg.id);
    } catch {
      setMessages((cur) => [
        ...cur,
        { id: `err-${Date.now()}`, from: 'bot', text: 'Kechirasiz, javob tayyorlashda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.' },
      ]);
    } finally {
      setSending(false);
    }
  };
  submitRef.current = submit;

  const handleSubmit = (event) => {
    event?.preventDefault();
    if (sending || isRecording) return;
    if (!draft.trim() && !mediaPreview) return;
    submit({ text: draft, media: mediaPreview });
  };

  const resetChat = () => {
    stopSpeaking();
    setMessages([greeting]);
    setDraft('');
    setMediaPreview(null);
  };

  /* ================================================================ */
  /*  FAYL TANLASH                                                     */
  /* ================================================================ */
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) { showNotice('Fayl hajmi 50 MB dan oshmasligi kerak.'); return; }
    const type = file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'file';
    setMediaPreview({ blob: file, url: trackUrl(file), type, name: file.name });
  };

  /* ================================================================ */
  /*  MIKROFON: OVOZLI XABAR + NUTQNI MATNGA AYLANTIRISH               */
  /* ================================================================ */
  const startVoice = async () => {
    if (isRecording) return;
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      showNotice('Brauzeringiz mikrofon yozishni qo‘llab-quvvatlamaydi. Chrome, Edge yoki Safari yangi versiyasidan foydalaning.');
      return;
    }
    stopSpeaking();
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (err) {
      showNotice(micErrorText(err));
      return;
    }

    const a = audioRef.current;
    a.stream = stream;
    a.chunks = [];
    a.transcript = '';
    a.cancelled = false;
    a.active = true;

    const mime = pickMime('audio');
    const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    a.recorder = recorder;
    recorder.ondataavailable = (e) => { if (e.data?.size) a.chunks.push(e.data); };
    recorder.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      a.stream = null;
      if (a.cancelled) return;
      const blob = new Blob(a.chunks, { type: recorder.mimeType || mime || 'audio/webm' });
      if (blob.size < 800) { showNotice('Ovoz juda qisqa yoki eshitilmadi. Qayta urinib ko‘ring.'); return; }
      const media = { blob, url: trackUrl(blob), type: 'audio', name: 'Ovozli xabar' };
      submitRef.current({ text: '', media, transcript: a.transcript.trim() });
    };

    // Nutqni matnga aylantirish (qo'llab-quvvatlansa)
    if (SpeechRecognition) {
      try {
        const rec = new SpeechRecognition();
        rec.lang = 'uz-UZ';
        rec.continuous = true;
        rec.interimResults = true;
        rec.onresult = (ev) => {
          let finalText = '';
          let interim = '';
          for (let i = 0; i < ev.results.length; i += 1) {
            const r = ev.results[i];
            if (r.isFinal) finalText += `${r[0].transcript} `; else interim += r[0].transcript;
          }
          a.transcript = finalText;
          setLiveText(`${finalText}${interim}`.trim());
        };
        rec.onerror = (ev) => {
          if (ev.error === 'language-not-supported') {
            showNotice('Brauzer o‘zbek tilida nutqni aniqlay olmadi. Ovozli xabar audio sifatida yuboriladi.');
          }
        };
        rec.onend = () => { if (a.active) { try { rec.start(); } catch { /* ignore */ } } };
        rec.start();
        a.recog = rec;
      } catch { a.recog = null; }
    }

    recorder.start(250);
    setLiveText('');
    setRecSeconds(0);
    setIsRecording(true);
    a.timer = setInterval(() => {
      setRecSeconds((s) => {
        if (s + 1 >= MAX_AUDIO_SECONDS) stopVoice(true);
        return s + 1;
      });
    }, 1000);
  };

  const stopVoice = (send = true) => {
    const a = audioRef.current;
    if (!a.active) return;
    a.active = false;
    a.cancelled = !send;
    clearInterval(a.timer);
    try { a.recog?.stop(); } catch { /* ignore */ }
    a.recog = null;
    if (a.recorder && a.recorder.state !== 'inactive') a.recorder.stop();
    else a.stream?.getTracks().forEach((tr) => tr.stop());
    setIsRecording(false);
    setLiveText('');
    setRecSeconds(0);
  };

  /* ================================================================ */
  /*  KAMERA: DUMALOQ VIDEO                                            */
  /* ================================================================ */
  const openStream = async (mode) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: mode, width: { ideal: 640 }, height: { ideal: 640 } },
      audio: { echoCancellation: true, noiseSuppression: true },
    });
    return stream;
  };

  const openVideo = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      showNotice('Brauzeringiz video yozishni qo‘llab-quvvatlamaydi. Chrome, Edge yoki Safari yangi versiyasidan foydalaning.');
      return;
    }
    if (isRecording) stopVoice(false);
    stopSpeaking();
    try {
      const stream = await openStream(facing);
      setVideoStream(stream);
      setVideoOpen(true);
    } catch (err) {
      showNotice(micErrorText(err));
    }
  };

  const closeVideo = () => {
    const v = videoRef.current;
    v.cancelled = true;
    clearInterval(v.timer);
    if (v.recorder && v.recorder.state !== 'inactive') v.recorder.stop();
    setVideoStream((s) => { s?.getTracks().forEach((tr) => tr.stop()); return null; });
    setIsVideoRecording(false);
    setVideoSeconds(0);
    setVideoOpen(false);
  };

  const flipCamera = async () => {
    if (isVideoRecording) return;
    const next = facing === 'user' ? 'environment' : 'user';
    try {
      const stream = await openStream(next);
      videoStream?.getTracks().forEach((tr) => tr.stop());
      setVideoStream(stream);
      setFacing(next);
    } catch {
      showNotice('Boshqa kameraga o‘tib bo‘lmadi.');
    }
  };

  const startVideoRecording = () => {
    if (!videoStream || isVideoRecording) return;
    const v = videoRef.current;
    v.chunks = [];
    v.cancelled = false;
    const mime = pickMime('video');
    let recorder;
    try {
      recorder = new MediaRecorder(videoStream, mime ? { mimeType: mime } : undefined);
    } catch {
      showNotice('Video yozishni boshlab bo‘lmadi.');
      return;
    }
    v.recorder = recorder;
    recorder.ondataavailable = (e) => { if (e.data?.size) v.chunks.push(e.data); };
    recorder.onstop = () => {
      if (v.cancelled) return;
      const blob = new Blob(v.chunks, { type: recorder.mimeType || mime || 'video/webm' });
      if (blob.size < 1500) { showNotice('Video juda qisqa. Qayta urinib ko‘ring.'); return; }
      setMediaPreview({ blob, url: trackUrl(blob), type: 'video', isRound: true, name: 'Dumaloq video xabar' });
      setVideoStream((s) => { s?.getTracks().forEach((tr) => tr.stop()); return null; });
      setVideoOpen(false);
      setIsVideoRecording(false);
      setVideoSeconds(0);
    };
    recorder.start(250);
    setIsVideoRecording(true);
    setVideoSeconds(0);
    v.timer = setInterval(() => {
      setVideoSeconds((s) => {
        if (s + 1 >= MAX_VIDEO_SECONDS) stopVideoRecording();
        return s + 1;
      });
    }, 1000);
  };

  const stopVideoRecording = () => {
    const v = videoRef.current;
    clearInterval(v.timer);
    if (v.recorder && v.recorder.state !== 'inactive') v.recorder.stop();
  };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */
  const canSend = (draft.trim() || mediaPreview) && !sending && !isRecording;
  const announce = [...messages].reverse().find((m) => m.from === 'bot' && isDone(m))?.text || '';
  const onlyGreeting = messages.length === 1;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 pb-8 sm:gap-6">
      <style>{ANIM_CSS}</style>
      <div className="sr-only" aria-live="polite">{announce}</div>
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#102f50] via-[#164a70] to-[#00a987] p-5 text-white shadow-xl sm:p-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15"><Bot size={25} /></span>
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-100"><Sparkles size={14} /> HomeFix AI yordamchisi</span>
            <h1 className="mt-1 text-xl font-extrabold sm:text-2xl">AI diagnostika va universal chat</h1>
            <p className="mt-1 text-xs leading-5 text-blue-50 sm:text-sm">Matn, rasm, video, dumaloq video yoki ovozli xabar yuboring. AI muammoni o‘zi aniqlaydi!</p>
          </div>
          <span className="ml-auto hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Onlayn</span>
        </div>
      </section>

      {/* Chat Container */}
      <section className="flex h-[min(78vh,760px)] min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#00a987]"><Bot size={20} /></span>
            <div>
              <h2 className="text-sm font-bold text-[#102f50]">Aqlli yordamchi (Multimediya & Universal)</h2>
              <p className="text-[11px] text-slate-500">Nogironligi bo‘lganlar uchun ovozli qo‘llab-quvvatlash bilan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoSpeak((v) => !v)}
              aria-pressed={autoSpeak}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${autoSpeak ? 'bg-[#00a987] text-white' : 'bg-emerald-50 text-[#008c70] hover:bg-emerald-100'}`}
              title="Javoblarni avtomatik ovozda o‘qish"
            >
              {autoSpeak ? <Volume2 size={16} /> : <VolumeX size={16} />} Avto-o‘qish
            </button>
            <button type="button" onClick={resetChat} className="rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#008c70]">Yangi suhbat</button>
          </div>
        </header>

        {/* Messages area */}
        <div ref={scrollRef} onScroll={handleScroll} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#f7fafc] p-4 sm:p-6">
          <div className="mb-2 flex flex-wrap gap-2" role="group" aria-label="Muammo kategoriyasini tanlang">
            {options.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                aria-pressed={category === id}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-semibold transition sm:text-xs ${category === id ? 'border-[#00b894] bg-emerald-50 text-[#008c70]' : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'}`}
              >
                <Icon size={14} />{label}
              </button>
            ))}
          </div>

          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.from === 'bot' && (
                <span className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#00a987] shadow-sm"><Sparkles size={16} /></span>
              )}
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[78%] ${
                  message.from === 'user'
                    ? 'rounded-br-md bg-[#00a987] text-white'
                    : `rounded-bl-md border bg-white text-slate-700 shadow-sm ${message.result?.urgent ? 'border-rose-200' : 'border-slate-100'}`
                }`}
              >
                {/* Media */}
                {message.media && (
                  <div className="mb-2 overflow-hidden rounded-xl">
                    {message.media.type === 'image' && (
                      <img src={message.media.url} alt="Yuklangan rasm" className="max-h-48 rounded-xl object-cover" />
                    )}
                    {message.media.type === 'video' && (
                      message.media.isRound ? (
                        <video src={message.media.url} controls playsInline className="h-44 w-44 rounded-full border-2 border-white object-cover" />
                      ) : (
                        <video src={message.media.url} controls playsInline className="max-h-48 rounded-xl object-cover" />
                      )
                    )}
                    {message.media.type === 'audio' && (
                      <audio src={message.media.url} controls className="h-10 w-full max-w-[260px]" />
                    )}
                    {message.media.type === 'file' && (
                      <div className="flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2 text-xs"><Paperclip size={14} /> {message.media.name}</div>
                    )}
                  </div>
                )}

                {message.result && (
                  <div className={`mb-2 flex items-center gap-1.5 text-xs font-bold ${message.result.urgent ? 'text-rose-600' : 'text-[#008c70]'}`}>
                    {message.result.urgent ? <ShieldAlert size={15} /> : <CheckCircle2 size={15} />}
                    {message.result.urgent ? 'Xavfsizlik ogohlantirishi' : 'Dastlabki tahlil va usta turi'}
                  </div>
                )}

                {!(message.media?.type === 'audio' && !message.transcript) && (
                  <p className="whitespace-pre-line text-xs leading-6 sm:text-sm">
                    {message.media?.type === 'audio' ? (
                      `“${message.text}”`
                    ) : (
                      <TypedText
                        text={message.text}
                        animate={Boolean(message.animate)}
                        onTick={scrollNow}
                        onDone={() => markDone(message.id)}
                      />
                    )}
                  </p>
                )}

                {message.from === 'bot' && message.id !== 'welcome' && isDone(message) && (
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakText(message.text, message.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
                    >
                      {speakingId === message.id ? <><Square size={12} /> To‘xtatish</> : <><Volume2 size={13} /> Ovozli tinglash</>}
                    </button>
                  </div>
                )}
                {message.id === 'welcome' && (
                  <button
                    type="button"
                    onClick={() => speakText(message.text, message.id)}
                    className="mt-2 inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
                  >
                    {speakingId === message.id ? <><Square size={12} /> To‘xtatish</> : <><Volume2 size={13} /> Ovozli tinglash</>}
                  </button>
                )}

                {message.result && isDone(message) && (
                  <>
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-[11px] leading-5 text-amber-800">
                      <Lightbulb size={15} className="mt-0.5 shrink-0" />
                      <span>Bu AI orqali aniqlangan dastlabki tavsiya va usta turi. Tasdiqlash uchun ariza yuboring.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/mijoz/buyurtmaberish', { state: { category: message.result.category, description: message.description } })}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#102f50] px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-[#1a4975]"
                    >
                      Mutaxassis chaqirish <ArrowRight size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {onlyGreeting && (
            <div className="flex flex-wrap gap-2 pl-10">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => submit({ text: q })}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-medium text-[#008c70] transition hover:bg-emerald-50 sm:text-xs"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {sending && <ThinkingIndicator phases={phases} onGrow={scrollNow} />}
        </div>

        {/* Xabarnoma */}
        {notice && (
          <div role="alert" className="flex items-start justify-between gap-3 border-t border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-800">
            <span>{notice}</span>
            <button type="button" onClick={() => setNotice('')} aria-label="Yopish"><X size={14} /></button>
          </div>
        )}

        {/* Yozib olish holati */}
        {isRecording && (
          <div className="flex items-center gap-3 border-t border-rose-100 bg-rose-50 px-4 py-3">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-rose-500" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-rose-700">Yozilmoqda · {fmtTime(recSeconds)}</p>
              <p className="truncate text-xs text-slate-600">
                {liveText || (SpeechRecognition ? 'Gapiring, matn shu yerda ko‘rinadi...' : 'Gapiring, ovoz audio sifatida yuboriladi...')}
              </p>
            </div>
            <button type="button" onClick={() => stopVoice(false)} className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-rose-600" title="Bekor qilish" aria-label="Yozishni bekor qilish">
              <Trash2 size={16} />
            </button>
            <button type="button" onClick={() => stopVoice(true)} className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white hover:bg-rose-700">
              <Send size={14} /> Yuborish
            </button>
          </div>
        )}

        {/* Biriktirilgan fayl preview */}
        {mediaPreview && (
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-4 py-2">
            <div className="flex min-w-0 items-center gap-3">
              {mediaPreview.type === 'image' && <img src={mediaPreview.url} alt="" className="h-10 w-10 rounded-lg object-cover" />}
              {mediaPreview.type === 'video' && (
                <video src={mediaPreview.url} muted className={`h-10 w-10 object-cover ${mediaPreview.isRound ? 'rounded-full' : 'rounded-lg'}`} />
              )}
              {mediaPreview.type === 'file' && <Paperclip size={18} className="text-emerald-600" />}
              <span className="max-w-xs truncate text-xs font-medium text-slate-700">{mediaPreview.name}</span>
            </div>
            <button type="button" onClick={() => setMediaPreview(null)} className="text-slate-400 hover:text-rose-500" aria-label="Faylni olib tashlash">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Kiritish formasi */}
        <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-3 sm:p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-[#f7fbfd] p-2 transition focus-within:border-[#00b894] focus-within:bg-white">
            <div className="flex items-center gap-1 pb-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*,.pdf,.doc,.docx"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isRecording}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
                title="Rasm, video yoki fayl biriktirish"
                aria-label="Fayl biriktirish"
              >
                <Paperclip size={18} />
              </button>

              <button
                type="button"
                onClick={openVideo}
                disabled={isRecording}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
                title="Dumaloq video yozish"
                aria-label="Dumaloq video yozish"
              >
                <Video size={18} />
              </button>

              <button
                type="button"
                onClick={isRecording ? () => stopVoice(true) : startVoice}
                className={`rounded-xl p-2 transition ${isRecording ? 'animate-pulse bg-rose-100 text-rose-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                title={isRecording ? 'Yozishni tugatib yuborish' : 'Ovozli xabar yozish'}
                aria-label={isRecording ? 'Yozishni tugatib yuborish' : 'Ovozli xabar yozish'}
                aria-pressed={isRecording}
              >
                {isRecording ? <Square size={18} /> : <Mic size={18} />}
              </button>
            </div>

            <label className="sr-only" htmlFor="ai-chat-input">Muammoni yozing</label>
            <textarea
              id="ai-chat-input"
              rows={1}
              maxLength={1000}
              value={draft}
              disabled={isRecording}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form.requestSubmit();
                }
              }}
              placeholder={isRecording ? 'Ovoz yozilmoqda...' : 'Muammoni yozing yoki ovozli/rasm yuboring...'}
              className="max-h-32 min-h-11 min-w-0 flex-1 resize-y bg-transparent px-2 py-3 text-sm outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={!canSend}
              aria-label="Xabarni yuborish"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00b894] text-white shadow-sm transition hover:bg-[#009d7c] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-1 px-1 text-[10px] leading-4 text-slate-400">
            <span>Enter — yuborish · Shift+Enter — yangi qator</span>
            <span className="font-medium text-emerald-600">♿ Ovozli yozish va ovozli o‘qish qo‘llab-quvvatlanadi</span>
          </div>
        </form>
      </section>

      {/* Dumaloq video yozish oynasi */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102f50]/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Dumaloq video yozish">
          <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-sm font-bold text-[#102f50]">Dumaloq video xabar</h3>
              <button type="button" onClick={closeVideo} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Yopish">
                <X size={18} />
              </button>
            </div>

            <div className={`relative h-64 w-64 overflow-hidden rounded-full border-4 bg-slate-900 ${isVideoRecording ? 'border-rose-500' : 'border-[#00b894]'}`}>
              <video
                ref={liveVideoRef}
                autoPlay
                muted
                playsInline
                className={`h-full w-full object-cover ${facing === 'user' ? '-scale-x-100' : ''}`}
              />
              {isVideoRecording && (
                <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-rose-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                  ● {fmtTime(videoSeconds)}
                </span>
              )}
            </div>

            <p className="text-center text-xs text-slate-500">
              {isVideoRecording
                ? `Muammoni ko‘rsating va tushuntiring. Maksimum ${MAX_VIDEO_SECONDS} soniya.`
                : 'Muammo joyini kameraga ko‘rsating va yozishni boshlang.'}
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={flipCamera}
                disabled={isVideoRecording}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 disabled:opacity-40"
                title="Kamerani almashtirish"
                aria-label="Kamerani almashtirish"
              >
                <SwitchCamera size={18} />
              </button>

              {isVideoRecording ? (
                <button
                  type="button"
                  onClick={stopVideoRecording}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg transition hover:bg-rose-700"
                  aria-label="Yozishni to‘xtatish"
                >
                  <Square size={24} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startVideoRecording}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-rose-200 bg-rose-500 text-white shadow-lg transition hover:bg-rose-600"
                  aria-label="Yozishni boshlash"
                >
                  <span className="h-5 w-5 rounded-full bg-white" />
                </button>
              )}

              <span className="h-11 w-11" aria-hidden="true" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}