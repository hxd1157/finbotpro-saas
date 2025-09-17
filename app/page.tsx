import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="kicker">AI • Finance • Tax</div>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          A <span className="gradient-text">futuristic</span> copilot for<br/>finance & tax workflows
        </h1>
        <p className="opacity-80 max-w-2xl mx-auto">
          Draft memos, summarize IRS guidance, and automate client deliverables. Built for CPAs, controllers, and operators.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link className="btn" href="/onboarding">Get started</Link>
          <Link className="btn" href="/(marketing)/pricing">See pricing</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="badge mb-2">Memos</div>
          <h3 className="text-xl font-semibold">ERC / IRS memos with citations</h3>
          <p className="opacity-80">Generate first drafts, review, and export.</p>
        </div>
        <div className="card">
          <div className="badge mb-2">Planning</div>
          <h3 className="text-xl font-semibold">Entity & basis planners</h3>
          <p className="opacity-80">Interactive flows for basis, allocations, elections.</p>
        </div>
        <div className="card">
          <div className="badge mb-2">Portal</div>
          <h3 className="text-xl font-semibold">Client docs & summaries</h3>
          <p className="opacity-80">Upload PDFs, summarize, and e‑sign.</p>
        </div>
      </div>
    </div>
  )
}
