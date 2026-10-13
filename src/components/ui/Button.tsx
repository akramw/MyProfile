import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import s from './Button.module.css';

type Common = { variant?: 'primary' | 'ghost'; small?: boolean; children: ReactNode };

export function Button({
  variant = 'ghost',
  small,
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(s.btn, s[variant], small && s.sm, className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  variant = 'ghost',
  small,
  className,
  children,
  href,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={cn(s.btn, s[variant], small && s.sm, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
