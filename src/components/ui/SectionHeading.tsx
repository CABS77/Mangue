interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeading({
  children,
  subtitle,
  className = '',
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`.trim()}>
      <h2 className="text-3xl font-bold text-senegal-green-800 sm:text-4xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-senegal-green-600">{subtitle}</p>
      )}
    </div>
  );
}
