import type { IconType } from 'react-icons';

type FeatureCardProps = {
    icon: IconType;
    title: string;
    description: string;
    colspan: {
        sm: string;
        lg: string;
    }
    isComingSoon: boolean;
}

const FeatureCard = ({icon: Icon, title, description, colspan, isComingSoon}: FeatureCardProps) => {

    return (
        <div className={`relative bg-stone-200 rounded-md p-4 pb-8 h-48 border border-stone-300 text-foreground ${colspan.sm} ${colspan.lg}`}>
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-body"/>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className='flex items-center justify-start gap-2 mb-2'>
                        <h3 className="text-lg text-heading">
                            {title}
                        </h3>
                        {
                            isComingSoon && (
                                <div className='px-1 py-[2px] text-body bg-purple-400 rounded-full text-center text-[10px]'>soon</div>
                            )
                        }
                    </div>
                    <p className="text-body text-sm">
                        {description}
                    </p>
                </div>
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
    );
};

export default FeatureCard;