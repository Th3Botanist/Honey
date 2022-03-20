import { Profile } from './../types/Profile';
import { calculateEnergyUsageSimple } from '../challengeOne';

// Part 1
describe('calculateEnergyUsageSimple', () => {
  it('should calculate correctly for a simple usage profile with initial state = "on"', () => {
    const usageProfile1: Profile = {
      initial: 'on',
      events: [
        { timestamp: 126, state: 'off' },
        { timestamp: 833, state: 'on' },
      ],
    };
    expect(calculateEnergyUsageSimple(usageProfile1)).toEqual(
      126 + (1440 - 833)
    );
  });

  it('should calculate correctly for a simple usage profile with initial state = "off"', () => {
    const usageProfile2: Profile = {
      initial: 'off',
      events: [
        { timestamp: 30, state: 'on' },
        { timestamp: 80, state: 'off' },
        { timestamp: 150, state: 'on' },
        { timestamp: 656, state: 'off' },
      ],
    };
    expect(calculateEnergyUsageSimple(usageProfile2)).toEqual(
      80 - 30 + (656 - 150)
    );
  });

  it('should calculate correctly when the appliance is on the whole time', () => {
    const usageProfile3: Profile = {
      initial: 'on',
      events: [],
    };
    expect(calculateEnergyUsageSimple(usageProfile3)).toEqual(1440);
  });

  it('should handle duplicate on events', () => {
    const usageProfile: Profile = {
      initial: 'off',
      events: [
        { timestamp: 30, state: 'on' },
        { timestamp: 80, state: 'on' },
        { timestamp: 150, state: 'off' },
        { timestamp: 656, state: 'on' },
      ],
    };
    expect(calculateEnergyUsageSimple(usageProfile)).toEqual(
      150 - 30 + (1440 - 656)
    );
  });

  it('should handle duplicate off events', () => {
    const usageProfile: Profile = {
      initial: 'on',
      events: [
        { timestamp: 30, state: 'on' },
        { timestamp: 80, state: 'off' },
        { timestamp: 150, state: 'off' },
        { timestamp: 656, state: 'on' },
      ],
    };
    expect(calculateEnergyUsageSimple(usageProfile)).toEqual(
      80 - 0 + (1440 - 656)
    );
  });
});
