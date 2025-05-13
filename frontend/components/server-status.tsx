"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

type Props = {};
export function ServerStatus({}: Props) {
  const [serverStatus, setServerStatus] = useState({
    status: "offline",
    players: 0,
  });

  const toggleIsRunning = () => {
    setIsRunning((prev) => !prev);
  };

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
          cache: "no-store",
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
          cache: "no-store",
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
