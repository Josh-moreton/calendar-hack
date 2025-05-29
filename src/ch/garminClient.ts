/**
 * Garmin Connect Training API V2 Client
 * Handles OAuth authentication and API operations for workout creation and scheduling
 * Based on official Garmin Training API V2 Documentation
 */

import {
  GarminOAuthConfig,
  GarminUserTokens,
  GarminWorkout,
  GarminWorkoutSchedule,
  GarminWorkoutResponse,
  GarminWorkoutScheduleResponse,
  GarminScheduleListResponse,
  GarminUserPermissions,
  GarminRateLimitInfo,
  TrainingPlanScheduleRequest,
  TrainingPlanScheduleResponse
} from '../@types/garmin';
import { GarminOAuthClient } from './garminOAuth';

export class GarminConnectClient {
  private baseUrl = 'https://apis.garmin.com';
  private rateLimitInfo: GarminRateLimitInfo;
  private oauthClient: GarminOAuthClient;

  constructor(config: GarminOAuthConfig, isProduction = false) {
    this.oauthClient = new GarminOAuthClient(config);
    
    // Set rate limits based on API documentation
    this.rateLimitInfo = {
      requestsPerMinute: isProduction ? 3000 : 100, // Production: 3000/min, Evaluation: 100/min
      requestsPerDay: isProduction ? 1000 : 200,    // Production: 1000/day per user, Evaluation: 200/day per user
      currentMinuteUsage: 0,
      currentDayUsage: 0,
      resetTime: new Date()
    };
  }

  /**
   * Step 1: Get OAuth authorization URL for user to authorize the app
   */
  async getAuthorizationUrl(): Promise<{ authUrl: string; requestToken: string; requestTokenSecret: string }> {
    const { token, tokenSecret, authUrl } = await this.oauthClient.getRequestToken();
    return {
      authUrl,
      requestToken: token,
      requestTokenSecret: tokenSecret
    };
  }

  /**
   * Step 2: Exchange OAuth verifier for access tokens
   */
  async exchangeCodeForTokens(requestToken: string, requestTokenSecret: string, oauthVerifier: string): Promise<GarminUserTokens> {
    return this.oauthClient.getAccessToken(requestToken, requestTokenSecret, oauthVerifier);
  }

  /**
   * Check user permissions for Training API access
   * Endpoint: GET https://apis.garmin.com/userPermissions/
   */
  async getUserPermissions(userTokens: GarminUserTokens): Promise<GarminUserPermissions> {
    const response = await this.makeAuthenticatedRequest(
      'GET',
      '/userPermissions/',
      userTokens
    );

    return response as GarminUserPermissions;
  }

  /**
   * Create a new workout
   * Endpoint: POST https://apis.garmin.com/workoutportal/workout/v2
   */
  async createWorkout(workout: GarminWorkout, userTokens: GarminUserTokens): Promise<GarminWorkoutResponse> {
    await this.checkRateLimit();

    const response = await this.makeAuthenticatedRequest(
      'POST',
      '/workoutportal/workout/v2',
      userTokens,
      workout
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkout };
  }

  /**
   * Retrieve a workout by ID
   * Endpoint: GET https://apis.garmin.com/training-api/workout/v2/{workoutId}
   */
  async getWorkout(workoutId: number, userTokens: GarminUserTokens): Promise<GarminWorkoutResponse> {
    await this.checkRateLimit();

    const response = await this.makeAuthenticatedRequest(
      'GET',
      `/training-api/workout/v2/${workoutId}`,
      userTokens
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkout };
  }

  /**
   * Update a workout
   * Endpoint: PUT https://apis.garmin.com/training-api/workout/v2/{workoutId}
   */
  async updateWorkout(workoutId: number, workout: GarminWorkout, userTokens: GarminUserTokens): Promise<GarminWorkoutResponse> {
    await this.checkRateLimit();

    const response = await this.makeAuthenticatedRequest(
      'PUT',
      `/training-api/workout/v2/${workoutId}`,
      userTokens,
      workout
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkout };
  }

  /**
   * Delete a workout
   * Endpoint: DELETE https://apis.garmin.com/training-api/workout/v2/{workoutId}
   */
  async deleteWorkout(workoutId: number, userTokens: GarminUserTokens): Promise<boolean> {
    await this.checkRateLimit();

    await this.makeAuthenticatedRequest(
      'DELETE',
      `/training-api/workout/v2/${workoutId}`,
      userTokens
    );

    this.updateRateLimitUsage();
    return true;
  }

