import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type Props = {};
export default function Serverhealth({}: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Server Health</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>Uptime: 2:43:11</p>
          <p>Memory: 1.8 GB</p>
        </div>

        <Button>Check Status</Button>
      </CardContent>
    </Card>
  );
}
