import { LiteratureReviewTip, ThesisScore } from "@/lib/types";

export const thesisScores: ThesisScore[] = [
  { section: "Literature review", score: 15 },
  { section: "Research Methods", score: 10 },
  { section: "Structure", score: 5 },
  { section: "Representation", score: 5 },
  { section: "Findings", score: 5 },
  { section: "Conclusion", score: 10 },
  { section: "Publications", score: 5 },
  { section: "Writing", score: 5 },
  { section: "References", score: 5 }
];

export const literatureReviewTips: LiteratureReviewTip[] = [
  {
    id: 1,
    title: "Structure It Clearly:",
    description: "Organize the section with themes or trends to make it flow like a narrative, not just a list of studies."
  },
  {
    id: 2,
    title: "Analyze, Don't Just Summarize:",
    description: "Go beyond summarizing—critique the studies and explain their relevance to your research."
  },
  {
    id: 3,
    title: "Focus on What Matters:",
    description: "Stick to recent, credible sources that directly support your thesis, and cut anything tangential."
  },
  {
    id: 4,
    title: "Show the Gaps:",
    description: "Highlight what's missing in the existing research and how your work addresses those gaps."
  },
  {
    id: 5,
    title: "Connect the Dots:",
    description: "Link studies together to show patterns, contradictions, or trends in the field."
  },
  {
    id: 6,
    title: "Polish Your Citations:",
    description: "Ensure consistency and accuracy in citation formatting for a professional touch."
  },
  {
    id: 7,
    title: "Simplify for Readability:",
    description: "Use headings and concise language to keep it reader-friendly."
  }
];