"use client";

import MemberList from "@/components/members/member-list";
import Whitelist from "@/components/members/whitelist";

export default function Members() {
  return (
    <div className="min-h-screen items-start w-full">
      <MemberList />
      {/* <div className="m-4">
        <p>Extra player information from Mojang API goes here.</p>
      </div> */}
      <Whitelist />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
