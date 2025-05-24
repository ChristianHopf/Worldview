"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Player } from "@/types/player";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ManagePlayer } from "./manage-player";
import { KickPlayer } from "./kick-player";
import { Skeleton } from "../ui/skeleton";
import { BanPlayer } from "./ban-player";

type Props = {};

export default function MemberList({}: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  //   const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    setError(false);
    try {
      //   const response = await fetch(
      //     `${process.env.NEXT_PUBLIC_API_URL}/api/players`,
      //     {
      //       cache: "no-store",
      //     }
      //   );

      //   if (response.ok || response.status == 503) {
      //     const data = await response.json();
      //     //   console.log(data);
      //     setPlayers(data.players);
      //     setLoading(false);
      //     if (response.status == 503) {
      //       setError(true);
      //     }
      //   } else {
      //     throw new Error("Failed to fetch players");
      //   }
      setPlayers([
        {
          name: "abcdefghijklmnop",
          uuid: "1c2b719f-e824-4bdd-a5ca-d0023a619dc5",
          online: true,
          isOp: true,
        },
        {
          name: "sirquacc",
          uuid: "1c2b719f-e824-4bdd-a5ca-d0023a619dc6",
          online: false,
          isOp: false,
        },
        {
          name: "Odin_25",
          uuid: "1c2b719f-e824-4bdd-a5ca-d0023a619dc7",
          online: false,
          isOp: false,
        },
      ]);
      setLoading(false);
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const onlinePlayers = players.filter((player) => player.online);
  const offlinePlayers = players.filter((player) => !player.online);

  return (
    <>
      <Card className="m-4 w-full max-w-4xl">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                className="w-24 h-10"
                onClick={fetchPlayers}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Refresh"}
              </Button>
              {error && (
                <span className="text-red-500">
                  Failed to fetch players from server. Cached member data is
                  displayed below.
                </span>
              )}
            </div>
            {loading ? (
              <div className="flex flex-col gap-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-full max-w-[650px]" />
                      <Skeleton className="h-4 w-11/12 max-w-[600px]" />
                      <Skeleton className="h-4 w-full max-w-[675px]" />
                      <Skeleton className="h-4 w-10/12 max-w-[625px]" />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Online Players ({onlinePlayers.length})
                  </h2>
                  {onlinePlayers.length > 0 ? (
                    <Table className="table-fixed w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Name</TableHead>
                          <TableHead className="w-24">Player ID</TableHead>
                          <TableHead className="w-[80px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {onlinePlayers.map((player) => (
                          <TableRow key={player.uuid}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell className="font-mono">
                              {player.uuid}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <ManagePlayer player={player} />
                                <KickPlayer player={player} />
                                <BanPlayer player={player} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No players are currently online.
                    </p>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Offline Players ({offlinePlayers.length})
                  </h2>
                  {offlinePlayers.length > 0 ? (
                    <Table className="table-fixed w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">Name</TableHead>
                          <TableHead className="w-24">Player ID</TableHead>
                          <TableHead className="w-[80px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {offlinePlayers.map((player) => (
                          <TableRow key={player.uuid}>
                            <TableCell>{player.name}</TableCell>
                            <TableCell className="font-mono">
                              {player.uuid}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <ManagePlayer player={player} />
                                <BanPlayer player={player} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No offline players found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
