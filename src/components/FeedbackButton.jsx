import React from "react";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";

const FEEDBACK_FORM_URL = "https://forms.gle/6WERuXNNbp8GxKeq8";

const FeedbackButton = () => {
  return (
    <Button variant="outline" size="icon" asChild>
      <a href={FEEDBACK_FORM_URL} rel="noopener noreferrer" target="_blank" className="text-xs">
        <PenLine />
      </a>
    </Button>
  );
};

export default FeedbackButton;
