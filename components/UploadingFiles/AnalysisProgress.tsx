import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisProgressProps {
    // analysisProgress: number;
    uploadType: 'thesis' | 'code';
    onAnalysisComplete: () => void;
}

const ANALYSIS_PHASES = {
    thesis: [
        'Extracting document content...',
        'Analyzing structure and format...',
        'Evaluating content quality...',
        'Assessing research methodology...',
        'Reviewing literature citations...',
        'Checking writing style...',
        'Generating detailed feedback...'
    ],
    code: [
        'Parsing code structure...',
        'Analyzing code readability...',
        'Checking code functionality...',
        'Evaluating code efficiency...',
        'Assessing error handling...',
        'Reviewing code modularity...',
        'Generating code analysis report...'
    ]
} as const;

export const AnalysisProgress = ({ 
    uploadType,
    onAnalysisComplete 
}: AnalysisProgressProps) => {
    const [progress, setProgress] = useState(0);
    const phases = ANALYSIS_PHASES[uploadType];
    const currentPhaseIndex = Math.floor((progress / 100) * phases.length);
    const displayPhase = phases[Math.min(currentPhaseIndex, phases.length - 1)];

    useEffect(() => {
        let timer: NodeJS.Timeout;
        
        // Start progress after 2 seconds
        const startDelay = setTimeout(() => {
            timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        onAnalysisComplete();
                        return 100;
                    }
                    return prev + 1;
                });
            }, 150); // Adjust speed of progress
        }, 2000); // Initial delay before starting

        return () => {
            clearTimeout(startDelay);
            clearInterval(timer);
        };
    }, [onAnalysisComplete]);

    return (
        <div className="text-center">
            <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-violet-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Analyzing Your {uploadType === 'thesis' ? 'Thesis' : 'Code'}
            </h2>
            <p className="text-gray-600 mb-8 italic">
                {displayPhase}
            </p>
            <Card className="bg-white/80 backdrop-blur-sm mb-6">
                <CardContent className="py-4">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-gray-500 mt-2">
                        {progress}% complete
                    </p>
                </CardContent>
            </Card>
            <p className="text-sm text-gray-500">
                Please don't close this window during analysis
            </p>
        </div>
    );
};