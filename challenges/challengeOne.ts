/* The maximum number of minutes in a period (a day) */
/**
 * PART 1
 *
 * You have an appliance that uses energy, and you want to calculate how
 * much energy it uses over a period of time.
 *
 * As an input to your calculations, you have a series of events that contain
 * a timestamp and the new state (on or off). You are also given the initial
 * state of the appliance. From this information, you will need to calculate
 * the energy use of the appliance i.e. the amount of time it is switched on.
 *
 * The amount of energy it uses is measured in 1-minute intervals over the
 * period of a day. Given there is 1440 minutes in a day (24 * 60), if the
 * appliance was switched on the entire time, its energy usage would be 1440.
 * To simplify calculations, timestamps range from 0 (beginning of the day)
 * to 1439 (last minute of the day).
 *
 * HINT: there is an additional complication with the last two tests that
 * introduce spurious state change events (duplicates at different time periods).
 * Focus on getting these tests working after satisfying the first tests.
 *
 * The structure for `profile` looks like this (as an example):
 * ```
 * ```
 */

import { getUsageFromProfile } from './getUsageFromProfile';
import { UsageEvent } from './types/Profile';
import { Switched } from './types/State';

export const calculateEnergyUsageSimple = ({
  events,
  initial,
}: {
  events: UsageEvent[];
  initial: string;
}): number => {
  return getUsageFromProfile(events, initial, Switched.ON);
};
