"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Player {
  id: number;
  name: string;
  online: boolean;
}

export default function Members() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/players`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }

      const data = await response.json();
      //   console.log(data);
      setPlayers(data.players);
      setLoading(false);
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-start max-w-4xl">
      <Button className="w-24 h-10" onClick={fetchPlayers}>
        {loading ? <Loader2 className=" animate-spin" /> : "Refresh"}
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Player ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.online ? "Online" : "Offline"}</TableCell>
              <TableCell className="font-medium">{player.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
