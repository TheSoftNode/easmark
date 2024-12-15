import { ScoreItemProps } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const ScoreItem: React.FC<ScoreItemProps> = ({ 
    label, 
    score, 
    reason, 
    weight, 
    onWeightChange, 
    calculatedScore 
}) => (
    <Card className="mb-4 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
            <CardTitle className="flex justify-center gap-4 md:justify-between items-center md:flex-row flex-col">
                <span className="text-lg font-semibold capitalize">
                    {label.replace(/_/g, ' ')}
                </span>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Weight:</span>
                        <Input
                            type="number"
                            min="0"
                            max="100"
                            value={weight}
                            onChange={(e) => onWeightChange(label, parseFloat(e.target.value))}
                            className="w-20 text-right"
                        />
                        <span className="text-sm text-gray-500 ml-1">%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            Score: {calculatedScore.toFixed(1)}%
                        </span>
                        <div className="w-16 h-2 rounded-full bg-gradient-to-r from-violet-200 to-blue-200">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                                style={{ width: `${calculatedScore}%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-700 mt-2">{reason}</p>
        </CardContent>
    </Card>
);

export default ScoreItem;
