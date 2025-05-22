import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type Props = {};
export default function ServerMemory({}: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Server Memory Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p>1.8/4 GB (2.2 GB available)</p>
        </div>

        {/* <Button>Check Status</Button> */}
      </CardContent>
    </Card>
  );
}
