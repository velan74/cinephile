export default function SectionTitle({ label, title, subtitle }) {
  return (
    <div className="mb-12">
      {label && (
        <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase font-inter mb-3 fade-in">
          {label}
        </p>
      )}
      <h2 className="font-playfair text-3xl sm:text-4xl text-[#e8e4dc] mb-4 fade-up">
        {title}
      </h2>
      <div className="gold-line mb-4" />
      {subtitle && (
        <p className="text-[#5a5a5a] text-sm font-inter leading-relaxed max-w-xl fade-up d-200">
          {subtitle}
        </p>
      )}
    </div>
  )
}
