'use client';

type CanvasNavigationProps = {
  sections: { id: string; title: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function CanvasNavigation({ sections, activeSection, onNavigate }: CanvasNavigationProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2">
      {sections.map((section) => {
        const isActive = section.id === activeSection;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
              isActive ? 'bg-ink text-background' : 'bg-oat text-ink hover:bg-oat/80'
            }`}
          >
            {section.title}
          </button>
        );
      })}
    </nav>
  );
}

