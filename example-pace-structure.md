# Example: Pfitzinger workout with universal pace structure

# Current format (text-based pace patterns):
- title: "VO₂max {8} w/ 5 x 800 m @ 5K race pace; jog 50 to 90% interval time between"
  distance: 8.0

# New format (structured paces):
- title: "VO₂max intervals"
  description: "Warm up easy, then 5 × 800m intervals at VO₂max effort with jog recovery"
  distance: 8.0
  paces:
    - zone: "easy"
      distance: 2.5
      description: "warm-up"
    - zone: "interval"
      description: "5 × 800m intervals"
      intervals:
        count: 5
        distance: 800
        units: "m"
        recovery: "jog 50-90% interval time between"
    - zone: "easy" 
      distance: 2.5
      description: "cool-down"

# Another example - Lactate Threshold:
- title: "Lactate threshold {8} w {4} @ 15K to half marathon race pace"
  distance: 8.0

# Becomes:
- title: "Lactate threshold run"
  description: "Warm up easy, then sustained tempo effort, cool down easy"
  distance: 8.0
  paces:
    - zone: "easy"
      distance: 2.0
      description: "warm-up"
    - zone: "threshold"
      distance: 4.0
      description: "lactate threshold effort"
    - zone: "easy"
      distance: 2.0
      description: "cool-down"

# Marathon Pace example:
- title: "Marathon pace run {13} w/ {8} @ marathon race pace"
  distance: 13.0

# Becomes:
- title: "Marathon pace run"
  description: "Easy start, then marathon pace segment, easy finish"
  distance: 13.0
  paces:
    - zone: "easy"
      distance: 2.5
      description: "warm-up"
    - zone: "marathon"
      distance: 8.0
      description: "marathon pace segment"
    - zone: "easy"
      distance: 2.5
      description: "cool-down"
