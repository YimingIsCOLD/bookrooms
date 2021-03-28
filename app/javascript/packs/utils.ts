import { addMinutes, format, parse } from 'date-fns';
import { Timing } from './types';

export function getCSRFToken() {
  return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';
}

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
