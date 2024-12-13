"use client"

import React from 'react';
import Image from 'next/image';
import
    {
        CheckCircle2,
        Brain,
        Zap,
        Clock,
        BarChart,
        Shield,
        ArrowRight,
        ChevronRight,
        User,
        BookOpen,
        Laptop,
        Medal,
        FileCheck,
        LineChart,
        Lock,
        HelpCircle
    } from 'lucide-react';

interface FeatureProps
{
    icon: React.ElementType;
    title: string;
    description: string;
}

interface TestimonialProps
{
    quote: string;
    author: string;
    role: string;
    image: string;
}

interface BenefitProps
{
    icon: React.ElementType;
    title: string;
    stats: string;
    description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="p-3 bg-blue-50 rounded-lg mb-4">
            <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, image }) => (
    <div className="flex flex-col bg-white p-6 rounded-xl shadow-sm">
        <CheckCircle2 className="w-8 h-8 text-green-500 mb-4" />
        <p className="text-gray-600 mb-4 italic">"{quote}"</p>
        <div className="flex items-center mt-auto">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                <Image
                    src={image}
                    alt={author}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="ml-3">
                <p className="font-semibold text-gray-900">{author}</p>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
    </div>
);

const Benefit: React.FC<BenefitProps> = ({ icon: Icon, title, stats, description }) => (
    <div className="flex flex-col items-center text-center p-6">
        <Icon className="w-12 h-12 text-blue-600 mb-4" />
        <h4 className="text-2xl font-bold text-gray-900 mb-2">{stats}</h4>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Page: React.FC = () =>
{
    const features = [
        {
            icon: Brain,
            title: "AI-Powered Grading",
            description: "Utilize advanced AI algorithms to grade papers consistently and efficiently, maintaining high accuracy standards."
        },
        {
            icon: Clock,
            title: "Quick Turnaround",
            description: "Reduce grading time by up to 75% while providing detailed feedback to each student."
        },
        {
            icon: LineChart,
            title: "Analytics Dashboard",
            description: "Get comprehensive insights into student performance and identify areas for improvement."
        },
        {
            icon: Shield,
            title: "Plagiarism Detection",
            description: "Advanced plagiarism detection system ensures academic integrity across all submissions."
        }
    ];

    const benefits = [
        {
            icon: Zap,
            title: "Time Saved",
            stats: "75%",
            description: "Average reduction in grading time"
        },
        {
            icon: User,
            title: "Happy Users",
            stats: "50,000+",
            description: "Educators using Easmark"
        },
        {
            icon: FileCheck,
            title: "Papers Graded",
            stats: "1M+",
            description: "Documents processed monthly"
        },
        {
            icon: Medal,
            title: "Accuracy Rate",
            stats: "99.9%",
            description: "Grading accuracy"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Transform Your Grading Process
                        </h1>
                        <p className="text-xl text-blue-50 mb-12">
                            Discover how Easmark revolutionizes academic assessment with AI-powered solutions.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                            Get Started Free
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <Benefit key={index} {...benefit} />
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center mb-16">Why Choose Easmark?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <Feature key={index} {...feature} />
                    ))}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {[
                                { icon: Laptop, title: "Upload Documents", description: "Simply upload student papers through our secure platform" },
                                { icon: Brain, title: "AI Analysis", description: "Our AI system analyzes the content using advanced algorithms" },
                                { icon: FileCheck, title: "Review & Adjust", description: "Review AI-generated feedback and make any necessary adjustments" },
                                { icon: BarChart, title: "Distribute Results", description: "Send detailed feedback and grades to students automatically" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-4 p-6 rounded-lg bg-gray-50">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="container mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center mb-16">What Educators Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <TestimonialCard
                        quote="Easmark has transformed how I grade papers. What used to take hours now takes minutes."
                        author="Dr. Sarah Chen"
                        role="Professor of Engineering"
                        image="/api/placeholder/48/48"
                    />
                    <TestimonialCard
                        quote="The consistency and accuracy of the AI grading have improved student satisfaction significantly."
                        author="Prof. Michael Roberts"
                        role="Department Head"
                        image="/api/placeholder/48/48"
                    />
                    <TestimonialCard
                        quote="The analytics help me identify areas where students need additional support."
                        author="Dr. Emily Thompson"
                        role="Assistant Professor"
                        image="/api/placeholder/48/48"
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Grading Process?</h2>
                        <p className="text-xl text-blue-50 mb-8">
                            Join thousands of educators who have already revolutionized their assessment workflow.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5" />
                                Start Free Trial
                            </button>
                            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
                                <BookOpen className="w-5 h-5" />
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;