import { AnalysisDashboardProps, ChartDataItem } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Alert, AlertDescription } from "../ui/alert";
import ActionButtons from "./ActionButtons";
import SummaryCharts from "./SummaryCharts";
import ScoreItem from "./ScoreItem";

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ 
    data, 
    uploadType, 
    onBack 
}) => {
    const [weights, setWeights] = useState<Record<string, number>>({});
    const [totalScore, setTotalScore] = useState<number>(0);
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);

    const markingData = uploadType === 'code' ? data.marking_code : data.marking;
    const reasonData = uploadType === 'code' ? data.Reason_for_mark_code : data.Reason_for_mark;

    useEffect(() => {
        if (!markingData) return;
        
        // Initialize weights
        const initialWeights = Object.keys(markingData).reduce((acc, key) => ({
            ...acc,
            [key]: 100 / Object.keys(markingData).length
        }), {});
        setWeights(initialWeights);
    }, [markingData]);

    useEffect(() => {
        if (!markingData || !weights) return;

        // Calculate total score and chart data
        let total = 0;
        const newChartData = Object.entries(markingData).map(([key, score]) => {
            const weightedScore = (Number(score) * (weights[key] || 0)) / 100;
            total += weightedScore;
            return {
                name: key.replace(/_/g, ' '),
                score: Number(score),
                weightedScore
            };
        });
        setTotalScore(total);
        setChartData(newChartData);
    }, [weights, markingData]);

    const handleWeightChange = (key: string, value: number) => {
        setWeights(prev => ({ ...prev, [key]: value }));
    };

    // const handleDownload = async () => {
    //     const element = document.getElementById('dashboard-content');
    //     if (!element) return;
        
    //     const canvas = await html2canvas(element);
    //     const pdf = new jsPDF();
    //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    //     pdf.save('analysis-report.pdf');
    // };

    // const handlePrint = () => {
    //     window.print();
    // };

    // const handleShare = (method: 'email' | 'whatsapp') => {
    //     const url = window.location.href;
    //     if (method === 'email') {
    //         window.location.href = `mailto:?subject=Analysis Results&body=${url}`;
    //     } else if (method === 'whatsapp') {
    //         window.open(`https://wa.me/?text=${url}`);
    //     }
    // };
    const handleDownload = useCallback(async () => {
        try {
            setIsDownloading(true);
            const element = document.getElementById('dashboard-content');
            if (!element) {
                console.error('Dashboard content element not found');
                return;
            }
            
            const canvas = await html2canvas(element);
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
            pdf.save('analysis-report.pdf');
        } catch (error) {
            console.error('Error downloading PDF:', error);
        } finally {
            setIsDownloading(false);
        }
    }, []);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    const handleShare = useCallback((method: 'email' | 'whatsapp') => {
        const url = window.location.href;
        const text = `Check out my analysis results: ${url}`;
        
        if (method === 'email') {
            const subject = encodeURIComponent('Analysis Results');
            const body = encodeURIComponent(text);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
        } else if (method === 'whatsapp') {
            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/?text=${encodedText}`, '_blank');
        }
    }, []);

    if (!markingData || !reasonData) {
        return <Alert><AlertDescription>No data available</AlertDescription></Alert>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <ActionButtons 
                onDownload={handleDownload}
                onPrint={handlePrint}
                onShare={handleShare}
                onBack={onBack}
            />
            
            <div id="dashboard-content">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                        {uploadType === 'code' ? 'Code' : 'Thesis'} Analysis Results
                    </h1>
                    <div className="text-right">
                        <p className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            Overall Score: {totalScore.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500">
                            Based on weighted calculations
                        </p>
                    </div>
                </div>

                <SummaryCharts data={chartData} />

                <div className="space-y-6">
                    {Object.entries(markingData).map(([key, score]) => (
                        <ScoreItem
                            key={key}
                            label={key}
                            score={score}
                            reason={reasonData[key]}
                            weight={weights[key] || 0}
                            onWeightChange={handleWeightChange}
                            calculatedScore={(Number(score) * (weights[key] || 0)) / 100}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalysisDashboard;