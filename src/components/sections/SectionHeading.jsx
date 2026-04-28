import { Container } from '../Container'

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center'

  return (
    <Container
      className={[
        'flex flex-col gap-3',
        isCenter ? 'text-center items-center' : 'text-left items-start',
      ].join(' ')}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.28em] text-gold-200/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tightish text-pearl-50 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-pearl-100/75">
          {description}
        </p>
      ) : null}
    </Container>
  )
}
