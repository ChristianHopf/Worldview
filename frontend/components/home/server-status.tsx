"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {};
export function ServerStatus({}: Props) {
  const [serverStatus, setServerStatus] = useState({
    players: 0,
    status: "online",
  });
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const [stopping, setStopping] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
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
      setLoading(false);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Server Status</CardTitle>
      </CardHeader>
      {loading ? (
        <Loader2 className=" animate-spin" />
      ) : (
        <>
          <CardContent>
            <p className="mb-4">{serverStatus.status}</p>
            <Button
              onClick={
                serverStatus.status === "online" ? stopServer : startServer
              }
              disabled={loading}
            >
              {starting ? (
                <Loader2 className=" animate-spin" />
              ) : serverStatus.status === "offline" ? (
                "Start"
              ) : (
                "Stop"
              )}
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default ServerStatus;
