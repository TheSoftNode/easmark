import { ActionButtonsProps } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowLeft, Download, Mail, MessageCircleMore, Printer } from "lucide-react";

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDownload, onPrint, onShare, onBack }) => (
    <div className="flex flex-wrap gap-4 mb-6 relative z-20">
        <Button 
            variant="outline" 
            onClick={() => onBack()}
            className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
        >
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
        </Button>
        <div className="flex-1" />
        <Button 
            variant="outline" 
            onClick={() => onDownload()}
            className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
        >
            <Download className="w-4 h-4" />
            Download
        </Button>
        <Button 
            variant="outline" 
            onClick={() => onPrint()}
            className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
        >
            <Printer className="w-4 h-4" />
            Print
        </Button>
        <Button 
            variant="outline" 
            onClick={() => onShare('email')}
            className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
        >
            <Mail className="w-4 h-4" />
            Email
        </Button>
        <Button 
            variant="outline" 
            onClick={() => onShare('whatsapp')}
            className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
        >
            <MessageCircleMore className="w-4 h-4" />
            WhatsApp
        </Button>
    </div>
);

export default ActionButtons;