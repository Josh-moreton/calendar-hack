// Debug component to test pace substitution in real-time
import React from "react";
import { PaceSettings } from "./src/@types/app";
import { substitutePaces } from "./src/ch/paceSubstitution";

interface DebugProps {
  paceSettings: PaceSettings | null;
}

const DebugPaceComponent: React.FC<DebugProps> = ({ paceSettings }) => {
  const testText =
    "Warm-up 1 mile @easy@, then 3 miles at @mp@ pace, cool-down @easy@";
  const result = substitutePaces(testText, paceSettings);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "white",
        border: "2px solid red",
        padding: "10px",
        zIndex: 9999,
        maxWidth: "300px",
        fontSize: "12px",
      }}
    >
      <h4>Debug Pace Substitution</h4>
      <p>
        <strong>Pace Settings:</strong> {JSON.stringify(paceSettings)}
      </p>
      <p>
        <strong>Original:</strong> {testText}
      </p>
      <p>
        <strong>Substituted:</strong> {result}
      </p>
      <p>
        <strong>Working:</strong> {result !== testText ? "✅ YES" : "❌ NO"}
      </p>
    </div>
  );
};

export default DebugPaceComponent;
