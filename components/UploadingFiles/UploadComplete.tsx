// import React, { useEffect } from 'react';
// import { Check, RefreshCw } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';

// interface UploadCompleteProps
// {
//     fileName: string;
//     onUploadAgain: () => void;
//     onStartAnalysis: () => void;
//     uploadType: 'thesis' | 'code';
// }

// export const UploadComplete = ({ fileName, onUploadAgain, onStartAnalysis, uploadType }: UploadCompleteProps) =>
// {
//     useEffect(() =>
//     {
//         window.scrollTo(0, 0);
//     }, [])

//     return (
//         <Card className="bg-white/80 backdrop-blur-sm">
//             <CardContent className="pt-6 pb-6">
//                 <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mr-4">
//                         <Check className="w-6 h-6 text-green-500" />
//                     </div>
//                     <div className="flex-1">
//                         <h3 className="font-medium mb-1">Upload Complete</h3>
//                         <p className="text-sm text-gray-500">{fileName}</p>
//                     </div>
//                 </div>
//                 <div className="flex gap-3 flex-wrap">
//                     <Button
//                         variant="outline"
//                         className="flex-1"
//                         onClick={onUploadAgain}
//                     >
//                         <RefreshCw className="w-4 h-4 mr-2" />
//                         Upload Again
//                     </Button>
//                     <Button
//                         className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
//                         onClick={onStartAnalysis}
//                     >
//                         Submit for Analysis
//                     </Button>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// };

import React, { useEffect } from 'react';
import { Check, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface UploadCompleteProps {
    fileName: string;
    file: File;
    onUploadAgain: () => void;
    onStartAnalysis: (result: any) => void; // Updated to pass analysis result
    uploadType: 'thesis' | 'code';
}

export const UploadComplete = ({ 
    fileName, 
    file,
    onUploadAgain, 
    onStartAnalysis, 
    uploadType 
}: UploadCompleteProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitForAnalysis = async () => {
        try {
            // Replace with your actual file from context or state
            // const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            // const file = fileInput?.files?.[0];
            
            if (!file) {
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('https://easemark-upload-check.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Pass the analysis result to the parent component
            onStartAnalysis(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting file for analysis:', error);
            // Handle error (maybe show an error message)
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
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Upload Again
                    </Button>
                    <Button
                        className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                        onClick={handleSubmitForAnalysis}
                    >
                        Submit for Analysis
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};

