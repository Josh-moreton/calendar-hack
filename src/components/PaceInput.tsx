import React, { useState } from "react";
import { Units, PaceSettings } from "../@types/app";
import {
  RaceDistance,
  parseTimeToSeconds,
  formatPace,
} from "../ch/paceCalculator";
import { getPaceCalculatorForPlan } from "../ch/paceCalculators/calculatorRegistry";

interface PaceInputProps {
  units: Units;
  onPaceSettingsChange: (settings: PaceSettings | null) => void;
  planId?: string;
}

const raceDistanceOptions: { label: string; value: RaceDistance }[] = [
  { label: "5K", value: "5K" },
  { label: "8K", value: "8K" },
  { label: "10K", value: "10K" },
  { label: "15K", value: "15K" },
  { label: "10 Mile", value: "10M" },
  { label: "Half Marathon", value: "half" },
  { label: "Marathon", value: "marathon" },
];

const PaceInput: React.FC<PaceInputProps> = ({
  units,
  onPaceSettingsChange,
  planId,
}) => {
  const [raceDistance, setRaceDistance] = useState<RaceDistance>("5K");
  const [goalTime, setGoalTime] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const getProviderName = () => {
    if (!planId) return "Pfitzinger/Douglas (default)";

    if (planId.includes("pfitz") || planId.includes("frr")) {
      return "Pfitzinger/Douglas";
    } else if (planId.includes("hanson")) {
      return "Hansons Marathon Method";
    } else if (planId.includes("higdon")) {
      return "Hal Higdon";
    } else if (planId.includes("daniel")) {
      return "Jack Daniels";
    } else {
      return "Pfitzinger/Douglas (default)";
    }
  };

  const handleToggle = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);

    if (newEnabled && goalTime) {
      onPaceSettingsChange({ raceDistance, goalTime, units });
    } else {
      onPaceSettingsChange(null);
    }
  };

  const handleDistanceChange = (distance: RaceDistance) => {
    setRaceDistance(distance);
    if (isEnabled && goalTime) {
      onPaceSettingsChange({ raceDistance: distance, goalTime, units });
    }
  };

  const handleTimeChange = (time: string) => {
    setGoalTime(time);
    if (isEnabled && time) {
      onPaceSettingsChange({ raceDistance, goalTime: time, units });
    }
  };

  const getPacePreview = () => {
    if (!isEnabled || !goalTime) return null;

    try {
      const timeInSeconds = parseTimeToSeconds(goalTime);
      
      // Use the appropriate calculator for this plan
      const calculator = getPaceCalculatorForPlan(planId || "default");
      const paces = calculator.calculatePaces(
        { distance: raceDistance, timeInSeconds },
        units
      );
      
      return {
        easy: formatPace(paces.easy),
        marathon: formatPace(paces.marathon),
        threshold: formatPace(paces.threshold),
        interval: formatPace(paces.interval),
      };
    } catch {
      return null;
    }
  };

  const pacePreview = getPacePreview();

  return (
    <div className="pace-input-container">
      <div className="pace-input-header">
        <label className="pace-input-toggle">
          <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
          <span className="toggle-text">Calculate Training Paces</span>
        </label>
      </div>

      {planId && (
        <div className="provider-info mt-2 mb-4 px-2 py-1 bg-blue-50 border border-blue-100 rounded-md">
          <small className="provider-note text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Using <strong>{getProviderName()}</strong> pace methodology
          </small>
        </div>
      )}

      {isEnabled && (
        <div className="pace-input-form">
          <div className="form-group">
            <label htmlFor="race-distance">Race Distance:</label>
            <select
              id="race-distance"
              value={raceDistance}
              onChange={e =>
                handleDistanceChange(e.target.value as RaceDistance)
              }
              className="race-distance-select"
            >
              {raceDistanceOptions.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="goal-time">Goal Time:</label>
            <input
              id="goal-time"
              type="text"
              value={goalTime}
              onChange={e => handleTimeChange(e.target.value)}
              placeholder="MM:SS or HH:MM:SS"
              className="goal-time-input"
            />
            <small className="help-text">
              Enter time as MM:SS (e.g., 22:30) or HH:MM:SS (e.g., 3:30:00)
            </small>
          </div>

          {pacePreview && (
            <div className="pace-preview">
              <h4>Training Pace Zones:</h4>
              <div className="pace-zones">
                <div className="pace-zone">
                  <span className="zone-label">Easy:</span>
                  <span className="zone-pace">{pacePreview.easy}</span>
                </div>
                <div className="pace-zone">
                  <span className="zone-label">Marathon:</span>
                  <span className="zone-pace">{pacePreview.marathon}</span>
                </div>
                <div className="pace-zone">
                  <span className="zone-label">Threshold:</span>
                  <span className="zone-pace">{pacePreview.threshold}</span>
                </div>
                <div className="pace-zone">
                  <span className="zone-label">Interval:</span>
                  <span className="zone-pace">{pacePreview.interval}</span>
                </div>
              </div>
              <small className="pace-note">
                Paces per {units === "mi" ? "mile" : "kilometer"}
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaceInput;
