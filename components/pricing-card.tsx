import { FiCheck, FiX } from "react-icons/fi";

type PricingCardProps = {
    title: string;
    price: string;
    annualPrice?: string;
    isAnnual?: boolean;
    period?: string;
    description: string;
    features: { name: string; included: boolean }[];
    buttonText: string;
    buttonLink: string;
    highlighted?: boolean;
}

const PricingCard = ({ title, price, annualPrice, isAnnual, period, description, features, buttonText, buttonLink, highlighted }: PricingCardProps) => {
    return (
        <div className={`rounded-lg p-8 ${highlighted ? 'bg-zinc-900 text-white shadow-md' : 'bg-stone-200 border border-stone-300'}`}>
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <h3 className={`text-xl text-heading ${highlighted ? 'text-white' : 'text-foreground'}`}>
                        {title}
                    </h3>
                </div>
                <div className="mb-2">
                  <span className={`text-4xl text-heading ${highlighted ? 'text-white' : 'text-foreground'}`}>
                    {isAnnual && annualPrice ? annualPrice : price}
                  </span>
                </div>

                {period && (
                    <p className={`text-sm text-body ${highlighted ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                        {period}
                    </p>
                )}

                <p className={`text-sm text-heading ${highlighted ? 'text-gray-400' : 'text-gray-600'}`}>
                    {description}
                </p>
            </div>

            <ul className="space-y-3 mb-8 text-body">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                            <FiCheck className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-purple-400' : 'text-purple-600'}`} />
                        ) : (
                            <FiX className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-gray-600' : 'text-gray-400'}`} />
                        )}
                        <span className={`text-xs ${feature.included ? (highlighted ? 'text-gray-200' : 'text-gray-700') : (highlighted ? 'text-gray-500' : 'text-gray-400')}`}>
              {feature.name}
            </span>
                    </li>
                ))}
            </ul>

            <a
                href={buttonLink}
                className={`block w-full text-center py-3 px-6 rounded-sm text-heading transition-colors ${
                    highlighted
                        ? 'bg-stone-200 text-foreground hover:bg-stone-300'
                        : 'bg-foreground text-white hover:bg-zinc-800'
                }`}
            >
                {buttonText}
            </a>
        </div>
    );
};

export default PricingCard;