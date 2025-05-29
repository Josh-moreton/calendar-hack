import { FitEncoder } from './fitEncoder';
import { FitSport, FitIntensity, FitDurationType, FitTargetType } from '../@types/fit';

console.log('=== FIT File Generation Test with Real Training Data ===\n');

// Test with a real workout from Pfitzinger plan
const pfitzingerWorkout = {
  title: "Lactate threshold {9} w {4} @ 15K to half marathon pace",
  distance: 9.0,
  pace: "threshold"
};

console.log('Original Pfitzinger workout:', pfitzingerWorkout);

// Convert to FIT format
const fitData = {
  fileId: {
    type: 5, // Workout file
    manufacturer: 255, // Development/Other
    product: 0,
    serialNumber: 12345,
    timeCreated: Math.floor(Date.now() / 1000)
  },
  workout: {
    wktName: pfitzingerWorkout.title,
    sport: FitSport.Running,
    numValidSteps: 3 // Warmup, main, cooldown
  },
  workoutSteps: [
    {
      messageIndex: 0,
      wktStepName: 'Warmup',
      notes: '1 mile easy warmup',
      intensity: FitIntensity.Warmup,
      durationType: FitDurationType.Distance,
      durationDistance: 1609.34, // 1 mile in meters
      targetType: FitTargetType.HeartRate,
      targetHrZone: 1
    },
    {
      messageIndex: 1,
      wktStepName: 'Lactate Threshold',
      notes: '4 miles at 15K to half marathon pace',
      intensity: FitIntensity.Active,
      durationType: FitDurationType.Distance,
      durationDistance: 6437.38, // 4 miles in meters
      targetType: FitTargetType.HeartRate,
      targetHrZone: 4 // Threshold zone
    },
    {
      messageIndex: 2,
      wktStepName: 'Cooldown',
      notes: '4 miles easy cooldown',
      intensity: FitIntensity.Cooldown,
      durationType: FitDurationType.Distance,
      durationDistance: 6437.38, // 4 miles in meters
      targetType: FitTargetType.HeartRate,
      targetHrZone: 1
    }
  ]
};

console.log('\nConverting to FIT format...');

const result = FitEncoder.encode(fitData);

if (result.success) {
  console.log('✅ SUCCESS! FIT file generated');
  console.log('📁 Filename:', result.filename);
  console.log('📦 File size:', result.fitFile!.length, 'bytes');
  console.log('📊 Metadata:');
  console.log('   - Workout name:', result.metadata?.workoutName);
  console.log('   - Sport:', result.metadata?.sport);
  console.log('   - Steps:', result.metadata?.stepCount);
  console.log('   - Total distance:', result.metadata?.distance, 'meters');
  console.log('   - Duration:', result.metadata?.duration, 'seconds');
  
  // Show the FIT file structure
  const fitBytes = result.fitFile!;
  console.log('\n🔍 FIT File Analysis:');
  console.log('   - Header (first 14 bytes):', Array.from(fitBytes.slice(0, 14)).map(b => '0x' + b.toString(16).padStart(2, '0')).join(' '));
  console.log('   - Signature:', String.fromCharCode(...fitBytes.slice(8, 12)));
  
  console.log('\n✨ This FIT file can now be loaded onto a Garmin device for structured workout training!');
  
} else {
  console.error('❌ FAILED to generate FIT file:', result.error);
}

// Test another workout type
console.log('\n=== Testing Easy Run Workout ===');

const easyRunFitData = {
  fileId: {
    type: 5,
    manufacturer: 255,
    product: 0,
    serialNumber: 12346,
    timeCreated: Math.floor(Date.now() / 1000)
  },
  workout: {
    wktName: 'Easy Run 5 Miles',
    sport: FitSport.Running,
    numValidSteps: 1
  },
  workoutSteps: [
    {
      messageIndex: 0,
      wktStepName: 'Easy Run',
      notes: '5 mile recovery run',
      intensity: FitIntensity.Active,
      durationType: FitDurationType.Distance,
      durationDistance: 8046.72, // 5 miles in meters
      targetType: FitTargetType.HeartRate,
      targetHrZone: 2 // Easy zone
    }
  ]
};

const easyResult = FitEncoder.encode(easyRunFitData);

if (easyResult.success) {
  console.log('✅ Easy run FIT file generated successfully');
  console.log('📁 Filename:', easyResult.filename);
  console.log('📦 Size:', easyResult.fitFile!.length, 'bytes');
} else {
  console.error('❌ Easy run generation failed:', easyResult.error);
}
