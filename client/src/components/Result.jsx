import React from "react";
import { useLocation } from "react-router-dom";
import "../css/Result.module.css"

const Result = () => {
  const location = useLocation();
  const tripPlan = location.state?.tripPlan || "No trip plan available";

  const formatText = (text) => {
    return text
        .replace(/##\s*(.*?)\s*\n/g, "<h2>$1</h2><br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  };

  return (
    <div className="container">
        <div className="flex-container">
    <div style={{ padding:"20px" }}>
      <div
        dangerouslySetInnerHTML={{ __html: formatText(tripPlan) }}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
    </div>
    </div>
  );
};

export default Result;
