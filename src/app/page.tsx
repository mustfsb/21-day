"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Types ─── */
type SubjectCategory =
  | "matematik"
  | "fizik"
  | "kimya"
  | "dilbilgisi"
  | "vitamin"
  | "tekrar";

type Session = {
  subject: string;
  topic: string;
  tasks: string[];
  category: SubjectCategory;
};

type Day = {
  date: string;
  dayName: string;
  estimatedTime: string;
  questionTarget: string;
  sessions: Session[];
  note?: string;
};

type SectionGroup = {
  title: string;
  icon: string;
  subtitle: string;
  description: string;
  days: Day[];
};

/* ─── Category Config ─── */
const categoryConfig: Record<
  SubjectCategory,
  { bg: string; border: string; badge: string; icon: string; label: string }
> = {
  matematik: {
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "bg-blue-600 text-white",
    icon: "📐",
    label: "Matematik",
  },
  fizik: {
    bg: "bg-purple-50",
    border: "border-purple-300",
    badge: "bg-purple-600 text-white",
    icon: "⚛️",
    label: "Fizik",
  },
  kimya: {
    bg: "bg-orange-50",
    border: "border-orange-300",
    badge: "bg-orange-600 text-white",
    icon: "🧪",
    label: "Kimya",
  },
  dilbilgisi: {
    bg: "bg-rose-50",
    border: "border-rose-300",
    badge: "bg-rose-600 text-white",
    icon: "📝",
    label: "Dil Bilgisi",
  },
  vitamin: {
    bg: "bg-teal-50",
    border: "border-teal-300",
    badge: "bg-teal-600 text-white",
    icon: "💊",
    label: "Vitamin",
  },
  tekrar: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    badge: "bg-amber-600 text-white",
    icon: "🔄",
    label: "Genel Tekrar",
  },
};

