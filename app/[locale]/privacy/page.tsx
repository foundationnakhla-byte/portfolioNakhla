"use client";

import type React from "react";
import { Lock, Shield, Database, UserCheck, Mail } from "lucide-react";
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
      title: "سياسة الخصوصية",
      subtitle:
        "نلتزم بحماية بياناتك واحترام خصوصيتك وفق أفضل الممارسات ومعايير الأمان.",
      updated: "آخر تحديث: 2025-01-01",
      sections: [
        {
          title: "١) البيانات التي نجمعها",
          body: (
            <>
              نجمع البيانات التي تزودنا بها طوعاً (كالاسم والبريد) وبيانات
              استخدام الموقع (ملفات تعريف الارتباط/الكوكيز، الصفحات
              المُشاهدة) لتحسين الخدمة.
            </>
          ),
        },
        {
          title: "٢) كيفية استخدام البيانات",
          body: (
            <>
              نستخدم البيانات للتواصل، وتقديم الخدمات، وتحسين التجربة،
              وإصدار تقارير إحصائية غير مُعرِّفة للهوية.
            </>
          ),
        },
        {
          title: "٣) مشاركة البيانات",
          body: (
            <>
              لا نبيع بياناتك. قد نشاركها مع مزودين موثوقين لمعالجة تقنية
              وفق اتفاقيات حماية بيانات، أو إذا طُلب قانونياً.
            </>
          ),
        },
        {
          title: "٤) الأمان والاحتفاظ",
          body: (
            <>
              نطبق ضوابط أمنية (تشفير، صلاحيات، مصادقة ثنائية) ونحتفظ
              بالبيانات للمدة اللازمة للأغراض المبينة فقط.
            </>
          ),
        },
        {
          title: "٥) حقوقك",
          body: (
            <>
              لك الحق في الوصول، التصحيح، المحو، تقييد أو الاعتراض على
              المعالجة، وسحب الموافقة عند الاعتماد عليها. تواصل معنا لممارسة
              حقوقك.
            </>
          ),
        },
        {
          title: "٦) ملفات تعريف الارتباط (Cookies)",
          body: (
            <>
              نستخدم الكوكيز الأساسية والتحليلية. يمكنك ضبط المتصفح لرفضها؛
              قد يؤثر ذلك على بعض الميزات.
            </>
          ),
        },
        {
          title: "٧) تغييرات السياسة",
          body: (
            <>قد نقوم بتحديث هذه السياسة. سيتم نشر النسخة المحدثة وتاريخها.</>
          ),
        },
      ],
      contact: {
        title: "للاستفسار أو لممارسة حقوق الخصوصية",
        emailLabel: "البريد الإلكتروني:",
        email: "legal@nakhla-found.com",
      },
    };
  }

  if (locale === "fr") {
    return {
      title: "Politique de Confidentialité",
      subtitle:
        "Nous protégeons vos données et respectons votre vie privée selon les meilleures pratiques.",
      updated: "Dernière mise à jour : 01/01/2025",
      sections: [
        {
          title: "1) Données collectées",
          body: (
            <>
              Données fournies volontairement (nom, e-mail) et données d’usage
              du site (cookies, pages consultées) afin d’améliorer le service.
            </>
          ),
        },
        {
          title: "2) Utilisation des données",
          body: (
            <>
              Communication, fourniture des services, amélioration
              d’expérience, statistiques anonymisées.
            </>
          ),
        },
        {
          title: "3) Partage des données",
          body: (
            <>
              Aucune vente de données. Partage possible avec des prestataires
              de confiance (contrats de protection des données) ou sur
              obligation légale.
            </>
          ),
        },
        {
          title: "4) Sécurité & conservation",
          body: (
            <>
              Mesures de sécurité (chiffrement, autorisations, 2FA) et durée de
              conservation limitée aux finalités décrites.
            </>
          ),
        },
        {
          title: "5) Vos droits",
          body: (
            <>
              Accès, rectification, effacement, limitation/opposition,
              retrait du consentement le cas échéant. Contactez-nous.
            </>
          ),
        },
        {
          title: "6) Cookies",
          body: (
            <>
              Cookies essentiels et analytiques. Vous pouvez les refuser
              depuis le navigateur (certains services pourraient être limités).
            </>
          ),
        },
        {
          title: "7) Modifications",
          body: (
            <>
              Cette politique peut être mise à jour. La version à jour sera
              publiée avec sa date.
            </>
          ),
        },
      ],
      contact: {
        title: "Contact relatif à la confidentialité",
        emailLabel: "E-mail :",
        email: "legalorg",
      },
    };
  }

  return {
    title: "Privacy Policy",
    subtitle:
      "We protect your data and respect your privacy according to best practices.",
    updated: "Last updated: 2025-01-01",
    sections: [
      {
        title: "1) Data We Collect",
        body: (
          <>
            Voluntarily provided data (name, email) and site usage data
            (cookies, pages viewed) to improve the service.
          </>
        ),
      },
      {
        title: "2) How We Use Data",
        body: (
          <>
            Communication, service delivery, experience improvement, and
            anonymized statistics.
          </>
        ),
      },
      {
        title: "3) Data Sharing",
        body: (
          <>
            We do not sell data. We may share with trusted processors under
            data-protection agreements or when required by law.
          </>
        ),
      },
      {
        title: "4) Security & Retention",
        body: (
          <>
            Encryption, access controls, 2FA; data retained only as long as
            necessary for stated purposes.
          </>
        ),
      },
      {
        title: "5) Your Rights",
        body: (
          <>
            Access, rectification, erasure, restriction/objection, withdraw
            consent where applicable—contact us to exercise your rights.
          </>
        ),
      },
      {
        title: "6) Cookies",
        body: (
          <>
            Essential and analytics cookies. You can refuse them in your
            browser; some features may be limited.
          </>
        ),
      },
      {
        title: "7) Changes",
        body: (
          <>We may update this policy; we’ll post the updated version with date.</>
        ),
      },
    ],
    contact: {
      title: "Privacy inquiries",
      emailLabel: "Email:",
      email: "legal@nakhla-found.com",
    },
  };
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getCopy(locale);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container despmar">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-8 w-8" />
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
                  {i === 0 && <Database className="h-6 w-6 text-primary" />}
                  {i === 1 && <UserCheck className="h-6 w-6 text-primary" />}
                  {i > 1 && <Shield className="h-6 w-6 text-primary" />}
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
