export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rsvpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C47FF" />
          <stop offset="50%" stopColor="#FF5FAE" />
          <stop offset="100%" stopColor="#FF9A49" />
        </linearGradient>
      </defs>
      <ellipse
        cx="50" cy="50" rx="36" ry="22"
        transform="rotate(45 50 50)"
        stroke="url(#rsvpGradient)"
        strokeWidth="9"
        fill="none"
      />
      <ellipse
        cx="50" cy="50" rx="36" ry="22"
        transform="rotate(-45 50 50)"
        stroke="url(#rsvpGradient)"
        strokeWidth="9"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ withTagline = false }: { withTagline?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon size={32} />
      <div>
        <span className="text-xl font-bold text-ink">
          Rsvp<span className="text-brand">.ng</span>
        </span>
        {withTagline && (
          <p className="text-xs text-text-muted -mt-1">Every Event. Perfectly Shared.</p>
        )}
      </div>
    </div>
  );
}
