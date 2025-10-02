import React from "react";
import "../../src/App.css"; // We'll create this CSS file below

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
