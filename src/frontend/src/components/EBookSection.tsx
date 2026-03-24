import { Badge } from "@/components/ui/badge";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "adinivaas_ebooks";

interface Chapter {
  title: string;
  content: string;
}

interface EBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  rating: number;
  gradient: string;
  coverUrl?: string;
  pdfUrl?: string;
  chapters?: Chapter[];
  pages?: number;
}

const kurukh21DaysChapters: Chapter[] = [
  {
    title: "Day 1 – Introduction to Kurukh",
    content: `Welcome to Kurukh in 21 Days! Kurukh (also known as Oraon) is a Dravidian language spoken by the Oraon tribe, primarily in Jharkhand, Odisha, West Bengal, and parts of Chhattisgarh. It is spoken by over 2 million people.

Kurukh has a rich oral tradition — stories, songs, and rituals have been passed down through generations. This 21-day guide will help you learn the basics of reading, writing, and speaking Kurukh.

**Why learn Kurukh?**
- Connect deeply with your tribal heritage
- Preserve an ancient Dravidian language
- Communicate with over 2 million Kurukh speakers
- Understand tribal songs and literature in their original form

**The Tolong Siki Script**
Kurukh has its own script called Tolong Siki, created by Dr. Narayan Oraon in 1975. It is written left to right and has 18 consonants and 6 vowels.

Today's goal: Learn the 6 Kurukh vowels — a, aa, i, ii, u, uu.
Practice saying each vowel aloud three times.`,
  },
  {
    title: "Day 2 – Greetings & Basic Phrases",
    content: `Today we learn the most important phrases to begin a Kurukh conversation.

**Basic Greetings:**
- Johar! → Hello / Greetings
- Johar, khemathane? → Hello, how are you?
- Bhagia haana → I am fine
- Dhanyabaad → Thank you
- Tola milke khushi lagla → Happy to meet you

**Introductions:**
- Moi naa... → My name is...
- Tummar naa ke hae? → What is your name?
- Moi [village] theko haana → I am from [village]

**Numbers 1–10:**
1 - Onji
2 - Barua
3 - Muea
4 - Charia
5 - Moreya
6 - Turiya
7 - Eya
8 - Ariya
9 - Noia
10 - Gelko

Practice: Introduce yourself to a family member today using Kurukh!
Say: Johar! Moi naa [your name]. Bhagia haana!`,
  },
  {
    title: "Day 3 – Family & Relationships",
    content: `Kurukh culture is deeply family-centric. Learning family words connects you to the core of Oraon society.

**Family Terms:**
- Bap → Father
- Aye → Mother
- Bhai → Brother (elder)
- Bahin → Sister
- Beti → Daughter
- Beta → Son
- Dada → Grandfather
- Nani → Grandmother
- Kaka → Uncle (father's brother)
- Mama → Uncle (mother's brother)
- Chachi → Aunt (father's brother's wife)

**Tribal Clan (Gotra/Pari):**
Each Oraon family belongs to a Pari (clan), such as:
- Tirkey
- Minz
- Lakra
- Toppo
- Kerketta
- Xaxa

**Sentences:**
- Moi bapo naa Rajan hae → My father's name is Rajan
- Moi ayeko piyar korta → I love my mother
- Hamro parivar bado hae → Our family is big

Task: Write the names of 5 family members using what you've learned today.`,
  },
  {
    title: "Day 4 – Nature & the Forest",
    content: `The Oraon people share a sacred bond with nature. Their language reflects this deeply.

**Nature Vocabulary:**
- Jal → Water
- Jor → River
- Bir → Forest
- Phar → Mountain/Hill
- Rog → Field
- Chaand → Moon
- Suraj → Sun
- Tara → Star
- Mati → Earth/Soil
- Hawa → Wind
- Pani barkha → Rain

**Sacred Trees:**
- Saal (Shorea robusta) → The most sacred tree
- Mahua → Used in ceremonies and food
- Imli → Tamarind
- Pipal → Sacred fig

**Sentence Practice:**
- Bir sundar hae → The forest is beautiful
- Jal jivan hae → Water is life
- Chaand ujjal hae → The moon is bright

**Sarhul Connection:**
During Sarhul festival, the Saal tree is worshipped. The word Sarhul means "worship of Sal flowers" — the arrival of spring.

Today's task: Go outside and name 5 things you see using Kurukh.`,
  },
  {
    title: "Day 5 – Food, Harvest & Daily Life",
    content: `Food is culture. In Kurukh daily life, meals reflect the community's connection to the land.

**Food & Meals:**
- Dar → Rice
- Dal → Lentil soup
- Sabji → Vegetables
- Mas → Meat
- Dudh → Milk
- Roti → Flatbread
- Mahua phool → Mahua flower (used for traditional drink)

**Harvest Words:**
- Bali → Paddy/Crop
- Khet → Agricultural field
- Khunti → Sowing
- Fasal → Harvest
- Khal → Threshing floor

**Daily Life Phrases:**
- Dar khao → Eat rice
- Pani piya → Drink water
- Khet jai → Let's go to the field
- Kaam koro → Do the work
- Ghar jao → Go home

**Traditional Dish:**
Handia is a traditional rice beer prepared by the Oraon community for festivals. It uses fermented rice and ranu (herbal tablets) and is shared communally during Karma and Sarhul festivals.

Task: Write a small sentence describing your last meal using Kurukh words.`,
  },
  {
    title: "Day 6 – Songs, Festivals & Dance",
    content: `Music and dance are at the heart of Oraon identity. Every festival has its own song, rhythm, and dress.

**Key Festivals:**
- Sarhul → Spring festival, worship of Saal tree (March–April)
- Karma → Worship of the Karma tree branch (August)
- Jani Shikaar → Community hunt festival
- Phagua → Holi-like colour festival

**Musical Instruments:**
- Mandar → Double-headed drum (most sacred)
- Nagara → Large drum
- Baansuri → Bamboo flute
- Khartal → Wooden clappers
- Sanai → Shehnai-style wind instrument

**Dance Types:**
- Jhumur → Group circle dance, performed by women
- Domkach → Performed during marriages
- Chhau → Martial art dance form

**A Kurukh Folk Song Phrase:**
"Sarhul aa gelo, phuul phutelo" 
→ Sarhul has come, flowers have bloomed

**Traditional Dress:**
Women wear a white saree with red border (called Panchre). Men wear a dhoti with a turban during festivals.

Task: Watch one Sarhul or Karma dance video today and note down 3 Kurukh words you hear.`,
  },
  {
    title: "Day 7 – Review & Story Time",
    content: `Congratulations! You've completed Week 1 of Kurukh in 21 Days!

**Week 1 Review:**
✓ Vowels and script basics
✓ Greetings and introductions
✓ Family and clan terms
✓ Nature and forest vocabulary
✓ Food and daily life
✓ Festivals and songs

**A Short Kurukh Folk Story (Translated):**

Once, in a great forest, there lived a Birhor hunter named Sona. Every morning, Sona would greet the Saal tree: "Johar, Bir Raja!" (Hello, Forest King!).

One day, the forest spirit asked, "Why do you greet me every morning?"
Sona said, "Because you give us food, air, and shade. You are our life."
The forest spirit smiled and said, "As long as you honour the forest, it will always protect you."

From that day, Sona taught his children: "Bir hamro maa hae." (The forest is our mother.)

**Week 2 Preview:**
Next week we'll learn: verbs, sentence building, numbers 11–100, directions, colours, and body parts.

Task: Write 5 sentences using what you've learned this week!`,
  },
];

