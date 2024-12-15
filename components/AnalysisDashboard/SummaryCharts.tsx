"use client"
import { ChartDataItem, COLORS } from "@/lib/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import renderActiveShape from "./renderActiveShape";

const SummaryCharts: React.FC<{ data: ChartDataItem[] }> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Score Distribution (Bar Chart)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                {data.map((entry, index) => (
                                    <Bar 
                                        key={`bar-${index}`}
                                        dataKey="score"
                                        fill={COLORS[index % COLORS.length]}
                                        name={entry.name}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Score Distribution (Pie Chart)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="weightedScore"
                                    onMouseEnter={onPieEnter}
                                >
                                    {data.map((_, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SummaryCharts;