// Debug script to test pace substitution in the full rendering pipeline
import { substitutePaces } from './src/ch/paceSubstitution.js';
import { render } from './src/ch/rendering.js';

const testPaceSettings = {
  raceDistance: '5K',
  goalTime: '20:00',
  units: 'mi'
};

const mockDayDetails = {
  title: 'Easy Run @easy@',
  desc: 'Warm-up 1 mile @easy@, then 3 miles at @mp@ pace, cool down 1 mile @easy@',
  tags: ['Run'],
  dist: 5.0,
  sourceUnits: 'mi'
};

console.log('=== Direct pace substitution test ===');
console.log('Original title:', mockDayDetails.title);
console.log('Direct substitution:', substitutePaces(mockDayDetails.title, testPaceSettings));

console.log('\nOriginal description:', mockDayDetails.desc);
console.log('Direct substitution:', substitutePaces(mockDayDetails.desc, testPaceSettings));

console.log('\n=== Full rendering pipeline test ===');
const [renderedTitle, renderedDesc] = render(mockDayDetails, 'mi', 'mi', testPaceSettings);
console.log('Rendered title:', renderedTitle);
console.log('Rendered description:', renderedDesc);

console.log('\n=== Testing pace settings ===');
console.log('Pace settings object:', testPaceSettings);
console.log('Pace settings is truthy:', !!testPaceSettings);
