#!/usr/bin/env node

// Test script for FIT file generation
// Run with: node src/ch/testFitGeneration.js

const { FitEncoder } = require('./fitEncoder');
const { FitSport, FitIntensity, FitDurationType, FitTargetType } = require('../@types/fit');

// Test data representing a simple training plan workout
const testWorkout = {
  fileId: {
    type: 5,
    manufacturer: 255,
    product: 0,
    serialNumber: 12345,
    timeCreated: Math.floor(Date.now() / 1000)
  },
  workout: {
    wktName: 'Test Training Plan Workout',
    sport: FitSport.Running,
    numValidSteps: 1
  },
  workoutSteps: [
    {
      messageIndex: 0,
      wktStepName: 'Easy Run',
      notes: '5 mile easy run from Pfitzinger plan',
      intensity: FitIntensity.Active,
      durationType: FitDurationType.Distance,
      durationDistance: 8046.72, // 5 miles in meters
      targetType: FitTargetType.HeartRate,
      targetHrZone: 2
    }
  ]
};

console.log('Testing FIT file generation...');

try {
  const result = FitEncoder.encode(testWorkout);
  
  if (result.success) {
    console.log('✅ FIT file generated successfully!');
    console.log('📁 Filename:', result.filename);
    console.log('📊 Metadata:', result.metadata);
    console.log('📦 File size:', result.fitFile.length, 'bytes');
    
    // Save the FIT file to test it
    const fs = require('fs');
    const path = require('path');
    
    const outputDir = path.join(__dirname, '../../public/test-fits');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, result.filename);
    fs.writeFileSync(outputPath, result.fitFile);
    
    console.log('💾 FIT file saved to:', outputPath);
    console.log('');
    console.log('You can now test this FIT file on a Garmin device or with Garmin Connect.');
    
  } else {
    console.error('❌ FIT file generation failed:', result.error);
  }
  
} catch (error) {
  console.error('❌ Error during FIT generation:', error.message);
}
