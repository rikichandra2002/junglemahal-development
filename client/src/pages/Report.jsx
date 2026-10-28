
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Factory,
  Heart,
  Leaf,
  MapPin,
  PawPrint,
  Send,
  ShieldCheck,
  Trash2,
  Trees,
  Droplets,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/reports";

const categories = [
  { label: "Deforestation", icon: Trees },
  { label: "Water Pollution", icon: Droplets },
  { label: "Waste Dumping", icon: Trash2 },
  { label: "Wildlife & Habitat", icon: PawPrint },
  { label: "Air Pollution", icon: Factory },
  { label: "Other Environmental Issue", icon: Leaf },
];

const districts = [
  "Jhargram",
  "Paschim Medinipur",
  "Bankura",
  "Purulia",
  "Other / Outside these districts",
];

const initialForm = {
  title: "",
  category: "",
  district: "",
  location: "",
  description: "",
  email: "",
};

export default function Report() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  }

  function handleCategorySelect(category) {
    setForm((previous) => ({
      ...previous,
      category,
    }));

    setErrors((previous) => ({
      ...previous,
      category: "",
    }));

    setServerError("");
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];

    setPhoto(null);
    setPhotoName("");
    setErrors((previous) => ({
      ...previous,
      photo: "",
    }));

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((previous) => ({
        ...previous,
        photo: "Please select a valid image file.",
      }));

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        photo: "Image size must be 5 MB or less.",
      }));

      event.target.value = "";
      return;
    }

    setPhoto(file);
    setPhotoName(file.name);
  }

  function validateForm() {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Enter a report title.";
    } else if (form.title.trim().length > 120) {
      nextErrors.title = "Title must not exceed 120 characters.";
    }

    if (!form.category) {
      nextErrors.category = "Choose an issue category.";
    }

    if (!form.district) {
      nextErrors.district = "Choose a district.";
    }

    if (!form.location.trim()) {
      nextErrors.location = "Enter the location of the issue.";
    } else if (form.location.trim().length > 200) {
      nextErrors.location = "Location must not exceed 200 characters.";
    }

    if (form.description.trim().length < 20) {
      nextErrors.description =
        "Description must contain at least 20 characters.";
    } else if (form.description.trim().length > 2000) {
      nextErrors.description =
        "Description must not exceed 2000 characters.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setServerError("");

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category,
          district: form.district,
          location: form.location.trim(),
          description: form.description.trim(),
          email: form.email.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your environmental report."
        );
      }

      setSubmittedReport(data.report || null);
    } catch (error) {
      if (error instanceof TypeError) {
        setServerError(
          "Cannot connect to the backend. Make sure the server is running on port 5000."
        );
      } else {
        setServerError(error.message || "Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setPhoto(null);
    setPhotoName("");
    setErrors({});
    setServerError("");
    setSubmittedReport(null);
  }

  // Success screen
  if (submittedReport) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8f3] px-5 py-16">
        <section className="w-full max-w-xl rounded-3xl border border-[#e3e9de] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e4efdf] text-[#345c3e]">
            <CheckCircle2 size={34} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[2px] text-[#84945d]">
            REPORT RECEIVED
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#244532]">
            Report submitted successfully!
          </h1>

          <p className="mt-4 leading-7 text-[#758175]">
            Your environmental report has been saved. It is awaiting review
            and has not yet been independently verified.
          </p>

          <div className="mt-7 rounded-2xl bg-[#f5f7f1] p-5 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#84945d]">
              REPORT SUMMARY
            </p>

            <p className="mt-3 break-words font-semibold text-[#244532]">
              {submittedReport.title || form.title}
            </p>

            <p className="mt-2 text-sm text-[#687669]">
              {submittedReport.category || form.category} ·{" "}
              {submittedReport.district || form.district}
            </p>

            <p className="mt-2 break-words text-sm text-[#687669]">
              <MapPin size={14} className="mr-1 inline" />
              {submittedReport.location || form.location}
            </p>

            {submittedReport.id && (
              <p className="mt-3 break-all text-xs text-[#687669]">
                Report ID: {submittedReport.id}
              </p>
            )}

            <span className="mt-4 inline-flex rounded-full bg-[#e8eadb] px-3 py-1 text-xs font-semibold text-[#5b7045]">
              {submittedReport.status || "Pending"}
            </span>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#244d36] px-6 py-3 font-semibold text-white transition hover:bg-[#183b29]"
          >
            Create another report <ArrowRight size={17} />
          </button>

          <a
            href="/"
            className="mt-4 block text-sm font-medium text-[#536456] hover:text-[#244d36]"
          >
            Return to homepage
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      {/* Header */}
      <header className="border-b border-[#e5e9df] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#244d36] text-white">
              <Leaf size={24} />
            </span>

            <span>
              <span className="block text-lg font-bold text-[#244d36]">
                Jungle<span className="text-[#8a9d58]">Mahal</span>
              </span>

              <span className="block text-[10px] font-semibold uppercase tracking-[2px] text-[#788476]">
                Nature · People · Progress
              </span>
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#536456] hover:text-[#244d36]"
          >
            <ArrowLeft size={17} />
            Back to home
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-10 lg:py-16">
        {/* Introduction */}
        <aside>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e5eddf] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#345c3e]">
            <Leaf size={14} />
            Community participation
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-[#244532] sm:text-5xl">
            See a problem?
            <br />
            <span className="font-serif italic text-[#84945d]">
              Help make it visible.
            </span>
          </h1>

          <p className="mt-5 max-w-lg leading-8 text-[#758175]">
            Share information about an environmental concern in your
            community. Clear descriptions and accurate locations can help
            people understand local challenges.
          </p>

          <div className="mt-9 space-y-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4efdf] text-[#345c3e]">
                <MapPin size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#244532]">
                  Describe the location
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#758175]">
                  Mention the village, area, landmark, or nearest town.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4efdf] text-[#345c3e]">
                <Camera size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#244532]">
                  Add supporting evidence
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#758175]">
                  You can select a photograph to prepare for future image
                  upload support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4efdf] text-[#345c3e]">
                <ShieldCheck size={21} />
              </span>

              <div>
                <h2 className="font-semibold text-[#244532]">
                  Responsible reporting
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#758175]">
                  Report observations accurately. Never put yourself at risk
                  to collect evidence.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-9 rounded-2xl border border-[#e2e8db] bg-white p-5">
            <p className="text-sm font-semibold text-[#244532]">
              Please note
            </p>

            <p className="mt-2 text-sm leading-6 text-[#758175]">
              This website is an environmental awareness project, not an
              official government complaint portal.
            </p>
          </div>
        </aside>

        {/* Report form */}
        <section className="rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[2px] text-[#84945d]">
              ENVIRONMENTAL REPORT
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#244532]">
              Tell us what you observed
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#758175]">
              Fields marked with * are required.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-[#405446]"
              >
                Report title *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                maxLength={120}
                value={form.title}
                onChange={updateField}
                placeholder="e.g. Waste dumping near a pond"
                aria-invalid={Boolean(errors.title)}
                className="w-full rounded-xl border border-[#dfe5da] bg-[#fcfdf9] px-4 py-3.5 text-sm outline-none transition focus:border-[#6f936c] focus:ring-2 focus:ring-[#dce9d7]"
              />

              {errors.title && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Categories */}
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-[#405446]">
                Issue category *
              </legend>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const selected = form.category === category.label;

                  return (
                    <button
                      key={category.label}
                      type="button"
                      onClick={() => handleCategorySelect(category.label)}
                      aria-pressed={selected}
                      className={`flex min-h-14 items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
                        selected
                          ? "border-[#66865a] bg-[#edf3e8] text-[#244d36]"
                          : "border-[#e2e7de] bg-white text-[#536456] hover:border-[#9cad8e]"
                      }`}
                    >
                      <Icon size={19} />
                      {category.label}
                    </button>
                  );
                })}
              </div>

              {errors.category && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.category}
                </p>
              )}
            </fieldset>

            {/* District */}
            <div>
              <label
                htmlFor="district"
                className="mb-2 block text-sm font-semibold text-[#405446]"
              >
                District *
              </label>

              <select
                id="district"
                name="district"
                required
                value={form.district}
                onChange={updateField}
                aria-invalid={Boolean(errors.district)}
                className="w-full rounded-xl border border-[#dfe5da] bg-[#fcfdf9] px-4 py-3.5 text-sm outline-none focus:border-[#6f936c] focus:ring-2 focus:ring-[#dce9d7]"
              >
                <option value="">Select a district</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              {errors.district && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.district}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-[#405446]"
              >
                Specific location *
              </label>

              <input
                id="location"
                name="location"
                type="text"
                required
                maxLength={200}
                value={form.location}
                onChange={updateField}
                placeholder="Village, locality, road, or nearby landmark"
                aria-invalid={Boolean(errors.location)}
                className="w-full rounded-xl border border-[#dfe5da] bg-[#fcfdf9] px-4 py-3.5 text-sm outline-none focus:border-[#6f936c] focus:ring-2 focus:ring-[#dce9d7]"
              />

              {errors.location && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#405446]"
              >
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                required
                minLength={20}
                maxLength={2000}
                rows={5}
                value={form.description}
                onChange={updateField}
                placeholder="What did you observe? Describe the concern and its possible impact."
                aria-invalid={Boolean(errors.description)}
                className="w-full resize-y rounded-xl border border-[#dfe5da] bg-[#fcfdf9] px-4 py-3.5 text-sm leading-6 outline-none focus:border-[#6f936c] focus:ring-2 focus:ring-[#dce9d7]"
              />

              <div className="mt-2 flex justify-between gap-3">
                {errors.description ? (
                  <p className="text-sm text-red-600">
                    {errors.description}
                  </p>
                ) : (
                  <p className="text-xs text-[#849084]">
                    Provide at least 20 characters.
                  </p>
                )}

                <p className="shrink-0 text-xs text-[#849084]">
                  {form.description.length}/2000
                </p>
              </div>
            </div>

            {/* Photograph */}
            <div>
              <label
                htmlFor="photo"
                className="mb-2 block text-sm font-semibold text-[#405446]"
              >
                Supporting photograph (optional)
              </label>

              <label
                htmlFor="photo"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#b9c9af] bg-[#fafcf8] px-5 py-7 text-center transition hover:bg-[#f0f5eb]"
              >
                <Camera size={26} className="text-[#63835c]" />

                <span className="mt-3 break-all text-sm font-semibold text-[#405446]">
                  {photoName || "Choose a photograph"}
                </span>

                <span className="mt-1 text-xs text-[#849084]">
                  Images only · Maximum 5 MB
                </span>

                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="sr-only"
                />
              </label>

              {photo && (
                <p className="mt-2 text-xs text-[#63835c]">
                  Image selected. Upload support will be connected separately.
                </p>
              )}

              {errors.photo && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.photo}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#405446]"
              >
                Contact email (optional)
              </label>

              <input
                id="email"
                name="email"
                type="email"
                maxLength={254}
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                className="w-full rounded-xl border border-[#dfe5da] bg-[#fcfdf9] px-4 py-3.5 text-sm outline-none focus:border-[#6f936c] focus:ring-2 focus:ring-[#dce9d7]"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#244d36] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#183b29] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Submit Environmental Report
                  <Send size={17} />
                </>
              )}
            </button>

            <p className="text-xs leading-5 text-[#849084]">
              By submitting, you confirm that the report reflects your
              observations to the best of your knowledge. Do not include
              confidential personal information.
            </p>
          </form>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-[#173b2b] px-5 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <a href="/" className="font-bold">
            Jungle<span className="text-[#c7db9b]">Mahal</span>
          </a>

          <p className="text-xs leading-5 text-white/60">
            Environmental awareness · Community development
          </p>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#c7db9b] hover:text-white"
          >
            Home <ArrowLeft size={15} />
          </a>
        </div>
      </footer>
    </main>
  );
}
