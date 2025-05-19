"use client";

import MemberList from "@/components/members/member-list";

export default function Members() {
  return (
    <div className="min-h-screen grid grid-cols-2 items-start w-full">
      <MemberList />
      <div className="m-4">
        <p>Extra player information from Mojang API goes here.</p>
      </div>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
