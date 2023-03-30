import { isAfter as _isAfter, isBefore as _isBefore } from "date-fns";

export const isAfter = (date: Date | string, reference: Date | string) => {
  return _isAfter(new Date(date), new Date(reference));
};
