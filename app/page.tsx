"use client";
import React, { useState } from 'react';
import { BookOpen, Clock, CheckCircle, Circle, Calendar, ChevronRight, Trophy, Brain, Flame, Coffee, PlayCircle } from 'lucide-react';

type ColorType = 'blue' | 'emerald' | 'teal' | 'indigo' | 'orange' | 'pink' | 'rose' | 'violet' | 'red' | 'yellow';

interface Session {
  time: string;
  subject: string;
  topic: string;
  instructor: string;
  type: string;
  color: ColorType;
  videoUrl?: string;
  videoUrls?: string[];
  tasks: string[];
}

interface DaySchedule {
  day: number;
  date: string;
  title: string;
  focus: string;
  isRestDay?: boolean;
  sessions: Session[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 1,
    date: "3 Şubat Salı",
    title: "Temel Atma ve Isınma",
    focus: "Mert Hoca & Fizikle Barış",
    sessions: [
      {
        time: "10:00 - 12:00",
        subject: "Matematik",
        topic: "Temel Kavramlar",
        instructor: "Mert Hoca",
        type: "zor",
        color: "blue",
        videoUrl: "https://www.youtube.com/watch?v=M-MBFy3jiqs",
        tasks: [
          "Mert Hoca'nın video notlarını kağıda geçir.",
          "Sıfır ve Negatif Sayı tuzaklarına dikkat et.",
          "Video bitince en az 2 test çöz."
        ]
      },
      {
        time: "12:15 - 14:15",
        subject: "Fizik",
        topic: "Fizik Bilimine Giriş",
        instructor: "Fizikle Barış",
        type: "orta",
        color: "emerald",
        videoUrl: "https://www.youtube.com/watch?v=lBVyVO6YgMQ",
        tasks: [
          "Temel ve Türetilmiş Büyüklükleri (KISA MUZ) ezberle.",
          "Skaler ve Vektörel farkını anla.",
          "Konu sözeldir, hemen 2 test çöz."
        ]
      },
      {
        time: "15:00 - 17:00",
        subject: "Biyoloji",
        topic: "Canlıların Ortak Özellikleri",
        instructor: "Selin Hoca",
        type: "orta",
        color: "teal",
        videoUrl: "https://www.youtube.com/watch?v=uq5TnDp3e9M",
        tasks: [
          "Tüm canlılarda ortak olan maddeleri listele.",
          "Prokaryot ve Ökaryot farkını not al.",
          "Kaynağından 1-2 test çöz."
        ]
      },
      {
        time: "17:15 - 18:15",
        subject: "Pratik Saati",
        topic: "Matematik Tekrar",
        instructor: "Bireysel",
        type: "kolay",
        color: "indigo",
        tasks: [
          "Temel Kavramlar'dan yapamadığın sorulara dön.",
          "İşlem hatası kontrolü yap."
        ]
      },
      {
        time: "18:30 - 19:30",
        subject: "Tarih",
        topic: "İslamiyet Öncesi Türk Tarihi",
        instructor: "Soner Ardıç",
        type: "hikaye",
        color: "orange",
        videoUrl: "https://www.youtube.com/watch?v=p0UV9pTffXc",
        tasks: [
          "Videoyu 1.5x hızda izle.",
          "Kut, Töre, Kurultay kavramlarını not al.",
          "Soru çözme, sadece izle."
        ]
      }
    ]
  },
  {
    day: 2,
    date: "4 Şubat Çarşamba",
    title: "Sayılar ve Dil Bilgisi",
    focus: "Sayı Basamakları & Ses Bilgisi",
    sessions: [
      {
        time: "10:00 - 12:00",
        subject: "Matematik",
        topic: "Tek-Çift / Ardışık Sayılar",
        instructor: "Mert Hoca",
        type: "zor",
        color: "blue",
        videoUrls: [
          "https://www.youtube.com/watch?v=3YsyrEGKyiU",
          "https://www.youtube.com/watch?v=IQCWy0LgtA4"
        ],
        tasks: [
          "Ardışık sayılar toplam formülünü (Gauss) ezberle.",
          "Tek-Çift sorularında değer vererek çöz.",
          "Soru bankasından 2 test bitir."
        ]
      },
      {
        time: "12:15 - 14:15",
        subject: "Kimya",
        topic: "Kimya Bilimi",
        instructor: "Semih Balmuk",
        type: "orta",
        color: "pink",
        videoUrl: "https://www.youtube.com/watch?v=wV7zidbjcFA",
        tasks: [
          "Güvenlik işaretlerine dikkat et.",
          "İlk 20 element ve yaygın bileşik adlarını ezberle.",
          "Çerez konudur, 2 test çöz."
        ]
      },
      {
        time: "15:00 - 17:00",
        subject: "Türkçe",
        topic: "Ses Bilgisi",
        instructor: "Emek Taştan",
        type: "orta",
        color: "rose",
        videoUrls: [
          "https://www.youtube.com/watch?v=S1uF2oN9-Jg",
          "https://www.youtube.com/watch?v=L_gA-BoHo8Q"
        ],
        tasks: [
          "Ünlü düşmesi ve Ünsüz benzeşmesi farkını ayırt et.",
          "Konu nankördür, sıcağı sıcağına 3 test çöz."
        ]
      },
      {
        time: "17:15 - 18:15",
        subject: "Pratik Saati",
        topic: "Paragraf + Türkçe",
        instructor: "Bireysel",
        type: "kolay",
        color: "rose",
        tasks: [
          "20 tane Paragraf sorusu çöz (25 dk süre tut).",
          "Ses Bilgisi yanlışlarına bak."
        ]
      },
      {
        time: "18:30 - 19:30",
        subject: "Tarih",
        topic: "İlk Türk İslam Devletleri",
        instructor: "Soner Ardıç",
        type: "hikaye",
        color: "orange",
        videoUrl: "https://www.youtube.com/watch?v=p0UV9pTffXc",
        tasks: [
          "Karahanlı ve Gazneli özelliklerini not al.",
          "Talas Savaşı'nın sonuçlarına odaklan."
        ]
      }
    ]
  },
  {
    day: 3,
    date: "5 Şubat Perşembe",
    title: "Problem Altyapısı ve Fizik",
    focus: "Basamak Kavramı & Özkütle",
    sessions: [
      {
        time: "10:00 - 12:00",
        subject: "Matematik",
        topic: "Sayı Basamakları (Çözümleme)",
        instructor: "Mert Hoca",
        type: "zor",
        color: "blue",
        videoUrl: "https://www.youtube.com/watch?v=DvUDBzs9y8s",
        tasks: [
          "Çözümleme (ab = 10a + b) mantığını kavra.",
          "Alt alta toplama sorularında pratik yap.",
          "2 test çöz."
        ]
      },
      {
        time: "12:15 - 14:15",
        subject: "Fizik",
        topic: "Madde ve Özellikleri (Özkütle)",
        instructor: "Fizikle Barış",
        type: "orta",
        color: "emerald",
        videoUrl: "https://www.youtube.com/watch?v=lBVyVO6YgMQ",
        tasks: [
          "d = m/v formülünü adın gibi bil.",
          "Kütle-Hacim grafiklerini (Eğim=Özkütle) yorumla.",
          "Dayanıklılık kısmına bak ve 2 test çöz."
        ]
      },
      {
        time: "15:00 - 17:00",
        subject: "Biyoloji",
        topic: "Canlıların Temel Bileşenleri - 1",
        instructor: "Selin Hoca",
        type: "orta",
        color: "teal",
        videoUrl: "https://www.youtube.com/watch?v=KQLLjZW9r0A",
        tasks: [
          "İnorganik ve Organik farkını yaz.",
          "Dehidrasyon ve Hidroliz denklemlerini not al.",
          "1 test çöz."
        ]
      },
      {
        time: "17:15 - 18:15",
        subject: "Pratik Saati",
        topic: "Fizik (Grafikler)",
        instructor: "Bireysel",
        type: "kolay",
        color: "emerald",
        tasks: [
          "Sadece Özkütle grafik soruları çözmeye odaklan.",
          "Yapamadığın grafik sorularının çözümünü izle."
        ]
      },
      {
        time: "18:30 - 19:30",
        subject: "Tarih",
        topic: "Türkiye Tarihi (Selçuklu)",
        instructor: "Soner Ardıç",
        type: "hikaye",
        color: "orange",
        videoUrl: "https://www.youtube.com/results?search_query=Soner+Ardıç+30+GÜNDE+YKS+TARİH+KAMPI+9.+GÜN+Yerleşme+ve+Devletleşme+Sürecinde+Selçuklu+Türkiyesi",
        tasks: [
          "Anadolu Selçuklu'nun ticarete verdiği önemi anla.",
          "Kösedağ Savaşı'nın yıkıcı etkisini öğren."
        ]
      }
    ]
  },
  {
    day: 4,
    date: "6 Şubat Cuma",
    title: "Kurallar ve Ezber",
    focus: "Bölünebilme & Yazım Kuralları",
    sessions: [
      {
        time: "10:00 - 12:00",
        subject: "Matematik",
        topic: "Bölme ve Bölünebilme",
        instructor: "Mert Hoca",
        type: "zor",
        color: "blue",
        videoUrl: "https://www.youtube.com/watch?v=WlfPG6vmSzE",
        tasks: [
          "3, 4, 9, 11 kurallarını ezberle.",
          "Kalan bulma sorularına odaklan.",
          "Zevkli konudur, 2 test çöz."
        ]
      },
      {
        time: "12:15 - 14:15",
        subject: "Kimya",
        topic: "Atom ve Periyodik Sistem - 1",
        instructor: "Semih Balmuk",
        type: "orta",
        color: "pink",
        videoUrl: "https://www.youtube.com/watch?v=wV7zidbjcFA",
        tasks: [
          "Atom modellerinin farkını tek cümleyle yaz.",
          "Proton, Nötron, Elektron hesaplamalarını öğren.",
          "2 test çöz."
        ]
      },
      {
        time: "15:00 - 17:00",
        subject: "Türkçe",
        topic: "Yazım Kuralları",
        instructor: "Emek Taştan",
        type: "zor",
        color: "rose",
        videoUrls: [
          "https://www.youtube.com/watch?v=9br5fVsCejY",
          "https://www.youtube.com/watch?v=T1uF2oN9-Jg"
        ],
        tasks: [
          "'ki' ve 'de' bağlaçlarını öğren.",
          "Büyük harflerin kullanımına bak.",
          "En az 3 test çöz."
        ]
      },
      {
        time: "17:15 - 18:15",
        subject: "Pratik Saati",
        topic: "Yazım Kuralları",
        instructor: "Bireysel",
        type: "kolay",
        color: "rose",
        tasks: [
          "Yanlış yaptığın soruları not al.",
          "TDK sitesinden karıştırdığın kelimelere bak."
        ]
      },
      {
        time: "18:30 - 19:30",
        subject: "Tarih",
        topic: "Osmanlı Kuruluş Dönemi",
        instructor: "Soner Ardıç",
        type: "hikaye",
        color: "orange",
        videoUrl: "https://www.youtube.com/results?search_query=Soner+Ardıç+24+SAATTE+TYT+AYT+TARİH+14.+OSMANLI+KURULUŞ+DÖNEMİ+2025+YKS",
        tasks: [
          "Osman ve Orhan Bey dönemindeki devletleşme adımları.",
          "Ankara Savaşı'nı dinle."
        ]
      }
    ]
  },
  {
    day: 5,
    date: "7 Şubat Cumartesi",
    title: "Sabır Günü",
    focus: "EBOB-EKOK & Isı Sıcaklık",
    sessions: [
      {
        time: "10:00 - 12:00",
        subject: "Matematik",
        topic: "EBOB - EKOK (Giriş)",
        instructor: "Mert Hoca",
        type: "zor",
        color: "blue",
        videoUrl: "https://www.youtube.com/watch?v=sPZus-twlX0",
        tasks: [
          "Mantığını anlamaya çalış (Fayans, nöbet soruları).",
          "Zorlanırsan temel seviye 1-2 test çöz.",
          "Moral bozmak yok!"
        ]
      },
      {
        time: "12:15 - 14:15",
        subject: "Fizik",
        topic: "Isı ve Sıcaklık - 1",
        instructor: "Fizikle Barış",
        type: "orta",
        color: "emerald",
        videoUrl: "https://www.youtube.com/watch?v=SU8HMkPE1sY",
        tasks: [
          "Isı, Sıcaklık, İç Enerji farkını not et.",
          "Termometre dönüşümlerine bak.",
          "1 test çöz."
        ]
      },
      {
        time: "15:00 - 17:00",
        subject: "Biyoloji",
        topic: "Temel Bileşenler - 2",
        instructor: "Selin Hoca",
        type: "orta",
        color: "teal",
        videoUrl: "https://www.youtube.com/watch?v=KQLLjZW9r0A",
        tasks: [
          "Enzimler ve Vitaminler.",
          "Enzim çalışma hızı grafiklerini çizmeyi öğren.",
          "2 test çöz."
        ]
      },
      {
        time: "17:15 - 18:15",
        subject: "Pratik Saati",
        topic: "Biyoloji (Enzimler)",
        instructor: "Bireysel",
        type: "kolay",
        color: "teal",
        tasks: [
          "Sadece Enzim grafik soruları çöz."
        ]
      },
      {
        time: "18:30 - 19:30",
        subject: "Tarih",
        topic: "Osmanlı Yükselme Dönemi",
        instructor: "Soner Ardıç",
        type: "hikaye",
        color: "orange",
        videoUrl: "https://www.youtube.com/watch?v=-oetYEjcKrg",
        tasks: [
          "İstanbul'un Fethi'nin sonuçları.",
          "Yavuz ve Kanuni dönem haritasını canlandır."
        ]
      }
    ]
  },
  {
    day: 6,
    date: "8 Şubat Pazar",
    title: "Değerlendirme ve Analiz",
    focus: "Deneme & Eksik Kapatma",
    isRestDay: true,
    sessions: [
      {
        time: "10:00 - 12:00",
        subject: "Mini Deneme",
        topic: "Genel Tekrar",
        instructor: "Kendinle Baş Başasın",
        type: "zor",
        color: "violet",
        tasks: [
          "Haftalık konulardan karma 40-50 soruluk test hazırla.",
          "Süre tutarak çöz (Ciddiyetle).",
          "Telefonu kapat."
        ]
      },
      {
        time: "13:30 - 15:30",
        subject: "Eksik Kapatma",
        topic: "Telafi Etüdü",
        instructor: "Bireysel",
        type: "orta",
        color: "red",
        tasks: [
          "Deneme analizine göre yanlışlarına bak.",
          "Eksik konunun videosunu tekrarla.",
          "Ekstra 2 test çöz."
        ]
      },
      {
        time: "15:30 - 16:30",
        subject: "Okuma Saati",
        topic: "Hafıza Tazeleme",
        instructor: "Bireysel",
        type: "kolay",
        color: "yellow",
        tasks: [
          "Tarih ve Biyoloji notlarını baştan sona oku.",
          "Gelecek haftanın konularına göz at."
        ]
      }
    ]
  }
];

