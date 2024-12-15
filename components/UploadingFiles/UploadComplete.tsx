import React, { useEffect, useState } from 'react';
import { Check, RefreshCw, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface UploadCompleteProps
{
    fileName: string;
    file: File;
    onUploadAgain: () => void;
    onStartAnalysis: (result: any) => void;
    uploadType: 'thesis' | 'code';
}

export const UploadComplete = ({
    fileName,
    file,
    onUploadAgain,
    onStartAnalysis,
    uploadType
}: UploadCompleteProps) =>
{
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() =>
    {
        window.scrollTo(0, 0);
    }, []);

    const transformResponseData = (data: any, type: 'thesis' | 'code') =>
    {
        const parseKeyValuePairs = (input: string) =>
        {
            return input
                .slice(1, -1) // Remove surrounding brackets
                .split("][")  // Split into key-value pairs
                .reduce((acc: Record<string, string>, item: string) =>
                {
                    const [key, value] = item.split(" ,");
                    acc[key.trim()] = value.trim();
                    return acc;
                }, {});
        };

        if (type === 'code')
        {
            return {
                Reason_for_mark_code: parseKeyValuePairs(data.Reason_for_mark_code),
                marking_code: parseKeyValuePairs(data.marking_code),
                message_code: data.message_code
            };
        } else if (type === 'thesis')
        {
            return {
                Reason_for_mark: parseKeyValuePairs(data.Reason_for_mark),
                marking: parseKeyValuePairs(data.marking),
                message: data.message
            };
        }
        return data;
    };


    const handleSubmitForAnalysis = async () =>
    {
        try
        {
            if (!file)
            {
                console.error('No file selected');
                return;
            }

            setIsSubmitting(true);

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('https://easemark-upload-check.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            // Transform the response data
            const transformedData = transformResponseData(response.data, uploadType);
            console.log(transformedData);

            // Store the analysis data in localStorage
            localStorage.setItem('analysisData', JSON.stringify(transformedData));

            // Pass the transformed data to the parent component
            onStartAnalysis(transformedData);
        } catch (error)
        {
            console.error('Error submitting file for analysis:', error);
            setIsSubmitting(false);
        } finally
        {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 pb-6">
                <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
                        <Check className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium mb-1">Upload Complete</h3>
                        <p className="text-sm text-gray-500">{fileName}</p>
                    </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onUploadAgain}
                        disabled={isSubmitting}
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Upload Again
                    </Button>
                    <Button
                        className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                        onClick={handleSubmitForAnalysis}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit for Analysis'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