const mockEbooks: EBook[] = [
  {
    id: 0,
    title: "Learn Kurukh in 21 Days",
    author: "Dr. Narayan Oraon",
    genre: "Language",
    description:
      "A step-by-step guide to learning the Kurukh (Oraon) tribal language in 21 days — covering script, greetings, culture, and daily life.",
    rating: 5,
    gradient: "linear-gradient(135deg, #4A2C0A, #8B4513)",
    chapters: kurukh21DaysChapters,
    pages: 21,
  },
  {
    id: 1,
    title: "Sarhul Stories",
    author: "Priya Munda",
    genre: "Stories",
    description:
      "Beautiful folk stories from the Sarhul festival traditions of Jharkhand.",
    rating: 4,
    gradient: "linear-gradient(135deg, #8B4513, #D2691E)",
    chapters: [
      {
        title: "The First Sarhul",
        content: `Long ago, in the hills of Jharkhand, the Saal trees stood tall and silent through winter. The Oraon people waited anxiously for the Saal flowers to bloom — for that was the sign the earth had awakened.\n\nWhen the first white flowers opened on the branches, the village priest, called the Pahan, gathered the community under the great Saal grove. He offered white flowers to the village deity Dharmes and prayed for a good harvest.\n\nThe people sang, danced the Jhumur, and shared Handia. They believed — and still believe — that the new year truly begins not on a calendar date, but when the Saal tree blooms.\n\n"Sarhul aa gelo, phuul phutelo" — Sarhul has come, flowers have bloomed.`,
      },
      {
        title: "The Girl Who Spoke to Trees",
        content: `There was a girl named Champa who lived near the Bir (forest). Every morning she would touch the Saal tree and whisper her worries to it.\n\nThe elders said trees could not hear. But Champa believed otherwise.\n\nOne monsoon, the river flooded and the village was cut off. Champa sat beneath the great Saal tree and said, "Show us the way, Bir Raja."
\nBy morning, a family of deer emerged from the forest, walking a path nobody had noticed before — a dry ridge that led safely to higher ground.\n\nChampa smiled. She had always known the trees listened.`,
      },
    ],
    pages: 12,
  },
  {
    id: 2,
    title: "Oraon Heritage",
    author: "Rajan Tirkey",
    genre: "History",
    description:
      "A comprehensive guide to the Oraon tribe's rich cultural history.",
    rating: 5,
    gradient: "linear-gradient(135deg, #2D5A27, #4CAF50)",
    chapters: [
      {
        title: "Origins of the Oraon People",
        content: `The Oraon people, who call themselves Kurukh, are believed to have migrated from South India centuries ago, carrying a Dravidian language that connects them to a vast ancient civilisation.\n\nLinguistic studies link Kurukh to Tamil, Kannada, and Telugu — all part of the Dravidian family — suggesting the Oraon people shared roots with the earliest settled communities of the Indian subcontinent.\n\nOver centuries of migration northward, the Oraons settled in the Chota Nagpur Plateau — a forested highland rich in rivers, wildlife, and mineral wealth. This land became their identity: Jharkhand, meaning "forest land".\n\nTheir religion, Sarna Dharma, is centred on nature worship, particularly of the sacred Saal tree grove called the Jaher.`,
      },
    ],
    pages: 8,
  },
  {
    id: 3,
    title: "Tribal Languages Guide",
    author: "Dr. S. Horo",
    genre: "Language",
    description: "An introductory guide to tribal languages of central India.",
    rating: 4,
    gradient: "linear-gradient(135deg, #7B3F00, #C68642)",
    chapters: [
      {
        title: "Languages of Jharkhand",
        content: `Jharkhand is home to one of India's richest concentrations of tribal languages. The major ones include:\n\n**Santali** — An Austroasiatic language with its own script (Ol Chiki), spoken by 7+ million Santhal people.\n\n**Kurukh (Oraon)** — A Dravidian language spoken by 2+ million Oraon people, with the Tolong Siki script.\n\n**Mundari** — An Austroasiatic language spoken by the Munda tribe.\n\n**Ho** — Related to Mundari, spoken in Singhbhum.\n\n**Kharia** — A complex Austroasiatic language with three dialects.\n\nEach language carries a universe of ecological knowledge, spiritual tradition, and oral literature that is irreplaceable. This guide introduces you to the basic grammar and vocabulary of each language to help preserve this living heritage.`,
      },
    ],
    pages: 16,
  },
  {
    id: 4,
    title: "Jharkhand Folk Tales",
    author: "Anita Birua",
    genre: "Stories",
    description:
      "Enchanting folk tales passed down through generations in Jharkhand.",
    rating: 4,
    gradient: "linear-gradient(135deg, #1B5E20, #66BB6A)",
    chapters: [
      {
        title: "The Tiger's Promise",
        content: `Once, deep in the Saranda forest, a young Birhor boy named Latu stumbled upon a tiger caught in a hunter's trap.\n\nLatu's heart was brave. Though afraid, he freed the tiger.\n\nThe tiger looked into Latu's eyes and said, "Birhor child, you have shown me what my own kind never does — mercy. I make you a promise: no tiger of this forest will ever harm your family."\n\nGenerations later, the Birhor elders still say: when you hear a tiger roar in the night, do not fear — it is the great tiger keeping its promise to Latu's bloodline.\n\nThe moral: Courage and compassion create bonds that outlast any generation.`,
      },
    ],
    pages: 10,
  },
  {
    id: 5,
    title: "Nature & Tribes",
    author: "Mohan Soy",
    genre: "Science",
    description:
      "Exploring the deep connection between tribal communities and nature.",
    rating: 3,
    gradient: "linear-gradient(135deg, #4E342E, #8D6E63)",
    chapters: [
      {
        title: "Traditional Ecological Knowledge",
        content: `For thousands of years before modern ecology was named as a science, tribal communities of central India practised what researchers now call Traditional Ecological Knowledge (TEK).\n\nThe Birhor tribe could identify over 200 plant species and their medicinal uses. The Oraon's sacred Jaher grove functioned as a forest reserve — protected land that preserved biodiversity.\n\nThe Santhal people developed seasonal harvest rules that prevented overfarming. The Ho tribe built stone bunds to prevent soil erosion — a technique that modern conservation engineers now replicate.\n\nThis book documents these practices — not as curiosities of the past, but as living, urgent knowledge for our ecological future.`,
      },
    ],
    pages: 14,
  },
  {
    id: 6,
    title: "Santhal Art Forms",
    author: "Laxmi Hansda",
    genre: "Art",
    description:
      "A visual journey through the vibrant art traditions of the Santhal tribe.",
    rating: 5,
    gradient: "linear-gradient(135deg, #33691E, #8BC34A)",
    chapters: [
      {
        title: "Sohrai and Khovar Painting",
        content:
          "Sohrai and Khovar are two ancient painting traditions practised primarily by Santhal and Oraon women in Jharkhand.\n\n**Sohrai** is a harvest festival painting. After the paddy harvest, women paint the interior and exterior walls of their mud homes with bold geometric patterns and animals — deer, peacocks, elephants — using natural earth pigments: red ochre, white kaolin, and black manganese.\n\n**Khovar** is painted in the nuptial chamber of a new bride. The motifs are more intricate — spirals, nets, and flowers — symbolising fertility and new beginnings.\n\nBoth traditions were inscribed by UNESCO on the Representative List of Intangible Cultural Heritage in 2019 — the first Indian tribal art form to receive this distinction.\n\nToday, Sohrai artists like Bulu Imam have taken this art form to international galleries, proving that tribal knowledge is not primitive — it is profound.",
      },
    ],
    pages: 18,
  },
];

