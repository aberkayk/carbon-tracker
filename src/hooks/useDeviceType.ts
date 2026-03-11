import { useState, useEffect } from "react";

export type DeviceType = "MOBILE" | "TABLET" | "WEB";

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  function getDeviceType(): DeviceType {
    const width = window.innerWidth;
    if (width < 768) return "MOBILE";
    if (width < 1024) return "TABLET";
    return "WEB";
  }

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}
