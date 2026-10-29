import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Leaf, ShieldCheck, Sprout } from "lucide-react";

const amounts = [100, 250, 500, 1000];

export default function Donation() {
  const [amount, setAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("Forest conservation");
  const [submitted, setSubmitted] = useState(false);

  const donationAmount = customAmount.trim() ? Number(customAmount) : amount;

  function handleSubmit(event) {
    event.preventDefault();
    if (!Number.isFinite(donationAmount) || donationAmount < 1) return;
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#FAFBF7] text-[#244532]">
      <header className="border-b border-[#E5E9DF] bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-10">
          <Link to="/" className="flex items-center gap-3 font-bold text-[#244D36]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF0E4]"><Sprout size={24} /></span>
            <span>JungleMahal<span className="block text-xs font-medium text-[#71806F]">Nature · People · Progress</span></span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold hover:text-[#718A3D]"><ArrowLeft size={16} /> Back to home</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EAF0E4] px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#526D3C]"><Heart size={14} /> Make a difference</span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Small contributions.<br /><span className="font-serif italic text-[#718A3D]">Lasting impact.</span></h1>
          <p className="mt-5 max-w-lg leading-8 text-[#566657]">Support environmental awareness, forest conservation and community-led sustainability across the Jungle Mahal region.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-[#E3E9DE] bg-white p-4"><span className="rounded-xl bg-[#EAF0E4] p-3"><Leaf size={20} /></span><div><h2 className="font-semibold">Protect nature</h2><p className="mt-1 text-sm leading-6 text-[#647264]">Help promote conservation and responsible use of natural resources.</p></div></div>
            <div className="flex items-start gap-3 rounded-2xl border border-[#E3E9DE] bg-white p-4"><span className="rounded-xl bg-[#F1EBDD] p-3"><Sprout size={20} /></span><div><h2 className="font-semibold">Empower communities</h2><p className="mt-1 text-sm leading-6 text-[#647264]">Encourage local participation and environmental education.</p></div></div>
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs text-[#71806F]"><ShieldCheck size={16} /> Demo donation page — no payment is processed.</p>
        </div>

        <div className="rounded-[2rem] border border-[#E0E7DA] bg-white p-6 shadow-xl shadow-[#244D36]/5 sm:p-9">
          {submitted ? (
            <div className="flex min-h-[440px] flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF0E4] text-[#345C3E]"><Heart size={30} /></span>
              <h2 className="mt-6 text-3xl font-semibold">Thank you, {name}!</h2>
              <p className="mt-3 max-w-sm leading-7 text-[#566657]">Your demo pledge of ₹{donationAmount.toLocaleString("en-IN")} for {purpose.toLowerCase()} has been recorded on this page for demonstration only.</p>
              <p className="mt-2 text-sm text-[#71806F]">No money was collected and no payment was made.</p>
              <button onClick={() => setSubmitted(false)} className="mt-7 rounded-full bg-[#24543D] px-6 py-3 font-bold text-white transition hover:bg-[#183D2C]">Make another demo pledge</button>
              <Link to="/" className="mt-4 text-sm font-bold text-[#526D3C] hover:underline">Return to homepage</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div><p className="text-xs font-bold uppercase tracking-[2px] text-[#718A3D]">YOUR CONTRIBUTION</p><h2 className="mt-2 text-2xl font-semibold">Make a demo donation</h2><p className="mt-2 text-sm leading-6 text-[#647264]">Choose an amount and enter your details to preview the donation flow.</p></div>
              <div><label className="mb-3 block text-sm font-semibold">Select amount</label><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{amounts.map((value) => <button key={value} type="button" onClick={() => { setAmount(value); setCustomAmount(""); }} className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${!customAmount && amount === value ? "border-[#24543D] bg-[#EAF0E4] text-[#244D36] ring-2 ring-[#24543D]/10" : "border-[#DCE5D5] hover:border-[#9BAA82]"}`}>₹{value.toLocaleString("en-IN")}</button>)}</div>
                <label htmlFor="customAmount" className="mt-4 block text-sm font-medium text-[#566657]">Or enter a custom amount (₹)</label><input id="customAmount" type="number" min="1" step="1" value={customAmount} onChange={(event) => setCustomAmount(event.target.value)} placeholder="Enter amount" className="mt-2 w-full rounded-xl border border-[#DCE5D5] px-4 py-3 outline-none transition focus:border-[#718A3D] focus:ring-2 focus:ring-[#718A3D]/15" /></div>
              <div><label htmlFor="purpose" className="mb-2 block text-sm font-semibold">Support a cause</label><select id="purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)} className="w-full rounded-xl border border-[#DCE5D5] bg-white px-4 py-3 outline-none focus:border-[#718A3D]"><option>Forest conservation</option><option>Water conservation</option><option>Waste management</option><option>Environmental education</option><option>Community development</option></select></div>
              <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="name" className="mb-2 block text-sm font-semibold">Full name</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} autoComplete="name" placeholder="Your name" className="w-full rounded-xl border border-[#DCE5D5] px-4 py-3 outline-none focus:border-[#718A3D]" /></div><div><label htmlFor="email" className="mb-2 block text-sm font-semibold">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-[#DCE5D5] px-4 py-3 outline-none focus:border-[#718A3D]" /></div></div>
              <div className="rounded-xl bg-[#F5F7F1] p-4"><div className="flex items-center justify-between text-sm text-[#566657]"><span>Demo pledge total</span><span className="text-xl font-bold text-[#244532]">₹{(Number.isFinite(donationAmount) && donationAmount > 0 ? donationAmount : 0).toLocaleString("en-IN")}</span></div><p className="mt-2 text-xs leading-5 text-[#71806F]">This is a frontend demonstration only. It does not accept or process real donations.</p></div>
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#24543D] px-6 py-4 font-bold text-white shadow-md transition hover:bg-[#183D2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718A3D]">Continue demo <Heart size={17} /></button>
              <p className="text-center text-xs leading-5 text-[#71806F]">By continuing, you are testing a demo form. Your details are not sent to a server.</p>
            </form>
          )}
        </div>
      </section>
      <footer className="border-t border-[#E3E9DE] px-5 py-6 text-center text-xs text-[#71806F]">© {new Date().getFullYear()} JungleMahal · Nature · People · Progress</footer>
    </main>
  );
}
