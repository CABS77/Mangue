import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-forest-green hover:bg-gold-light hover:shadow-gold focus-visible:ring-gold',
  secondary:
    'bg-forest-green text-white hover:bg-forest-green-light focus-visible:ring-forest-green',
  outline:
    'bg-transparent border-2 border-white text-white hover:bg-white/10 focus-visible:ring-white',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold btn-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 tracking-wide';

export default function Button({
  variant = 'primary',
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    const linkProps = rest as Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof ButtonBaseProps
    >;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps
  >;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