// Dark mode color palette
const getColorClass = (color: ColorType) => {
  const colors: Record<ColorType, string> = {
    blue: "border-blue-800 bg-blue-950/40 text-blue-200",
    emerald: "border-emerald-800 bg-emerald-950/40 text-emerald-200",
    teal: "border-teal-800 bg-teal-950/40 text-teal-200",
    indigo: "border-indigo-800 bg-indigo-950/40 text-indigo-200",
    orange: "border-orange-800 bg-orange-950/40 text-orange-200",
    pink: "border-pink-800 bg-pink-950/40 text-pink-200",
    rose: "border-rose-800 bg-rose-950/40 text-rose-200",
    violet: "border-violet-800 bg-violet-950/40 text-violet-200",
    red: "border-red-800 bg-red-950/40 text-red-200",
    yellow: "border-yellow-800 bg-yellow-950/40 text-yellow-200",
  };
  return colors[color] || colors.blue;
};

// Dark mode badge palette
const getBadgeColor = (color: ColorType) => {
  const colors: Record<ColorType, string> = {
    blue: "bg-blue-900/50 text-blue-300 border border-blue-700/50",
    emerald: "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50",
    teal: "bg-teal-900/50 text-teal-300 border border-teal-700/50",
    indigo: "bg-indigo-900/50 text-indigo-300 border border-indigo-700/50",
    orange: "bg-orange-900/50 text-orange-300 border border-orange-700/50",
    pink: "bg-pink-900/50 text-pink-300 border border-pink-700/50",
    rose: "bg-rose-900/50 text-rose-300 border border-rose-700/50",
    violet: "bg-violet-900/50 text-violet-300 border border-violet-700/50",
    red: "bg-red-900/50 text-red-300 border border-red-700/50",
    yellow: "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50",
  };
  return colors[color] || colors.blue;
}

