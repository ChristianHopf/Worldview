import ServerHealth from "@/components/home/server-memory";
import ServerLogs from "@/components/home/server-logs";
import ServerStatus from "@/components/home/server-status";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <ServerStatus />
        <ServerHealth />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ServerLogs />
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
