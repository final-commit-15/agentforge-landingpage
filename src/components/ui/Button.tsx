import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import type { ReactNode, MouseEventHandler } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'demo';
type Size = 'sm' | 'md' | 'lg';
type IconType = (props: React.SVGProps<SVGSVGElement>) => ReactNode;

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: IconType;
}

interface ButtonProps extends CommonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const base =
  'inline-flex items-center justify-center rounded-16 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-primary text-white hover:brightness-110 shadow-cta hover:shadow-warm',
  secondary:
    'bg-bg-secondary text-text-primary border border-border-primary hover:border-amber-400/40 hover:shadow-warm',
  ghost: 'bg-transparent text-brand-primary hover:bg-brand-primary/10',
  demo: 'bg-transparent text-text-secondary border border-border-primary hover:border-amber-400/40 hover:text-text-primary hover:bg-amber-400/5',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
};

function Content({ icon, children, variant }: { icon?: IconType; children: ReactNode; variant: Variant }) {
  const Icon = icon;
  return (
    <>
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      <span>{children}</span>
      {variant === 'primary' && <ChevronRight className="w-4 h-4 opacity-80" aria-hidden="true" />}
    </>
  );
}

export function Button({ variant = 'primary', size = 'md', icon, className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      <Content icon={icon} variant={variant}>
        {children}
      </Content>
    </button>
  );
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      <Content icon={icon} variant={variant}>
        {children}
      </Content>
    </Link>
  );
}

export function DemoIcon() {
  return <Play className="w-4 h-4" aria-hidden="true" />;
}