  /**
   * Create a workout schedule
   * Endpoint: POST https://apis.garmin.com/training-api/schedule/
   */
  async scheduleWorkout(schedule: GarminWorkoutSchedule, userTokens: GarminUserTokens): Promise<GarminWorkoutScheduleResponse> {
    await this.checkRateLimit();

    const response = await this.makeAuthenticatedRequest(
      'POST',
      '/training-api/schedule/',
      userTokens,
      schedule
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkoutSchedule };
  }

  /**
   * Retrieve a workout schedule by ID
   * Endpoint: GET https://apis.garmin.com/training-api/schedule/{workoutScheduleId}
   */
  async getWorkoutSchedule(scheduleId: number, userTokens: GarminUserTokens): Promise<GarminWorkoutScheduleResponse> {
    await this.checkRateLimit();

    const response = await this.makeAuthenticatedRequest(
      'GET',
      `/training-api/schedule/${scheduleId}`,
      userTokens
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkoutSchedule };
  }

  /**
   * Update a workout schedule
   * Endpoint: PUT https://apis.garmin.com/training-api/schedule/{workoutScheduleId}
   */
  async updateWorkoutSchedule(scheduleId: number, schedule: GarminWorkoutSchedule, userTokens: GarminUserTokens): Promise<GarminWorkoutScheduleResponse> {
    await this.checkRateLimit();

    const response = await this.makeAuthenticatedRequest(
      'PUT',
      `/training-api/schedule/${scheduleId}`,
      userTokens,
      schedule
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkoutSchedule };
  }

  /**
   * Delete a workout schedule
   * Endpoint: DELETE https://apis.garmin.com/training-api/schedule/{workoutScheduleId}
   */
  async deleteWorkoutSchedule(scheduleId: number, userTokens: GarminUserTokens): Promise<boolean> {
    await this.checkRateLimit();

    await this.makeAuthenticatedRequest(
      'DELETE',
      `/training-api/schedule/${scheduleId}`,
      userTokens
    );

    this.updateRateLimitUsage();
    return true;
  }

  /**
   * Get workout schedules by date range
   * Endpoint: GET https://apis.garmin.com/training-api/schedule?startDate=YYYY-mm-dd&endDate=YYYY-mm-dd
   */
  async getWorkoutSchedulesByDateRange(startDate: string, endDate: string, userTokens: GarminUserTokens): Promise<GarminScheduleListResponse> {
    await this.checkRateLimit();

    const params = new URLSearchParams({
      startDate,
      endDate
    });

    const response = await this.makeAuthenticatedRequest(
      'GET',
      `/training-api/schedule?${params.toString()}`,
      userTokens
    );

    this.updateRateLimitUsage();
    return { success: true, data: response as GarminWorkoutSchedule[] };
  }

