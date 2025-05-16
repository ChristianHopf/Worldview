import ServerLogs from "@/components/home/server-logs";
import ServerStatus from "@/components/home/server-status";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
        <div>
          <h1 className="text-3xl">Metrics</h1>
          <div className="flex flex-row">
            <ServerStatus />
          </div>
        </div>
        <div className="flex flex-row w-full">
          <ServerLogs />
        </div>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
