import type { ReactNode } from "react";
import { Drawer as VaulDrawer } from "vaul";
import { X } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery.ts";
import { Button } from "./Button.tsx";
import { Card } from "./Card.tsx";
import { Typography } from "./Typography.tsx";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
};

function Drawer({
  open,
  onOpenChange,
  title = "Dettagli libro",
  children,
}: DrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 769px)");

  return (
    <VaulDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={isDesktop ? "right" : "bottom"}
    >
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 z-40 bg-slate-950/40" />
        <VaulDrawer.Content
          className="fixed right-0 top-0 z-50 h-screen w-full max-w-xl outline-none"
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
          aria-describedby="undefined"
        >
          <Card
            padding="lg"
            className="flex h-full flex-col rounded-none border-l border-slate-200 bg-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.55)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <Typography as="h2" size="title">
                {title}
              </Typography>
              <VaulDrawer.Title className="sr-only">{title}</VaulDrawer.Title>
              <VaulDrawer.Description className="sr-only">
                {title}
              </VaulDrawer.Description>
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="aspect-square"
              >
                <X /> <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">{children}</div>
          </Card>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}

export { Drawer };
