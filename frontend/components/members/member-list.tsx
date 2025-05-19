"use client";

import React, { useState } from "react";
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
import { Dialog } from "@radix-ui/react-dialog";
import ManagePlayerModal from "./manage-player-modal";

type Props = {
  players: Player[];
};

export default function MemberList({ players }: Props) {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();

  const onlinePlayers = players.filter((player) => player.online);
  const offlinePlayers = players.filter((player) => !player.online);

  return (
    <div className="flex flex-col gap-6">
      <Dialog
        open={!!selectedPlayer}
        onOpenChange={(open) => !open && setSelectedPlayer(null)}
      >
        {selectedPlayer && <ManagePlayerModal player={selectedPlayer} />}
      </Dialog>
      <div>
        <h2 className="text-xl font-semibold mb-2">
          Online Players ({onlinePlayers.length})
        </h2>
        {onlinePlayers.length > 0 ? (
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Name</TableHead>
                <TableHead className="w-[260px]">Player ID</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {onlinePlayers.map((player) => (
                <TableRow key={player.uuid}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell className="font-mono">{player.uuid}</TableCell>
                  <TableCell>
                    <span>
                      <Button onClick={() => setSelectedPlayer(player)}>
                        Manage
                      </Button>
                    </span>
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
                <TableHead className="w-[140px]">Name</TableHead>
                <TableHead className="w-[260px]">Player ID</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offlinePlayers.map((player) => (
                <TableRow key={player.uuid}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell className="font-mono">{player.uuid}</TableCell>
                  <TableCell>
                    <span>
                      <Button onClick={() => setSelectedPlayer(player)}>
                        Manage
                      </Button>
                    </span>
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
  );
}
