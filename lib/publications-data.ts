export type PublicationCategory = "kanoun" | "ana-wa-anta" | "booklet"

export interface Publication {
  id: string
  category: PublicationCategory
  title: string
  titleAr: string
  titleFr: string
  issue?: number
  year: number
  month?: number
  coverImage: string
  pdfUrl: string
  description: string
  descriptionAr: string
  descriptionFr: string
  topics: string[]
  language: "ar" | "fr" | "both"
}

// Sample data - in production this would come from a CMS or database
export const publications: Publication[] = [
  // 8 Kanoun Magazine
  {
    id: "kanoun-2024-01",
    category: "kanoun",
    title: "Magazine 8 Kanoon for Kids",
    titleAr: "مجلة  8 كانون للأطفال",
    titleFr: "Magazine 8 Kanoon pour les enfants",
    issue: 2,
    year: 2025,
    month: 8,
    coverImage: "/c2.png",
    pdfUrl: "/edi2.pdf",
    description: "Scientists of Future - The Second edition ",
    descriptionAr: "  علماء الغد  - العدد الثاني  ",
    descriptionFr: "           Les scientifiques de demain - Deuxiçème édition",
    topics: ["stories", "activities", "science"],
    language: "both",
  },

{
    id: "kanoun-2024-01",
    category: "kanoun",
    title: "Magazine 8 Kanoon for Kids",
    titleAr: "مجلة  8 كانون للأطفال",
    titleFr: "Magazine 8 Kanoon pour les enfants",
    issue: 1,
    year: 2025,
    month: 5,
    coverImage: "/c1.png",
    pdfUrl: "/edi1.pdf",
    description: "Future Makers - The first edition ",
    descriptionAr: "  صُناع المستقبل - العدد الأول  ",
    descriptionFr: "            Créateurs du futur - Première édition",
    topics: ["stories", "activities", "science"],
    language: "both",
  },





  // {
  //   id: "kanoun-2024-02",
  //   category: "kanoun",
  //   title: "8 Kanoun - February 2024",
  //   titleAr: "8 كانون - فبراير 2024",
  //   titleFr: "8 Kanoun - Février 2024",
  //   issue: 2,
  //   year: 2024,
  //   month: 2,
  //   coverImage: "/kanoun-feb-2024.jpg",
  //   pdfUrl: "/publications/kanoun-2024-02.pdf",
  //   description: "Friendship and kindness special edition",
  //   descriptionAr: "عدد خاص عن الصداقة واللطف",
  //   descriptionFr: "Édition spéciale amitié et gentillesse",
  //   topics: ["friendship", "emotions", "crafts"],
  //   language: "both",
  // },
  // {
  //   id: "kanoun-2024-03",
  //   category: "kanoun",
  //   title: "8 Kanoun - March 2024",
  //   titleAr: "8 كانون - مارس 2024",
  //   titleFr: "8 Kanoun - Mars 2024",
  //   issue: 3,
  //   year: 2024,
  //   month: 3,
  //   coverImage: "/kanoun-mar-2024.jpg",
  //   pdfUrl: "/publications/kanoun-2024-03.pdf",
  //   description: "Spring celebrations and nature exploration",
  //   descriptionAr: "احتفالات الربيع واستكشاف الطبيعة",
  //   descriptionFr: "Célébrations du printemps et exploration de la nature",
  //   topics: ["nature", "seasons", "games"],
  //   language: "both",
  // },
  // Ana wa Anta Magazine
  // {
  //   id: "ana-wa-anta-2024-01",
  //   category: "ana-wa-anta",
  //   title: "Ana wa Anta - Issue 1 2024",
  //   titleAr: "أنا وأنت - العدد 1 2024",
  //   titleFr: "Ana wa Anta - Numéro 1 2024",
  //   issue: 1,
  //   year: 2024,
  //   coverImage: "/ana-wa-anta-2024-01.jpg",
  //   pdfUrl: "/publications/ana-wa-anta-2024-01.pdf",
  //   description: "Identity and self-discovery",
  //   descriptionAr: "الهوية واكتشاف الذات",
  //   descriptionFr: "Identité et découverte de soi",
  //   topics: ["identity", "self-esteem", "relationships"],
  //   language: "both",
  // },
  // {
  //   id: "ana-wa-anta-2024-02",
  //   category: "ana-wa-anta",
  //   title: "Ana wa Anta - Issue 2 2024",
  //   titleAr: "أنا وأنت - العدد 2 2024",
  //   titleFr: "Ana wa Anta - Numéro 2 2024",
  //   issue: 2,
  //   year: 2024,
  //   coverImage: "/ana-wa-anta-2024-02.jpg",
  //   pdfUrl: "/publications/ana-wa-anta-2024-02.pdf",
  //   description: "Mental health and wellbeing",
  //   descriptionAr: "الصحة النفسية والرفاهية",
  //   descriptionFr: "Santé mentale et bien-être",
  //   topics: ["mental-health", "stress", "coping"],
  //   language: "both",
  // },
  // Nakhla Booklet
  // {
  //   id: "booklet-2024",
  //   category: "booklet",
  //   title: "Nakhla Booklet 2024",
  //   titleAr: "+33759889586 نخلة 2024",
  //   titleFr: "Livret Nakhla 2024",
  //   year: 2024,
  //   coverImage: "/nakhla-booklet-2024.jpg",
  //   pdfUrl: "/publications/nakhla-booklet-2024.pdf",
  //   description: "Complete guide for new mothers",
  //   descriptionAr: "دليل شامل للأمهات الجدد",
  //   descriptionFr: "Guide complet pour les nouvelles mères",
  //   topics: ["parenting", "newborn", "health", "development"],
  //   language: "both",
  // },
  // {
  //   id: "booklet-2023",
  //   category: "booklet",
  //   title: "Nakhla Booklet 2023",
  //   titleAr: "كُتيّب نخلة 2023",
  //   titleFr: "Livret Nakhla 2023",
  //   year: 2023,
  //   coverImage: "/nakhla-booklet-2023.jpg",
  //   pdfUrl: "/publications/nakhla-booklet-2023.pdf",
  //   description: "Essential parenting guide",
  //   descriptionAr: "دليل الأبوة والأمومة الأساسي",
  //   descriptionFr: "Guide parental essentiel",
  //   topics: ["parenting", "infant-care", "nutrition"],
  //   language: "both",
  // },
]

export function getPublicationsByCategory(category?: PublicationCategory) {
  if (!category) return publications
  return publications.filter((pub) => pub.category === category)
}

export function getPublicationById(id: string) {
  return publications.find((pub) => pub.id === id)
}
