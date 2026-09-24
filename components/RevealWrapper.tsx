'use client';

import { useEffect, useRef, ReactNode, ElementType } from 'react';

type Props = {
  children: ReactNode;
  delay?: 'd1' | 'd2' | 'd3' | 'd4';
  className?: string;
  as?: ElementType;
};

export default function RevealWrapper({
  children,
  delay,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.10, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = ['reveal', delay, className].filter(Boolean).join(' ');

  // Cast so JSX accepts the div ref for any tag (e.g. 'li')
  const Component = Tag as 'div';
  return <Component ref={ref} className={classes}>{children}</Component>;
}
