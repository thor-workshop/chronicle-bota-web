import { useState } from 'react'
import { Head } from '../chrome/Head'
import { Status } from '../chrome/Status'
import { CAPTIONS, CONTROLS, GROWTH, HEROES, LABELS, PLAY, SITE, STORES, UPCOMING, type Media, type Play } from '../content'
import { Sprite } from '../primitives/Sprite'
import { SHEETS } from '../art/sheets'
import { Keywords } from '../primitives/Keywords'
import { Motion } from '../primitives/Motion'
import wideMotion from '../art/title_wide.webp'
import wideStill from '../art/title_wide.png'
import narrowMotion from '../art/title_narrow.webp'
import narrowStill from '../art/title_narrow.png'
import astralMotion from '../art/play_astral.webp'
import astralStill from '../art/play_astral.png'
import beatriceMotion from '../art/play_beatrice.webp'
import beatriceStill from '../art/play_beatrice.png'
import astralCards from '../art/cards_astral.png'
import beatriceCards from '../art/cards_beatrice.png'
import library from '../art/astral_library.png'
import temple from '../art/beatrice_temple.png'
import shioriSilhouette from '../art/shiori_silhouette.svg'

const SCENES = { astral_library: library, beatrice_temple: temple }
const BASE = import.meta.env.BASE_URL
const PLAY_MEDIA: Record<Play['id'], Media> = {
  astral: { motion: astralMotion, still: astralStill, alt: CAPTIONS.astralCombat },
  beatrice: { motion: beatriceMotion, still: beatriceStill, alt: CAPTIONS.beatriceCombat },
}
const CARDS = [
  { name: HEROES[0].name, src: astralCards, alt: CAPTIONS.astralCards },
  { name: HEROES[1].name, src: beatriceCards, alt: CAPTIONS.beatriceCards },
]

export function Home() {
  const [moving, setMoving] = useState(true)
  return (
    <>
      <a className="skip" href="#main">{LABELS.skip}</a>
      <Head home={BASE} paused={!moving} menu={[{ href: '#game', label: LABELS.game }, { href: '#heroes', label: LABELS.heroes }]} />
      <div className="wrap hero">
        <h1 className="sr">{SITE.name}</h1>
        <picture className="title-shot sunken">
          <source media="(prefers-reduced-motion: reduce) and (max-width: 640px)" srcSet={narrowStill} />
          <source media="(prefers-reduced-motion: reduce)" srcSet={wideStill} />
          <source media="(max-width: 640px)" srcSet={moving ? narrowMotion : narrowStill} />
          <img src={moving ? wideMotion : wideStill} width={576} height={216} alt={LABELS.titleAlt} />
        </picture>
        <div className="motion-tools">
          <button className="motion-toggle" type="button" aria-pressed={!moving} onClick={() => setMoving(!moving)}>
            {moving ? LABELS.pause : LABELS.resume}
          </button>
        </div>
        <p className="tagline">{SITE.tagline}</p>
        <p className="lead">{SITE.lead}</p>
        <ul className="stores">
          {STORES.map((s) => (
            <li key={s.store} className="store panel chamfer">
              <span className="caption dim">{s.devices}</span>
              <span>{s.store}</span>
              <span className="caption kw">{s.state}</span>
            </li>
          ))}
        </ul>
      </div>
      <main id="main" className="wrap">
        <section id="game">
          <h2>{LABELS.gameTitle}</h2>
          <p className="section-lead dim controls">{CONTROLS}</p>
          <div className="plays">
            {PLAY.map((p) => (
              <article key={p.id} className="play">
                <Motion className="shot sunken" media={PLAY_MEDIA[p.id]} width={384} height={216} paused={!moving} />
                <div className="play-text">
                  <p className="caption kw">{p.character}</p>
                  <h3>{p.title}</h3>
                  <p className="dim"><Keywords text={p.body} /></p>
                </div>
              </article>
            ))}
          </div>
          <article className="growth">
            <h3>{GROWTH.title}</h3>
            <p className="dim growth-body">{GROWTH.body}</p>
            <div className="cards-pair">
              {CARDS.map((c) => (
                <figure key={c.name}>
                  <img className="shot sunken" src={c.src} width={384} height={216} alt={c.alt} loading="lazy" decoding="async" />
                  <figcaption className="caption dim">{c.name}</figcaption>
                </figure>
              ))}
            </div>
            <p className="dim growth-hint">{GROWTH.hint}</p>
          </article>
        </section>
        <section id="heroes">
          <h2>{LABELS.heroesTitle}</h2>
          <p className="section-lead dim">{LABELS.heroesIntro}</p>
          <div className="grid two">
            {HEROES.map((h) => (
              <article key={h.id} className="panel chamfer hero-card">
                <div className="scene sunken" style={{ backgroundImage: 'url(' + SCENES[h.scene] + ')' }} />
                <div className="hero-row">
                  <Sprite sheet={SHEETS[h.id]} scale={4} paused={!moving} />
                  <div>
                    <h3>{h.name}</h3>
                    <p className="caption dim">{h.epithet}</p>
                  </div>
                </div>
                <p className="story">{h.story}</p>
                <blockquote className="quote">{h.quote}</blockquote>
                <p className="dim"><Keywords text={h.play} /></p>
                <p className="caption kw">이야기 「{h.storyTitle}」</p>
              </article>
            ))}
          </div>
          <article className="panel chamfer coming-card">
            <div className="coming-display sunken">
              <img className="coming-silhouette" src={shioriSilhouette} width={128} height={128} alt={UPCOMING.alt} loading="lazy" />
            </div>
            <div>
              <p className="caption kw coming-state">{UPCOMING.state}</p>
              <h3>{UPCOMING.name}</h3>
              <p className="dim">{UPCOMING.body}</p>
            </div>
          </article>
        </section>
      </main>
      <Status privacy={BASE + 'privacy/'} />
    </>
  )
}
