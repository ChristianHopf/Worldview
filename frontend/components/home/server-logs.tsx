"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

type Props = {};

export function ServerLogs({}: Props) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const sse = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/logs/stream`
    );

    // function handleStream(data: string) {
    //   setLogs(data);
    // }

    sse.onmessage = (event) => {
      // handleStream(event.data);
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    sse.onerror = (event) => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className=" min-h-[50vh] border-2 px-2">
          <pre className="pre-wrap">{logs}</pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default ServerLogs;
