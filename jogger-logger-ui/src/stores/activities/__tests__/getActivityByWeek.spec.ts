import { describe, it, expect } from 'vitest';
import assert from 'assert';

import {
  TrainingDay,
  TrainingWeek,
  WEEKDAYS,
  getActivitiesByWeek,
  getMondayBefore,
} from '../getActivitiesByWeek';

describe('getMondayBefore', () => {
  it('when a Monday is passed in, will get 12:00am local time of that Monday', () => {
    const june19Monday = new Date('2023-06-19T11:24:56.391');
    const result = getMondayBefore(june19Monday);
    expect(result).toEqual(new Date(`2023-06-19`));
  });
});

describe('getActivitiesByWeek', () => {
  it('will not break with null activities', () => {
    const result = getActivitiesByWeek({ activities: null });
    expect(result).toBeNull();
  });

  it('empty activities will still fill in empty weeks for date range', () => {
    const mondayBeforeNow = getMondayBefore();
    const twoMondaysAgo = getMondayBefore(new Date(mondayBeforeNow.valueOf() - 1));
    const result = getActivitiesByWeek({
      activities: [],
      startDate: twoMondaysAgo,
    });
    assert(result, `Input gave a null result`);
    expect(result).toHaveLength(2);
    const firstWeek = result[0];
    expect(firstWeek).toBeInstanceOf(TrainingWeek);
    expect(firstWeek.startDate).toEqual(mondayBeforeNow);
    WEEKDAYS.forEach((day) => {
      expect(firstWeek.days[day]).toBeInstanceOf(TrainingDay);
      expect(firstWeek.days[day].hasActivities()).toBe(false);
    });
  });
});
