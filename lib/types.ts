export interface ThesisScore
{
  section: string;
  score: number;
}

export interface LiteratureReviewTip
{
  id: number;
  title: string;
  description: string;
}

export interface MarkingData {
  [key: string]: number;
}

export interface ReasonData {
  [key: string]: string;
}

export interface ScoreItemProps {
  label: string;
  score: number;
  reason: string;
  weight: number;
  onWeightChange: (key: string, value: number) => void;
  calculatedScore: number;
}

export interface ChartDataItem {
  name: string;
  score: number;
  weightedScore: number;
}

export interface ActionButtonsProps {
  onDownload: () => void;
  onPrint: () => void;
  onShare: (method: 'email' | 'whatsapp') => void;
  onBack: () => void;
}

export interface AnalysisDashboardProps {
  data: {
      marking_code?: MarkingData;
      marking?: MarkingData;
      Reason_for_mark_code?: ReasonData;
      Reason_for_mark?: ReasonData;
  };
  uploadType: 'code' | 'thesis';
  onBack: () => void;
}

export const COLORS = [
  '#7c3aed', '#2563eb', '#a78bfa', '#60a5fa', '#818cf8',
  '#4f46e5', '#6366f1', '#8b5cf6', '#3b82f6', '#6d28d9'
];

