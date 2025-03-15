/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

interface NetworkStatus {
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "wifi"
    | "wimax"
    | "none"
    | "other"
    | "unknown";
}

function getConnection(): NetworkStatus {
  if (typeof navigator === "undefined") {
    return {};
  }

  const _navigator = navigator as any;
  const connection: any =
    _navigator.connection ||
    _navigator.mozConnection ||
    _navigator.webkitConnection;

  if (!connection) {
    return {};
  }

  return {
    downlink: connection?.downlink,
    downlinkMax: connection?.downlinkMax,
    effectiveType: connection?.effectiveType,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
    type: connection?.type,
  };
}

export function useNetwork() {
  const [status, setStatus] = useState<{ online: boolean } & NetworkStatus>({
    online: true,
  });
  const handleConnectionChange = useCallback(
    () => setStatus((current) => ({ ...current, ...getConnection() })),
    []
  );

  useWindowEvent("online", () =>
    setStatus({ online: true, ...getConnection() })
  );
  useWindowEvent("offline", () =>
    setStatus({ online: false, ...getConnection() })
  );

  useEffect(() => {
    const _navigator = navigator as any;

    if (_navigator.connection) {
      setStatus({ online: _navigator.onLine, ...getConnection() });
      _navigator.connection.addEventListener("change", handleConnectionChange);
      return () =>
        _navigator.connection.removeEventListener(
          "change",
          handleConnectionChange
        );
    }

    return undefined;
  }, [handleConnectionChange]);

  return status;
}

function useWindowEvent<K extends string = keyof WindowEventMap>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(
      type as keyof WindowEventMap,
      listener as any,
      options
    );
    return () =>
      window.removeEventListener(
        type as keyof WindowEventMap,
        listener as any,
        options
      );
  }, [type, listener, options]);
}
