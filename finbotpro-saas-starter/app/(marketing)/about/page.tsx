export default function About() {
  return (
    <div className="space-y-6">
      <div className="kicker">About</div>
      <h1 className="text-3xl font-semibold">Why FinBotPro</h1>
      <p className="opacity-80 max-w-2xl">
        We build AI-native tools for finance and tax teams, turning hours of drafting into minutes with transparency and control.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card"><h3 className="text-lg font-semibold">Transparent</h3><p className="opacity-80">Citations, logs, and review flows.</p></div>
        <div className="card"><h3 className="text-lg font-semibold">Secure</h3><p className="opacity-80">Least-privilege access and SOC‑friendly patterns.</p></div>
        <div className="card"><h3 className="text-lg font-semibold">Pragmatic</h3><p className="opacity-80">Ship useful features first. Iterate quickly.</p></div>
      </div>
    </div>
  )
}
