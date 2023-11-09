import { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

export function useQueryParamState(
  key: string,
  defaultValue: string = ""
): [string, (value: string) => void] {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);

  const [paramValue, setParamValue] = useState<string>(
    queryParams.get(key) || defaultValue
  );

  useEffect(() => {
    const newQueryParams = new URLSearchParams(location.search);
    const value = newQueryParams.get(key) || defaultValue;
    setParamValue(value);
  }, [key, location.search, defaultValue]);

  const setQueryParam = useCallback(
    (value: string) => {
      const newQueryParams = new URLSearchParams(location.search);

      if (value) {
        newQueryParams.set(key, value);
      } else {
        newQueryParams.delete(key);
      }

      setParamValue(value);
      history.push({
        pathname: location.pathname,
        search: newQueryParams.toString(),
      });
    },
    [location.search, location.pathname, history, key]
  );

  return [paramValue, setQueryParam];
}
