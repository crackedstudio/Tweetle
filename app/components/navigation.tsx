import { House, Trophy, Users } from "lucide-react";

const navItems = [
  {
    label: "Home",
    to: "",
    icon: <House size={20} />,
  },
  {
    label: "Leaderboard",
    to: "",
    icon: <Trophy size={20} />,
  },
  {
    label: "Home",
    to: "",
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
  return (
    <button className="flex flex-col px-6 py-4 items-center gap-y-1 h-[78px]">
      <div className="text-[#787A80]">{navItem.icon}</div>
      <h5 className="text-sm leading-4 text-center font-semibold">
        {navItem.label}
      </h5>
    </button>
  );
}

export default function Navigation() {
  return (
    <div className="flex justify-between items-center px-6 w-full bg-[#0A0B0F]">
      {navItems.map((item, i) => (
        <NavButton navItem={item} key={i} />
      ))}
    </div>
  );
}
