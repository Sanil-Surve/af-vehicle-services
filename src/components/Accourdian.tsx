"use client";

import * as React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
// import { Plus, Minus } from "lucide-react";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
    const [openItem, setOpenItem] = React.useState<string | null>(null);

    return (
        <div className="w-full px-4 py-20 my-16">
            <div className="w-full px-4 sm:px-6">
                <h1 className="text-start font-extrabold text-3xl">Terms & Conditions</h1>
                <Accordion
                    type="single"
                    collapsible
                    value={openItem || ""}
                    onValueChange={setOpenItem}
                    className="border-t border-gray-200"
                >
                    {items.map((item) => (
                        <AccordionItem
                            key={item.id}
                            value={item.id}
                            className="border-b border-gray-200"
                        >
                            <AccordionTrigger className="w-full h-full flex justify-between items-center py-10 px-6 sm:px-10 text-left text-xl sm:text-xl font-semibold text-gray-900 hover:no-underline focus:no-underline">
                                <span>{item.question}</span>
                                {/* {openItem === item.id ? (
                                    <Minus className="h-5 w-5 text-gray-900 transition-transform duration-300" />
                                ) : (
                                    <Plus className="h-5 w-5 text-gray-900 transition-transform duration-300" />
                                )} */}
                            </AccordionTrigger>

                            <AccordionContent className="w-full h-full text-gray-600 text-sm sm:text-base leading-loose pt-4 pb-8 px-6 sm:px-10">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};
