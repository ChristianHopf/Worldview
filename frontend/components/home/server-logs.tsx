"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

export function ServerLogs({}: Props) {
  const [logs, setLogs] = useState<Set<string>>(new Set<string>());

  const fetchLogs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logs`);
    if (!response.ok) {
      throw new Error("Failed to fetch server logs");
    }

    const data = await response.json();

    setLogs((prevLogs) => {
      const newLogs = new Set(prevLogs);
      newLogs.add(data.logs);
      return newLogs;
    });
  };

  // Poll for logs every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLogs();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Log streaming useEffect
  // useEffect(() => {
  //   const sse = new EventSource(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/logs/stream`
  //   );

  //   // function handleStream(data: string) {
  //   //   setLogs(data);
  //   // }

  //   sse.onmessage = (event) => {
  //     // handleStream(event.data);
  //     setLogs((prevLogs) => [...prevLogs, event.data + "\n"]);
  //   };

  //   sse.onerror = (event) => {
  //     sse.close();
  //   };

  //   return () => {
  //     sse.close();
  //   };
  // }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh] border-2 px-2">
          <pre className="text-sm font-mono pre-wrap">{logs}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ServerLogs;
