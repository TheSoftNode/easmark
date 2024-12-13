"use client"

import React, { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThesisDashboard from '@/components/Dashboard/ThesisDashboard';
import Navbar from '@/components/Dashboard/Navbar';
import { UploadTypeSelector } from '@/components/UploadingFiles/UploadTypeSelector';
import CodeUploadSection from '@/components/UploadingFiles/CodeUploadSection';
import ThesisUploadCard from '@/components/UploadingFiles/ThesisUploadCard';
import { UploadProgress } from '@/components/UploadingFiles/UploadProgress';
import { UploadComplete } from '@/components/UploadingFiles/UploadComplete';
import { AnalysisProgress } from '@/components/UploadingFiles/AnalysisProgress';
import { ErrorDisplay } from '@/components/UploadingFiles/ErrorDisplay';


const ThesisAnalysisFlow = () =>
{
    const [currentState, setCurrentState] = useState('upload');
    const [uploadType, setUploadType] = useState<'thesis' | 'code'>('thesis');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisProgress, setAnalysisProgress] = useState(0);
    const [currentPhase, setCurrentPhase] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const getAnalysisPhases = () =>
    {
        if (uploadType === 'thesis')
        {
            return [
                'Analyzing document structure...',
                'Reviewing literature citations...',
                'Checking methodology...',
                'Evaluating research findings...',
                'Assessing writing quality...',
                'Generating comprehensive report...'
            ];
        }
        return [
            'Analyzing code structure...',
            'Checking syntax and formatting...',
            'Evaluating code complexity...',
            'Reviewing coding patterns...',
            'Assessing code quality...',
            'Generating code analysis report...'
        ];
    };

    const simulateUpload = () =>
    {
        let progress = 0;
        const interval = setInterval(() =>
        {
            progress += 2;
            setUploadProgress(progress);
            if (progress >= 100)
            {
                clearInterval(interval);
                setCurrentState('uploadComplete');
            }
        }, 50);
    };

    const simulateAnalysis = () =>
    {
        setCurrentState('analyzing');
        const phases = getAnalysisPhases();
        let progress = 0;
        let phaseIndex = 0;

        const interval = setInterval(() =>
        {
            progress += 1;
            setAnalysisProgress(progress);

            if (progress % 16 === 0)
            {
                phaseIndex = (phaseIndex + 1) % phases.length;
                setCurrentPhase(phases[phaseIndex]);
            }

            if (progress >= 100)
            {
                clearInterval(interval);
                setCurrentState('complete');
            }
        }, 100);
    };

    const handleCodeFileUpload = (data: { type: string; content: File | string; preview: string }) =>
    {
        if (data.content instanceof File)
        {
            setSelectedFile(data.content);
            setCurrentState('uploading');
            simulateUpload();
        }
    };

    const handleFileUpload = (file: File) =>
    {
        setSelectedFile(file);
        setCurrentState('uploading');
        simulateUpload();
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 bg-gradient-to-br from-violet-50 via-blue-50 to-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                <AnimatePresence mode="wait">
                    {currentState === 'complete' ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ThesisDashboard />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="container mx-auto px-4 py-16 max-w-3xl relative"
                        >
                            {currentState === 'upload' && (
                                <>
                                    <UploadTypeSelector
                                        uploadType={uploadType}
                                        onTypeChange={setUploadType}
                                    />
                                    {uploadType === 'thesis' ? (
                                        <ThesisUploadCard
                                            onFileSelect={handleFileUpload}
                                            onError={(errorMessage) =>
                                            {
                                                setError(errorMessage);
                                                setCurrentState('error');
                                            }}
                                        />
                                    ) : (
                                        <CodeUploadSection
                                            onSubmit={handleCodeFileUpload}
                                            onError={(errorMessage) =>
                                            {
                                                setError(errorMessage);
                                                setCurrentState('error');
                                            }}
                                        />
                                    )}
                                </>
                            )}

                            {currentState === 'uploading' && (
                                <UploadProgress
                                    uploadProgress={uploadProgress}
                                    uploadType={uploadType}
                                    fileName={selectedFile?.name || ''}
                                />
                            )}

                            {currentState === 'uploadComplete' && (
                                <UploadComplete
                                    fileName={selectedFile?.name || ''}
                                    file={selectedFile!}
                                    onUploadAgain={() => setCurrentState('upload')}
                                    onStartAnalysis={simulateAnalysis}
                                    uploadType={uploadType}
                                />
                            )}

                            {currentState === 'analyzing' && (
                                <AnalysisProgress
                                    analysisProgress={analysisProgress}
                                    currentPhase={currentPhase}
                                    uploadType={uploadType}
                                />
                            )}

                            {currentState === 'error' && (
                                <ErrorDisplay
                                    error={error}
                                    onTryAgain={() => setCurrentState('upload')}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default ThesisAnalysisFlow;