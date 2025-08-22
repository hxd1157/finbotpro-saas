'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Onboarding() {
  const router = useRouter()
  const [orgName, setOrgName] = useState('Hext Financial Group')
  const [projectName, setProjectName] = useState('ERC Interest Abatement')
  const [step, setStep] = useState(1)
  const [busy, setBusy] = useState(false)

  const next = async () => {
    if (step === 1) setStep(2)
    else if (step === 2) {
      setBusy(true)
      try {
        const r = await fetch('/api/onboarding/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orgName, projectName })
        })
        const j = await r.json()
        if (!r.ok) throw new Error(j.error || 'Error')
        router.push('/dashboard')
      } catch (e:any) {
        alert(e.message || 'Error')
      } finally {
        setBusy(false)
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-semibold">Get started</h1>
      <div className="card space-y-4">
        <div className="flex gap-2 text-sm opacity-80">
          <div className={step>=1 ? 'font-semibold' : ''}>1. Create org</div>
          <div>→</div>
          <div className={step>=2 ? 'font-semibold' : ''}>2. First project</div>
        </div>

        {step === 1 && (
          <div>
            <label>Organization name</label>
            <input value={orgName} onChange={(e)=>setOrgName(e.target.value)} />
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Project name</label>
            <input value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
          </div>
        )}

        <div className="flex gap-2">
          {step > 1 && <button className="btn" onClick={()=>setStep(step-1)}>Back</button>}
          <button className="btn" onClick={next} disabled={busy}>{busy ? 'Creating...' : (step === 2 ? 'Finish' : 'Next')}</button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl mb-2">What happens next?</h2>
        <ol className="list-decimal ml-6 opacity-80 space-y-1">
          <li>Create an organization (workspace)</li>
          <li>Create your first project</li>
          <li>Connect billing when you need more usage</li>
        </ol>
      </div>
    </div>
  )
}
