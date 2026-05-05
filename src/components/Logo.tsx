import type { CSSProperties } from 'react';

type Props = {
  /** Height of the icon (and approx wordmark height). */
  size?: number;
  /** Render the wordmark "willow" next to the icon. */
  withWordmark?: boolean;
  /** Color of the icon (defaults to currentColor). */
  iconColor?: string;
  /** Use the white wordmark variant — for use on dark backgrounds. */
  variant?: 'dark' | 'light';
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
};

export default function Logo({
  size = 32,
  withWordmark = true,
  iconColor,
  variant = 'dark',
  className,
  style,
  ariaLabel = 'Willow',
}: Props) {
  // Wordmark PNG aspect ratio is 685 / 189 = 3.624 (tight-cropped from the
  // original logo). Height ratio 0.508 matches the original logo file exactly.
  const wordmarkSrc =
    variant === 'light'
      ? '/willow-wordmark-white.png'
      : '/willow-wordmark.png';
  const wordmarkHeight = Math.round(size * 0.508);
  const wordmarkWidth = Math.round(wordmarkHeight * (685 / 189));

  return (
    <span
      className={`brand-logo${className ? ' ' + className : ''}`}
      style={style}
      role="img"
      aria-label={ariaLabel}
    >
      <WillowMark size={size} color={iconColor} />
      {withWordmark && (
        <img
          src={wordmarkSrc}
          alt=""
          width={wordmarkWidth}
          height={wordmarkHeight}
          className="brand-wordmark-img"
          aria-hidden="true"
        />
      )}
    </span>
  );
}

function WillowMark({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 408 407"
      fill={color ?? 'currentColor'}
      fillRule="evenodd"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M141 1 C63 1 1 65 1 145 L1 406 L259 406 C341 406 407 341 407 260 L407 1 Z M135 133 L273 133 L273 273 L135 273 Z" />
    </svg>
  );
}
