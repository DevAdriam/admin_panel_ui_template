import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "../nav-main";
import { NavUser } from "../nav-user";
import { BranchSwitcher } from "../branch-switcher";

const data = {
  user: {
    name: "New Sense",
    email: "newsense@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  branches: [
    {
      name: "New Sense ( Bahan Branch )",
      logo: GalleryVerticalEnd,
      plan: "Based",
    },
    {
      name: "New Sense ( South Okkalapa Branch )",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "New Sense ( Tamwe Branch )",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "SKU",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Brand",
          url: "/brands",
        },
        {
          title: "Category",
          url: "/categories",
        },
        {
          title: "Product",
          url: "/proudcts",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BranchSwitcher branches={data.branches} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
