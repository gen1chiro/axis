import { FiPlus, FiMinus } from 'react-icons/fi';

type FAQItemProps = {
    number: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
};

const FAQItem = ({ number, question, answer, isOpen, onToggle }: FAQItemProps) => {
    return (
        <div className="border-b border-stone-300">
            <button
                onClick={onToggle}
                className="w-full flex items-start justify-between py-6 rounded-lg text-left hover:bg-stone-200 transition-colors px-2"
            >
                <div className="flex items-start gap-6 flex-1">
                      <span className="text-gray-400 text-sm text-body mt-1 min-w-[2rem]">
                        {number.toString().padStart(2, '0')}
                      </span>
                    <h3 className="text-xl text-heading flex-1">
                        {question}
                    </h3>
                </div>
                <div className="ml-6 flex-shrink-0">
                    {isOpen ? (
                        <FiMinus className="text-sm font-light" />
                    ) : (
                        <FiPlus className="text-sm font-light" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="pb-6 pl-2">
                    <div className="ml-[3.5rem]">
                        <p className="text-body text-sm max-w-2xl">
                            {answer}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FAQItem;