import { useMemo } from "react";

import { TaxiTripData } from "./api/api.types";
import { useQueryParamState } from "./hooks/useQueryParamState";
import { filterTrips } from "./helpers/filterTrips";

import { ScatterPlot } from "./components/ScatterPlot/ScatterPlot";
import { SelectAmount } from "./components/SelectAmount";
import { SelectPaymentType } from "./components/SelectPaymentType";
import { Checkbox } from "./components/Checkbox";

interface Props {
  trips: TaxiTripData[];
}

export const Widget = ({ trips }: Props) => {
  const [amountPassangers, setAmountPassangers] =
    useQueryParamState("amountPassangers");
  const [paymentType, setPaymentType] = useQueryParamState("paymentType");
  const [excludeZeroTips, setExcludeZeroTips] =
    useQueryParamState("excludeZeroTips");

  const filteredTrips = useMemo(
    () =>
      filterTrips(trips, { amountPassangers, paymentType, excludeZeroTips }),
    [trips, amountPassangers, paymentType, excludeZeroTips]
  );

  return (
    <div>
      <h1>Scatter Plot travel distance and tip amount</h1>

      <div>
        <h2>Filters</h2>

        <div className="filterPanel">
          <SelectAmount
            id="amountPassangers"
            maxAmount={5}
            label="Passangers count is"
            value={amountPassangers}
            onChange={setAmountPassangers}
          />

          <SelectPaymentType
            id="paymentType"
            label="Payment type is"
            value={paymentType}
            onChange={setPaymentType}
          />

          <Checkbox
            id="excludeZeroTips"
            label="Should exclude zero tips"
            value={excludeZeroTips}
            onChange={setExcludeZeroTips}
          />
        </div>
      </div>

      {filteredTrips.length > 0 ? (
        <ScatterPlot trips={filteredTrips} width={600} height={400} />
      ) : (
        <h1>No data for such filters</h1>
      )}
    </div>
  );
};