const subcategories = [
  "All",
  "Stories",
  "History",
  "Culture",
  "Language",
  "Science",
  "Art",
  "Mythology",
  "Fiction",
  "Other",
];

const genreColors: Record<string, string> = {
  Stories: "oklch(0.52 0.135 38)",
  History: "oklch(0.40 0.10 55)",
  Language: "oklch(0.48 0.12 145)",
  Culture: "oklch(0.52 0.135 38)",
  Science: "oklch(0.40 0.12 200)",
  Art: "oklch(0.48 0.12 145)",
  Mythology: "oklch(0.45 0.13 38)",
  Fiction: "oklch(0.42 0.11 55)",
  Other: "oklch(0.50 0.08 55)",
};

const gradientsByGenre: Record<string, string> = {
  Fiction: "linear-gradient(135deg, #5D4037, #A1887F)",
  History: "linear-gradient(135deg, #7B3F00, #C68642)",
  Culture: "linear-gradient(135deg, #2D5A27, #4CAF50)",
  Language: "linear-gradient(135deg, #4A2C0A, #8B4513)",
  Mythology: "linear-gradient(135deg, #4A148C, #9C27B0)",
  Other: "linear-gradient(135deg, #4E342E, #8D6E63)",
  Stories: "linear-gradient(135deg, #8B4513, #D2691E)",
  Science: "linear-gradient(135deg, #004D40, #26A69A)",
  Art: "linear-gradient(135deg, #33691E, #8BC34A)",
};

