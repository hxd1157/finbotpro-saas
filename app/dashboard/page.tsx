'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [title, setTitle] = useState('ERC Interest Abatement Memo')
  const [input, setInput] = useState('Summarize IRS guidance on ERC interest abatements and options.')

  const [resp, setResp] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [runs, setRuns] = useState(0)

  useEffect(()=>{
    const n = Number(localStorage.getItem('freeRuns') || '0')
    setRuns(n)
  }, [])

  const runAI = async () => {
    if (runs >= 10) {
      alert('Free plan limit reached. Please upgrade to Pro.')
      return
    }
    setBusy(true)
    setResp('')
    try {
      const r = await fetch('/api/ai/memo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, prompt: input })
      })
      const json = await r.json()
      setResp(json.output || json.error || 'No response')
      const next = runs + 1
      setRuns(next)
      localStorage.setItem('freeRuns', String(next))
    } catch (e:any) {
      setResp(e?.message || 'Error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link className="btn" href="/(marketing)/pricing">Upgrade</Link>
      </div>

      <div className="card space-y-3">
        <label>Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} />
        <label>Prompt</label>
        <textarea rows={6} value={input} onChange={(e)=>setInput(e.target.value)} />
        <button className="btn" onClick={runAI} disabled={busy}>{busy ? 'Generating...' : 'Generate AI Memo'}</button>
        <div className="opacity-70 text-sm">Free runs used: {runs}/10</div>
      </div>

      {resp && (
        <div className="card">
          <h2 className="text-xl mb-2">Output</h2>
          <pre className="whitespace-pre-wrap text-sm opacity-90">{resp}</pre>
        </div>
      )}
    </div>
  )
}
