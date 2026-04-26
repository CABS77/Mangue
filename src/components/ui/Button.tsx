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
    'bg-senegal-yellow-500 text-senegal-green-900 hover:bg-senegal-yellow-400 focus-visible:ring-senegal-yellow-500',
  secondary:
    'bg-senegal-green-600 text-white hover:bg-senegal-green-500 focus-visible:ring-senegal-green-600',
  outline:
    'bg-transparent border-2 border-senegal-green-600 text-senegal-green-700 hover:bg-senegal-green-50 focus-visible:ring-senegal-green-600',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

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
