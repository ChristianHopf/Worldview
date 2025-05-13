"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

type Props = {};
export function ServerStatus({}: Props) {
  const [isRunning, setIsRunning] = useState(false);

  const toggleServer = () => {
    isRunning ? stopServer() : startServer();
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

      toggleServer();
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const stopServer = () => {};

  return (
    <div>
      <h2>Server Status: {isRunning ? "running" : "stopped"}</h2>
      <Button onClick={toggleServer} variant="default">
        {isRunning ? "Stop Server" : "Start Server"}
      </Button>
    </div>
  );
}

export default ServerStatus;
