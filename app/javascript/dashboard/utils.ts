import { addMinutes, format, parse } from 'date-fns';
import { Timing } from './types';

/**
 * Get the CSRF token from the HTML.
 */
export function getCSRFToken() {
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';
}

/**
 * Generates a list of timings with the given start time, interval and steps.
 *
 * @param startTime the starting time.
 * @param minsInterval the time in minutes between each steps.
 * @param steps the number entries to generate.
 */
export function generateTimings(startTime: string, minsInterval: number, steps: number) {
  const timings: Timing[] = [];
  let t = parse(startTime, 'HH:mm', new Date(2021, 0, 1));

  for (let i = 0; i < steps; i++) {
    timings.push({
      label: format(t, 'HH:mm'),
      value: t,
      index: i,
    });
    t = addMinutes(t, minsInterval);
  }

  return timings;
}
