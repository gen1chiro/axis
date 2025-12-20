"use client"

import React, { useState } from 'react';
import FAQItem from '@/components/faq-item';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "What is Axis?",
            answer: "Axis is a project management tool inspired by Linear. It helps teams organize, track, and manage their projects and issues in a simple and efficient way."
        },
        {
            question: "How do I create an account?",
            answer: "You can create an account by clicking the 'Sign Up' button in the top navigation bar. You'll need to provide an email address and create a password."
        },
        {
            question: "Is it free to use?",
            answer: "Yes, Axis is completely free to use as it's an open-source project. You can even download the source code and host it yourself."
        },
        {
            question: "Can I contribute to the project?",
            answer: "Absolutely! Axis is open-source and contributions are welcome. Check out our GitHub repository to get started."
        },
        {
            question: "How do I report bugs or request features?",
            answer: "You can report bugs or request features by opening an issue on our GitHub repository. We appreciate your feedback and contributions!"
        },
        {
            question: "What technologies does Axis use?",
            answer: "Axis is built with Next.js, TypeScript, Tailwind CSS, and uses a PostgreSQL database. It leverages the latest features of Next.js App Router for optimal performance."
        },
        {
            question: "Is this an actual product?",
            answer: "This is actually a personal project in line with Frontend Masters' Next.js fundamentals course. However, the features presented are implemented."
        }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen w-responsive py-16">
            <div className="w-full">
                <div className="mb-12 flex flex-col items-start justify-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                        <span className="text-sm text-body">
                          NEED HELP?
                        </span>
                    </div>
                    <h1 className="text-4xl text-heading">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-base text-body">
                        Find answers to common questions about Axis and how to get started.
                    </p>
                </div>

                <div>
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            number={index + 1}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>

                <div className="relative w-full text-center bg-stone-200 border border-stone-300 rounded-lg p-12 mt-16">
                    <h2 className="text-2xl text-heading text-foreground mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-sm text-body mb-8">
                        Can't find the answer you're looking for? Please reach out to our support team.
                    </p>
                    <a
                        className="inline-flex items-center justify-center py-3 px-6 rounded-sm text-heading text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
                    >
                        Contact Support
                    </a>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(120, 113, 108, 0.3) 1px, transparent 1px)`,
                            backgroundSize: '12px 12px',
                            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}