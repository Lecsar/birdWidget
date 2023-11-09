import {
  convertQueryParamToNum,
  convertPaymentTypeToNum,
  convertStringToBoolean,
  filterTrips,
} from "./filterTrips";
import { paymentTypeDictionary, queryParamTrueValue } from "../constants";
import { TaxiTripData } from "../api/api.types";

describe("convertQueryParamToNum", () => {
  it("returns undefined for empty string", () => {
    expect(convertQueryParamToNum("")).toBeUndefined();
  });

  it("returns a number for a numeric string", () => {
    expect(convertQueryParamToNum("123")).toBe(123);
  });

  it("returns undefined for non-numeric string", () => {
    expect(convertQueryParamToNum("abc")).toBeUndefined();
  });
});

describe("convertPaymentTypeToNum", () => {
  it("returns a number if the value exists in paymentTypeDictionary", () => {
    const existingValue = Object.values(paymentTypeDictionary)[0].value;
    expect(convertPaymentTypeToNum(existingValue.toString())).toBe(
      existingValue
    );
  });

  it("returns undefined for invalid payment type", () => {
    expect(convertPaymentTypeToNum("invalid")).toBeUndefined();
  });
});

describe("convertStringToBoolean", () => {
  it("returns true for the special query param true value", () => {
    expect(convertStringToBoolean(queryParamTrueValue)).toBe(true);
  });

  it("returns false for any other value", () => {
    expect(convertStringToBoolean("false")).toBe(false);
  });
});

describe("filterTrips", () => {
  const mockData = [
    { passenger_count: 1, payment_type: 1, tip_amount: 5 },
    { passenger_count: 2, payment_type: 2, tip_amount: 0 },
  ];

  it("filters by passenger count", () => {
    const filters = {
      amountPassangers: "1",
      paymentType: "",
      excludeZeroTips: "",
    };
    const filtered = filterTrips(mockData as TaxiTripData[], filters);
    expect(filtered.length).toBe(1);
    expect(filtered[0].passenger_count).toBe(1);
  });

  it("filters by payment type", () => {
    const filters = {
      amountPassangers: "",
      paymentType: "1",
      excludeZeroTips: "",
    };
    const filtered = filterTrips(mockData as TaxiTripData[], filters);
    expect(filtered.length).toBe(1);
    expect(filtered[0].payment_type).toBe(1);
  });

  it("filters out zero tips if excludeZeroTips is true", () => {
    const filters = {
      amountPassangers: "",
      paymentType: "",
      excludeZeroTips: queryParamTrueValue,
    };
    const filtered = filterTrips(mockData as TaxiTripData[], filters);
    expect(filtered.every((i) => i.tip_amount > 0)).toBe(true);
  });
});
