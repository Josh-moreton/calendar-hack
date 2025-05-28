// Test script to verify Pfitzinger pace calculation fix
import { getPaceCalculatorForPlan } from './src/ch/paceCalculators/calculatorRegistry.ts';

console.log('Testing Pfitzinger pace calculation fix...');

// Test data: 20:00 5K time
const raceTime = {
  distance: 5000, // 5K in meters
  timeInSeconds: 20 * 60 // 20 minutes in seconds (1200 seconds)
};

const units = 'metric'; // or 'imperial'

console.log('Input race time:', raceTime);
console.log('Units:', units);

try {
  // Test Pfitzinger calculator
  console.log('\n=== Testing Pfitzinger Calculator ===');
  const pfitzingerCalculator = getPaceCalculatorForPlan('pfitzinger_base_building');
  const pfitzingerPaces = pfitzingerCalculator.calculatePaces(raceTime, units);
  
  console.log('Pfitzinger paces:');
  Object.entries(pfitzingerPaces).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });

  // Test default/Daniels calculator for comparison
  console.log('\n=== Testing Default/Daniels Calculator ===');
  const defaultCalculator = getPaceCalculatorForPlan('default');
  const defaultPaces = defaultCalculator.calculatePaces(raceTime, units);
  
  console.log('Default paces:');
  Object.entries(defaultPaces).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });

  // Compare key paces
  console.log('\n=== Comparison ===');
  const keyPaces = ['easy', 'tempo', 'threshold', 'interval', 'repetition'];
  keyPaces.forEach(pace => {
    if (pfitzingerPaces[pace] && defaultPaces[pace]) {
      console.log(`${pace}:`);
      console.log(`  Pfitzinger: ${pfitzingerPaces[pace]}`);
      console.log(`  Default: ${defaultPaces[pace]}`);
      console.log(`  Different: ${pfitzingerPaces[pace] !== defaultPaces[pace]}`);
    }
  });

} catch (error) {
  console.error('Error testing pace calculations:', error);
}