  /**
   * Schedule an entire training plan
   */
  async scheduleTrainingPlan(
    request: TrainingPlanScheduleRequest,
    userTokens: GarminUserTokens
  ): Promise<TrainingPlanScheduleResponse> {
    const results: TrainingPlanScheduleResponse = {
      success: true,
      scheduledWorkouts: [],
      failedWorkouts: [],
      summary: {
        totalWorkouts: request.workouts.length,
        successfullyScheduled: 0,
        failed: 0
      }
    };

    // Process workouts in batches to respect rate limits
    const batchSize = 10;
    for (let i = 0; i < request.workouts.length; i += batchSize) {
      const batch = request.workouts.slice(i, i + batchSize);
      
      for (const workoutRequest of batch) {
        try {
          // Convert DayDetails to Garmin workout format
          const garminWorkout = await this.convertToGarminWorkout(
            workoutRequest.dayDetails,
            request.userPreferences
          );

          // Create the workout
          const createResponse = await this.createWorkout(garminWorkout, userTokens);
          
          if (!createResponse.success || !createResponse.data?.workoutId) {
            results.failedWorkouts!.push({
              date: workoutRequest.date,
              error: createResponse.error || 'Failed to create workout'
            });
            results.summary.failed++;
            continue;
          }

          // Schedule the workout
          const schedule: GarminWorkoutSchedule = {
            workoutId: createResponse.data.workoutId,
            date: workoutRequest.date
          };

          const scheduleResponse = await this.scheduleWorkout(schedule, userTokens);

          if (scheduleResponse.success && scheduleResponse.data) {
            results.scheduledWorkouts!.push(scheduleResponse.data);
            results.summary.successfullyScheduled++;
          } else {
            results.failedWorkouts!.push({
              date: workoutRequest.date,
              error: scheduleResponse.error || 'Failed to schedule workout'
            });
            results.summary.failed++;
          }

          // Add delay between requests to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          results.failedWorkouts!.push({
            date: workoutRequest.date,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          results.summary.failed++;
        }
      }

      // Add longer delay between batches
      if (i + batchSize < request.workouts.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    results.success = results.summary.failed === 0;
    return results;
  }

  /**
   * Convert DayDetails to Garmin workout format
   */
  private async convertToGarminWorkout(
    dayDetails: import('../@types/app').DayDetails,
    userPreferences: any
  ): Promise<GarminWorkout> {
    // Use existing WorkoutConverter but adapt to Garmin format
    const { WorkoutConverter } = await import('../ch/fitConverter');
    
    const converter = new WorkoutConverter({
      units: userPreferences.units || 'metric',
      userHeartRateZones: userPreferences.heartRateZones,
      userSpeedZones: userPreferences.speedZones
    });

    // Convert to FIT format first, then adapt to Garmin API format
    const fitData = converter.convertDayDetails(dayDetails, dayDetails.title);
    
    return this.fitToGarminWorkout(fitData);
  }

  /**
   * Convert FIT workout data to Garmin API workout format
   */
  private fitToGarminWorkout(fitData: any): GarminWorkout {
    // Map FIT sport to Garmin sport
    const sportMapping: Record<number, string> = {
      1: 'RUNNING',
      2: 'CYCLING',
      5: 'LAP_SWIMMING',
      4: 'STRENGTH_TRAINING'
    };

    return {
      workoutName: fitData.workout.wktName,
      description: fitData.workoutSteps[0]?.notes || '',
      sport: (sportMapping[fitData.workout.sport] || 'RUNNING') as any,
      workoutProvider: 'STRIDR',
      workoutSourceId: 'stridr',
      isSessionTransitionEnabled: false,
      segments: [{
        segmentOrder: 1,
        sport: (sportMapping[fitData.workout.sport] || 'RUNNING') as any,
        steps: fitData.workoutSteps.map((step: any, index: number) => ({
          type: 'WorkoutStep' as const,
          stepOrder: index + 1,
          intensity: this.mapFitToGarminIntensity(step.intensity),
          description: step.notes,
          durationType: this.mapFitToGarminDurationType(step.durationType),
          durationValue: step.durationDistance || step.durationTime,
          targetType: step.targetType ? this.mapFitToGarminTargetType(step.targetType) : null,
          targetValueLow: step.targetHrZone ? (step.targetHrZone * 10) : null,
          targetValueHigh: step.targetHrZone ? (step.targetHrZone * 10 + 10) : null,
          strokeType: null,
          drillType: null,
          equipmentType: null,
          exerciseCategory: null,
          exerciseName: null,
          weightValue: null,
          weightDisplayUnit: null
        }))
      }]
    };
  }

  private mapFitToGarminIntensity(fitIntensity: number): string {
    switch (fitIntensity) {
      case 0: return 'ACTIVE';
      case 1: return 'REST';
      case 2: return 'WARMUP';
      case 3: return 'COOLDOWN';
      default: return 'ACTIVE';
    }
  }

  private mapFitToGarminDurationType(fitDurationType: number): string {
    switch (fitDurationType) {
      case 1: return 'TIME';
      case 2: return 'DISTANCE';
      case 28: return 'OPEN';
      default: return 'DISTANCE';
    }
  }

  private mapFitToGarminTargetType(fitTargetType: number): string {
    switch (fitTargetType) {
      case 1: return 'HEART_RATE';
      case 2: return 'SPEED';
      case 3: return 'CADENCE';
      case 4: return 'POWER';
      default: return 'OPEN';
    }
  }

  /**
   * Make authenticated API request using OAuth 1.0a
   */
  private async makeAuthenticatedRequest(
    method: string,
    endpoint: string,
    userTokens: GarminUserTokens,
    body?: any
  ): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.oauthClient.makeAuthenticatedRequest(method, url, userTokens, body);
  }

  private async checkRateLimit(): Promise<void> {
    const now = new Date();
    
    // Reset counters if needed
    if (now.getTime() - this.rateLimitInfo.resetTime.getTime() > 60000) {
      this.rateLimitInfo.currentMinuteUsage = 0;
      this.rateLimitInfo.resetTime = now;
    }

    // Check if we're approaching limits
    if (this.rateLimitInfo.currentMinuteUsage >= this.rateLimitInfo.requestsPerMinute * 0.9) {
      const waitTime = 60000 - (now.getTime() - this.rateLimitInfo.resetTime.getTime());
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  private updateRateLimitUsage(): void {
    this.rateLimitInfo.currentMinuteUsage++;
    this.rateLimitInfo.currentDayUsage++;
  }
}
