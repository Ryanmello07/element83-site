type Props = {
  size?: number;
  animate?: boolean;
  className?: string;
};

export function CubeLogo({ size = 64, animate = false, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${className} ${animate ? 'animate-cube-reveal' : ''}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="topFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f2fa" />
          <stop offset="100%" stopColor="#c9c5d8" />
        </linearGradient>
        <linearGradient id="leftFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8f8ab0" />
          <stop offset="100%" stopColor="#4a466b" />
        </linearGradient>
        <linearGradient id="rightFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f6a92" />
          <stop offset="100%" stopColor="#332f52" />
        </linearGradient>
        <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      <ellipse cx="60" cy="102" rx="34" ry="6" fill="#a78bfa" opacity="0.18" filter="url(#softGlow)" />

      <g transform="translate(60 60)">
        <polygon points="0,-38 33,-19 0,0 -33,-19" fill="url(#topFace)" stroke="#e8e6f0" strokeWidth="0.6" />
        <polygon points="-33,-19 0,0 0,38 -33,19" fill="url(#leftFace)" stroke="#c9c5d8" strokeWidth="0.4" opacity="0.95" />
        <polygon points="33,-19 0,0 0,38 33,19" fill="url(#rightFace)" stroke="#9c98b0" strokeWidth="0.4" opacity="0.95" />
        <polyline points="-33,-19 0,-38 33,-19" fill="none" stroke="#a78bfa" strokeWidth="0.6" opacity="0.7" />
      </g>
    </svg>
  );
}
