"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export function ServerLogs({}: Props) {
  const [logs, setLogs] = useState<Set<string>>(new Set<string>());
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLPreElement>(null);

  const fetchLogs = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logs`);
    if (!response.ok) {
      throw new Error("Failed to fetch server logs");
    }

    const data = await response.json();

    setLogs(data.logs);
    setLoading(false);
  };

  const pollLogs = async () => {
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView(false);
    }
  }, [logs]);

  // Poll for logs every 5 seconds
  useEffect(() => {
    fetchLogs();
    const interval = setInterval(() => {
      pollLogs();
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Server Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh] border-2 p-2">
          {loading ? (
            <>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-[650px]" />
                    <Skeleton className="h-4 w-[600px]" />
                    <Skeleton className="h-4 w-[675px]" />
                    <Skeleton className="h-4 w-[625px]" />
                  </div>
                ))}
            </>
          ) : (
            <pre
              className="text-sm font-mono pre-wrap text-wrap"
              ref={scrollRef}
            >
              {logs}
            </pre>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ServerLogs;
