/**
 * Interface describing a single taxi trip record.
 */
export interface TaxiTripData {
  /** Unique identifier for the vendor. May not match expected integer range. */
  vendorid: number;
  /** Date and time when the trip started. Should be in ISO format. */
  tpep_pickup_datetime: string;
  /** Date and time when the trip ended. Should be in ISO format. */
  tpep_dropoff_datetime: string;
  /** The number of passengers in the trip. May not match expected integer range. */
  passenger_count: number;
  /** The distance of the trip. May not be a float in some erroneous records. */
  trip_distance: number;
  /** The rate code ID for the trip. May not match expected integer range. */
  ratecodeid: number;
  /** Flag indicating whether the trip record was stored in vehicle memory before sending to the vendor, typically 'Y' (yes) or 'N' (no). May be inconsistent. */
  store_and_fwd_flag: string;
  /** The location ID where the trip started. May not match expected integer range. */
  pulocationid: number;
  /** The location ID where the trip ended. May not match expected integer range. */
  dolocationid: number;
  /** The type of payment for the trip. May not match expected integer range. */
  payment_type: number;
  /** The fare amount for the trip. Could be incorrectly formatted as non-numeric. */
  fare_amount: string;
  /** Any extra charges applicable to the trip. May not be a float in some erroneous records. */
  extra: number;
  /** The Metropolitan Transportation Authority tax amount. May not be a float in some erroneous records. */
  mta_tax: number;
  /** The tip amount for the trip. May not be a float in some erroneous records. */
  tip_amount: number;
  /** The toll amount for the trip. May not be a float in some erroneous records. */
  tolls_amount: number;
  /** The surcharge applied for improvements. May not be a float in some erroneous records. */
  improvement_surcharge: number;
  /** The total amount charged for the trip. May not be a float in some erroneous records. */
  total_amount: number;
}

/**
 * Object containing statistical information.
 */
interface Statistics {
  /** The elapsed time for the operation. Should be a non-negative number. */
  elapsed: number;
  /** The number of rows read. Should be a non-negative integer. */
  rows_read: number;
  /** The number of bytes read. Should be a non-negative integer. */
  bytes_read: number;
}

/**
 * General interface to describe the response with taxi trip data.
 */
export interface TaxiTripResponse {
  /** Metadata about the fields present in the data. */
  meta: Array<{ name: string; type: string }>;
  /** An array of taxi trip records. */
  data: TaxiTripData[];
  /** The total number of rows in the response. May not match expected integer range if corrupted. */
  rows: number;
  /** The minimum number of rows available before applying any limit. May not match expected integer range if corrupted. */
  rows_before_limit_at_least: number;
  /** Statistical information about the operation. Could contain anomalies. */
  statistics: Statistics;
}
