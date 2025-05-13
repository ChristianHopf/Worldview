"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {};
export function ServerStatus({}: Props) {
  const [serverStatus, setServerStatus] = useState({
    players: 0,
    status: "online",
  });

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
    }
  };

  const stopServer = async () => {
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
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div>
      <h2>Server Status: {serverStatus.status}</h2>
      <Button onClick={startServer} disabled={serverStatus.status === "online"}>
        Start
      </Button>
      <Button onClick={stopServer} disabled={serverStatus.status === "offline"}>
        Stop
      </Button>
    </div>
  );
}

export default ServerStatus;
