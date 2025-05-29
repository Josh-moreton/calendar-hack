/**
 * Garmin Connect Training API V2 Type Definitions
 * Based on official Garmin Training API V2 Documentation (Confidential)
 */

// OAuth and Authentication Types
export interface GarminOAuthConfig {
  consumerKey: string;
  consumerSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface GarminUserTokens {
  accessToken: string;
  accessTokenSecret: string;
  userId: string;
}

export interface GarminUserPermissions {
  permissions: string[]; // e.g., ["WORKOUT_IMPORT"]
}

// Workout Types (Training API V2)
export interface GarminWorkout {
  workoutId?: number;
  ownerId?: number;
  workoutName: string;
  description?: string;
  updatedDate?: string; // YYYY-mm-ddTHH:MM:SS.S format
  createdDate?: string; // YYYY-mm-ddTHH:MM:SS.S format
  sport: GarminSportType;
  estimatedDurationInSecs?: number; // calculated server-side
  estimatedDistanceInMeters?: number; // calculated server-side
  poolLength?: number | null;
  poolLengthUnit?: GarminPoolLengthUnit | null;
  workoutProvider: string;
  workoutSourceId: string;
  isSessionTransitionEnabled: boolean; // true for multisport workouts
  segments: GarminWorkoutSegment[];
}

export interface GarminWorkoutSegment {
  segmentOrder: number;
  sport: GarminSportType;
  poolLength?: number | null;
  poolLengthUnit?: GarminPoolLengthUnit | null;
  estimatedDurationInSecs?: number | null; // null for single segment workouts
  estimatedDistanceInMeters?: number | null; // null for single segment workouts
  steps: GarminWorkoutStep[];
}

export interface GarminWorkoutStep {
  type: 'WorkoutStep' | 'WorkoutRepeatStep';
  stepId?: number; // generated server-side
  stepOrder: number;
  // For WorkoutRepeatStep only
  repeatType?: GarminRepeatType;
  repeatValue?: number;
  skipLastRestStep?: boolean;
  steps?: GarminWorkoutStep[]; // sub-steps for repeat blocks
  // For WorkoutStep only
  intensity?: GarminIntensity;
  description?: string; // max 512 characters
  durationType?: GarminDurationType;
  durationValue?: number;
  durationValueType?: GarminDurationValueType;
  targetType?: GarminTargetType | null;
  targetValue?: number | null;
  targetValueLow?: number | null;
  targetValueHigh?: number | null;
  targetValueType?: GarminTargetValueType | null;
  secondaryTargetType?: GarminSecondaryTargetType | null;
  secondaryTargetValue?: number | null;
  secondaryTargetValueLow?: number | null;
  secondaryTargetValueHigh?: number | null;
  secondaryTargetValueType?: GarminTargetValueType | null;
  // Swimming specific
  strokeType?: GarminStrokeType | null;
  drillType?: GarminDrillType | null;
  equipmentType?: GarminEquipmentType | null;
  // Strength/Cardio specific
  exerciseCategory?: string | null;
  exerciseName?: string | null;
  weightValue?: number | null; // in kilograms
  weightDisplayUnit?: GarminWeightUnit | null;
}

// Workout Schedule Types
export interface GarminWorkoutSchedule {
  workoutScheduleId?: number;
  workoutId: number;
  date: string; // YYYY-MM-DD format
}

// Enums based on API V2 specification
export enum GarminSportType {
  // Single sport workouts
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  LAP_SWIMMING = 'LAP_SWIMMING',
  STRENGTH_TRAINING = 'STRENGTH_TRAINING',
  CARDIO_TRAINING = 'CARDIO_TRAINING',
  GENERIC = 'GENERIC', // supported by some devices only
  YOGA = 'YOGA',
  PILATES = 'PILATES',
  // Multi sport
  MULTI_SPORT = 'MULTI_SPORT'
}

export enum GarminPoolLengthUnit {
  YARD = 'YARD',
  METER = 'METER'
}

export enum GarminRepeatType {
  REPEAT_UNTIL_STEPS_CMPLT = 'REPEAT_UNTIL_STEPS_CMPLT',
  REPEAT_UNTIL_TIME = 'REPEAT_UNTIL_TIME',
  REPEAT_UNTIL_DISTANCE = 'REPEAT_UNTIL_DISTANCE',
  REPEAT_UNTIL_CALORIES = 'REPEAT_UNTIL_CALORIES',
  REPEAT_UNTIL_HR_LESS_THAN = 'REPEAT_UNTIL_HR_LESS_THAN',
  REPEAT_UNTIL_HR_GREATER_THAN = 'REPEAT_UNTIL_HR_GREATER_THAN',
  REPEAT_UNTIL_POWER_LESS_THAN = 'REPEAT_UNTIL_POWER_LESS_THAN',
  REPEAT_UNTIL_POWER_GREATER_THAN = 'REPEAT_UNTIL_POWER_GREATER_THAN',
  REPEAT_UNTIL_POWER_LAST_LAP_LESS_THAN = 'REPEAT_UNTIL_POWER_LAST_LAP_LESS_THAN',
  REPEAT_UNTIL_MAX_POWER_LAST_LAP_LESS_THAN = 'REPEAT_UNTIL_MAX_POWER_LAST_LAP_LESS_THAN'
}

export enum GarminIntensity {
  REST = 'REST',
  WARMUP = 'WARMUP',
  COOLDOWN = 'COOLDOWN',
  RECOVERY = 'RECOVERY',
  INTERVAL = 'INTERVAL',
  ACTIVE = 'ACTIVE',
  MAIN = 'MAIN' // SWIM only
}

export enum GarminDurationType {
  TIME = 'TIME',
  DISTANCE = 'DISTANCE',
  HR_LESS_THAN = 'HR_LESS_THAN',
  HR_GREATER_THAN = 'HR_GREATER_THAN',
  CALORIES = 'CALORIES',
  OPEN = 'OPEN',
  POWER_LESS_THAN = 'POWER_LESS_THAN',
  POWER_GREATER_THAN = 'POWER_GREATER_THAN',
  TIME_AT_VALID_CDA = 'TIME_AT_VALID_CDA',
  FIXED_REST = 'FIXED_REST', // for rest steps
  REPS = 'REPS', // HIIT, CARDIO, STRENGTH_TRAINING only
  // LAP_SWIMMING only
  REPETITION_SWIM_CSS_OFFSET = 'REPETITION_SWIM_CSS_OFFSET', // CSS-Based Send-Off Time, valid values -60 to 60
  FIXED_REPETITION = 'FIXED_REPETITION' // Send-off time
}

export enum GarminDurationValueType {
  PERCENT = 'PERCENT',
  METER = 'METER'
}

export enum GarminTargetType {
  SPEED = 'SPEED',
  HEART_RATE = 'HEART_RATE',
  CADENCE = 'CADENCE',
  POWER = 'POWER',
  GRADE = 'GRADE',
  RESISTANCE = 'RESISTANCE',
  POWER_3S = 'POWER_3S',
  POWER_10S = 'POWER_10S',
  POWER_30S = 'POWER_30S',
  POWER_LAP = 'POWER_LAP',
  SPEED_LAP = 'SPEED_LAP',
  HEART_RATE_LAP = 'HEART_RATE_LAP',
  OPEN = 'OPEN',
  PACE = 'PACE' // as speed in m/s
}

export enum GarminSecondaryTargetType {
  SPEED = 'SPEED',
  HEART_RATE = 'HEART_RATE',
  CADENCE = 'CADENCE',
  POWER = 'POWER',
  GRADE = 'GRADE',
  RESISTANCE = 'RESISTANCE',
  POWER_3S = 'POWER_3S',
  POWER_10S = 'POWER_10S',
  POWER_30S = 'POWER_30S',
  POWER_LAP = 'POWER_LAP',
  SPEED_LAP = 'SPEED_LAP',
  HEART_RATE_LAP = 'HEART_RATE_LAP',
  OPEN = 'OPEN',
  PACE = 'PACE', // as speed in m/s
  // LAP_SWIMMING workout only
  SWIM_INSTRUCTION = 'SWIM_INSTRUCTION', // Text-based Intensity target
  SWIM_CSS_OFFSET = 'SWIM_CSS_OFFSET',
  PACE_ZONE = 'PACE_ZONE' // in m/s
}

export enum GarminTargetValueType {
  PERCENT = 'PERCENT'
}

export enum GarminStrokeType {
  BACKSTROKE = 'BACKSTROKE',
  BREASTSTROKE = 'BREASTSTROKE',
  BUTTERFLY = 'BUTTERFLY',
  FREESTYLE = 'FREESTYLE',
  MIXED = 'MIXED',
  IM = 'IM',
  RIMO = 'RIMO', // Reverse IM order
  CHOICE = 'CHOICE'
}

export enum GarminDrillType {
  KICK = 'KICK',
  PULL = 'PULL',
  BUTTERFLY = 'BUTTERFLY'
}

export enum GarminEquipmentType {
  NONE = 'NONE',
  SWIM_FINS = 'SWIM_FINS',
  SWIM_KICKBOARD = 'SWIM_KICKBOARD',
  SWIM_PADDLES = 'SWIM_PADDLES',
  SWIM_PULL_BUOY = 'SWIM_PULL_BUOY',
  SWIM_SNORKEL = 'SWIM_SNORKEL'
}

export enum GarminWeightUnit {
  KILOGRAM = 'KILOGRAM',
  POUND = 'POUND'
}

// API Response Types
export interface GarminAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorCode?: number;
}

