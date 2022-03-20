import {
  ERROR_MESSAGES,
  MAX_DAYS_IN_YEAR,
  MAX_IN_PERIOD,
  MIN_IN_PERIOD,
} from '../common/constants';
import { UsageEvent } from './types/Profile';
import { Switched } from './types/State';

export function getUsageFromProfile(
  events: UsageEvent[],
  currentState: string,
  stateToCalculate: string,
  day: number = 1
): number {
  let previousTimeStamp: number = MIN_IN_PERIOD;

  validateInput(day);

  if (eventsStartAfterDay(events, day)) return MIN_IN_PERIOD;
  if (
    eventsEndBeforeDay(events, day) &&
    calculateLastEventState(events, stateToCalculate)
  ) {
    return MAX_IN_PERIOD;
  }

  const eventsWithinRange = [
    ...events.filter(({ timestamp }) => isEventWithinDateRange(timestamp, day)),
  ];
  eventsWithinRange.forEach(
    (event) => (event.timestamp = event.timestamp - getTimeRangeByDay(day).min)
  );

  if (eventsWithinRange.length) {
    const index = events.findIndex(
      ({ timestamp }) => timestamp === eventsWithinRange[0].timestamp
    );
    if (index) currentState = events[index - 1].state;
  }

  let totalUsage = eventsWithinRange.reduce(
    (usage, { state, timestamp }): number => {
      if (state !== Switched.OFF || stateToCalculate !== Switched.AUTO_OFF) {
        if (stateToCalculate === currentState) {
          usage += timestamp - previousTimeStamp;
        }
        [currentState, previousTimeStamp] = [state, timestamp];
      }
      return usage;
    },
    MIN_IN_PERIOD
  );

  return stateToCalculate === currentState
    ? totalUsage + MAX_IN_PERIOD - previousTimeStamp
    : totalUsage;
}

const getTimeRangeByDay = (day: number): { min: number; max: number } => ({
  min: MAX_IN_PERIOD * (day - 1),
  max: MAX_IN_PERIOD * (day - 1) + MAX_IN_PERIOD,
});

const eventsStartAfterDay = (events: UsageEvent[], day: number): boolean =>
  events.length &&
  day &&
  events.every(({ timestamp }) => timestamp >= getTimeRangeByDay(day).max);

const eventsEndBeforeDay = (events: UsageEvent[], day: number): boolean =>
  events.length &&
  day &&
  events.every(({ timestamp }) => timestamp <= getTimeRangeByDay(day).min);

const calculateLastEventState = (
  events: UsageEvent[],
  stateToCalculate: string
): boolean => events.reverse()[0].state === stateToCalculate;

const invalidDay = (day: number): boolean => day < 1 || day > MAX_DAYS_IN_YEAR;

function isEventWithinDateRange(timestamp: number, day: number): boolean {
  const time = getTimeRangeByDay(day);
  return timestamp >= time.min && timestamp <= time.max;
}

function validateInput(day: number): void {
  if (invalidDay(day)) throw ERROR_MESSAGES.DAY_OUT_OF_RANGE;
  if (!Number.isInteger(day)) throw ERROR_MESSAGES.MUST_BE_AN_INTEGER;
}
