const metrics = [
  { value: '75+', label: 'Projecten sinds 2020' },
  { value: '4.8/5', label: 'Gemiddelde beoordeling' },
  { value: '2–7', label: 'Werkdagen tot livegang' },
  { value: '95%', label: 'Tevreden klanten' },
];

const painPoints = [
  'Geen duidelijke propositie: bezoekers snappen niet direct wat je doet.',
  'Ontbrekende call-to-actions zoals bellen, WhatsApp of formulier.',
  'Verouderde uitstraling die vertrouwen en conversie verlaagt.',
  'Zwakke mobiele ervaring terwijl mobiel vaak het grootste verkeer heeft.',
];

const differentiators = [
  'Eerst gratis demo-website, daarna pas beslissen.',
  '100% maatwerk zonder standaard templates.',
  'SEO-proof structuur vanaf dag één ingebouwd.',
  'Direct contact met de maker, geen tussenlaag.',
  'Snelle livegang met duidelijke planning per pakket.',
  '14 dagen nazorg inbegrepen voor een sterke start.',
];

const packages = [
  {
    name: 'Essential',
    price: '€795 eenmalig',
    timeline: 'Live in 48–72 uur',
    features: ['1 sterke homepage', 'Premium design', 'Mobiel perfect', 'Basis SEO', 'Contactformulier + WhatsApp'],
  },
  {
    name: 'Pro',
    price: '€995 eenmalig',
    timeline: 'Live in 4–5 werkdagen',
    features: ['Alles van Essential', 'Tot 5 pagina’s', 'Sterkere structuur', 'Reviews & resultaten', 'Meer overtuigingskracht'],
  },
  {
    name: 'Ultimate',
    price: '€1.395 eenmalig',
    timeline: 'Live in 5–7 werkdagen',
    features: ['Alles van Pro', 'Onbeperkt pagina’s', 'Volledige vrijheid', 'Uitgebreide SEO', 'Maximale schaalbaarheid'],
  },
];

const processSteps = [
  {
    title: 'Gesprek & analyse',
    body: 'We bekijken je bedrijf, doel en groeikansen. Vrijblijvend en helder.',
  },
  {
    title: 'Gratis demo-website',
    body: 'Je krijgt eerst een demo zodat je exact ziet hoe de richting voelt.',
  },
  {
    title: 'Feedback & uitwerking',
    body: 'Na akkoord werken we alle content, structuur en contactflow professioneel af.',
  },
  {
    title: 'Livegang & nazorg',
    body: 'We zetten live en begeleiden je in de eerste fase met support.',
  },
];

export default function Home(): React.ReactElement {
  return (
    <div className="firmpixels-page relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#060914] text-slate-100">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />
      <div className="bg-grid" />

      <section className="relative z-10 px-6 pb-12 pt-16 md:px-12 md:pt-20">
        <p className="mb-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          Premium Webdesign · FirmPixels
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
          Meer klanten. Sneller. <span className="text-cyan-300">Een compleet nieuw digitaal gezicht</span> voor FirmPixels.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Deze redesign vertaalt alle kerninformatie van FirmPixels naar een unieke, futuristische ervaring met bewegende
          achtergronden, duidelijke flow en sterke conversieblokken.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-cyan-200" href="#contact">Plan een gesprek</a>
          <a className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10" href="#pakketten">Vergelijk pakketten</a>
        </div>
      </section>

      <section className="relative z-10 grid gap-4 px-6 pb-16 md:grid-cols-4 md:px-12">
        {metrics.map((item) => (
          <article key={item.label} className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <p className="text-3xl font-extrabold text-cyan-200">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.label}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 grid gap-6 px-6 pb-16 md:grid-cols-2 md:px-12">
        <article className="rounded-3xl border border-rose-300/20 bg-rose-400/10 p-6">
          <h2 className="text-2xl font-bold">Het probleem dat bedrijven voelen</h2>
          <ul className="mt-4 space-y-3 text-slate-200">
            {painPoints.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6">
          <h2 className="text-2xl font-bold">Waarom bedrijven voor FirmPixels kiezen</h2>
          <ul className="mt-4 space-y-3 text-slate-200">
            {differentiators.map((point) => (
              <li key={point}>✓ {point}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="pakketten" className="relative z-10 px-6 pb-16 md:px-12">
        <h2 className="text-3xl font-black">Pakketten & prijzen</h2>
        <p className="mt-2 text-slate-300">Duidelijke keuze: Essential, Pro (meest gekozen) of Ultimate. Betalen kan ook rentevrij in termijnen.</p>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article key={pkg.name} className="rounded-3xl border border-white/15 bg-[#0d1428]/85 p-6 shadow-2xl shadow-cyan-900/20">
              <h3 className="text-2xl font-bold text-cyan-200">{pkg.name}</h3>
              <p className="mt-2 text-xl font-semibold">{pkg.price}</p>
              <p className="text-sm text-slate-400">{pkg.timeline}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {pkg.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16 md:px-12">
        <h2 className="text-3xl font-black">Van idee naar live in 4 stappen</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Stap {index + 1}</p>
              <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-slate-300">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 border-t border-white/15 bg-black/25 px-6 py-12 md:px-12">
        <h2 className="text-3xl font-black">Klaar om te groeien?</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          FirmPixels bouwt websites die vertrouwen opbouwen en bezoekers omzetten naar afspraken. Plan een gratis gesprek
          of stuur direct een bericht via WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-900" href="https://www.firmpixels.com/#contact" target="_blank" rel="noreferrer">Plan gratis gesprek</a>
          <a className="rounded-xl border border-white/30 px-5 py-3 text-sm font-bold" href="https://wa.me" target="_blank" rel="noreferrer">WhatsApp direct</a>
        </div>
      </section>
    </div>
  );
}
