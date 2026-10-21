import type { ReactNode } from "react";

type HomeSectionType = { title: string; desc: string; children: ReactNode };

function HomeSection({ title, desc, children }: HomeSectionType) {
  return (
    <div>
      <h2 className="font-bold text-xl">{title}</h2>
      <span className="inline-block mb-4 text-foreground-secondary">
        {desc}
      </span>
      {children}
    </div>
  );
}

export default HomeSection;
