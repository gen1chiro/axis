import FeatureCard from '@/components/feature-card';
import {
    FiCheckCircle,
    FiLayout,
    FiUsers,
    FiSliders,
    FiZap,
    FiSearch
} from 'react-icons/fi';


const FeaturesPage = () => {
    const features = [
        {
            icon: FiCheckCircle,
            title: "Issue Tracking",
            description: "Create, assign, and track issues with ease. Set priorities, due dates, and statuses to keep your team on track.",
            colspan: { sm: "col-span-1", lg: "lg:col-span-2" }
        },
        {
            icon: FiLayout,
            title: "Intuitive UI",
            description: "A clean, modern interface that makes project management a breeze. No clutter, just what you need to get work done.",
            colspan: { sm: "col-span-1", lg: "lg:col-span-1" }
        },
        {
            icon: FiUsers,
            title: "Collaboration",
            description: "Work together seamlessly. Comment on issues, mention team members, and keep everyone in the loop.",
            colspan: { sm: "col-span-1", lg: "lg:col-span-1" }
        },
        {
            icon: FiSliders,
            title: "Custom Workflows",
            description: "Create workflows that match your team's process. Customize statuses, labels, and more.",
            colspan: { sm: "col-span-1", lg: "lg:col-span-2" }
        },
        {
            icon: FiZap,
            title: "Real-time Updates",
            description: "See changes as they happen. No need to refresh or wait for updates.",
            colspan: { sm: "col-span-1", lg: "lg:col-span-2" }
        },
        {
            icon: FiSearch,
            title: "Powerful Search",
            description: "Find anything instantly with our powerful search. Filter by assignee, status, priority, and more.",
            colspan: { sm: "col-span-1", lg: "lg:col-span-1" }
        }
    ];

    return (
        <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col items-start justify-center gap-4">
                    <div className="flex justify-center items-center gap-2">
                        <div className='h-2 w-2 rounded-full bg-purple-400'/>
                        <span className="text-sm text-body">
                          WHY AXIS?
                        </span>
                    </div>
                    <h1 className="text-4xl text-heading">
                        Why choose our platform?
                    </h1>
                    <p className="text-base max-w-xl text-body">
                        Maximize your productivity and team collaboration while maintaining simplicity for all team
                        members.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            colspan={feature.colspan}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default FeaturesPage;