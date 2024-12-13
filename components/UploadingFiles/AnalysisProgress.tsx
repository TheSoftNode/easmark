import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisProgressProps {
  analysisProgress: number;
  currentPhase: string;
  uploadType: 'thesis' | 'code';
}

export const AnalysisProgress = ({ analysisProgress, currentPhase, uploadType }: AnalysisProgressProps) =>{ return (
  <div className="text-center">
    <motion.div
      className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-violet-500 border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
    <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
      Analyzing Your {uploadType}
    </h2>
    <p className="text-gray-600 mb-8 italic">
      {currentPhase}
    </p>
    <Card className="bg-white/80 backdrop-blur-sm mb-6">
      <CardContent className="py-4">
        <Progress value={analysisProgress} className="h-2" />
        <p className="text-sm text-gray-500 mt-2">
          {analysisProgress}% complete
        </p>
      </CardContent>
    </Card>
    <p className="text-sm text-gray-500">
      Please don't close this window during analysis
    </p>
  </div>
)
};
