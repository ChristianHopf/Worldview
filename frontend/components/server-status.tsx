"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

type Props = {};
export function ServerStatus({}: Props) {
  const [serverStatus, setServerStatus] = useState({
    players: 0,
    status: "online",
  });
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/status`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch server status");
      }

      const data = await response.json();
      console.log(data);
      setServerStatus(data);
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const startServer = async () => {
    setStarting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/start`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start server");
      }

      await fetchStatus();
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setStarting(false);
    }
  };

  const stopServer = async () => {
    setStopping(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stop`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to stop server");
      }

      await fetchStatus();
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setStopping(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <>
      <h2>Server Status: {serverStatus.status}</h2>
      <div className="flex items-center gap-4">
        <Button
          className="w-24 h-10"
          onClick={startServer}
          disabled={serverStatus.status === "online"}
        >
          {starting ? <Loader2 className=" animate-spin" /> : "Start"}
        </Button>
        <Button
          className="w-24 h-10"
          onClick={stopServer}
          disabled={serverStatus.status === "offline"}
        >
          {stopping ? <Loader2 className=" animate-spin" /> : "Stop"}
        </Button>
      </div>
    </>
  );
}

export default ServerStatus;
