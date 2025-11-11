import React, { useEffect, useRef, useState } from "react";

export type AccordionItem = {
    id: string | number;
    title: React.ReactNode;
    content: React.ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
    /** allow multiple panels open at once */
    multiple?: boolean;
    /** index of the panel open by default (single) or array of indexes (multiple) */
    defaultOpen?: number | number[];
    className?: string;
};

export default function Accordion({ items, multiple = false, defaultOpen, className = "" }: AccordionProps) {
    // keep track of open indexes
    const [openIndexes, setOpenIndexes] = useState<number[]>(() => {
        if (defaultOpen == null) return [];
        if (Array.isArray(defaultOpen)) return defaultOpen as number[];
        return [defaultOpen as number];
    });

    useEffect(() => {
        // normalize defaultOpen if it changes
        if (defaultOpen == null) return;
        if (Array.isArray(defaultOpen) && multiple) setOpenIndexes(defaultOpen as number[]);
        if (!Array.isArray(defaultOpen) && !multiple) setOpenIndexes([defaultOpen as number]);
    }, [defaultOpen, multiple]);

    const toggleIndex = (index: number) => {
        if (multiple) {
            setOpenIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
        } else {
            setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
        }
    };

    return (
        <div className={`w-full max-w-3xl mx-auto ${className}`}>
            {items.map((item, i) => (
                <AccordionPanel
                    key={item.id}
                    index={i}
                    title={item.title}
                    isOpen={openIndexes.includes(i)}
                    onToggle={() => toggleIndex(i)}
                >
                    {item.content}
                </AccordionPanel>
            ))}
        </div>
    );
}

function AccordionPanel({ index, title, children, isOpen, onToggle }: {
    index: number;
    title: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState<number | "auto">(0);
    const headerRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        if (isOpen) {
            // measure and set height to animate
            setHeight(el.scrollHeight);
            // after animation, set to auto so internal changes don't break
            const t = setTimeout(() => setHeight("auto"), 300);
            return () => clearTimeout(t);
        } else {
            // when closing, set to measured height first then to 0 to animate
            setHeight(el.scrollHeight);
            // next tick set to 0 to trigger transition
            requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
        }
    }, [isOpen]);

    // keyboard navigation for accessibility inside a single accordion instance
    const onKeyDown = (e: React.KeyboardEvent) => {
        const panelRoot = headerRef.current?.closest(".accordion-root") as HTMLElement | null;
        if (!panelRoot) return;
        const buttons = Array.from(panelRoot.querySelectorAll<HTMLButtonElement>(".accordion-header"));
        const currentIdx = buttons.indexOf(headerRef.current as HTMLButtonElement);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = buttons[(currentIdx + 1) % buttons.length];
            next.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const prev = buttons[(currentIdx - 1 + buttons.length) % buttons.length];
            prev.focus();
        } else if (e.key === "Home") {
            e.preventDefault();
            buttons[0].focus();
        } else if (e.key === "End") {
            e.preventDefault();
            buttons[buttons.length - 1].focus();
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div className="accordion-root border-b last:border-b-0">
            <h3>
                <button
                    ref={headerRef}
                    className="accordion-header w-full text-left flex items-center justify-between py-4 px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    aria-expanded={isOpen}
                    aria-controls={`accordion-panel-${index}`}
                    id={`accordion-header-${index}`}
                    onClick={onToggle}
                    onKeyDown={onKeyDown}
                >
                    <span className="text-sm md:text-base font-medium">{title}</span>
                    <svg
                        className={`w-5 h-5 ml-3 transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </h3>

            <div
                id={`accordion-panel-${index}`}
                role="region"
                aria-labelledby={`accordion-header-${index}`}
                className="overflow-hidden transition-[height] duration-300 px-3"
                style={{ height: height === "auto" ? undefined : `${height}px` }}
            >
                <div ref={contentRef} className="py-3 text-sm md:text-base">
                    {children}
                </div>
            </div>
        </div>
    );
}