/* ─── Calendar Data ─── */
const programData: SectionGroup[] = [
  {
    title: "PAZARTESİ - ÇARŞAMBA",
    icon: "🚀",
    subtitle: "FİZİK GÜNLERİ",
    description: "Haftanın ilk yarısı: Mat + Fizik + Dil Bilgisi Tekrarı.",
    days: [
      {
        date: "9 Şubat",
        dayName: "Pazartesi",
        estimatedTime: "~6.5 Saat",
        questionTarget: "+3 Net Potansiyeli",
        sessions: [
          {
            subject: "MATEMATİK",
            topic: "Rasyonel & Ondalık Sayılar",
            tasks: [
              "Mert Hoca'dan izle",
              "İşlem önceliği, merdivenli işlemler ve devirli ondalık sayıları bitir",
              "40 Soru çöz (2 Test)",
            ],
            category: "matematik",
          },
          {
            subject: "FİZİK",
            topic: "Isı ve Sıcaklık - 1",
            tasks: [
              "Q=mcΔt formülünü öğren",
              "Özısı ve Isı sığası kavramlarını öğren",
              "20 Soru çöz (1 Test - Kavram ağırlıklı)",
            ],
            category: "fizik",
          },
          {
            subject: "DİL BİLGİSİ",
            topic: "Ses Bilgisi - TEKRAR",
            tasks: [
              "Ünlü düşmesi, Benzeşme ve Yumuşama kurallarını hızlıca hatırla",
              "25 Soru çöz (2 Test - Hız ve Renk Mavi Testler)",
            ],
            category: "dilbilgisi",
          },
          {
            subject: "VİTAMİN",
            topic: "Günlük Rutin",
            tasks: [
              "20 Paragraf çöz",
              "10 Problem çöz (Sayı Problemleri)",
            ],
            category: "vitamin",
          },
        ],
      },
      {
        date: "10 Şubat",
        dayName: "Salı",
        estimatedTime: "~7 Saat",
        questionTarget: "+4 Net Potansiyeli",
        sessions: [
          {
            subject: "MATEMATİK",
            topic: "Basit Eşitsizlikler",
            tasks: [
              "Eşitsizlikte yön değiştirme kuralına (negatifle çarpma) ve aralık bulmaya dikkat et",
              "40 Soru çöz (2 Test)",
            ],
            category: "matematik",
          },
          {
            subject: "FİZİK",
            topic: "Isı ve Sıcaklık - 2 & Genleşme",
            tasks: [
              "Hal değişimi grafikleri (Buz-Su) ve Genleşme (Boyca/Hacimce) mantığını öğren",
              "30 Soru çöz (Grafik sorusu çöz)",
            ],
            category: "fizik",
          },
          {
            subject: "DİL BİLGİSİ",
            topic: "Yazım Kuralları - TEKRAR",
            tasks: [
              "Büyük harflerin kullanımı, \"ki\" ve \"de\"nin yazımını çalış",
              "Birleşik fiilleri tekrar et",
              "25 Soru çöz (2 Test)",
            ],
            category: "dilbilgisi",
          },
          {
            subject: "VİTAMİN",
            topic: "Günlük Rutin",
            tasks: [
              "20 Paragraf çöz",
              "10 Problem çöz (Kesir Problemleri)",
            ],
            category: "vitamin",
          },
        ],
      },
      {
        date: "11 Şubat",
        dayName: "Çarşamba",
        estimatedTime: "~7 Saat",
        questionTarget: "+4 Net Potansiyeli",
        sessions: [
          {
            subject: "MATEMATİK",
            topic: "Mutlak Değer",
            tasks: [
              "Mutlak değerin \"uzaklık\" olduğunu anla",
              "|x|<a durumlarını ezberle",
              "40 Soru çöz (Zorlanabilirsin, sabret)",
            ],
            category: "matematik",
          },
          {
            subject: "FİZİK",
            topic: "Hareket / Düzgün Doğrusal Hareket",
            tasks: [
              "Hız-Sürat farkını öğren",
              "Konum-Zaman ve Hız-Zaman grafiklerini öğren",
              "40 Soru çöz (Fizik haftası bitti!)",
            ],
            category: "fizik",
          },
          {
            subject: "DİL BİLGİSİ",
            topic: "Noktalama İşaretleri - TEKRAR",
            tasks: [
              "Virgülün ve Noktalı Virgülün kullanım yerlerini ayırt et",
              "25 Soru çöz (2 Test)",
            ],
            category: "dilbilgisi",
          },
          {
            subject: "VİTAMİN",
            topic: "Günlük Rutin",
            tasks: [
              "20 Paragraf çöz",
              "10 Problem çöz (Yaş Problemleri)",
            ],
            category: "vitamin",
          },
        ],
      },
    ],
  },
  {
    title: "PERŞEMBE - CUMARTESİ",
    icon: "🧪",
    subtitle: "KİMYA GÜNLERİ",
    description:
      "Fizik bitti, Kimya başlıyor. Dil Bilgisi devam ediyor.",
    days: [
      {
        date: "12 Şubat",
        dayName: "Perşembe",
        estimatedTime: "~7 Saat",
        questionTarget: "+3 Net Potansiyeli",
        sessions: [
          {
            subject: "MATEMATİK",
            topic: "Üslü Sayılar",
            tasks: [
              "Üslü sayılarda dört işlem ve üslü denklemleri çalış",
              "2'nin kuvvetlerini ezberle",
              "40 Soru çöz",
            ],
            category: "matematik",
          },
          {
            subject: "KİMYA",
            topic: "Kimyasal Türler Arası Etkileşimler - 1",
            tasks: [
              "Güçlü Etkileşimler (İyonik, Kovalent, Metalik) öğren",
              "Lewis yapısını çizmeyi öğren",
              "40 Soru çöz (Konuyu mühürle)",
            ],
            category: "kimya",
          },
          {
            subject: "DİL BİLGİSİ",
            topic: "Sözcükte Yapı",
            tasks: [
              "Kök (İsim/Fiil), Ek (Yapım/Çekim) ayrımını çalış",
              "Basit/Türemiş/Birleşik sözcük yapılarını öğren",
              "25 Soru çöz (2 Test)",
            ],
            category: "dilbilgisi",
          },
          {
            subject: "VİTAMİN",
            topic: "Günlük Rutin",
            tasks: [
              "20 Paragraf çöz",
              "10 Problem çöz (Hareket Problemleri - Basit)",
            ],
            category: "vitamin",
          },
        ],
      },
      {
        date: "13 Şubat",
        dayName: "Cuma",
        estimatedTime: "~6.5 Saat",
        questionTarget: "+3 Net Potansiyeli",
        sessions: [
          {
            subject: "MATEMATİK",
            topic: "Köklü Sayılar",
            tasks: [
              "Kök dışına çıkarma, eşlenik alma, iç içe kökleri çalış",
              "40 Soru çöz",
            ],
            category: "matematik",
          },
          {
            subject: "KİMYA",
            topic: "Kimyasal Türler Arası Etkileşimler - 2",
            tasks: [
              "Zayıf Etkileşimler (Hidrojen Bağı, Van der Waals) öğren",
              "Polar/Apolar ayrımını öğren",
              "30 Soru çöz",
            ],
            category: "kimya",
          },
          {
            subject: "DİL BİLGİSİ",
            topic: "Sözcük Türleri - İsim/Sıfat",
            tasks: [
              "İsim tamlamalarını öğren",
              "Sıfat çeşitlerini öğren",
              "25 Soru çöz (2 Test)",
            ],
            category: "dilbilgisi",
          },
          {
            subject: "VİTAMİN",
            topic: "Günlük Rutin",
            tasks: [
              "20 Paragraf çöz",
              "10 Problem çöz (Yüzde Problemleri)",
            ],
            category: "vitamin",
          },
        ],
      },
      {
        date: "14 Şubat",
        dayName: "Cumartesi",
        estimatedTime: "~5.5 Saat",
        questionTarget: "+2 Net Potansiyeli",
        note: "Bugün Dil Bilgisi yok (Dinlenme)",
        sessions: [
          {
            subject: "MATEMATİK",
            topic: "Çarpanlara Ayırma",
            tasks: [
              "İki kare farkı (x\u00B2\u2212y\u00B2) ve tam kare açılımlarını ezbere bil",
              "30 Soru çöz",
            ],
            category: "matematik",
          },
          {
            subject: "KİMYA",
            topic: "Maddenin Halleri",
            tasks: [
              "Katılar, Sıvılar (Viskozite), Gazlar, Plazma konularını öğren",
              "Sözel ağırlıklıdır",
              "30 Soru çöz (Kimya haftası bitti!)",
            ],
            category: "kimya",
          },
          {
            subject: "VİTAMİN",
            topic: "Günlük Rutin",
            tasks: [
              "20 Paragraf çöz",
              "10 Problem çöz (Karışık Problemler)",
            ],
            category: "vitamin",
          },
        ],
      },
    ],
  },
  {
    title: "PAZAR",
    icon: "🛋️",
    subtitle: "ANALİZ & TEKRAR",
    description: "Pazar gününü sadece Rutin ve Haftalık Analiz ile geçir.",
    days: [
      {
        date: "15 Şubat",
        dayName: "Pazar",
        estimatedTime: "~3 Saat",
        questionTarget: "Karma 40 Soru + 20 Paragraf",
        sessions: [
          {
            subject: "GENEL TEKRAR",
            topic: "Haftalık Analiz & Tekrar",
            tasks: [
              "Bu hafta işlediğin Fizik/Kimya/Matematik konularından karma 40 soruluk bir test hazırla ve çöz",
              "20 Paragraf sorusu çöz",
            ],
            category: "tekrar",
          },
        ],
      },
    ],
  },
];

