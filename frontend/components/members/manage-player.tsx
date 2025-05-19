import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@radix-ui/react-switch";
import { Player } from "@/types/player";

type Props = {
  player: Player;
};

export function ManagePlayer({ player }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage {player.name}</DialogTitle>
          <DialogDescription>
            Manage operator status and kick or ban player from the server.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="operator" className="sr-only">
              Operator Status
            </Label>
            <Switch id="operator" />
          </div>
          <Button>Kick</Button>
          <Button>Ban</Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
