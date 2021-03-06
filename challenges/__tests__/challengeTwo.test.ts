import { Profile } from './../types/Profile';
import { calculateEnergySavings } from '../challengeTwo';
import { MAX_IN_PERIOD } from '../../common/constants';

// Part 2
describe('calculateEnergySavings', () => {
  it('should return zero for always on', () => {
    const usageProfile: Profile = {
      initial: 'on',
      events: [],
    };
    expect(calculateEnergySavings(usageProfile)).toEqual(0);
  });

  it('should calculate zero for always switch off manually', () => {
    const usageProfile: Profile = {
      initial: 'off',
      events: [],
    };
    expect(calculateEnergySavings(usageProfile)).toEqual(0);
  });

  it('should calculate max period for always switched off automatically', () => {
    const usageProfile: Profile = {
      initial: 'auto-off',
      events: [],
    };
    expect(calculateEnergySavings(usageProfile)).toEqual(MAX_IN_PERIOD);
  });

  it('should calculate energy savings correctly on sensible data', () => {
    const usageProfile: Profile = {
      initial: 'off',
      events: [
        { state: 'on', timestamp: 100 },
        { state: 'off', timestamp: 150 },
        { state: 'on', timestamp: 200 },
        { state: 'auto-off', timestamp: 500 },
        { state: 'on', timestamp: 933 },
        { state: 'off', timestamp: 1010 },
        { state: 'on', timestamp: 1250 },
        { state: 'auto-off', timestamp: 1320 },
      ],
    };
    expect(calculateEnergySavings(usageProfile)).toEqual(
      933 - 500 + (MAX_IN_PERIOD - 1320)
    );
  });

  it('should calculate energy savings correctly on silly data (example 1)', () => {
    const usageProfile: Profile = {
      initial: 'off',
      events: [
        { state: 'on', timestamp: 100 },
        { state: 'off', timestamp: 150 },
        { state: 'on', timestamp: 200 },
        { state: 'auto-off', timestamp: 500 },
        { state: 'off', timestamp: 800 },
        { state: 'on', timestamp: 933 },
        { state: 'off', timestamp: 1010 },
        { state: 'on', timestamp: 1250 },
        { state: 'on', timestamp: 1299 },
        { state: 'auto-off', timestamp: 1320 },
      ],
    };
    expect(calculateEnergySavings(usageProfile)).toEqual(
      933 - 500 + (MAX_IN_PERIOD - 1320)
    );
  });

  it('should calculate energy savings correctly on silly data (example 2)', () => {
    const usageProfile: Profile = {
      initial: 'off',
      events: [
        { state: 'on', timestamp: 250 },
        { state: 'on', timestamp: 299 },
        { state: 'auto-off', timestamp: 320 },
        { state: 'off', timestamp: 500 },
      ],
    };
    expect(calculateEnergySavings(usageProfile)).toEqual(MAX_IN_PERIOD - 320);
  });
});