/* ─── Helpers ─── */
function getTaskId(
  groupIdx: number,
  dayIdx: number,
  sessionIdx: number,
  taskIdx: number
): string {
  return `g${groupIdx}-d${dayIdx}-s${sessionIdx}-t${taskIdx}`;
}

function getAllTaskIds(): string[] {
  const ids: string[] = [];
  programData.forEach((group, gi) => {
    group.days.forEach((day, di) => {
      day.sessions.forEach((session, si) => {
        session.tasks.forEach((_, ti) => {
          ids.push(getTaskId(gi, di, si, ti));
        });
      });
    });
  });
  return ids;
}

function getDayTaskIds(groupIdx: number, dayIdx: number): string[] {
  const ids: string[] = [];
  const day = programData[groupIdx].days[dayIdx];
  day.sessions.forEach((session, si) => {
    session.tasks.forEach((_, ti) => {
      ids.push(getTaskId(groupIdx, dayIdx, si, ti));
    });
  });
  return ids;
}

/* ─── Hook: localStorage todo state ─── */
const STORAGE_KEY = "studyplan-week2-todos";
const DARK_MODE_KEY = "studyplan-dark-mode";

function applyDarkClass(enabled: boolean) {
  document.documentElement.classList.toggle("dark", enabled);
  document.documentElement.style.colorScheme = enabled ? "dark" : "light";
}

