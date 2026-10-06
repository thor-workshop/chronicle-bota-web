import { Head } from '../chrome/Head'
import { Status } from '../chrome/Status'
import { LABELS, PRIVACY, SITE } from '../content'

const BASE = import.meta.env.BASE_URL

export function Privacy() {
  return (
    <>
      <a className="skip" href="#main">{LABELS.skip}</a>
      <Head home={BASE} menu={[{ href: BASE, label: LABELS.home }]} />
      <main id="main" className="wrap prose doc">
        <h1>{LABELS.privacy}</h1>
        <p className="dim caption">{SITE.name} · {PRIVACY.date}</p>
        <p className="panel sunken chamfer lead-box">{PRIVACY.lead}</p>
        {PRIVACY.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p className="dim">{s.body}</p>
          </section>
        ))}
        <section>
          <h2>{PRIVACY.contactTitle}</h2>
          <p className="dim">{PRIVACY.contactBody}</p>
          <p className="contact-address">{SITE.maker} · <a href={'mailto:' + SITE.contact}>{SITE.contact}</a></p>
        </section>
      </main>
      <Status privacy={BASE + 'privacy/'} />
    </>
  )
}