export interface GarminWorkoutResponse extends GarminAPIResponse<GarminWorkout> {}
export interface GarminWorkoutScheduleResponse extends GarminAPIResponse<GarminWorkoutSchedule> {}
export interface GarminWorkoutListResponse extends GarminAPIResponse<GarminWorkout[]> {}
export interface GarminScheduleListResponse extends GarminAPIResponse<GarminWorkoutSchedule[]> {}

// Rate Limiting
export interface GarminRateLimitInfo {
  requestsPerMinute: number;
  requestsPerDay: number;
  currentMinuteUsage: number;
  currentDayUsage: number;
  resetTime: Date;
}

// Training Plan Integration Types
export interface TrainingPlanScheduleRequest {
  planName: string;
  startDate: string;
  workouts: {
    date: string;
    dayDetails: import('./app').DayDetails;
  }[];
  userPreferences: {
    heartRateZones?: any;
    speedZones?: any;
    units: 'metric' | 'imperial';
  };
}

export interface TrainingPlanScheduleResponse {
  success: boolean;
  scheduledWorkouts?: GarminWorkoutSchedule[];
  failedWorkouts?: {
    date: string;
    error: string;
  }[];
  summary: {
    totalWorkouts: number;
    successfullyScheduled: number;
    failed: number;
  };
}
