import {
  isAfter as _isAfter,
  isBefore as _isBefore,
  subWeeks as _subWeeks,
  format as _format,
} from "date-fns";

type CustomDate = Date | string;

export const isAfter = (date: CustomDate, reference: CustomDate) => {
  return _isAfter(new Date(date), new Date(reference));
};
export const isBefore = (date: CustomDate, reference: CustomDate) => {
  return _isBefore(new Date(date), new Date(reference));
};

export const subWeeks = (date: CustomDate, amount: number) => {
  return _subWeeks(new Date(date), amount);
};

export const formatToPubDate = (date: CustomDate) => {
  return _format(new Date(date), "MMM dd, yyyy");
};

export * from "date-fns";
