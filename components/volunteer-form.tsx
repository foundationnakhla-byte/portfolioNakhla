"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface VolunteerFormProps {
  locale: Locale;
  translations: any;
  onSuccess: () => void;
}

type UploadState = "idle" | "uploading" | "success" | "error";

export function VolunteerForm({ locale, translations, onSuccess }: VolunteerFormProps) {
  const t = translations.volunteer;
  const isRTL = locale === "ar";
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    country: "",
    education: "",
    occupation: "",
    previousExperience: "",
    skills: "",
    languages: "",
    areasOfInterest: [] as string[],
    availability: "",
    hoursPerWeek: "",
    startDate: "",
    motivation: "",
    // روابط الملفات بعد الرفع (أو المسارات)
    cvUrl: "" as string,
    idCopyUrl: "" as string,
    criminalRecordUrl: "" as string,
    agreement: false,
  });

  const [fileStatus, setFileStatus] = useState<{
    cv: UploadState;
    idCopy: UploadState;
    criminalRecord: UploadState;
  }>({ cv: "idle", idCopy: "idle", criminalRecord: "idle" });

  const steps = [t.steps.personal, t.steps.experience, t.steps.availability, t.steps.documents];

  const areas = [
    { value: "education", label: t.areas.education },
    { value: "psychological", label: t.areas.psychological },
    { value: "activities", label: t.areas.activities },
    { value: "admin", label: t.areas.admin },
    { value: "fundraising", label: t.areas.fundraising },
    { value: "communications", label: t.areas.communications },
  ];

  const handleInputChange = (field: string, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleAreaToggle = (area: string) =>
    setFormData((prev) => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(area)
        ? prev.areasOfInterest.filter((a) => a !== area)
        : [...prev.areasOfInterest, area],
    }));

  // ===== رفع آمن عبر Signed Upload URL من الـ API =====
  async function uploadToStorage(field: "cv" | "idCopy" | "criminalRecord", file: File) {
    const bucket = "volunteer_docs";
    const ext = (file.name.split(".").pop() || "pdf").toLowerCase();

    const genId = () =>
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    const id = genId();
    const path = `volunteers/${id}_${field}.${ext}`;

    setFileStatus((s) => ({ ...s, [field]: "uploading" }));

    // 1) اطلب رابط رفع موقّع من السيرفر
    const res = await fetch("/api/storage/signed-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bucket,
        path,
        contentType: file.type || "application/octet-stream",
      }),
    });

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      console.error("Signed URL error", j?.error || res.statusText);
      setFileStatus((s) => ({ ...s, [field]: "error" }));
      return;
    }

    const { uploadUrl, publicUrl } = await res.json();

    // 2) ارفع الملف مباشرة إلى signed URL
    const put = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!put.ok) {
      console.error("Upload error (PUT)", await put.text());
      setFileStatus((s) => ({ ...s, [field]: "error" }));
      return;
    }

    // 3) خزّن رابط/مسار الملف
    const urlField = field === "cv" ? "cvUrl" : field === "idCopy" ? "idCopyUrl" : "criminalRecordUrl";
    setFormData((prev) => ({ ...prev, [urlField]: publicUrl }));
    setFileStatus((s) => ({ ...s, [field]: "success" }));
  }

  const handleFileChange = (field: "cv" | "idCopy" | "criminalRecord", file: File | null) => {
    if (!file) return;
    uploadToStorage(field, file);
  };

  async function handleSubmit() {
    setIsSubmitting(true);

    const payload = {
      locale,
      full_name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email || null,
      phone: formData.phone || null,
      dob: formData.dateOfBirth || null,
      address: formData.address || null,
      city: formData.city || null,
      country: formData.country || null,
      education: formData.education,
      occupation: formData.occupation,
      previous_experience: formData.previousExperience || null,
      skills: formData.skills || null,
      languages: formData.languages || null,
      areas_of_interest: formData.areasOfInterest,
      availability: formData.availability,
      hours_per_week: formData.hoursPerWeek ? Number(formData.hoursPerWeek) : null,
      start_date: formData.startDate || null,
      motivation: formData.motivation,
      cv_url: formData.cvUrl,
      id_copy_url: formData.idCopyUrl,
      criminal_record_url: formData.criminalRecordUrl,
      consent: !!formData.agreement,
    };

    try {
      const res = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      setSubmitted(true);
      onSuccess();
    } catch (e) {
      console.error(e);
      alert(
        locale === "ar"
          ? "حدث خطأ أثناء الإرسال"
          : locale === "fr"
          ? "Erreur lors de l’envoi"
          : "Submission error"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 1:
        return formData.education && formData.occupation;
      case 2:
        return formData.areasOfInterest.length > 0 && formData.availability && formData.motivation;
      case 3:
        return !!(
          formData.cvUrl &&
          formData.idCopyUrl &&
          formData.criminalRecordUrl &&
          formData.agreement
        );
      default:
        return false;
    }
  };

  const FileUploadStatus = ({ status }: { status: UploadState }) => {
    if (status === "uploading")
      return <span className="text-sm text-muted-foreground">{t.form.uploading}</span>;
    if (status === "success")
      return (
        <span className="text-sm text-green-600 flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4" />
          {t.form.uploadSuccess}
        </span>
      );
    if (status === "error")
      return (
        <span className="text-sm text-red-600 flex items-center gap-1">
          <XCircle className="h-4 w-4" />
          {t.form.uploadError}
        </span>
      );
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step: string, index: number) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  index <= currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-muted"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-center hidden sm:block">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 flex-1 ${index < currentStep ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="min-h-[400px]">
        {/* 1) Personal */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t.form.firstName} *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t.form.lastName} *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">{t.form.email} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.form.phone} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">{t.form.dateOfBirth}</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t.form.address}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">{t.form.city}</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">{t.form.country}</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* 2) Experience */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="education">{t.form.education} *</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">{t.form.occupation} *</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousExperience">{t.form.previousExperience}</Label>
              <Textarea
                id="previousExperience"
                value={formData.previousExperience}
                onChange={(e) => handleInputChange("previousExperience", e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">{t.form.skills}</Label>
              <Textarea
                id="skills"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">{t.form.languages}</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleInputChange("languages", e.target.value)}
                placeholder={locale === "ar" ? "مثال: العربية، الفرنسية، الإنجليزية" : "e.g., Arabic, French, English"}
              />
            </div>
          </div>
        )}

        {/* 3) Availability */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>{t.form.areasOfInterest} *</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {areas.map((area) => (
                  <div key={area.value} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={area.value}
                      checked={formData.areasOfInterest.includes(area.value)}
                      onCheckedChange={() => handleAreaToggle(area.value)}
                    />
                    <Label htmlFor={area.value} className="cursor-pointer font-normal">
                      {area.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">{t.form.availability} *</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => handleInputChange("availability", e.target.value)}
                placeholder={locale === "ar" ? "مثال: أيام الأسبوع، عطلة نهاية الأسبوع" : "e.g., Weekdays, Weekends"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">{t.form.hoursPerWeek}</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                value={formData.hoursPerWeek}
                onChange={(e) => handleInputChange("hoursPerWeek", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">{t.form.startDate}</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivation">{t.form.motivation} *</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                rows={5}
                required
              />
            </div>
          </div>
        )}

        {/* 4) Documents */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cv">{t.form.cv} *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("cv", e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <FileUploadStatus status={fileStatus.cv} />
              </div>
              {formData.cvUrl && <p className="text-xs text-muted-foreground truncate">{formData.cvUrl}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="idCopy">{t.form.idCopy} *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="idCopy"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("idCopy", e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <FileUploadStatus status={fileStatus.idCopy} />
              </div>
              {formData.idCopyUrl && <p className="text-xs text-muted-foreground truncate">{formData.idCopyUrl}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="criminalRecord">{t.form.criminalRecord} *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="criminalRecord"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("criminalRecord", e.target.files?.[0] || null)}
                  className="flex-1"
                />
                <FileUploadStatus status={fileStatus.criminalRecord} />
              </div>
              {formData.criminalRecordUrl && (
                <p className="text-xs text-muted-foreground truncate">{formData.criminalRecordUrl}</p>
              )}
            </div>

            <div className="flex items-start space-x-2 space-x-reverse p-4 rounded-lg border bg-muted/50">
              <Checkbox
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={(checked) => handleInputChange("agreement", checked)}
              />
              <Label htmlFor="agreement" className="cursor-pointer font-normal leading-relaxed">
                {t.form.agreement}
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={() => setCurrentStep((p) => p - 1)} disabled={currentStep === 0}>
          {isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          {t.form.previous}
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={() => setCurrentStep((p) => p + 1)} disabled={!canProceed()}>
            {t.form.next}
            {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting}>
            {isSubmitting ? t.form.uploading : t.form.submit}
          </Button>
        )}
      </div>
    </div>
  );
}
