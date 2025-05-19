"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Player } from "@/types/player";
import MemberList from "@/components/members/member-list";
import { Card, CardContent } from "@/components/ui/card";

export default function Members() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          name: "mathdoer512",
          uuid: "1c2b719f-e824-4bdd-a5ca-d0023a619dc5",
          online: true,
        },
        {
          name: "sirquacc",
          uuid: "1c2b719f-e824-4bdd-a5ca-d0023a619dc6",
          online: false,
        },
        {
          name: "Odin_25",
          uuid: "1c2b719f-e824-4bdd-a5ca-d0023a619dc7",
          online: false,
        },
      ]);
      setLoading(false);
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-2 items-start w-full">
      {/* <div className="flex flex-col gap-2 m-4 justify-center">
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className="w-24 h-10"
            onClick={fetchPlayers}
          >
            {loading ? <Loader2 className=" animate-spin" /> : "Refresh"}
          </Button>
          {error ? (
            <span className="text-red-500">
              Failed to fetch players from server. Cached member data is
              displayed below.
            </span>
          ) : (
            ""
          )}
        </div>
        {loading ? (
          <Loader2 className=" animate-spin mx-auto" />
        ) : (
          <MemberList players={players} />
        )}
      </div> */}
      <Card className="m-4">
        <CardContent>
          <div className="flex flex-col gap-2">
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
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <MemberList players={players} />
            )}
          </div>
        </CardContent>
      </Card>
      <div className="m-4">
        <p>Extra player information from Mojang API goes here.</p>
      </div>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
