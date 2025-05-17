import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Members() {
  return (
    <div className="min-h-screen flex flex-col items-start max-w-4xl">
      <Button>Refresh</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">mathdoer512</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Offline</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
