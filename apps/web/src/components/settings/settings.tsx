"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  ButtonProps,
  cn,
  useIsDesktop,
} from "@repo/ui";
import { SidebarItem } from "../workspace/sidebar-item";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PanelLeft, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SidebarItemBtn } from "../workspace/sidebar-item-btn";

interface Settings {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsContext = createContext<Settings>({
  active: "",
  setActive: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
});

function Settings({
  children,
  defaultActive = "",
}: {
  defaultActive?: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<string>(defaultActive);
  const isDesktop = useIsDesktop();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <SettingsContext.Provider
      value={{ active, setActive, isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

function SettingsSidebar({ children }: { children: React.ReactNode }) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SettingsContext);

  return (
    <>
      <div
        className={cn(
          "flex h-dvh min-h-0  shrink-0 grow flex-col border-r border-border/50  py-10 transition-all ",
          isSidebarOpen && "w-56 max-w-56 px-6",

          !isSidebarOpen && "invisible w-0 max-w-0 border-0 px-0",
        )}
      >
        <div className="flex justify-between pb-6 text-muted-foreground">
          <h2 className={(!isSidebarOpen && "invisible") || ""}>Settings</h2>
          <SidebarItemBtn
            Icon={PanelLeft}
            onClick={() => setIsSidebarOpen((s) => !s)}
            className={(!isSidebarOpen && "invisible") || ""}
          />
        </div>
        <div className="flex-1 overflow-y-scroll">{children}</div>
      </div>
    </>
  );
}

function SettingsSidebarList({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-1 py-3">{children}</ul>;
}

function SettingsSidebarHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
      {children}
    </div>
  );
}

function SettingsSidebarItem({
  value,
  accordion,
  children,
}: {
  value: string;
  accordion?: boolean;
  children?: React.ReactNode;
}) {
  const { setActive, active, setIsSidebarOpen } = useContext(SettingsContext);
  const isDesktop = useIsDesktop();

  if (accordion) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="i-1">
          <AccordionTrigger asChild>
            <SidebarItem
              noIcon
              label={value}
              className={cn(
                "justify-start py-1.5 pl-7 pr-1.5 capitalize",
                active === value && "bg-accent text-accent-foreground",
              )}
              // onClick={() => {
              //   if (!isDesktop) setIsSidebarOpen(false);
              //   setActive(value);
              // }}
            />
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <SidebarItem
      noIcon
      label={value}
      className={cn(
        "justify-start py-1.5 pl-7 pr-1.5 capitalize",
        active === value && "bg-accent text-accent-foreground",
      )}
      onClick={() => {
        if (!isDesktop) setIsSidebarOpen(false);
        setActive(value);
      }}
    />
  );
}

function SettingsContent({
  id,
  children,
  className = "max-w-2xl",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { isSidebarOpen, setIsSidebarOpen, active } =
    useContext(SettingsContext);

  if (active !== id) return null;

  return (
    <div className="flex w-full basis-full justify-center overflow-y-scroll bg-page px-4 py-10">
      <div
        className={cn(
          "flex w-full shrink-0 grow flex-col items-center",
          className,
        )}
      >
        <div className="h-[2.75rem] w-full ">
          <div className="flex w-full items-start justify-between">
            <SidebarItemBtn
              Icon={PanelLeft}
              className={cn(
                "-ml-1 w-fit opacity-100  transition-all duration-300",
                isSidebarOpen && "invisible opacity-0",
              )}
              onClick={() => setIsSidebarOpen((s) => !s)}
            />

            <SettingsClose />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function SettingsContentHeader({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="pb-6">
      <div className="space-y-1.5">
        <h2 className="text-xl">{label}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function SettingsContentSection({
  children,
  header,
  action,
  className,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
  header?: string;
  className?: string;
}) {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between pb-4">
        <h3 className=" text-base">{header}</h3>
        {action}
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

function SettingsContentDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function SettingsContentAction(props: ButtonProps) {
  return <Button {...props} size="sm" className="w-fit" />;
}

function SettingsClose() {
  const { workspaceId }: { workspaceId: string } = useParams();
  const router = useRouter();

  return (
    <Button
      className="-mr-1  items-start
       p-0 text-muted-foreground/70 transition-all hover:text-foreground"
      size="fit"
      variant="link"
      onClick={() => router.push("/workspaces/" + workspaceId)}
    >
      <X className="h-6 w-6" />
    </Button>
  );
}

export {
  Settings,
  SettingsSidebar,
  SettingsSidebarList,
  SettingsSidebarHeader,
  SettingsSidebarItem,
  SettingsContent,
  SettingsClose,
  SettingsContentHeader,
  SettingsContentSection,
  SettingsContentDescription,
  SettingsContentAction,
};
