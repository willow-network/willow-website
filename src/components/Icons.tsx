import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="arrow" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="arrow" {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="arrow" {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function IconIndex(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={22} height={22} {...props}>
      <path d="M3 6h18" />
      <path d="M3 12h12" />
      <path d="M3 18h18" />
      <circle cx="20" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconRecords(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={22} height={22} {...props}>
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </svg>
  );
}

export function IconFile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={22} height={22} {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

export function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 4 6v6c0 4.5 3.4 8.5 8 9 4.6-.5 8-4.5 8-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconDiscord(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M19.27 5.33a17.7 17.7 0 0 0-4.43-1.36.07.07 0 0 0-.07.03c-.19.34-.4.79-.55 1.13a16.5 16.5 0 0 0-4.95 0c-.16-.35-.37-.79-.56-1.13a.07.07 0 0 0-.07-.03A17.7 17.7 0 0 0 4.2 5.33a.06.06 0 0 0-.03.02C1.27 9.6.48 13.74.87 17.84a.07.07 0 0 0 .03.05c1.85 1.36 3.65 2.18 5.42 2.73a.07.07 0 0 0 .07-.03c.42-.57.79-1.17 1.11-1.8a.07.07 0 0 0-.04-.1 11.7 11.7 0 0 1-1.66-.79.07.07 0 0 1 0-.12c.11-.08.22-.17.33-.26a.07.07 0 0 1 .07 0c3.48 1.59 7.24 1.59 10.68 0a.07.07 0 0 1 .07 0c.11.09.22.18.33.26a.07.07 0 0 1 0 .12c-.53.31-1.08.58-1.66.79a.07.07 0 0 0-.04.1c.32.63.69 1.23 1.1 1.8a.07.07 0 0 0 .07.03c1.78-.55 3.58-1.37 5.43-2.73a.07.07 0 0 0 .03-.05c.46-4.74-.78-8.85-3.3-12.49a.05.05 0 0 0-.03-.02ZM8.52 15.33c-1.06 0-1.94-.97-1.94-2.17 0-1.2.86-2.18 1.94-2.18 1.09 0 1.96.99 1.94 2.18 0 1.2-.86 2.17-1.94 2.17Zm6.97 0c-1.06 0-1.94-.97-1.94-2.17 0-1.2.86-2.18 1.94-2.18 1.09 0 1.96.99 1.94 2.18 0 1.2-.85 2.17-1.94 2.17Z" />
    </svg>
  );
}

export function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
