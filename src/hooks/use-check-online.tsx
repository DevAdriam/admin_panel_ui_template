import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNetwork } from "./use-network";

export default function useCheckOnline() {
  const { online } = useNetwork();
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (online && !wasOffline) return;

    if (online) {
      toast.success("You are back online.");
      setWasOffline(false);
    } else {
      setWasOffline(true);
      if (wasOffline) toast.error("You are are currently offline.");
    }
  }, [online, wasOffline]);

  return online;
}
