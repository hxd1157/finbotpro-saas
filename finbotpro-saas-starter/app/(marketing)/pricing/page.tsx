import Link from 'next/link'

const tiers = [
  { name: 'Free', price: '$0', blurb: 'For trying things out', features: ['1 org', '1 project', '10 AI runs/mo'], cta: '/onboarding' },
  { name: 'Pro', price: '$39/mo', blurb: 'For solo pros', features: ['3 orgs', 'Unlimited projects', '2,000 AI runs/mo', 'Email support'], cta: '/onboarding' },
  { name: 'Team', price: '$149/mo', blurb: 'For firms', features: ['Unlimited orgs', 'SSO (SAML)', 'Priority support', 'Custom endpoints'], cta: '/onboarding' }
]

export default function Pricing() {
  return (
    <div className="space-y-8">
      <div>
        <div className="kicker">Pricing</div>
        <h1 className="text-3xl font-semibold">Start free. Scale when ready.</h1>
        <p className="opacity-80">Subscriptions handled via Stripe. Cancel anytime.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map(t => (
          <div key={t.name} className="card">
            <div className="badge mb-2">{t.name}</div>
            <div className="text-4xl font-semibold">{t.price}</div>
            <div className="opacity-80 mb-3">{t.blurb}</div>
            <ul className="list-disc ml-6 space-y-1 opacity-90">
              {t.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <Link className="btn mt-4 inline-block" href={t.cta}>Get started</Link>
          </div>
        ))}
      </div>
      <div className="opacity-70 text-sm">* Need enterprise? Email hello@finbotpro.com</div>
    </div>
  )
}