export default function App() {
  const [activeDay, setActiveDay] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (dayIdx: number, sessionIdx: number, taskIdx: number) => {
    const taskId = `${dayIdx}-${sessionIdx}-${taskIdx}`;
    setCompletedTasks(prev => {
      const newState = { ...prev };
      if (newState[taskId]) {
        delete newState[taskId];
      } else {
        newState[taskId] = true;
      }
      return newState;
    });
  };

  const isTaskCompleted = (dayIdx: number, sessionIdx: number, taskIdx: number) => {
    return !!completedTasks[`${dayIdx}-${sessionIdx}-${taskIdx}`];
  };

  const currentData = scheduleData[activeDay];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 pb-12">
      {/* Header Section */}
      <header className="bg-slate-900 border-b border-slate-800 text-white pt-10 pb-20 px-4 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center p-2 bg-slate-800/80 backdrop-blur-sm rounded-full mb-4 ring-1 ring-slate-700 shadow-lg">
            <Flame size={18} className="text-orange-500 mr-2 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">YKS Speedrun Modu</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            21 Günlük Kamp Planı
          </h1>
          <p className="text-slate-400 text-lg mb-6">
            Disiplin özgürlüktür. <span className="text-indigo-400 font-medium">1. Hafta (3-8 Şubat)</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <div className="flex items-center px-4 py-2 bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-lg">
              <Trophy className="text-yellow-500 mr-2" size={18} />
              <span className="text-slate-300">Hedef: MSÜ/TYT'yi Parçalamak</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-slate-800/60 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-lg">
              <Clock className="text-blue-400 mr-2" size={18} />
              <span className="text-slate-300">Günlük: ~8 Saat (Net)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">

        {/* Day Navigation Tabs */}
        <div className="bg-slate-900 rounded-xl shadow-2xl p-2 mb-8 border border-slate-800 overflow-x-auto flex space-x-2 no-scrollbar">
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`flex-shrink-0 flex flex-col items-center justify-center px-6 py-3 rounded-lg transition-all duration-300 min-w-[100px] border ${activeDay === index
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/20 transform scale-105"
                : "bg-slate-900 border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300 hover:border-slate-700"
                }`}
            >
              <span className="text-xs font-bold opacity-80 uppercase mb-1">
                {day.day}. Gün
              </span>
              <span className={`text-sm font-bold whitespace-nowrap ${activeDay === index ? "text-white" : "text-slate-400"}`}>
                {day.date.split(' ')[0]} {day.date.split(' ')[1]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Day Content */}
        <div className="space-y-6 animate-fadeIn">

          {/* Day Header */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Calendar className="mr-3 text-indigo-500" size={24} />
                {currentData.date}
              </h2>
              <p className="text-slate-400 mt-1 font-medium">{currentData.title}</p>
            </div>
            <div className="flex items-center bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
              <Brain className="text-indigo-400 mr-2" size={18} />
              <span className="text-sm font-medium text-slate-300">
                Odak: <span className="text-indigo-300">{currentData.focus}</span>
              </span>
            </div>
          </div>

          {/* Timeline / Sessions */}
          <div className="space-y-4">
            {currentData.sessions.map((session, sessionIdx) => (
              <div
                key={sessionIdx}
                className={`group relative overflow-hidden rounded-xl shadow-lg border-l-4 transition-all duration-300 hover:shadow-2xl hover:translate-x-1 ${getColorClass(session.color)}`}
              >
                <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6">

                  {/* Time & Meta */}
                  <div className="md:w-1/4 flex flex-col justify-start border-b md:border-b-0 md:border-r border-slate-800/50 pb-4 md:pb-0 md:pr-4">
                    <div className="flex items-center text-slate-200 font-bold text-lg mb-2">
                      <Clock size={18} className="mr-2 text-slate-500" />
                      {session.time}
                    </div>
                    <div className="flex items-center mb-3">
                      <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${getBadgeColor(session.color)}`}>
                        {session.subject}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 font-medium flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-2"></div>
                      {session.instructor}
                    </div>
                  </div>

                  {/* Content & Tasks */}
                  <div className="md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                        {session.topic}
                      </h3>
                      <div className="flex flex-col gap-1 items-end">
                        {(session.videoUrls || (session.videoUrl ? [session.videoUrl] : [])).map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-200 text-xs font-bold rounded-full transition-all border border-red-500/30 hover:border-red-500/50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PlayCircle size={14} />
                            {session.videoUrls ? `Ders ${i + 1}` : 'Dersi İzle'}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Görevler (Missions)</p>
                      <span className="text-[10px] text-slate-600 font-medium bg-slate-900/50 px-2 py-0.5 rounded">Tıklayarak tamamla</span>
                    </div>

                    <ul className="space-y-3">
                      {session.tasks.map((task, taskIdx) => {
                        const completed = isTaskCompleted(activeDay, sessionIdx, taskIdx);
                        return (
                          <li
                            key={taskIdx}
                            onClick={() => toggleTask(activeDay, sessionIdx, taskIdx)}
                            className={`flex items-start cursor-pointer p-2 -ml-2 rounded-lg transition-all duration-200 select-none ${completed ? 'bg-slate-800/30' : 'hover:bg-slate-800/30'}`}
                          >
                            <div className={`mt-0.5 mr-3 flex-shrink-0 transition-colors duration-300 ${completed ? 'text-green-400' : 'text-slate-600 group-hover:text-slate-500'}`}>
                              {completed ? <CheckCircle size={20} className="fill-green-400/20" /> : <Circle size={20} />}
                            </div>
                            <span className={`text-sm leading-relaxed font-medium transition-all duration-300 ${completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                              {task}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest Day Special Note */}
          {currentData.isRestDay && (
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-800/50 text-emerald-100 p-6 rounded-xl shadow-lg flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-emerald-300">Harika bir haftayı geride bıraktın!</h4>
                <p className="text-emerald-200/70 text-sm mt-1">Bugün kendini analiz et ve yeni haftaya enerji topla.</p>
              </div>
              <Coffee size={48} className="text-emerald-500/30" />
            </div>
          )}

        </div>
      </main>

      <div className="text-center mt-12 text-slate-600 text-sm">
        <p>Disiplin, yapmak istemediğin şeyi, sanki çok seviyormuşsun gibi yapmaktır.</p>
      </div>
    </div>
  );
}