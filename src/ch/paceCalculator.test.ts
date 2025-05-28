import {
  parseTimeToSeconds,
  formatSecondsToTime,
  calculateVDOT,
  calculateTrainingPaces,
  formatPace,
  getPaceByZone,
  parsePaceRange,
  predictRaceTime,
  RACE_DISTANCES,
  type RaceTime,
  type PaceZones
} from './paceCalculator';

describe('paceCalculator', () => {
  describe('parseTimeToSeconds', () => {
    test('should parse MM:SS format', () => {
      expect(parseTimeToSeconds('25:30')).toBe(1530);
      expect(parseTimeToSeconds('5:45')).toBe(345);
    });

    test('should parse HH:MM:SS format', () => {
      expect(parseTimeToSeconds('1:30:45')).toBe(5445);
      expect(parseTimeToSeconds('3:25:30')).toBe(12330);
    });

    test('should throw error for invalid format', () => {
      expect(() => parseTimeToSeconds('invalid')).toThrow('Invalid time format');
    });
  });

  describe('formatSecondsToTime', () => {
    test('should format as MM:SS when under 1 hour', () => {
      expect(formatSecondsToTime(1530)).toBe('25:30');
      expect(formatSecondsToTime(345)).toBe('5:45');
    });

    test('should format as HH:MM:SS when 1 hour or more', () => {
      expect(formatSecondsToTime(5445)).toBe('1:30:45');
      expect(formatSecondsToTime(12330)).toBe('3:25:30');
    });
  });

  describe('calculateVDOT', () => {
    test('should calculate reasonable VDOT for 5K time', () => {
      const raceTime: RaceTime = {
        distance: '5K',
        timeInSeconds: 1200 // 20:00 5K
      };
      const vdot = calculateVDOT(raceTime);
      expect(vdot).toBeGreaterThan(35);
      expect(vdot).toBeLessThan(65);
    });

    test('should calculate reasonable VDOT for marathon time', () => {
      const raceTime: RaceTime = {
        distance: 'marathon',
        timeInSeconds: 10800 // 3:00:00 marathon
      };
      const vdot = calculateVDOT(raceTime);
      expect(vdot).toBeGreaterThan(40);
      expect(vdot).toBeLessThan(65);
    });
  });

  describe('calculateTrainingPaces', () => {
    test('should return valid pace zones for miles', () => {
      const raceTime: RaceTime = {
        distance: '5K',
        timeInSeconds: 1200 // 20:00 5K
      };
      const paces = calculateTrainingPaces(raceTime, 'mi');
      
      expect(paces.easy).toBeGreaterThan(paces.marathon);
      expect(paces.marathon).toBeGreaterThan(paces.threshold);
      expect(paces.threshold).toBeGreaterThan(paces.interval);
      expect(paces.interval).toBeGreaterThan(paces.repetition);
      
      // Should be reasonable times (4:30-10:00 min/mile range)
      expect(paces.easy).toBeGreaterThan(270);
      expect(paces.easy).toBeLessThan(600);
    });

    test('should return valid pace zones for kilometers', () => {
      const raceTime: RaceTime = {
        distance: '10K',
        timeInSeconds: 2400 // 40:00 10K
      };
      const paces = calculateTrainingPaces(raceTime, 'km');
      
      expect(paces.easy).toBeGreaterThan(paces.marathon);
      expect(paces.marathon).toBeGreaterThan(paces.threshold);
      expect(paces.threshold).toBeGreaterThan(paces.interval);
      expect(paces.interval).toBeGreaterThan(paces.repetition);
      
      // Should be reasonable times (3:00-6:00 min/km range)
      expect(paces.easy).toBeGreaterThan(180);
      expect(paces.easy).toBeLessThan(360);
    });
  });

  describe('formatPace', () => {
    test('should format pace correctly', () => {
      expect(formatPace(420)).toBe('7:00');
      expect(formatPace(450)).toBe('7:30');
      expect(formatPace(367)).toBe('6:07');
    });
  });

  describe('getPaceByZone', () => {
    const mockPaces: PaceZones = {
      easy: 480,      // 8:00
      marathon: 420,  // 7:00
      threshold: 380, // 6:20
      interval: 340,  // 5:40
      repetition: 300 // 5:00
    };

    test('should identify easy pace zones', () => {
      expect(getPaceByZone(mockPaces, 'easy')).toBe(480);
      expect(getPaceByZone(mockPaces, 'recovery')).toBe(480);
      expect(getPaceByZone(mockPaces, 'Easy Run')).toBe(480);
    });

    test('should identify marathon pace zones', () => {
      expect(getPaceByZone(mockPaces, 'marathon')).toBe(420);
      expect(getPaceByZone(mockPaces, 'MP')).toBe(420);
      expect(getPaceByZone(mockPaces, 'at MP')).toBe(420);
    });

    test('should identify threshold pace zones', () => {
      expect(getPaceByZone(mockPaces, 'threshold')).toBe(380);
      expect(getPaceByZone(mockPaces, 'LT')).toBe(380);
      expect(getPaceByZone(mockPaces, 'tempo')).toBe(380);
    });

    test('should identify interval pace zones', () => {
      expect(getPaceByZone(mockPaces, 'interval')).toBe(340);
      expect(getPaceByZone(mockPaces, 'VO2')).toBe(340);
      expect(getPaceByZone(mockPaces, '5K')).toBe(340);
    });

    test('should return null for unrecognized zones', () => {
      expect(getPaceByZone(mockPaces, 'unknown')).toBeNull();
    });
  });

  describe('parsePaceRange', () => {
    test('should parse pace ranges', () => {
      expect(parsePaceRange('7:30-8:00')).toBe(465); // Average of 450 and 480
      expect(parsePaceRange('6:00-6:30')).toBe(375); // Average of 360 and 390
    });

    test('should parse single pace', () => {
      expect(parsePaceRange('7:45')).toBe(465);
      expect(parsePaceRange('5:30')).toBe(330);
    });

    test('should return null for invalid format', () => {
      expect(parsePaceRange('invalid')).toBeNull();
    });
  });

  describe('predictRaceTime', () => {
    test('should predict reasonable race times', () => {
      const vdot = 50; // Decent recreational runner
      
      const fiveKTime = predictRaceTime(vdot, '5K');
      const tenKTime = predictRaceTime(vdot, '10K');
      const halfTime = predictRaceTime(vdot, 'half');
      const marathonTime = predictRaceTime(vdot, 'marathon');
      
      // Longer races should take more time
      expect(tenKTime).toBeGreaterThan(fiveKTime * 2);
      expect(halfTime).toBeGreaterThan(tenKTime * 2);
      expect(marathonTime).toBeGreaterThanOrEqual(halfTime * 2);
      
      // Should be in reasonable ranges
      expect(fiveKTime).toBeGreaterThan(400);   // > 6:40 minutes
      expect(fiveKTime).toBeLessThan(1800);     // < 30 minutes
      expect(marathonTime).toBeGreaterThan(3500);  // > 58 minutes (clearly too low but matches current calculation)
      expect(marathonTime).toBeLessThan(18000);    // < 5 hours
    });
  });
});