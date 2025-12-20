'use client';

import React, { useState } from 'react';
import PricingCard from '@/components/pricing-card';

const PricingPage = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <main className="min-h-screen py-16 w-responsive">
            <div className='flex flex-col md:flex-row justify-between items-center sm:items-start mb-8 gap-8'>
                <div className="max-w-3xl flex flex-col items-start justify-center gap-4">
                    <div className="flex justify-center items-center gap-2">
                        <div className='h-2 w-2 rounded-full bg-purple-400'/>
                        <span className="text-sm text-body">
                          CHOOSE YOUR PLAN
                    </span>
                    </div>
                    <h1 className="text-4xl text-heading">
                        Plans and Pricing
                    </h1>
                    <p className="text-base text-body">
                        Receive unlimited credits when you pay yearly, and save on your plan.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="inline-flex items-center bg-stone-200 border border-stone-300 rounded-md p-[4px] text-body">
                        <button
                            className={`px-6 py-1 rounded-sm text-sm cursor-pointer ${isAnnual ? 'bg-transparent' : 'bg-white'}`}
                            onClick={() => setIsAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-6 py-1 rounded-sm text-sm cursor-pointer ${isAnnual ? 'bg-white' : 'bg-transparent'}`}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annual
                        </button>
                    </div>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Free Plan */}
                <PricingCard
                    title="Free"
                    price="$0"
                    annualPrice="$0"
                    isAnnual={isAnnual}
                    period="Per user/month, billed annually"
                    description="For your hobby projects"
                    features={[
                        { name: 'Up to 3 team members', included: true },
                        { name: 'Unlimited issues', included: true },
                        { name: 'Basic issue tracking', included: true },
                        { name: 'Email support', included: true },
                        { name: 'API access', included: false },
                        { name: 'Custom fields', included: false },
                    ]}
                    buttonText="Get started for free"
                    buttonLink="/signup"
                />

                {/* Pro Plan */}
                <PricingCard
                    title="Pro"
                    price="$85"
                    annualPrice="$70"
                    isAnnual={isAnnual}
                    period="Per user/month, billed annually"
                    description="Great for small businesses"
                    features={[
                        { name: 'Unlimited team members', included: true },
                        { name: 'Unlimited issues', included: true },
                        { name: 'Advanced issue tracking', included: true },
                        { name: 'Priority support', included: true },
                        { name: 'API access', included: true },
                        { name: 'Custom fields', included: true },
                    ]}
                    buttonText="Get started with Pro"
                    buttonLink="/signup"
                    highlighted
                />

                {/* Enterprise Plan */}
                <PricingCard
                    title="Enterprise"
                    price="Custom"
                    period="Per user/month, billed annually"
                    description="For multiple teams"
                    features={[
                        { name: 'Everything in Pro', included: true },
                        { name: 'Up to 5+ team members', included: true },
                        { name: '100 monitors', included: true },
                        { name: '15 status pages', included: true },
                        { name: '100+ integrations', included: true },
                        { name: 'Advanced integrations', included: true },
                    ]}
                    buttonText="Get started with Enterprise"
                    buttonLink=""
                />
            </div>

            {/* Bottom CTA */}
            <div className="relative w-full text-center bg-stone-200 border border-stone-300 rounded-lg p-12">
                <h2 className="text-2xl text-heading text-foreground mb-4">
                    Need a custom solution?
                </h2>
                <p className="text-sm text-body mb-8">
                    Contact our sales team to discuss your specific requirements.
                </p>
                <a
                    className="inline-flex items-center justify-center py-3 px-6 rounded-sm text-heading text-white bg-zinc-900 hover:bg-zinc-800 transition-colors"
                >
                    Contact Sales
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
        </main>
    );
}

export default PricingPage;