export function Button({
  as: As = 'a',
  variant = 'primary',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950'

  const variants = {
    primary:
      'bg-gold-400 text-night-950 shadow-soft hover:bg-gold-300 hover:-translate-y-0.5 active:bg-gold-500',
    secondary:
      'bg-white/10 text-pearl-50 shadow-ring hover:bg-white/16 hover:-translate-y-0.5 active:bg-white/8',
    ghost:
      'bg-transparent text-pearl-50 hover:bg-white/10 hover:-translate-y-0.5 active:bg-white/5',
  }

  return (
    <As className={[base, variants[variant], className].join(' ')} {...props} />
  )
}
