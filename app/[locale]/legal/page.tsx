// app/[locale]/legal-clinic/page.tsx

import Link from "next/link"
import type { Locale } from "@/lib/i18n"

import { LegalClinicContactForm } from "@/components/legal-clinic-contact-form"
import { getTranslations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import {
  Scale,
  Gavel,
  FileText,
  ShieldCheck,
  ClipboardList,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  MessageSquareText,
} from "lucide-react"

export default async function LegalClinicPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const translations = getTranslations(locale)
  const isRTL = locale === "ar"

  // نصوص بسيطة (إذا بدك تربطها بالترجمات لاحقاً بنفصّلها)
  const copy = {
    title:
      locale === "ar"
        ? "حلول قانونية احترافية تحمي حقوقك"
        : locale === "fr"
        ? "Des solutions juridiques professionnelles pour protéger vos droits"
        : "Professional legal solutions that protect your rights",
    subtitle:
      locale === "ar"
        ? "نقدّم استشارات ومرافقة قانونية بخصوص قضايا الإقامة، العمل، الأسرة، والسكن — بخطوات واضحة وبأسلوب إنساني."
        : locale === "fr"
        ? "Conseils et accompagnement juridiques pour le séjour, le travail, la famille et le logement — avec des étapes claires et une approche humaine."
        : "Legal advice and support for residency, work, family, and housing — with clear steps and a human approach.",
    cta1: locale === "ar" ? "احجز موعدك الآن" : locale === "fr" ? "Prendre rendez-vous" : "Book an appointment",
    cta2: locale === "ar" ? " تواصل عبر واتساب" : locale === "fr" ? "Contactez-nous par WhatsApp" : "Contact us by WhatsApp",
    statsTitle:
      locale === "ar"
        ? "أرقام تعكس أثرنا"
        : locale === "fr"
        ? "Des chiffres qui reflètent notre impact"
        : "Numbers that reflect our impact",
    servicesTitle:
      locale === "ar" ? "خدماتنا القانونية" : locale === "fr" ? "Nos services juridiques" : "Our legal services",
    servicesSubtitle:
      locale === "ar"
        ? "نغطي أكثر المواضيع شيوعاً لدى العائلات والطلاب واللاجئين في فرنسا."
        : locale === "fr"
        ? "Nous couvrons les besoins juridiques les plus fréquents des familles, étudiants et réfugiés en France."
        : "We cover the most common legal needs for families, students, and refugees in France.",
    stepsTitle:
      locale === "ar" ? "كيف نساعدك؟" : locale === "fr" ? "Comment on vous aide ?" : "How we help you",
    stepsSubtitle:
      locale === "ar"
        ? "من أول تواصل لحد المتابعة — كل شي واضح ومترتّب."
        : locale === "fr"
        ? "Du premier contact au suivi — tout est clair et structuré."
        : "From first contact to follow-up — everything is clear and structured.",
    contactTitle:
      locale === "ar" ? "أرسل لنا رسالة" : locale === "fr" ? "Envoyez-nous un message" : "Send us a message",
    contactSubtitle:
      locale === "ar"
        ? "اكتب تفاصيل حالتك وسنتواصل معك بأقرب وقت."
        : locale === "fr"
        ? "Décrivez votre situation et nous vous répondrons au plus vite."
        : "Describe your case and we’ll get back to you as soon as possible.",
  }

  const services = [
    {
      icon: Scale,
      title: locale === "ar" ? "استشارات قانونية" : locale === "fr" ? "Consultations juridiques" : "Legal consultations",
      desc:
        locale === "ar"
          ? "جلسات استشارة لفهم وضعك القانوني وتحديد الخيارات المتاحة."
          : locale === "fr"
          ? "Des consultations pour comprendre votre situation et vos options."
          : "Sessions to understand your legal situation and available options.",
    },
    {
      icon: FileText,
      title:
        locale === "ar" ? "مرافقة الملفات" : locale === "fr" ? "Suivi de dossiers" : "Case follow-up",
      desc:
        locale === "ar"
          ? "تدقيق/تجهيز ملفات الإقامة، لمّ الشمل، والعمل (حسب الحاجة)."
          : locale === "fr"
          ? "Préparation et vérification des dossiers (selon le besoin)."
          : "Preparing and reviewing residency/work/family files as needed.",
    },
    {
      icon: ClipboardList,
      title:
        locale === "ar" ? "إرشاد إداري" : locale === "fr" ? "Orientation administrative" : "Administrative guidance",
      desc:
        locale === "ar"
          ? "مساعدة بخطوات المواعيد، الأوراق المطلوبة، والجهات المناسبة."
          : locale === "fr"
          ? "Aide pour les démarches, pièces, et administrations."
          : "Help with appointments, required documents, and the right authorities.",
    },
    {
      icon: ShieldCheck,
      title:
        locale === "ar" ? "حماية الحقوق" : locale === "fr" ? "Protection des droits" : "Rights protection",
      desc:
        locale === "ar"
          ? "توعية بحقوقك وتوجيهك لتفادي الأخطاء والإجراءات الخاطئة."
          : locale === "fr"
          ? "Sensibilisation et orientation pour éviter les erreurs."
          : "Guidance to protect your rights and avoid common mistakes.",
    },
    {
      icon: Gavel,
      title:
        locale === "ar" ? "نزاعات بسيطة" : locale === "fr" ? "Litiges simples" : "Simple disputes",
      desc:
        locale === "ar"
          ? "توجيه أولي بنزاعات السكن والعمل والخدمات الأساسية (حسب الحالة)."
          : locale === "fr"
          ? "Orientation initiale pour logement, travail, services (selon cas)."
          : "Initial guidance for housing/work/service disputes depending on the case.",
    },
    {
      icon: Users,
      title:
        locale === "ar" ? "دعم مجتمعي" : locale === "fr" ? "Soutien communautaire" : "Community support",
      desc:
        locale === "ar"
          ? "ربطك بالجهات المساندة والجمعيات المختصة عند الحاجة."
          : locale === "fr"
          ? "Mise en relation avec associations et services pertinents."
          : "Connecting you with relevant associations and support services.",
    },
  ]

  const steps = [
    {
      n: "01",
      title: locale === "ar" ? "تواصل أولي" : locale === "fr" ? "Premier contact" : "First contact",
      desc:
        locale === "ar"
          ? "ترسل تفاصيل مختصرة عن وضعك."
          : locale === "fr"
          ? "Vous envoyez un bref résumé de votre situation."
          : "Send a short summary of your case.",
      icon: MessageSquareText,
    },
    {
      n: "02",
      title: locale === "ar" ? "تقييم سريع" : locale === "fr" ? "Évaluation rapide" : "Quick assessment",
      desc:
        locale === "ar"
          ? "نراجع المعلومات ونحدد الخطوات."
          : locale === "fr"
          ? "Nous analysons et définissons les étapes."
          : "We review and define the next steps.",
      icon: ClipboardList,
    },
    {
      n: "03",
      title: locale === "ar" ? "جلسة/موعد" : locale === "fr" ? "Rendez-vous" : "Appointment",
      desc:
        locale === "ar"
          ? "موعد للاستشارة أو المتابعة بحسب الحالة."
          : locale === "fr"
          ? "Consultation ou suivi selon votre besoin."
          : "Consultation or follow-up depending on your needs.",
      icon: Clock,
    },
    {
      n: "04",
      title: locale === "ar" ? "متابعة" : locale === "fr" ? "Suivi" : "Follow-up",
      desc:
        locale === "ar"
          ? "نتأكد أنك ماشي بالطريق الصحيح."
          : locale === "fr"
          ? "On s’assure que tout avance correctement."
          : "We ensure everything progresses correctly.",
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* HERO (بنفسجي مثل الصور) */}
      <section className="relative overflow-hidden bg-[#4B0082]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B0082] via-[#3a0067] to-[#2a004b]" />
        <div className="relative container despmar py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-6 text-white">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/15">
              <Scale className="h-7 w-7" />
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-balance">
              {copy.title}
            </h1>
            <p className="text-base md:text-xl text-white/80 leading-relaxed">
              {copy.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-[#E11D74] hover:bg-[#c31662] text-white rounded-2xl px-6"
              >
                <Link href= 'https://calendar.app.google/PPNxWeXdyoXJfqJX9'>{copy.cta1}</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl bg-transparent border-white/30 text-white hover:bg-white/10 px-6"
              >
                <Link href= 'https://wa.me/963985230608'>{copy.cta2}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b bg-white">
        <div className="container despmar py-10">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">{copy.statsTitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "7/7", label: locale === "ar" ? "متابعة أساسية" : locale === "fr" ? "Suivi essentiel" : "Essential follow-up" },
                { value: "100+", label: locale === "ar" ? "استشارة سنوياً" : locale === "fr" ? "Consultations/an" : "Consultations/year" },
                { value: "100+", label: locale === "ar" ? "حالات تم دعمها" : locale === "fr" ? "Cas accompagnés" : "Cases supported" },
                { value: "10+", label: locale === "ar" ? "شركاء دعم" : locale === "fr" ? "Partenaires" : "Partners" },
              ].map((s) => (
                <div key={s.label} className="text-center rounded-2xl border bg-white p-5">
                  <div className="text-2xl md:text-3xl font-extrabold text-[#E11D74]">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#F7F3FA]">
        <div className="container despmar py-16 md:py-24">
          <div className="mx-auto max-w-5xl text-center mb-12 space-y-3">
            <p className="text-sm text-[#E11D74] font-semibold">
              {locale === "ar" ? "خدمات" : locale === "fr" ? "Services" : "Services"}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold">{copy.servicesTitle}</h2>
            <p className="text-muted-foreground">{copy.servicesSubtitle}</p>
          </div>

          <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  className="rounded-2xl border bg-white p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#E11D74]/10 text-[#E11D74] flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center pt-10">
            <Button asChild className="rounded-2xl bg-[#4B0082] hover:bg-[#3a0067]">
              <Link href= 'https://igal.nakhla-found.com/contact'>
                {locale === "ar" ? "اطلب استشارة" : locale === "fr" ? "Demander une consultation" : "Request a consultation"}
                {isRTL ? <ArrowLeft className="h-4 w-4 ms-2" /> : <ArrowRight className="h-4 w-4 ms-2" />}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA PURPLE BAND */}
      <section className="bg-[#4B0082]">
        <div className="container despmar py-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center text-white space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {locale === "ar"
                ? "هل تحتاج لاستشارة قانونية؟"
                : locale === "fr"
                ? "Besoin d’un conseil juridique ?"
                : "Need legal advice?"}
            </h2>
            <p className="text-white/80">
              {locale === "ar"
                ? "راسلنا اليوم وسنساعدك بتحديد أفضل خطوة ممكنة حسب حالتك."
                : locale === "fr"
                ? "Contactez-nous aujourd’hui — on vous aide à choisir la meilleure prochaine étape."
                : "Message us today — we’ll help you choose the best next step."}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Button asChild size="lg" className="rounded-2xl bg-[#E11D74] hover:bg-[#c31662]">
                <Link href= 'https://calendar.app.google/PPNxWeXdyoXJfqJX9'>{copy.cta1}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-2xl bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                <Link href= 'https://wa.me/963985230608'>{copy.cta2}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS + CONTACT */}
      <section className="bg-white">
        <div className="container despmar py-16 md:py-24">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
            {/* Steps */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-[#E11D74] font-semibold">
                  {locale === "ar" ? "الآلية" : locale === "fr" ? "Processus" : "Process"}
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold">{copy.stepsTitle}</h2>
                <p className="text-muted-foreground">{copy.stepsSubtitle}</p>
              </div>

              <div className="grid gap-4">
                {steps.map((st) => {
                  const Icon = st.icon
                  return (
                    <div key={st.n} className="rounded-2xl border p-5 flex gap-4">
                      <div className="shrink-0 h-12 w-12 rounded-xl bg-[#4B0082]/10 text-[#4B0082] flex items-center justify-center">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-bold text-lg">{st.title}</h3>
                          <span className="text-sm font-semibold text-[#E11D74]">{st.n}</span>
                        </div>
                        <p className="text-muted-foreground mt-1">{st.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Contact card + form */}
            <div className="space-y-6">
              <div className="rounded-3xl border bg-[#F7F3FA] p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white border p-4 flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#E11D74]" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {locale === "ar" ? "هاتف" : locale === "fr" ? "Téléphone" : "Phone"}
                      </div>
                      <div className="font-semibold">00963.985.230.608</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border p-4 flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#E11D74]" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {locale === "ar" ? "البريد" : locale === "fr" ? "Email" : "Email"}
                      </div>
                      <div className="font-semibold">info@nakhla-found.com</div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white border p-4 flex items-start gap-3 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-[#E11D74]" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {locale === "ar" ? "العنوان" : locale === "fr" ? "Adresse" : "Address"}
                      </div>
                      <div className="font-semibold">
                        {locale === "ar"
                          ? "  ديرالزور - حي الرصافة  "
                          : locale === "fr"
                          ? "    Dier EZZOR - ALRASAFA"
                          : "Dier EZZOR - ALRASAFA"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2">
                  <h3 className="text-2xl font-extrabold">{copy.contactTitle}</h3>
                  <p className="text-muted-foreground">{copy.contactSubtitle}</p>
                </div>

 



 

              {/* Map placeholder */}
              <div className="rounded-3xl border overflow-hidden">
                <div className="bg-[#4B0082] text-white px-5 py-4 font-bold">
                  {locale === "ar" ? "موقعنا" : locale === "fr" ? "Notre localisation" : "Our location"}
                </div>
                <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                  <div className="flex-1 overflow-hidden rounded-xl border border-border">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d16407.241212017103!2d40.16593776253752!3d35.31576825302231!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1772290646675!5m2!1sfr!2sfr"
    width="100%"
    height="100%"
    style={{ border: 0, minHeight: 300 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="موقع المكتب على الخريطة"
  />
</div>
 





                </div>
              </div>
            </div>
          </div>
      <div className="container despmar">
        <LegalClinicContactForm locale={locale as any} />
      </div>
          {/* Back link (اختياري) */}
          <div className=" text-center ">
            <Link className="text-sm underline desplayBlock text-muted-foreground" href={`/${locale}`}>
              {locale === "ar" ? "عودة للرئيسية" : locale === "fr" ? "Retour à l’accueil" : "Back to home"}
            </Link>

          </div>
          
        </div>
  
          </div>
      </section>
      <section className="bg-[#4B0082]">
        <div className="container despmar py-16">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 text-center text-white space-y-4">
 
            <Link className="text-sm underline desplayBlock" href= 'https://igal.nakhla-found.com/'>
              {locale === "ar" ? "انظر موقع الكبينة القانونية  " : locale === "fr" ? "   Voir notre site d intrnet " : "    see our Website"}
            </Link>


          </div>
        </div>
      </section>
    </div>
  )
}