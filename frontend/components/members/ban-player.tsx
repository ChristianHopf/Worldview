import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@/types/player";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  player: Player;
};

export function BanPlayer({ player }: Props) {
  const banPlayer = () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Ban</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ban {player.name}?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <DialogDescription>
            The player will be banned from the server.
          </DialogDescription>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={banPlayer}>Ban</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
