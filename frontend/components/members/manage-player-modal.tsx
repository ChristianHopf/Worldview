import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Switch } from "@radix-ui/react-switch";
import { Label } from "@radix-ui/react-label";
import { Player } from "@/types/player";

type Props = {
  player: Player;
};

export default function ManagePlayerModal({ player }: Props) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Manage {player.name}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="op-status">Operator Status</Label>
          <Switch />
        </div>
        <Button>Kick</Button>
        <Button>Ban</Button>
      </div>
    </DialogContent>
  );
}
