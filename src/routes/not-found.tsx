import NotFound from "@/features/not-found/NotFound";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
  component: NotFound,
});
