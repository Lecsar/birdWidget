import { useState, useEffect } from "react";

type Idle = {
  data?: undefined;
  error: null;
  loading: "idle";
};

type Loading = {
  data?: undefined;
  error: null;
  loading: "loading";
};

type Loaded<T> = {
  data: T;
  error: null;
  loading: "success";
};

type Error = {
  data?: undefined;
  error: Error;
  loading: "error";
};

type Result<T> = Idle | Loading | Loaded<T> | Error;

export function useDataLoader<T>(api: () => Promise<T>): Result<T> {
  const [state, setState] = useState<Result<T>>({
    data: undefined,
    error: null,
    loading: "idle",
  });

  useEffect(() => {
    setState({ data: undefined, error: null, loading: "loading" });

    api()
      .then((data) => {
        setState({ data, error: null, loading: "success" });
      })
      .catch((error) => {
        setState({ data: undefined, error, loading: "error" });
      });
  }, [api]);

  return state;
}
