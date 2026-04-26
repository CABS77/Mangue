interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  children,
  subtitle,
  className = '',
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`.trim()}>
      {subtitle && (
        <p
          className={`mb-4 text-sm font-medium uppercase tracking-premium ${
            light ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-bold sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-forest-green'
        }`}
      >
        {children}
      </h2>
      {centered && (
        <div
          className={`mx-auto mt-6 h-[2px] w-20 rounded-full ${
            light
              ? 'bg-gradient-to-r from-transparent via-gold to-transparent'
              : 'bg-gradient-to-r from-transparent via-gold to-transparent'
          }`}
        />
      )}
    </div>
  );
}
