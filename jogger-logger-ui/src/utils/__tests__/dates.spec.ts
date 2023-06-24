import { describe, it, expect } from 'vitest';

import { getMondayBefore } from '../dates';

describe('getMondayBefore', () => {
  it('when a Monday is passed in, will get 12:00am local time of that Monday', () => {
    const june19Monday = new Date('2023-06-19T11:24:56.391');
    const result = getMondayBefore(june19Monday);
    expect(result).toEqual(new Date(`2023-06-19`));
  });

  it('when a Sunday is passed in, will get 12:00am local time of the Monday before', () => {
    const june18Sunday = new Date('2023-06-18T11:24:56.391');
    const result = getMondayBefore(june18Sunday);
    expect(result).toEqual(new Date(`2023-06-12`));
  });

  it('when a Thursday is passed in, will get 12:00am local time of the Monday before', () => {
    const june1Thursday = new Date('2023-06-01T11:24:56.391');
    const result = getMondayBefore(june1Thursday);
    expect(result).toEqual(new Date(`2023-05-29`));
  });
});
