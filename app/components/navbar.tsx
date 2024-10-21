"use client";
import { Home, House, Trophy, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    label: "Home",
    to: "",
    icon: <House size={20} />,
  },
  {
    label: "Leaderboard",
    to: "leaderboard",
    icon: <Trophy size={20} />,
  },
  {
    label: "Friends",
    to: "friends",
    icon: <Users size={20} />,
  },
];

function NavButton({
  navItem,
}: {
  navItem: {
    label: string;
    to: string;
    icon: any;
  };
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === `/${navItem.to.length > 0 ? navItem.to : ""}`;

  return (
    <button
      // onClick={(e) => {
      //   console.log("rerouting...");
      //   router.push(`/{${navItem.to}}`);
      // }}
      className="flex flex-col px-6 py-4 items-center gap-y-1 h-[78px]"
    >
      <div className={isActive ? "text-[#FE97D5]" : "text-[#787A80]"}>
        {navItem?.icon}
      </div>
      <h5
        className={`text-sm leading-4 text-center font-semibold ${
          isActive ? "text-[#FE97D5]" : "text-white"
        }`}
      >
        {navItem?.label}
      </h5>
    </button>
  );
}

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 w-full bg-[#0A0B0F]">
      {navItems.map((item, i) => (
        <NavButton navItem={item} key={i} />
      ))}
    </div>
  );
}
