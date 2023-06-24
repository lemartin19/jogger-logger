import { describe, it, expect } from 'vitest';
import assert from 'assert';

import { WEEKDAYS, getMondayBefore } from '@/utils/dates';
import { TrainingDay, TrainingWeek, getActivitiesByWeek } from '../getActivitiesByWeek';

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
