import { TaxiTripResponse } from "./api.types";
import { fakeApiResponse } from "./fakeData";

import { USE_REAL_API, API_TOKEN } from "../constants";

function fakeApiGetTaxiTripsInfo(): Promise<TaxiTripResponse> {
  return new Promise((res) =>
    setTimeout(() => {
      res(fakeApiResponse);
    }, 1500)
  );
}

function getTaxiTripsInfo() {
  return fetch(
    `https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?token=${API_TOKEN}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  });
}

export const apiGetTaxiTripsInfo = USE_REAL_API
  ? getTaxiTripsInfo
  : fakeApiGetTaxiTripsInfo;
