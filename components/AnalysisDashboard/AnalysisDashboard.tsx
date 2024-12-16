import { AnalysisDashboardProps, ChartDataItem } from "@/lib/types";
import { useEffect, useState, useCallback } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Alert, AlertDescription } from "../ui/alert";
import ActionButtons from "./ActionButtons";
import SummaryCharts from "./SummaryCharts";
import ScoreItem from "./ScoreItem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ScoreSummaryCard from "./ScoreSummaryCard";


export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
    data,
    uploadType,
    onBack
}) =>
{
    // const [weights, setWeights] = useState<Record<string, number>>({});
    const [totalScore, setTotalScore] = useState<number>(0);
    const [actualScore, setActualScore] = useState<number>(0);
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);

    const markingData = uploadType === 'code' ? data.marking_code : data.marking;
    const reasonData = uploadType === 'code' ? data.Reason_for_mark_code : data.Reason_for_mark;

    useEffect(() =>
    {
        if (!markingData) return;

        // Calculate total raw score
        const totalRawScore = Object.values(markingData).reduce((sum, score) => sum + Number(score), 0);

        // Calculate expected score (number of keys * 100)
        const expectedScore = Object.keys(markingData).length * 100;

        const realScore = (totalRawScore / expectedScore) * 100;
        setActualScore(realScore)

        // Calculate scores and percentages
        const newChartData = Object.entries(markingData).map(([key, score]) =>
        {
            const numericScore = Number(score);
            const calculatedScore = numericScore * (100 / expectedScore);
            return {
                name: key.replace(/_/g, ' '),
                score: numericScore,
                calculatedScore
            };
        });

        setChartData(newChartData);
        setTotalScore(totalRawScore);
    }, [markingData]);



    const handleDownload = useCallback(async () =>
    {
        try
        {
            setIsDownloading(true);
            const element = document.getElementById('dashboard-content');
            if (!element)
            {
                console.error('Dashboard content element not found');
                return;
            }

            const canvas = await html2canvas(element);
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
            pdf.save('analysis-report.pdf');
        } catch (error)
        {
            console.error('Error downloading PDF:', error);
        } finally
        {
            setIsDownloading(false);
        }
    }, []);

    const handlePrint = useCallback(() =>
    {
        window.print();
    }, []);

    const handleShare = useCallback((method: 'email' | 'whatsapp') =>
    {
        const url = window.location.href;
        console.log(url);
        const text = `Check out my analysis results: ${url}`;

        if (method === 'email')
        {
            const subject = encodeURIComponent('Analysis Results');
            const body = encodeURIComponent(text);
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
        } else if (method === 'whatsapp')
        {
            const encodedText = encodeURIComponent(text);
            window.open(`https://wa.me/?text=${encodedText}`, '_blank');
        }
    }, []);

    if (!markingData || !reasonData)
    {
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

            {/* Score Summary Card */}
            {/* <Card className="mb-8 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800">Score Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 font-semibold text-gray-600 border-b pb-2">
                            <div>Criterion</div>
                            <div className="text-center">Raw Score</div>
                            <div className="text-center">Calculated Score (100%)</div>
                        </div>
                        {chartData.map((item) => (
                            <div key={item.name} className="grid grid-cols-3 items-center">
                                <div className="font-medium text-gray-700">{item.name}</div>
                                <div className="text-center text-gray-600">{item.score}</div>
                                <div className="text-center text-gray-600">{item.calculatedScore.toFixed(1)}%</div>
                            </div>
                        ))}
                        <div className="grid grid-cols-3 items-center pt-2 border-t font-semibold text-gray-800">
                            <div>Total</div>
                            <div className="text-center">{totalScore}</div>
                            <div className="text-center">{actualScore.toFixed(1)}%</div>
                        </div>
                    </div>
                </CardContent>
            </Card> */}

            <div id="dashboard-content">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                        {uploadType === 'code' ? 'Code' : 'Thesis'} Analysis Results
                    </h1>
                    <div className="text-right">
                        <p className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            Overall Score: {actualScore.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-500">
                            Based on actual scores
                        </p>
                    </div>
                </div>

                <SummaryCharts data={chartData} />

                {/* <div className="space-y-6">
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
                </div> */}
                <div className="flex gap-8 items-start lg:flex-row flex-col">
                    <div className="space-y-6">
                        {chartData.map((item) => (
                            <ScoreItem
                                key={item.name}
                                label={item.name}
                                score={item.score}
                                reason={reasonData[item.name]}
                                calculatedScore={item.calculatedScore}
                            />
                        ))}
                    </div>

                    <ScoreSummaryCard chartData={chartData} actualScore={actualScore} totalScore={totalScore} />
                </div>

            </div>
        </div>
    );
};

export default AnalysisDashboard;