function useDarkMode() {
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let initial = false;
    try {
      initial = localStorage.getItem(DARK_MODE_KEY) === "true";
    } catch {
      /* ignore */
    }
    setDark(initial);
    applyDarkClass(initial);
    setLoaded(true);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(DARK_MODE_KEY, String(next));
      } catch {
        /* ignore */
      }
      applyDarkClass(next);
      return next;
    });
  }, []);

  return { dark, toggleDark, loaded };
}

function useTodoState() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompleted(new Set(JSON.parse(stored)));
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { completed, toggle, loaded };
}

/* ─── Components ─── */

function TaskCheckbox({
  id,
  text,
  checked,
  onToggle,
}: {
  id: string;
  text: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <label
      className="flex items-start gap-3 py-1.5 cursor-pointer group select-none"
      htmlFor={id}
    >
      <div className="relative mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(id)}
          className="sr-only peer"
        />
        <div
          className={`w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center ${
            checked
              ? "border-green-500 bg-green-500"
              : "border-gray-300 dark:border-gray-500 group-hover:border-green-400"
          }`}
        >
          <svg
            className={`w-3 h-3 text-white transition-all duration-150 ${
              checked
                ? "opacity-100 scale-100 check-animate"
                : "opacity-0 scale-50"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <span
        className={`text-sm leading-relaxed transition-all duration-150 ${
          checked ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {text}
      </span>
    </label>
  );
}

function SessionBlock({
  session,
  groupIdx,
  dayIdx,
  sessionIdx,
  completed,
  toggle,
}: {
  session: Session;
  groupIdx: number;
  dayIdx: number;
  sessionIdx: number;
  completed: Set<string>;
  toggle: (id: string) => void;
}) {
  const config = categoryConfig[session.category];
  const taskIds = session.tasks.map((_, ti) =>
    getTaskId(groupIdx, dayIdx, sessionIdx, ti)
  );
  const completedCount = taskIds.filter((id) => completed.has(id)).length;
  const allDone = completedCount === session.tasks.length && session.tasks.length > 0;

  const isNumberedBlock =
    session.category !== "vitamin" && session.category !== "tekrar";
  const blockLabel = isNumberedBlock ? `${sessionIdx + 1}. BLOK` : null;

  return (
    <div
      className={`session-block rounded-xl border-l-4 ${config.border} ${
        config.bg
      } dark:bg-[#262626] p-4 transition-opacity duration-150 ${allDone ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg">{config.icon}</span>
          {blockLabel && (
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {blockLabel}
            </span>
          )}
          <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">{session.subject}</h3>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors duration-150 ${
            allDone
              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
              : "bg-gray-100 dark:bg-[#262626] text-gray-500 dark:text-gray-400"
          }`}
        >
          {completedCount}/{session.tasks.length}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 ml-8">{session.topic}</p>
      <div className="ml-1 space-y-0.5">
        {session.tasks.map((task, ti) => {
          const id = getTaskId(groupIdx, dayIdx, sessionIdx, ti);
          return (
            <TaskCheckbox
              key={id}
              id={id}
              text={task}
              checked={completed.has(id)}
              onToggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
}

function DayPanel({
  day,
  groupIdx,
  dayIdx,
  isOpen,
  onToggle,
  completed,
  toggle,
}: {
  day: Day;
  groupIdx: number;
  dayIdx: number;
  isOpen: boolean;
  onToggle: () => void;
  completed: Set<string>;
  toggle: (id: string) => void;
}) {
  const dayTaskIds = getDayTaskIds(groupIdx, dayIdx);
  const completedCount = dayTaskIds.filter((id) => completed.has(id)).length;
  const totalTasks = dayTaskIds.length;
  const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  const allDone = completedCount === totalTasks && totalTasks > 0;

  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-[#262626] overflow-hidden transition-all duration-150 ${
        isOpen
          ? "border-blue-200 dark:border-blue-500/40 shadow-lg shadow-blue-50 dark:shadow-blue-900/20"
          : "border-gray-200 dark:border-[#2A2F24] hover:shadow-md"
      }`}
    >
      {/* Day Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-lg font-black text-gray-900 dark:text-white">
              {day.dayName}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#262626] px-2.5 py-0.5 rounded-full">
              {day.date}
            </span>
            {allDone && (
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                Tamamland{"\u0131"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>
              <span className="opacity-70">&#9202;&#65039;</span>{" "}
              {day.estimatedTime}
            </span>
            <span>
              <span className="opacity-70">&#127919;</span>{" "}
              {day.questionTarget}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  allDone
                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : "bg-gradient-to-r from-blue-400 to-blue-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 shrink-0 tabular-nums">
              {completedCount}/{totalTasks}
            </span>
          </div>
        </div>
        <div className="ml-4 shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 ${
              isOpen
                ? "bg-blue-100 dark:bg-blue-900/40"
                : "bg-gray-100 dark:bg-[#262626] group-hover:bg-gray-200 dark:group-hover:bg-[#262626]"
            }`}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-150 ease-out ${
                isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      <div className={`collapse-grid ${isOpen ? "open" : ""}`}>
        <div className="collapse-content">
          <div className="px-4 md:px-5 pb-4 md:pb-5 pt-1 space-y-3 border-t border-gray-100 dark:border-[#2A2F24]">
            {day.note && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg px-3 py-2 text-sm text-yellow-700 dark:text-yellow-400 font-medium session-block">
                &#9888;&#65039; {day.note}
              </div>
            )}
            {day.sessions.map((session, si) => (
              <SessionBlock
                key={si}
                session={session}
                groupIdx={groupIdx}
                dayIdx={dayIdx}
                sessionIdx={si}
                completed={completed}
                toggle={toggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function Home() {
  const { completed, toggle, loaded } = useTodoState();
  const { dark, toggleDark } = useDarkMode();
  const [openDays, setOpenDays] = useState<Set<string>>(new Set());

  const toggleDay = (key: string) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Overall progress
  const allIds = getAllTaskIds();
  const totalCompleted = allIds.filter((id) => completed.has(id)).length;
  const overallProgress =
    allIds.length > 0 ? (totalCompleted / allIds.length) * 100 : 0;

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-[#262626] dark:via-[#262626] dark:to-[#262626] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-[#262626] dark:via-[#262626] dark:to-[#262626]">
      {/* Header */}
      <header className="bg-white/80 dark:bg-[#262626]/80 backdrop-blur-sm border-b border-gray-200 dark:border-[#2A2F24] sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                &#128197; 2. HAFTA: MATEMAT{"\u0130"}K + FEN BLOKLARI + D{"\u0130"}L B{"\u0130"}LG{"\u0130"}S{"\u0130"}{" "}
                TEKRARI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                9 &ndash; 15 &#350;ubat &middot; Fen Derslerini Blokla (Pzt-&#199;ar&#351;: F{"\u0130"}Z{"\u0130"}K | Per&#351;-Cmt: K{"\u0130"}MYA) Dil Bilgisi: En Ba&#351;tan Al (G&#252;nde 2 Test)
              </p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                Sabit Rutin: 10 Problem + 20 Paragraf (Asla Sekmez!)
              </p>
            </div>
            <button
              onClick={toggleDark}
              className="ml-3 mt-1 shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 bg-gray-100 hover:bg-gray-200 dark:bg-[#262626] dark:hover:bg-[#262626]"
              aria-label={dark ? "Aydınlık mod" : "Karanlık mod"}
            >
              {dark ? (
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          {/* Overall Progress */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-300 shrink-0 tabular-nums">
              {totalCompleted}/{allIds.length}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {programData.map((group, gi) => (
          <section key={gi} className="animate-fade-in" style={{ animationDelay: `${gi * 0.1}s` }}>
            {/* Section Group Header */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{group.icon}</span>
              <div>
                <h2 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider">
                  {group.title}
                </h2>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {group.subtitle}
                </p>
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-[#262626] ml-2" />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 ml-10">
              {group.description}
            </p>

            {/* Days */}
            <div className="space-y-3">
              {group.days.map((day, di) => {
                const key = `${gi}-${di}`;
                return (
                  <DayPanel
                    key={key}
                    day={day}
                    groupIdx={gi}
                    dayIdx={di}
                    isOpen={openDays.has(key)}
                    onToggle={() => toggleDay(key)}
                    completed={completed}
                    toggle={toggle}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Legend */}
      <footer className="max-w-3xl mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-[#262626] rounded-xl border border-gray-200 dark:border-[#2A2F24] p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Dersler
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              Object.entries(categoryConfig) as [
                SubjectCategory,
                (typeof categoryConfig)[SubjectCategory],
              ][]
            ).map(([key, config]) => (
              <span
                key={key}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${config.bg} ${config.border} border dark:bg-[#262626] dark:border-[#353B2E]`}
              >
                <span>{config.icon}</span>
                <span className="dark:text-gray-300">{config.label}</span>
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
