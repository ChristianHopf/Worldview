"use client";

import React from "react";
import { useEffect, useState } from "react";

type Props = {};

export function ServerLogs({}: Props) {
  const [logs, setLogs] = useState<string>();

  useEffect(() => {
    const sse = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/logs/stream`
    );

    function handleStream(data: string) {
      setLogs(data);
    }

    sse.onmessage = (event) => {
      handleStream(event.data);
    };

    sse.onerror = (event) => {
      sse.close();
    };

    return () => {
      sse.close();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h1>Server Logs</h1>
      <p>{logs}</p>
    </div>
  );
}

export default ServerLogs;
