import ServerStatus from "@/components/server-status";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main>
        <ServerStatus />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
