#!/usr/bin/env python3

import json
import os
import re

def get_pace_key(title):
    """Map workout title to pace key based on Pfitzinger methodology"""
    title_lower = title.lower()
    
    # Recovery runs
    if any(word in title_lower for word in ['recovery', 'recovey', 'rocovery']):
        return 'recovery'
    
    # Threshold/Tempo runs
    if any(word in title_lower for word in ['lactate threshold', 'threshold']):
        return 'threshold'
    
    # VO2max and Speed work
    if any(word in title_lower for word in ['vo₂max', 'vo2max', 'speed', 'race pace']):
        return 'interval'
    
    # Tune-up races and goal races (race effort)
    if any(word in title_lower for word in ['tune-up race', 'goal race', 'key race']):
        return 'interval'
    
    # Long runs and endurance runs
    if any(word in title_lower for word in ['endurance', 'progression long run']):
        return 'long'
    
    # General aerobic runs (easy pace)
    if any(word in title_lower for word in ['general aerobic', 'gen aerobic', 'gen-aerobic']):
        return 'easy'
    
    # Default for unmatched running workouts (but not rest days)
    if 'rest' not in title_lower and 'cross-training' not in title_lower:
        return 'easy'  # Default to easy for any unmatched running workout
    
    return None  # No pace for rest days

def add_pace_keys_to_file(file_path):
    """Add pace keys to a single FRR plan file"""
    print(f"Processing {os.path.basename(file_path)}...")
    
    with open(file_path, 'r') as f:
        plan = json.load(f)
    
    workouts_updated = 0
    
    # FRR files use "schedule" array directly
    if 'schedule' in plan:
        for week in plan['schedule']:
            if 'workouts' in week:
                for workout in week['workouts']:
                    if 'title' in workout and 'distance' in workout:
                        title = workout['title']
                        pace_key = get_pace_key(title)
                        
                        if pace_key:
                            workout['pace'] = pace_key
                            workouts_updated += 1
    
    # Write back to file
    with open(file_path, 'w') as f:
        json.dump(plan, f, indent=3, ensure_ascii=False)
    
    print(f"  Added pace keys to {workouts_updated} workouts")
    return workouts_updated

def main():
    # Find all FRR plan files
    plans_dir = 'public/plans/json'
    frr_files = []
    
    for filename in os.listdir(plans_dir):
        if filename.startswith('frr_') and filename.endswith('.json'):
            frr_files.append(os.path.join(plans_dir, filename))
    
    frr_files.sort()
    
    print(f"Found {len(frr_files)} FRR plan files:")
    for f in frr_files:
        print(f"  {os.path.basename(f)}")
    
    print("\n" + "="*50)
    print("ADDING PACE KEYS TO FRR PLANS")
    print("="*50)
    
    total_workouts = 0
    
    for file_path in frr_files:
        workouts_updated = add_pace_keys_to_file(file_path)
        total_workouts += workouts_updated
    
    print(f"\n✅ COMPLETED!")
    print(f"Added pace keys to {total_workouts} total workouts across {len(frr_files)} FRR plans")
    
    # Verify the results
    print("\n" + "="*50)
    print("PACE KEY DISTRIBUTION IN ALL PFITZINGER PLANS")
    print("="*50)
    
    os.system("find public/plans/json -name 'pfitz_*.json' -o -name 'frr_*.json' | xargs grep -h '\"pace\":' | sed 's/.*\"pace\": *\"//; s/\".*//' | sort | uniq -c | sort -nr")

if __name__ == "__main__":
    main()
