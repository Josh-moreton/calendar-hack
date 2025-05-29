// Simple test to debug Pfitzinger calculator
const { PfitzingerPaceCalculator } = require('./dist/ch/paceCalculators/pfitzingerCalculator.js');

const calculator = new PfitzingerPaceCalculator();
const raceTime = { distance: '5K', timeInSeconds: 20 * 60 }; // 20:00 5K

console.log('\n=== Testing 5K 20:00 with Pfitzinger Calculator ===');
console.log('Input: 5K in 20:00 (1200 seconds)');
console.log('Expected: Race pace = 240 seconds per km (4:00/km)');
console.log();

console.log('\nTesting METRIC (km) Results:');
const metricPaces = calculator.calculatePaces(raceTime, 'km');
console.log('Easy:', Math.floor(metricPaces.easy / 60) + ':' + String(Math.round(metricPaces.easy % 60)).padStart(2, '0'), '/km');
console.log('Marathon:', Math.floor(metricPaces.marathon / 60) + ':' + String(Math.round(metricPaces.marathon % 60)).padStart(2, '0'), '/km');
console.log('Threshold:', Math.floor(metricPaces.threshold / 60) + ':' + String(Math.round(metricPaces.threshold % 60)).padStart(2, '0'), '/km');
console.log('Interval:', Math.floor(metricPaces.interval / 60) + ':' + String(Math.round(metricPaces.interval % 60)).padStart(2, '0'), '/km');

console.log('\nTesting IMPERIAL (mi) Results:');
const imperialPaces = calculator.calculatePaces(raceTime, 'mi');
console.log('Easy:', Math.floor(imperialPaces.easy / 60) + ':' + String(Math.round(imperialPaces.easy % 60)).padStart(2, '0'), '/mi');
console.log('Marathon:', Math.floor(imperialPaces.marathon / 60) + ':' + String(Math.round(imperialPaces.marathon % 60)).padStart(2, '0'), '/mi');
console.log('Threshold:', Math.floor(imperialPaces.threshold / 60) + ':' + String(Math.round(imperialPaces.threshold % 60)).padStart(2, '0'), '/mi');
console.log('Interval:', Math.floor(imperialPaces.interval / 60) + ':' + String(Math.round(imperialPaces.interval % 60)).padStart(2, '0'), '/mi');

// Let's compare with expected results
console.log('\n=== Expected Results for 20:00 5K ===');
console.log('Race pace: 4:00/km (240 seconds/km) or 6:26/mile (386 seconds/mile)');
console.log('Expected Marathon pace: ~4:48/km or ~7:43/mile');
console.log('Expected Easy pace: ~5:18/km or ~8:30/mile');
console.log('Expected Threshold pace: ~4:19/km or ~6:55/mile');
console.log('Expected Interval pace: ~4:00/km or ~6:26/mile');
