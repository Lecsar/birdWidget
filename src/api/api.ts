import { TaxiTripResponse } from "./api.types";
import { fakeData } from "./fakeData";

export const apiGetTaxiTripsInfo = (): Promise<TaxiTripResponse> => {
  return new Promise((res) =>
    setTimeout(() => {
      const response: TaxiTripResponse = {
        data: fakeData,
        rows: fakeData.length,
        rows_before_limit_at_least: 1,
        meta: [],
        statistics: {} as any,
      };
      res(response);
    }, 1500)
  );
};
