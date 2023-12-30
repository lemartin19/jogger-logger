import { describe, it, expect } from 'vitest';
import assert from 'assert';

import { MONDAY, ONE_DAY, ONE_WEEK, WEEKDAYS, getMondayBefore } from '@/utils/dates';
import { getActivitiesByWeek } from '../getActivitiesByWeek';
import { TrainingWeek } from '../TrainingWeek';
import { TrainingDay } from '../TrainingDay';
import { createActivity } from './fixtures';

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

  it('activities will fill up the current week', () => {
    const mondayBeforeNow = getMondayBefore();
    const mondayActivity1 = createActivity({
      start_date: new Date(mondayBeforeNow.valueOf() + 1),
      start_date_local: new Date(mondayBeforeNow.valueOf() + 1),
    });
    const mondayActivity2 = createActivity({
      start_date: new Date(mondayBeforeNow.valueOf() + 2),
      start_date_local: new Date(mondayBeforeNow.valueOf() + 2),
    });
    const tuesdayActivity = createActivity({
      start_date: new Date(mondayBeforeNow.valueOf() + ONE_DAY),
      start_date_local: new Date(mondayBeforeNow.valueOf() + ONE_DAY),
    });
    const result = getActivitiesByWeek({
      activities: [tuesdayActivity, mondayActivity2, mondayActivity1],
    });
    assert(result, `Input gave a null result`);
    expect(result).toHaveLength(1);
    const firstWeek = result[0];
    expect(firstWeek).toBeInstanceOf(TrainingWeek);
    expect(firstWeek.startDate).toEqual(mondayBeforeNow);
    WEEKDAYS.forEach((day) => {
      expect(firstWeek.days[day]).toBeInstanceOf(TrainingDay);

      const isDayMonday = day === MONDAY;
      const isDayTuesday = day === MONDAY + 1;
      const shouldHaveActivities = isDayMonday || isDayTuesday;
      expect(firstWeek.days[day].hasActivities()).toBe(shouldHaveActivities);
    });
  });

  it('earliest activity will be the start of weeks if no start date provided', () => {
    const mondayBeforeNow = getMondayBefore();
    const fourWeeksAgo = new Date(mondayBeforeNow.valueOf() - 3 * ONE_WEEK);
    const fourWeeksAgoActivity = createActivity({
      start_date: fourWeeksAgo,
      start_date_local: fourWeeksAgo,
    });
    const tuesdayActivity = createActivity({
      start_date: new Date(mondayBeforeNow.valueOf() + ONE_DAY),
      start_date_local: new Date(mondayBeforeNow.valueOf() + ONE_DAY),
    });
    const result = getActivitiesByWeek({
      activities: [tuesdayActivity, fourWeeksAgoActivity],
    });
    assert(result, `Input gave a null result`);
    expect(result).toHaveLength(4);
    const firstWeek = result[0];
    const lastWeek = result[3];
    expect(firstWeek.startDate).toEqual(mondayBeforeNow);
    WEEKDAYS.forEach((day) => {
      expect(firstWeek.days[day]).toBeInstanceOf(TrainingDay);

      const isDayMonday = day === MONDAY;
      const isDayTuesday = day === MONDAY + 1;
      expect(firstWeek.days[day].hasActivities()).toBe(isDayTuesday);
      expect(result[1].days[day].hasActivities()).toBe(false);
      expect(result[2].days[day].hasActivities()).toBe(false);
      expect(lastWeek.days[day].hasActivities()).toBe(isDayMonday);
    });
  });
});
