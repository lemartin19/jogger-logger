import type { Activity } from '../types';

export function createActivity({ ...overrides }: Partial<Activity>): Activity {
  return {
    athlete: { id: 27421786 },
    name: 'long time no coast',
    distance: 16207.7,
    moving_time: 5031,
    elapsed_time: 5089,
    total_elevation_gain: 52,
    sport_type: 'Run',
    workout_type: 0,
    id: 10458672525,
    start_date: new Date('2023-12-29T20:59:14Z'),
    start_date_local: new Date('2023-12-29T15:59:14Z'),
    timezone: '(GMT-05:00) America/New_York',
    location_city: null,
    location_state: null,
    location_country: null,
    achievement_count: 0,
    kudos_count: 6,
    comment_count: 0,
    athlete_count: 1,
    photo_count: 0,
    map: {
      id: 'a10458672525',
      summary_polyline:
        'ybjbGr{~qLd@HvAAjAUzD]zAB~@`@JXCl@WhAi@fDUr@@Tj@Lb@z@j@`@rAzCnAxDxBtFpArDND|@k@TETFl@b@LCBIN_Cd@gCn@}Bx@_Bb@c@b@s@t@}@|BoB~AcBpAiBp@k@tAeBl@q@r@i@hCoEr@c@`@e@|@s@f@y@d@i@d@u@xAsAhEkF\\UrAyA~A}Bx@s@vAgBp@g@t@u@p@cAtCaD|@sAz@y@`AkAtAkBTQh@IB_@N]`A_Ad@y@bAeAR_@Z}@n@mAv@{BlAoC\\kArAkDXaAdA}CdAgCTeAx@eBt@{BLm@Xq@TcA`AoCR}@Te@Pw@Zm@n@mB^o@\\{@~@gDh@k@T{@h@qApA}Bh@wAnAsA~@cBtBcB\\s@zBoCP[bAy@rAkBb@kAj@}@j@cBZo@f@uAP{@b@mAJk@Ty@Fg@Pg@LwCf@_FLsDL_ANeCPiAB}@F_@Pe@p@uCvCcFjAmA\\UZ_@d@Ur@Sd@Ih@[j@S`C_@dAB~@Gz@Ob@@|@M|@C^Kt@C\\OzAOl@DlASrCCpBOb@Qb@AfB]p@E`AWl@U|BgBzAu@hBuBn@eAx@}AX}@xAiDz@sDx@uGTgAj@kBRoARk@PwBXuA`@{CZ{@Ns@Z]Oy@@[`B{E\\_BRa@FAEb@_@|Ai@rBc@nAMz@AdAi@f@M~@c@fBc@lCUz@[xCe@~Bo@hCe@bDqAfHsBnEsB`D_AlA[T_@d@{Ar@{BpAuAb@gAR_CNsB`@{A@oD\\o@?kATkCNiHr@u@GyAXwBz@q@f@_Bt@kAbAm@z@aArBo@dAYr@w@fDYhBSfBQbEGlBBzAg@lCKxBQjAUfA_BhFc@fAeC|EyCtDcAdBwBrC_ElEuAtBcAtBWp@i@v@_BbEgBjFy@pB}AzEoBlGuAtDyBnFMl@o@vAwCxI{AzDgAbCaBnCgCbDMXCd@a@BQH{DzEw@j@]l@{@hAiBlBc@p@{BxB}BnCyAtAkFnGo@j@qA`BiAdAeCxCaBfBgBzBw@jAkAfAi@z@kDvDw@dAaAx@cDxDuArBy@pBq@hCYvASdCKPG?q@m@YImAr@GAsAcD}@cCqBkFsAaDu@cBkAaDIKAI@YnAuFBUCEu@Sm@A_Gr@]?sAVoAC',
      polyline: '',
    },
    trainer: false,
    commute: false,
    manual: false,
    private: false,
    visibility: 'everyone',
    flagged: false,
    gear_id: 'g15866548',
    start_latlng: [42.4922177195549, -71.26935325562954],
    end_latlng: [42.49215267598629, -71.26952156424522],
    average_speed: 3.222,
    max_speed: 5.5,
    average_cadence: 89.1,
    average_watts: 162,
    max_watts: 237,
    weighted_average_watts: 161,
    kilojoules: 815,
    device_watts: true,
    has_heartrate: true,
    average_heartrate: 175.3,
    max_heartrate: 187,
    heartrate_opt_out: false,
    display_hide_heartrate_option: true,
    elev_high: 73,
    elev_low: 40,
    upload_id: 11192678076,
    upload_id_str: '11192678076',
    external_id: '457384135906852865.fit',
    from_accepted_tag: false,
    pr_count: 0,
    total_photo_count: 0,
    has_kudoed: false,
    suffer_score: 284,
    ...overrides,
  };
}
