# Universal Pace System Design for Training Plans

## Current Problem
- Pace information is embedded in workout titles/descriptions as text patterns
- Different training providers use different terminology
- Hard to parse and substitute consistently
- Maintenance nightmare with regex patterns

## Proposed Solution: Universal Pace Structure

### 1. Add `paces` field to workout schema

```yaml
workout:
  title: "Lactate threshold run"
  description: "8 miles total with 4 miles at lactate threshold effort"
  distance: 8.0
  paces:
    - zone: "threshold"
      distance: 4.0
      description: "lactate threshold effort"
    - zone: "easy" 
      distance: 4.0
      description: "warm-up and cool-down"
```

### 2. Standard Pace Zone Names

Universal zones that map to all training systems:
- `recovery` - Recovery/very easy pace
- `easy` - Easy/aerobic/general aerobic pace  
- `marathon` - Marathon race pace
- `threshold` - Lactate threshold/tempo pace
- `interval` - VO2max/5K race pace
- `repetition` - Neuromuscular power/mile pace

### 3. Provider-Specific Mapping

```typescript
const PACE_ZONE_MAPPINGS = {
  pfitzinger: {
    recovery: "Recovery",
    easy: "General Aerobic (GA)", 
    marathon: "Marathon Pace (MP)",
    threshold: "Lactate Threshold (LT)",
    interval: "VO₂max",
    repetition: "Neuromuscular Power"
  },
  hansons: {
    recovery: "Easy Pace (EP)",
    easy: "Easy Pace (EP)",
    marathon: "Marathon Pace (MP)", 
    threshold: "Tempo Pace (TP)",
    interval: "Speed Pace (SP)",
    repetition: "Speed Pace (SP)"
  },
  daniels: {
    recovery: "Recovery (R)",
    easy: "Easy (E)",
    marathon: "Marathon (M)",
    threshold: "Threshold (T)", 
    interval: "Interval (I)",
    repetition: "Repetition (R)"
  }
}
```

### 4. Enhanced Workout Structure

```yaml
- title: "VO₂max intervals"
  description: "Warm up, then 5 × 1,000m intervals with recovery between"
  distance: 8.0
  paces:
    - zone: "easy"
      distance: 2.0
      description: "warm-up"
    - zone: "interval" 
      distance: 3.1  # 5 x 1000m = ~3.1 miles
      description: "5 × 1,000m intervals"
      intervals:
        count: 5
        distance: 1000
        units: "m"
        recovery: "jog 50-90% interval time"
    - zone: "easy"
      distance: 2.9
      description: "cool-down and recovery"
```

### 5. Rendering Logic

```typescript
function renderWorkoutWithPaces(workout, paceSettings, planId) {
  const calculator = getPaceCalculatorForPlan(planId);
  const calculatedPaces = calculator.calculatePaces(paceSettings);
  const zoneLabels = calculator.zoneLabels;
  
  let renderedDescription = workout.description;
  
  if (workout.paces) {
    workout.paces.forEach(paceSegment => {
      const zoneName = zoneLabels[paceSegment.zone];
      const paceValue = calculatedPaces[paceSegment.zone];
      
      // Replace pace references with actual values
      renderedDescription += `\n${paceSegment.description}: ${formatPace(paceValue)} (${zoneName})`;
    });
  }
  
  return renderedDescription;
}
```

## Benefits

1. **Clean Separation**: Pace logic separated from descriptive text
2. **Consistency**: All plans use same pace zone structure  
3. **Flexibility**: Easy to add new providers and pace zones
4. **Maintainability**: No more regex pattern matching
5. **Rich Data**: Can include interval counts, recovery info, etc.
6. **Backwards Compatible**: Can gradually migrate existing plans

## Migration Strategy

1. Update schema to allow optional `paces` field
2. Create conversion tools for existing plans
3. Update rendering logic to use `paces` when available
4. Gradually migrate plans to new format
5. Eventually deprecate text-based pace patterns
