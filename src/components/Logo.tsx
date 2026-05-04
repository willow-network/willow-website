import type { CSSProperties } from 'react';

type Props = {
  size?: number;
  /** Render the wordmark "willow" next to the icon. */
  withWordmark?: boolean;
  /** Force the icon and wordmark colors (otherwise inherit currentColor). */
  iconColor?: string;
  wordmarkColor?: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
};

export default function Logo({
  size = 32,
  withWordmark = true,
  iconColor,
  wordmarkColor,
  className,
  style,
  ariaLabel = 'Willow',
}: Props) {
  return (
    <span
      className={`brand-logo${className ? ' ' + className : ''}`}
      style={style}
      role="img"
      aria-label={ariaLabel}
    >
      <WillowMark size={size} color={iconColor} />
      {withWordmark && (
        <span
          className="brand-wordmark"
          style={{
            color: wordmarkColor,
            fontSize: `${size * 0.78}px`,
            lineHeight: 1,
          }}
        >
          willow
        </span>
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
