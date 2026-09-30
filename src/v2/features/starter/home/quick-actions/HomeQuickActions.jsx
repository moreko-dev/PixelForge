import {
  LuArrowRight,
  LuCloud,
  LuImage,
  LuLayoutTemplate,
  LuPlus,
} from "react-icons/lu";
import HomeActionCenter from "./../common/HomeActionCenter";

const quickActionsItems = [
  {
    Icon: LuImage,
    action: "Open Image",
    desc: "Choose a photo from your device.",
    iconWrapperBg: "bg-accent",
  },
  {
    Icon: LuPlus,
    action: "Create New",
    desc: "Start with a blank canvas.",
    iconWrapperBg: "bg-success",
  },
  {
    Icon: LuLayoutTemplate,
    action: "Templates",
    desc: "Use pre-designed templates.",
    iconWrapperBg: "bg-warning",
  },
  {
    Icon: LuCloud,
    action: "From cloud",
    desc: "Open file from your cloud storage.",
    iconWrapperBg: "bg-secondary",
  },
];

function QuickActionsItem({
  // eslint-disable-next-line no-unused-vars
  Icon,
  action,
  desc,
  iconWrapperBg = "",
  iconWrapperColor = "",
}) {
  return (
    <div className="cursor-pointer basis-75 shrink-0 p-6 flex items-center justify-between gap-4 rounded-2xl bg-surface transition-colors duration-300 hover:bg-surface-hover border border-border">
      <div className="flex flex-col gap-2">
        <span
          className={`w-fit text-2xl p-3 rounded-lg ${iconWrapperBg} ${iconWrapperColor}`}
        >
          <Icon />
        </span>
        <span className="text-lg">{action}</span>
        <span className="text-text-muted text-sm">{desc}</span>
      </div>
      <div>
        <LuArrowRight className="text-xl text-text-muted" />
      </div>
    </div>
  );
}

function HomeQuickActions() {
  return (
    <HomeActionCenter
      title="Quick Actions"
      desc="Get started with popular tools and features."
      className="flex gap-6 mb-8 flex-nowrap overflow-x-auto pb-2"
    >
      {quickActionsItems.map((item, index) => (
        <QuickActionsItem key={index} {...item} />
      ))}
    </HomeActionCenter>
  );
}

export default HomeQuickActions;