function loadStoredEbooks(): EBook[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={10}
          fill={i <= rating ? "#D2691E" : "none"}
          stroke={i <= rating ? "#D2691E" : "#bbb"}
        />
      ))}
    </div>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─────────────────────────────────────────────
// In-App EBook Reader
// ─────────────────────────────────────────────
function EBookReader({ book, onClose }: { book: EBook; onClose: () => void }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState(15);
  const [bookmarked, setBookmarked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const chapters = book.chapters || [];
  const totalChapters = chapters.length;
  const current = chapters[chapterIndex];
  const progress =
    totalChapters > 1
      ? Math.round(((chapterIndex + 1) / totalChapters) * 100)
      : 100;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll reset on chapter change
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [chapterIndex]);

  // Render simple markdown-ish formatting
  function renderContent(text: string) {
    return text.split("\n\n").map((para) => {
      if (para.startsWith("**") && para.endsWith("**")) {
        return (
          <p
            key={para.slice(0, 30)}
            className="font-bold mb-3"
            style={{ color: "oklch(0.30 0.07 40)", fontSize }}
          >
            {para.replace(/\*\*/g, "")}
          </p>
        );
      }
      // Inline bold
      const parts = para.split(/(\*\*[^*]+\*\*)/);
      return (
        <p
          key={para.slice(0, 30)}
          className="mb-4 leading-relaxed"
          style={{ color: "oklch(0.22 0.05 40)", fontSize }}
        >
          {parts.map((part) =>
            part.startsWith("**") ? (
              <strong key={part} style={{ color: "oklch(0.30 0.07 40)" }}>
                {part.replace(/\*\*/g, "")}
              </strong>
            ) : (
              part
            ),
          )}
        </p>
      );
    });
  }

  if (book.pdfUrl) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={{ background: "#f5f0ea" }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            background: "oklch(0.28 0.07 40)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="text-white p-1 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm truncate">
              {book.title}
            </p>
            <p className="text-white/70 text-xs">{book.author}</p>
          </div>
        </div>
        <iframe
          src={book.pdfUrl}
          title={book.title}
          className="flex-1 w-full border-0"
        />
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "oklch(0.97 0.01 55)" }}
    >
      {/* Reader Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{
          background: "oklch(0.28 0.07 40)",
          borderColor: "oklch(0.22 0.06 40)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="text-white p-1 rounded-full"
          aria-label="Close reader"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{book.title}</p>
          <p className="text-white/70 text-xs">{book.author}</p>
        </div>
        <button
          type="button"
          onClick={() => setBookmarked((v) => !v)}
          className="p-1.5 rounded-full"
          aria-label="Bookmark"
        >
          <Bookmark
            size={18}
            fill={bookmarked ? "#D2691E" : "none"}
            stroke={bookmarked ? "#D2691E" : "white"}
          />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1" style={{ background: "oklch(0.85 0.04 55)" }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: "oklch(0.52 0.135 38)",
          }}
        />
      </div>

      {/* Chapter tabs */}
      {totalChapters > 1 && (
        <div
          className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-hide border-b"
          style={{
            background: "oklch(0.95 0.02 55)",
            borderColor: "oklch(0.88 0.03 55)",
          }}
        >
          {chapters.map((ch, i) => (
            <button
              key={ch.title}
              type="button"
              onClick={() => setChapterIndex(i)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all"
              style={{
                background:
                  i === chapterIndex
                    ? "oklch(0.52 0.135 38)"
                    : "oklch(0.89 0.03 55)",
                color: i === chapterIndex ? "white" : "oklch(0.35 0.07 40)",
                border:
                  i === chapterIndex
                    ? "1px solid oklch(0.44 0.12 38)"
                    : "1px solid oklch(0.80 0.04 55)",
              }}
            >
              Day {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Font size controls */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: "oklch(0.95 0.02 55)",
          borderBottom: "1px solid oklch(0.88 0.03 55)",
        }}
      >
        <span
          className="text-xs font-semibold"
          style={{ color: "oklch(0.40 0.07 40)" }}
        >
          {current
            ? `${chapterIndex + 1} / ${totalChapters} — ${current.title}`
            : "Reading"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFontSize((s) => Math.max(12, s - 1))}
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.88 0.04 55)" }}
            aria-label="Decrease font size"
          >
            <Minus size={12} color="oklch(0.35 0.07 40)" />
          </button>
          <span
            className="text-xs"
            style={{
              color: "oklch(0.40 0.07 40)",
              minWidth: 24,
              textAlign: "center",
            }}
          >
            {fontSize}
          </span>
          <button
            type="button"
            onClick={() => setFontSize((s) => Math.min(22, s + 1))}
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.88 0.04 55)" }}
            aria-label="Increase font size"
          >
            <Plus size={12} color="oklch(0.35 0.07 40)" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-5 py-5"
        style={{ background: "oklch(0.97 0.01 55)" }}
      >
        {current ? (
          <>
            <h2
              className="font-bold mb-5 leading-tight"
              style={{
                color: "oklch(0.30 0.07 40)",
                fontSize: fontSize + 3,
                borderLeft: "4px solid oklch(0.52 0.135 38)",
                paddingLeft: 12,
              }}
            >
              {current.title}
            </h2>
            {renderContent(current.content)}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">
              No content available
            </p>
          </div>
        )}

        {/* Reading progress note */}
        <div
          className="mt-6 mb-2 rounded-xl p-3 text-center"
          style={{
            background: "oklch(0.92 0.04 55)",
            border: "1px solid oklch(0.84 0.05 55)",
          }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: "oklch(0.40 0.07 40)" }}
          >
            {progress}% complete
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.06 55)" }}
          >
            {chapterIndex < totalChapters - 1
              ? `Next: ${chapters[chapterIndex + 1]?.title}`
              : "You have completed this book!"}
          </p>
        </div>
      </div>

      {/* Bottom Nav */}
      <div
        className="flex items-center justify-between px-5 pb-8 pt-3"
        style={{
          background: "oklch(0.97 0.01 55)",
          borderTop: "1px solid oklch(0.88 0.03 55)",
        }}
      >
        <button
          type="button"
          onClick={() => setChapterIndex((i) => Math.max(0, i - 1))}
          disabled={chapterIndex === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40"
          style={{
            background: "oklch(0.90 0.03 55)",
            color: "oklch(0.30 0.07 40)",
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <span className="text-xs" style={{ color: "oklch(0.50 0.07 40)" }}>
          {chapterIndex + 1} / {totalChapters}
        </span>

        <button
          type="button"
          onClick={() =>
            setChapterIndex((i) => Math.min(totalChapters - 1, i + 1))
          }
          disabled={chapterIndex >= totalChapters - 1}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-40"
          style={{
            background: "oklch(0.52 0.135 38)",
            color: "white",
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────
// Book Detail Sheet
// ─────────────────────────────────────────────
function BookDetailSheet({
  book,
  onClose,
  onRead,
}: { book: EBook; onClose: () => void; onRead: () => void }) {
  return createPortal(
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <dialog
        aria-label={book.title}
        className="rounded-t-3xl p-5 pb-8 max-h-[85vh] overflow-y-auto w-full"
        style={{ background: "white" }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto mb-4" />

        <div
          className="w-full h-40 rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative"
          style={{ background: book.gradient }}
        >
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen size={44} color="rgba(255,255,255,0.8)" />
          )}
          {book.pages && (
            <div
              className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-white text-xs font-semibold"
              style={{ background: "rgba(0,0,0,0.45)" }}
            >
              {book.chapters
                ? `${book.chapters.length} Chapters`
                : `${book.pages} pages`}
            </div>
          )}
        </div>

        <h2
          className="text-lg text-foreground mb-1"
          style={{ fontWeight: 700 }}
        >
          {book.title}
        </h2>
        <p className="text-sm text-muted-foreground mb-1">{book.author}</p>
        <div className="flex items-center gap-2 mb-3">
          <Badge
            className="text-white px-2 py-0.5 rounded-full text-xs"
            style={{
              background: genreColors[book.genre] || "oklch(0.52 0.135 38)",
              border: "none",
            }}
          >
            {book.genre}
          </Badge>
          <StarRating rating={book.rating} />
        </div>

        {book.description && (
          <p className="text-sm text-foreground mb-5 leading-relaxed">
            {book.description}
          </p>
        )}

        {/* Chapter list preview */}
        {book.chapters && book.chapters.length > 0 && (
          <div className="mb-5">
            <h3
              className="text-xs font-bold mb-2"
              style={{ color: "oklch(0.35 0.07 40)" }}
            >
              CHAPTERS ({book.chapters.length})
            </h3>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {book.chapters.map((ch, i) => (
                <div
                  key={ch.title}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{
                    background: "oklch(0.95 0.02 55)",
                    border: "1px solid oklch(0.88 0.03 55)",
                  }}
                >
                  <span
                    className="text-xs font-bold w-5 text-center"
                    style={{ color: "oklch(0.52 0.135 38)" }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-xs flex-1"
                    style={{ color: "oklch(0.30 0.07 40)" }}
                  >
                    {ch.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          data-ocid="ebook.primary_button"
          onClick={onRead}
          className="block w-full py-3.5 rounded-xl text-white text-center font-semibold transition-opacity hover:opacity-90"
          style={{ background: "oklch(0.52 0.135 38)" }}
        >
          📖 Read Now
        </button>
      </dialog>
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────
// Add Book Overlay
// ─────────────────────────────────────────────
function AddBookOverlay({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (book: Omit<EBook, "id" | "rating" | "gradient">) => void;
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    if (!title.trim() || !author.trim()) return;
    setIsSubmitting(true);
    try {
      let coverUrl: string | undefined;
      let pdfUrl: string | undefined;
      if (coverFile) coverUrl = await fileToDataUrl(coverFile);
      if (pdfFile) pdfUrl = await fileToDataUrl(pdfFile);
      onAdd({
        title: title.trim(),
        author: author.trim(),
        genre,
        description: description.trim(),
        coverUrl,
        pdfUrl,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "white" }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "oklch(0.90 0.02 55)" }}
      >
        <h2
          className="text-base font-bold"
          style={{ color: "oklch(0.30 0.07 40)" }}
        >
          Add EBook
        </h2>
        <button
          type="button"
          data-ocid="ebook.close_button"
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "oklch(0.92 0.03 55)" }}
        >
          <X size={16} color="oklch(0.30 0.07 40)" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {(
          [
            [
              "ebook-title",
              "Book Title *",
              title,
              setTitle,
              "text",
              "Enter book title",
            ],
            [
              "ebook-author",
              "Author Name *",
              author,
              setAuthor,
              "text",
              "Enter author name",
            ],
          ] as [string, string, string, (v: string) => void, string, string][]
        ).map(([id, label, value, setter, type, placeholder]) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-xs font-semibold mb-1"
              style={{ color: "oklch(0.35 0.07 40)" }}
            >
              {label}
            </label>
            <input
              id={id}
              type={type}
              data-ocid="ebook.input"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
              style={{
                background: "oklch(0.96 0.01 55)",
                border: "1px solid oklch(0.88 0.03 55)",
                color: "oklch(0.20 0.05 40)",
              }}
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="ebook-genre"
            className="block text-xs font-semibold mb-1"
            style={{ color: "oklch(0.35 0.07 40)" }}
          >
            Genre
          </label>
          <select
            id="ebook-genre"
            data-ocid="ebook.select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: "oklch(0.96 0.01 55)",
              border: "1px solid oklch(0.88 0.03 55)",
              color: "oklch(0.20 0.05 40)",
            }}
          >
            {[
              "Fiction",
              "History",
              "Culture",
              "Language",
              "Mythology",
              "Other",
            ].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="ebook-desc"
            className="block text-xs font-semibold mb-1"
            style={{ color: "oklch(0.35 0.07 40)" }}
          >
            Description
          </label>
          <textarea
            id="ebook-desc"
            data-ocid="ebook.textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the book"
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
            style={{
              background: "oklch(0.96 0.01 55)",
              border: "1px solid oklch(0.88 0.03 55)",
              color: "oklch(0.20 0.05 40)",
            }}
          />
        </div>

        {(
          [
            [
              coverInputRef,
              "image/*",
              setCoverFile,
              coverFile,
              "ebook-cover",
              "Cover Image",
              "Upload Cover Image",
            ],
            [
              pdfInputRef,
              "application/pdf",
              setPdfFile,
              pdfFile,
              "ebook-pdf",
              "PDF File",
              "Upload PDF",
            ],
          ] as [
            React.RefObject<HTMLInputElement>,
            string,
            (f: File | null) => void,
            File | null,
            string,
            string,
            string,
          ][]
        ).map(([ref, accept, setter, file, id, label, placeholder]) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-xs font-semibold mb-1"
              style={{ color: "oklch(0.35 0.07 40)" }}
            >
              {label}
            </label>
            <input
              id={id}
              ref={ref}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => setter(e.target.files?.[0] || null)}
            />
            <button
              type="button"
              data-ocid="ebook.upload_button"
              onClick={() => ref.current?.click()}
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
              style={{
                background: "oklch(0.92 0.03 55)",
                border: "1.5px dashed oklch(0.74 0.06 55)",
                color: "oklch(0.40 0.08 40)",
              }}
            >
              <Upload size={15} />
              <span className="text-xs font-semibold">
                {file ? file.name : placeholder}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div
        className="px-4 pb-8 pt-3"
        style={{ borderTop: "1px solid oklch(0.90 0.02 55)" }}
      >
        <button
          type="button"
          data-ocid="ebook.submit_button"
          onClick={handleSubmit}
          disabled={isSubmitting || !title.trim() || !author.trim()}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-50"
          style={{ background: "oklch(0.52 0.135 38)" }}
        >
          {isSubmitting ? "Adding EBook..." : "Add EBook"}
        </button>
      </div>
    </div>,
    document.body,
  );
}

// ─────────────────────────────────────────────
// Main EBook Section
// ─────────────────────────────────────────────
export default function EBookSection() {
  const { actor, isFetching } = useActor();
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null);
  const [readingBook, setReadingBook] = useState<EBook | null>(null);
  const [storedBooks, setStoredBooks] = useState<EBook[]>(() =>
    loadStoredEbooks(),
  );

  const { data: isAdmin = false } = useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });

  const allBooks: EBook[] =
    storedBooks.length > 0 ? [...mockEbooks, ...storedBooks] : mockEbooks;

  function handleAddBook(data: Omit<EBook, "id" | "rating" | "gradient">) {
    const newBook: EBook = {
      ...data,
      id: Date.now(),
      rating: 4,
      gradient: gradientsByGenre[data.genre] || gradientsByGenre.Other,
    };
    const updated = [...storedBooks, newBook];
    setStoredBooks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage full
    }
  }

  const filtered =
    activeCategory === "All"
      ? allBooks
      : allBooks.filter((b) => b.genre === activeCategory);
  const visible = expanded ? filtered : filtered.slice(0, 2);
  const hasMore = filtered.length > 2;

  return (
    <section className="px-4 mb-6 relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-base text-foreground flex items-center gap-1.5"
            style={{ fontWeight: 700 }}
          >
            <BookMarked
              size={16}
              style={{ color: "oklch(0.52 0.135 38)", flexShrink: 0 }}
            />
            EBook Library
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tribal Knowledge & Stories
          </p>
        </div>
        <Badge
          className="text-xs px-2 py-0.5"
          style={{
            background: "oklch(0.82 0.04 55)",
            color: "oklch(0.25 0.07 40)",
            border: "1px solid oklch(0.74 0.05 55)",
          }}
        >
          {allBooks.length} Books
        </Badge>
      </div>

      {/* Subcategory Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {subcategories.map((cat) => (
          <button
            key={cat}
            type="button"
            data-ocid="ebook.tab"
            onClick={() => {
              setActiveCategory(cat);
              setExpanded(false);
            }}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              background:
                activeCategory === cat
                  ? "oklch(0.52 0.135 38)"
                  : "oklch(0.92 0.03 55)",
              color: activeCategory === cat ? "white" : "oklch(0.30 0.07 40)",
              border:
                activeCategory === cat
                  ? "1px solid oklch(0.45 0.13 38)"
                  : "1px solid oklch(0.82 0.04 55)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div
        className="grid grid-cols-2 gap-3 overflow-hidden transition-all duration-500"
        style={{
          maxHeight: expanded
            ? `${Math.ceil(filtered.length / 2) * 190}px`
            : "290px",
        }}
      >
        {visible.map((book, idx) => (
          <button
            key={book.id}
            type="button"
            data-ocid={`ebook.item.${idx + 1}`}
            onClick={() => setSelectedBook(book)}
            className="bg-card rounded-2xl overflow-hidden text-left"
            style={{
              boxShadow: "0 3px 12px rgba(0,0,0,0.10)",
              border: "1px solid oklch(0.90 0.02 55)",
            }}
          >
            <div
              className="relative h-20 flex items-center justify-center overflow-hidden"
              style={{ background: book.gradient }}
            >
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BookOpen size={22} color="rgba(255,255,255,0.8)" />
              )}
              <div
                className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full text-white"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  fontSize: "9px",
                  fontWeight: 600,
                }}
              >
                {book.genre}
              </div>
              {book.chapters && (
                <div
                  className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-white flex items-center gap-0.5"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    fontSize: "8px",
                    fontWeight: 600,
                  }}
                >
                  📖 {book.chapters.length} ch
                </div>
              )}
            </div>

            <div className="p-2">
              <h3
                className="text-xs text-foreground leading-tight mb-0.5"
                style={{ fontWeight: 700 }}
              >
                {book.title}
              </h3>
              <p
                className="text-xs text-muted-foreground mb-1"
                style={{ fontSize: "10px" }}
              >
                {book.author}
              </p>
              <div className="flex items-center justify-between mb-1.5">
                <Badge
                  className="text-white px-1.5 py-0 rounded-full"
                  style={{
                    background:
                      genreColors[book.genre] || "oklch(0.52 0.135 38)",
                    fontSize: "9px",
                    border: "none",
                  }}
                >
                  {book.genre}
                </Badge>
                <StarRating rating={book.rating} />
              </div>
              <div
                className="w-full py-1 rounded-lg text-center"
                style={{
                  background: "oklch(0.52 0.135 38)",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                Read Now
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* See All / Show Less */}
      {hasMore && (
        <button
          type="button"
          data-ocid="ebook.toggle"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 w-full py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "oklch(0.92 0.03 55)",
            color: "oklch(0.30 0.07 40)",
            border: "1px solid oklch(0.82 0.04 55)",
          }}
        >
          {expanded ? "Show Less ▲" : `See All ${filtered.length} Books ▼`}
        </button>
      )}

      {/* Admin-only: Floating Add Book CTA */}
      {isAdmin && (
        <button
          type="button"
          data-ocid="ebook.upload_button"
          onClick={() => setShowAddBook(true)}
          className="fixed bottom-24 right-4 flex flex-col items-center gap-0.5 z-30"
          style={{ filter: "drop-shadow(0 4px 12px rgba(80,160,80,0.35))" }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.72 0.16 145)" }}
          >
            <Upload size={18} color="white" />
          </div>
          <span
            className="text-white rounded-full px-1.5 py-0.5"
            style={{
              background: "oklch(0.52 0.16 145)",
              fontSize: "8px",
              fontWeight: 700,
            }}
          >
            Add Book
          </span>
        </button>
      )}

      {showAddBook && (
        <AddBookOverlay
          onClose={() => setShowAddBook(false)}
          onAdd={handleAddBook}
        />
      )}

      {selectedBook && !readingBook && (
        <BookDetailSheet
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onRead={() => {
            setReadingBook(selectedBook);
            setSelectedBook(null);
          }}
        />
      )}

      {readingBook && (
        <EBookReader book={readingBook} onClose={() => setReadingBook(null)} />
      )}
    </section>
  );
}
