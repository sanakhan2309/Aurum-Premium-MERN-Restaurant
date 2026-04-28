export function LogoMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={['h-7 w-7', className].join(' ')}
      fill="none"
    >
      <path
        d="M24 6c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15S9 29.284 9 21C9 12.716 15.716 6 24 6Z"
        className="fill-gold-300/30"
      />
      <path
        d="M17.5 31.5c2.3-10.5 4.9-15.8 8-15.8s5.7 5.3 8 15.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 22.5h12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
