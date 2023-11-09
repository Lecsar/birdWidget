import { TaxiTripData } from "../api/api.types";
import { paymentTypeDictionary, queryParamTrueValue } from "../dictionary";

function convertQueryParamToNum(value: string): number | undefined {
  if (!value) return;

  const numValue = Number(value);
  return !Number.isNaN(numValue) ? numValue : undefined;
}

const paymentTypeValues = Object.values(paymentTypeDictionary).map(
  (i) => i.value
);

function convertPaymentTypeToNum(value: string): number | undefined {
  const numValue = convertQueryParamToNum(value);

  if (typeof numValue !== "number") return;

  return paymentTypeValues.includes(numValue) ? numValue : undefined;
}

function convertStringToBoolean(value: string): boolean {
  return value === queryParamTrueValue;
}

interface Filter {
  amountPassangers: string;
  paymentType: string;
  excludeZeroTips: string;
}

export function filterTrips(data: TaxiTripData[], filter: Filter) {
  const amountPassangers = convertQueryParamToNum(filter.amountPassangers);
  const paymentType = convertPaymentTypeToNum(filter.paymentType);
  const excludeZeroTips = convertStringToBoolean(filter.excludeZeroTips);

  return data
    .filter((i) =>
      typeof amountPassangers === "number"
        ? i.passenger_count === amountPassangers
        : true
    )
    .filter((i) =>
      typeof paymentType === "number" ? i.payment_type === paymentType : true
    )
    .filter((i) => (excludeZeroTips ? i.tip_amount > 0 : true));
}
