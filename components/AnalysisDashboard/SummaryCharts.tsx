"use client"
import { ChartDataItem, COLORS } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import renderActiveShape from "./renderActiveShape";
import { useWindowSize } from "@/hooks/useWindowSize";

// const useWindowSize = () => {
//     const [windowSize, setWindowSize] = useState({
//         width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     });

//     useEffect(() => {
//         if (typeof window === 'undefined') return;

//         const handleResize = () => {
//             setWindowSize({
//                 width: window.innerWidth,
//             });
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();

//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return windowSize;
// };

const SummaryCharts: React.FC<{ data: ChartDataItem[] }> = ({ data }) =>
{
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { width } = useWindowSize();

    // Calculate radius based on screen width
    const calculateRadius = () =>
    {
        if (width < 640)
        { // mobile
            return {
                inner: 60,
                outer: 90
            };
        } else if (width < 768)
        { // tablet
            return {
                inner: 90,
                outer: 120
            };
        } else
        { // desktop
            return {
                inner: 120,
                outer: 160
            };
        }
    };

    const radius = calculateRadius();


    const onPieEnter = (_: any, index: number) =>
    {
        setActiveIndex(index);
    };

    return (
        <div className="grid grid-cols-1 gap-4 pb-5">

            <Card className="bg-white/90 backdrop-blur-sm px-2 sm:px-5 py-4 min-h-[800px] sm:min-h-[600px] lg:min-h-[550px]">
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
                                    innerRadius={radius.inner}
                                    outerRadius={radius.outer}
                                    dataKey="calculatedScore"
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
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    content={({ payload }: any) => (
                                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                                            {payload.map((entry: any, index: number) => (
                                                <div
                                                    key={`legend-${index}`}
                                                    className="flex items-center cursor-pointer"
                                                    onMouseEnter={() => setActiveIndex(index)}
                                                >
                                                    <div
                                                        className="w-3 h-3 rounded-full mr-2"
                                                        style={{
                                                            background: COLORS[index % COLORS.length],
                                                            transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                    />
                                                    <span className="text-gray-600 text-sm">{entry.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
//                             </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SummaryCharts;

// import React, { useState, useCallback } from 'react';
// import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import renderActiveShape from './renderActiveShape';
// import { ChartDataItem, COLORS } from '@/lib/types';

// // Enhanced color palette matching your brand's gradient style

// const CustomTooltip = ({ active, payload }: any) =>
// {
//     if (active && payload && payload.length)
//     {
//         return (
//             <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-violet-100">
//                 <p className="text-gray-600">{`${payload[0].name}`}</p>
//                 <p className="font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
//                     {`Score: ${payload[0].value}`}
//                 </p>
//             </div>
//         );
//     }
//     return null;
// };

// const SummaryCharts: React.FC<{ data: ChartDataItem[] }> = ({ data }) =>
// {
//     const [activeIndex, setActiveIndex] = useState<number>(0);

//     const onPieEnter = useCallback((_: any, index: number) =>
//     {
//         setActiveIndex(index);
//     }, []);

//     return (
//         <div className="w-full mb-10">
//             <Card className="bg-white/90 backdrop-blur-sm border border-violet-100">
//                 <CardHeader>
//                     <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
//                         Score Distribution
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="h-[500px] w-full">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                                 <defs>
//                                     {COLORS.map((color, index) => (
//                                         <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
//                                             <stop offset="0%" stopColor={color} stopOpacity={0.8} />
//                                             <stop offset="100%" stopColor={COLORS[(index + 1) % COLORS.length]} stopOpacity={0.8} />
//                                         </linearGradient>
//                                     ))}
//                                 </defs>
//                                 {/* Background circle for complete appearance */}
//                                 <Pie
//                                     data={[{ value: 100 }]}
//                                     innerRadius={120}
//                                     outerRadius={160}
//                                     fill="#f3f4f6"
//                                     dataKey="value"
//                                     isAnimationActive={false}
//                                 />
//                                 <Pie
//                                     activeIndex={activeIndex}
//                                     activeShape={renderActiveShape}
//                                     data={data}
//                                     innerRadius={120}
//                                     outerRadius={160}
//                                     paddingAngle={3}
//                                     dataKey="calculatedScore"
//                                     onMouseEnter={onPieEnter}
//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell
//                                             key={`cell-${index}`}
//                                             fill={`url(#gradient-${index})`}
//                                             stroke="white"
//                                             strokeWidth={2}
//                                             style={{
//                                                 filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
//                                                 transition: 'filter 0.3s ease'
//                                             }}
//                                         />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip content={<CustomTooltip />} />
//                                 <Legend
//                                     verticalAlign="bottom"
//                                     height={36}
//                                     content={({ payload }: any) => (
//                                         <div className="flex flex-wrap justify-center gap-4 mt-4">
//                                             {payload.map((entry: any, index: number) => (
//                                                 <div
//                                                     key={`legend-${index}`}
//                                                     className="flex items-center cursor-pointer"
//                                                     onMouseEnter={() => setActiveIndex(index)}
//                                                 >
//                                                     <div
//                                                         className="w-3 h-3 rounded-full mr-2"
//                                                         style={{
//                                                             background: COLORS[index % COLORS.length],
//                                                             transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
//                                                             transition: 'transform 0.3s ease'
//                                                         }}
//                                                     />
//                                                     <span className="text-gray-600 text-sm">{entry.value}</span>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default SummaryCharts;