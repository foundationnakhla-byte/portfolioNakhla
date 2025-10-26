"use client";

import type React from "react";
import { FileText, Scale, ShieldCheck, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Copy = {
  title: string;
  subtitle: string;
  updated: string;
  sections: Array<{ title: string; body: React.ReactNode }>;
  contact: { title: string; emailLabel: string; email: string };
};

function getCopy(locale: Locale): Copy {
  if (locale === "ar") {
    return {
      title: "الشروط والأحكام",
      subtitle:
        "يرجى قراءة هذه الشروط بعناية قبل استخدام موقع مؤسسة نخلة أو أي من خدماتها.",
      updated: "آخر تحديث: 2025-01-01",
      sections: [
        {
          title: "١) القبول والاستخدام",
          body: (
            <>
              باستخدامك هذا الموقع، فإنك تقرّ بقراءة الشروط والموافقة عليها.
              إذا لم توافق، يُرجى التوقف عن الاستخدام. قد نقوم بتحديث هذه
              الشروط دورياً وسيُعدّ استمرار الاستخدام موافقة على النسخة
              المحدّثة.
            </>
          ),
        },
        {
          title: "٢) الملكية الفكرية",
          body: (
            <>
              جميع المواد المنشورة (النصوص، الرسومات، الشعار، الصور) مملوكة
              لمؤسسة نخلة أو مرخّصة لها، ويُمنع نسخها أو إعادة استخدامها إلا
              بإذن خطّي مسبق. يسمح بالاستخدام غير التجاري مع ذكر المصدر ما لم
              يُنصّ على خلاف ذلك.
            </>
          ),
        },
        {
          title: "٣) السلوك والاستخدام المقبول",
          body: (
            <>
              يُحظر أي استخدام يخلّ بالأمن أو ينتهك حقوق الأطفال والخصوصية
              أو القوانين النافذة. كما يُمنع نشر محتوى مسيء أو يحضّ على
              الكراهية أو العنف.
            </>
          ),
        },
        {
          title: "٤) الروابط الخارجية",
          body: (
            <>
              قد يحتوي الموقع على روابط لمواقع جهات أخرى. لسنا مسؤولين عن
              محتواها أو سياساتها. ننصحك بمراجعة الشروط والخصوصية الخاصة
              بتلك المواقع.
            </>
          ),
        },
        {
          title: "٥) إخلاء المسؤولية",
          body: (
            <>
              نسعى لتقديم معلومات دقيقة، لكننا لا نضمن خلوّها من الأخطاء.
              المحتوى لأغراض معلوماتية/توعوية ولا يقدّم بديلاً عن الاستشارة
              المتخصصة عند الحاجة.
            </>
          ),
        },
        {
          title: "٦) التعديلات",
          body: (
            <>
              نحتفظ بحق تعديل هذه الشروط أو أي جزء من الموقع في أي وقت. سيتم
              نشر النسخة المحدثة مع تاريخ آخر تحديث.
            </>
          ),
        },
      ],
      contact: {
        title: "للتواصل والاستفسار حول هذه الشروط",
        emailLabel: "البريد الإلكتروني:",
        email: "legal@nakhla-found.com",
      },
    };
  }

  if (locale === "fr") {
    return {
      title: "Conditions Générales d’Utilisation",
      subtitle:
        "Veuillez lire attentivement ces conditions avant d’utiliser le site de la Fondation Nakhla ou ses services.",
      updated: "Dernière mise à jour : 01/01/2025",
      sections: [
        {
          title: "1) Acceptation & utilisation",
          body: (
            <>
              En utilisant ce site, vous reconnaissez avoir lu et accepté ces
              conditions. Si vous n’êtes pas d’accord, cessez l’utilisation. Les
              conditions peuvent être mises à jour périodiquement.
            </>
          ),
        },
        {
          title: "2) Propriété intellectuelle",
          body: (
            <>
              Tous les contenus (textes, graphismes, logo, images) appartiennent
              à la Fondation Nakhla ou sont sous licence. Toute réutilisation
              nécessite une autorisation écrite préalable.
            </>
          ),
        },
        {
          title: "3) Comportement et usage acceptable",
          body: (
            <>
              Il est interdit d’utiliser le site d’une manière portant atteinte
              à la sécurité, aux droits des enfants, à la vie privée ou aux lois
              en vigueur, ainsi que de publier des contenus offensants.
            </>
          ),
        },
        {
          title: "4) Liens externes",
          body: (
            <>
              Le site peut contenir des liens vers des sites tiers. Nous ne
              sommes pas responsables de leur contenu ni de leurs politiques.
            </>
          ),
        },
        {
          title: "5) Exonération de responsabilité",
          body: (
            <>
              Nous visons l’exactitude des informations sans garantie d’absence
              d’erreurs. Le contenu est informatif et ne remplace pas un avis
              professionnel.
            </>
          ),
        },
        {
          title: "6) Modifications",
          body: (
            <>
              Nous pouvons modifier ces conditions à tout moment. La version
              mise à jour sera publiée avec sa date.
            </>
          ),
        },
      ],
      contact: {
        title: "Contact au sujet des présentes conditions",
        emailLabel: "E-mail :",
        email: "legal@nakhla-found.com",
      },
    };
  }

  return {
    title: "Terms & Conditions",
    subtitle:
      "Please read these terms carefully before using the Nakhla Foundation website or services.",
    updated: "Last updated: 2025-01-01",
    sections: [
      {
        title: "1) Acceptance & Use",
        body: (
          <>
            By using this site, you acknowledge that you have read and agree to
            these terms. If you do not agree, please discontinue use. We may
            update these terms periodically.
          </>
        ),
      },
      {
        title: "2) Intellectual Property",
        body: (
          <>
            All materials (texts, graphics, logo, images) are owned by or
            licensed to Nakhla Foundation. Reuse requires prior written
            permission.
          </>
        ),
      },
      {
        title: "3) Acceptable Use",
        body: (
          <>
            You must not use the site in a way that harms security, violates
            children’s rights, privacy, or applicable laws; or publish abusive
            or violent content.
          </>
        ),
      },
      {
        title: "4) External Links",
        body: (
          <>
            The site may contain links to third-party sites. We are not
            responsible for their content or policies.
          </>
        ),
      },
      {
        title: "5) Disclaimer",
        body: (
          <>
            We strive for accuracy but provide no guarantees. Content is
            informational and not a substitute for professional advice.
          </>
        ),
      },
      {
        title: "6) Changes",
        body: (
          <>
            We may modify these terms at any time. The updated version will be
            posted with its date.
          </>
        ),
      },
    ],
    contact: {
      title: "Contact regarding these terms",
      emailLabel: "Email:",
      email: "legal@nakhla-found.com",
    },
  };
}

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getCopy(locale);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{t.title}</h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
            <p className="text-sm text-muted-foreground">{t.updated}</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="container despmar">
          <div className="mx-auto max-w-4xl space-y-10">
            {t.sections.map((sec, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  {i === 0 && (
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  )}
                  {i === 1 && <Scale className="h-6 w-6 text-primary" />}
                  {i > 1 && <FileText className="h-6 w-6 text-primary" />}
                  <h2 className="text-xl md:text-2xl font-bold">{sec.title}</h2>
                </div>
                <div className="text-muted-foreground leading-relaxed">{sec.body}</div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-muted/50">
              <h3 className="text-lg md:text-xl font-bold mb-2">{t.contact.title}</h3>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">{t.contact.emailLabel}</span>{" "}
                <a href="mailto:legal@nakhla-found.com" className="text-primary underline">
                  {t.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
