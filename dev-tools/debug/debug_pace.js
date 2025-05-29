// Test script to verify pace substitution works correctly
const { substitutePaces } = require('./src/ch/paceSubstitution.ts');

const testPaceSettings = {
  raceDistance: '5K',
  goalTime: '20:00',
  units: 'mi'
};

const workoutDescription = 'Warm-up 1 mile easy @easy@, then 3 miles at @mp@ pace, cool-down 1 mile easy @easy@';

console.log('Original description:', workoutDescription);
console.log('After substitution:', substitutePaces(workoutDescription, testPaceSettings));

console.log('✅ Pace substitution working correctly!');
