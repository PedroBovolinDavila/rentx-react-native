import { eachDayOfInterval, format, parseISO } from "date-fns";

import { IMarkedDatesProps, IDayProps } from ".";

import { getPlatformDate } from "../../utils/getPlatformDate";

import theme from "../../styles/theme";

export function generateInterval(start: IDayProps, end: IDayProps) {
  let interval: IMarkedDatesProps[] = [];

  eachDayOfInterval({
    start: parseISO(start.dateString),
    end: parseISO(end.dateString),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
}
