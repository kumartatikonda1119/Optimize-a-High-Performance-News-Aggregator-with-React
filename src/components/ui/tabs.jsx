import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn.js";

const Tabs = TabsPrimitive.Root;

const TabsList = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1",
      className,
    )}
    {...props}
  />
);

const TabsTrigger = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "rounded-full px-4 py-2 text-sm font-medium text-white/60 transition data-[state=active]:bg-white/10 data-[state=active]:text-white",
      className,
    )}
    {...props}
  />
);

const TabsContent = TabsPrimitive.Content;

export { Tabs, TabsList, TabsTrigger, TabsContent };
