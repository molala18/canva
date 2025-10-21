import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServerIndicator } from "@/components/server-indicator";

export default function Home() {
  return (
    <>
      <ServerIndicator />
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-4xl font-bold">Welcome to Canva Editor</h1>
        <Link href="/editor/new-project">
          <Button size="lg">Start Creating</Button>
        </Link>
      </div>
    </>
  );
}
