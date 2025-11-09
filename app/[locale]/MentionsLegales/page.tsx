"use client";

import type React from "react";
import { FileText, ShieldCheck, Users, Handshake, Gavel, Mail } from "lucide-react";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type Section = { title: string; body: React.ReactNode };
type Copy = {
  title: string;
  subtitle: string;
  updated: string;
  sections: Section[];
  contact: { title: string; emailLabel: string; email: string };
};

function getCopy(locale: Locale): Copy {
  if (locale === "fr") {
    const editor = `
1. Éditeur du site

Le présent site est édité par :  
**MULLA WEB**  
Entreprise spécialisée dans la conception et le développement de sites web.  

Représentant légal : **MULLA Ali Omar**  
Adresse : 35 Place du 14 Juillet, 59500 Douai, France  
Téléphone : 06 58 89 92 54  
Email : contact@mulla-web.org  

Hébergement : OVH, 340 S Lemon Ave #4133, Walnut, CA 91789, USA.  
Site web : [https://www.ovhcloud.com/fr/](https://www.ovhcloud.com/fr/)
    `;
    const property = `
2. Propriété intellectuelle

Tous les contenus de ce site (textes, images, graphismes, codes, logos, vidéos, etc.)  
sont la propriété exclusive de **MULLA WEB** ou de ses clients.  
Toute reproduction est interdite sans autorisation écrite.
    `;
    const data = `
3. Données personnelles (RGPD)

Les données collectées via le site sont utilisées uniquement à des fins de contact ou de prestation.  
Conformément au RGPD, vous pouvez demander la suppression ou la modification de vos données à :  
📩 contact@mulla-web.org
    `;
    const law = `
4. Loi applicable

Les présentes mentions légales sont régies par le droit français.  
Tribunal compétent : **Douai (59500)**.
    `;

    return {
      title: "Mentions légales",
      subtitle: "Informations légales relatives à l’éditeur, à la propriété intellectuelle et à la protection des données.",
      updated: "Dernière mise à jour : 01/01/2025",
      sections: [
        { title: "Éditeur du site", body: <div dangerouslySetInnerHTML={{ __html: editor }} /> },
        { title: "Propriété intellectuelle", body: <div dangerouslySetInnerHTML={{ __html: property }} /> },
        { title: "Données personnelles (RGPD)", body: <div dangerouslySetInnerHTML={{ __html: data }} /> },
        { title: "Loi applicable", body: <div dangerouslySetInnerHTML={{ __html: law }} /> },
      ],
      contact: {
        title: "Contact légal",
        emailLabel: "E-mail :",
        email: "contact@mulla-web.org",
      },
    };
  }

  if (locale === "ar") {
    const editor = `
1. الجهة المسؤولة عن الموقع

تُدار هذا الموقع من قبل:  
**شركة MULLA WEB**  <br/>
شركة متخصصة في تصميم وتطوير المواقع الإلكترونية.  

الممثل القانوني:  عمر ملا     <br/>
العنوان: 35 Place du 14 Juillet, 59500 Douai, France   <br/>
الهاتف: 06 58 89 92 54   <br/>
البريد الإلكتروني: contact@mulla-web.org   <br/>

الاستضافة:OVH – الولايات المتحدة الأمريكية   <br/>
الموقع الإلكتروني: [https://www.ovhcloud.com/fr/](https://www.ovhcloud.com/fr/) <br/>
    `;
    const property = `
2. الملكية الفكرية

جميع محتويات هذا الموقع هي ملك لشركة  MULLA WEB أو عملائها.  
يُمنع النسخ أو الاستخدام دون إذن كتابي مسبق.
    `;
    const data = `
3. حماية البيانات الشخصية (RGPD)

تلتزم الشركة بحماية خصوصية المستخدمين.   <br/>
لا تُستخدم البيانات إلا للأغراض الضرورية لتقديم الخدمات.   <br/>
📩 للتواصل: contact@mulla-web.org
    `;
    const law = `
4. القانون المطبق
 <br/>
تخضع هذه البيانات القانونية للقانون الفرنسي.  
المحكمة المختصة: Douai (59500).
    `;

    return {
      title: "البيانات القانونية",
      subtitle: "معلومات عن الجهة المسؤولة والملكية الفكرية وحماية البيانات وفق اللوائح المعمول بها.",
      updated: "آخر تحديث: 2025-01-01",
      sections: [
        { title: "الجهة المسؤولة عن الموقع", body: <div dir="rtl" dangerouslySetInnerHTML={{ __html: editor }} /> },
        { title: "الملكية الفكرية", body: <div dir="rtl" dangerouslySetInnerHTML={{ __html: property }} /> },
        { title: "حماية البيانات الشخصية (RGPD)", body: <div dir="rtl" dangerouslySetInnerHTML={{ __html: data }} /> },
        { title: "القانون المطبق", body: <div dir="rtl" dangerouslySetInnerHTML={{ __html: law }} /> },
      ],
      contact: {
        title: "للاستفسارات القانونية",
        emailLabel: "البريد الإلكتروني:",
        email: "contact@mulla-web.org",
      },
    };
  }

  // en (default)
  const editor = `
1. Website Publisher <br/>

This site is published by:  
 MULLA WEB  – Web design and development company.   <br/>

Legal representative:  MULLA Ali Omar   <br/>
Address: 35 Place du 14 Juillet, 59500 Douai, France   <br/>
Phone: +33 6 58 89 92 54   <br/>
Email: contact@mulla-web.org   <br/>

Hosting: OVH, USA   <br/>
Website: [https://www.ovhcloud.com/fr/](https://www.ovhcloud.com/fr/)
  `;
  const property = `
2. Intellectual Property  <br/>

All content on this website is the property of  MULLA WEB  or its clients.   <br/>
Reproduction or redistribution without written consent is prohibited. <br/>
  `;
  const data = `
3. Personal Data (GDPR) <br/>

Data collected is used solely for communication or service delivery.   <br/>
Under GDPR, you may request access, correction, or deletion of your data via:   <br/>
📩 contact@mulla-web.org
  `;
  const law = `
4. Governing Law  <br/>

These legal notices are governed by French law.   <br/>
Jurisdiction:  Douai (59500) . <br/>
  `;

  return {
    title: "Legal Notice",
    subtitle: "Legal information about the publisher, intellectual property and GDPR compliance.",
    updated: "Last updated: 2025-01-01",
    sections: [
      { title: "Website Publisher", body: <div dangerouslySetInnerHTML={{ __html: editor }} /> },
      { title: "Intellectual Property", body: <div dangerouslySetInnerHTML={{ __html: property }} /> },
      { title: "Personal Data (GDPR)", body: <div dangerouslySetInnerHTML={{ __html: data }} /> },
      { title: "Governing Law", body: <div dangerouslySetInnerHTML={{ __html: law }} /> },
    ],
    contact: {
      title: "Legal Contact",
      emailLabel: "Email:",
      email: "contact@mulla-web.org",
    },
  };
}

export default function MentionsLegalesPage() {
  const params = useParams<{ locale?: string }>();
  const locale = (params?.locale ?? "fr") as Locale;
  const t = getCopy(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="flex flex-col" dir={dir}>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container">
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
        <div className="container">
          <div className="mx-auto max-w-4xl space-y-10">
            {t.sections.map((sec, i) => (
              <div key={i} className="p-6 rounded-2xl border bg-card shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  {i === 0 && <Handshake className="h-6 w-6 text-primary" />}
                  {i === 1 && <ShieldCheck className="h-6 w-6 text-primary" />}
                  {i === 2 && <Users className="h-6 w-6 text-primary" />}
                  {i >= 3 && <Gavel className="h-6 w-6 text-primary" />}
                  <h2 className="text-xl md:text-2xl font-bold">{sec.title}</h2>
                </div>
                <div className="prose prose-neutral dark:prose-invert leading-relaxed">
                  {sec.body}
                </div>
              </div>
            ))}

            <div className="p-6 rounded-2xl bg-muted/50">
              <h3 className="text-lg md:text-xl font-bold mb-2">{t.contact.title}</h3>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">{t.contact.emailLabel}</span>{" "}
                <a href={`mailto:${t.contact.email}`} className="text-primary underline">
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
