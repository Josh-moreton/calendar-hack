// Debug pace calculation in webapp
const { PfitzingerPaceCalculator } = require('./src/ch/paceCalculators/pfitzingerCalculator.ts');

console.log('Testing Pfitzinger Calculator...');

const calculator = new PfitzingerPaceCalculator();
const raceTime = {
  distance: '5K',
  timeInSeconds: 20 * 60 // 20:00 for 5K
};

const paces = calculator.calculatePaces(raceTime, 'km');

console.log('Race Time: 20:00 for 5K');
console.log('Calculated Paces:');
console.log('- Easy:', paces.easy);
console.log('- Marathon:', paces.marathon);
console.log('- Threshold:', paces.threshold);
console.log('- Interval:', paces.interval);
console.log('- Repetition:', paces.repetition);

// Let's also check the raw calculations
console.log('\nRaw calculation check:');
const timeInSeconds = 20 * 60; // 20:00
const distanceInKm = 5;
const racePacePerKm = timeInSeconds / distanceInKm; // 240 seconds = 4:00/km
console.log('Race pace per km:', racePacePerKm, 'seconds =', Math.floor(racePacePerKm/60) + ':' + String(racePacePerKm%60).padStart(2,'0'));

const fiveKPace = racePacePerKm; // Same as race pace for 5K
const marathonRacePace = racePacePerKm * 1.2; // 288 seconds = 4:48/km
console.log('Marathon race pace:', marathonRacePace, 'seconds =', Math.floor(marathonRacePace/60) + ':' + String(marathonRacePace%60).padStart(2,'0'));

const rawThresholdPace = fiveKPace * 1.05; // Should be 252 seconds = 4:12/km
const rawIntervalPace = fiveKPace * 0.95; // Should be 228 seconds = 3:48/km

console.log('Raw threshold pace:', rawThresholdPace, 'seconds =', Math.floor(rawThresholdPace/60) + ':' + String(rawThresholdPace%60).padStart(2,'0'));
console.log('Raw interval pace:', rawIntervalPace, 'seconds =', Math.floor(rawIntervalPace/60) + ':' + String(rawIntervalPace%60).padStart(2,'0'));
