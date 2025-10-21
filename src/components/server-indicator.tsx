"use client";

import { useEffect, useState } from "react";

interface ServerInfo {
  serverId: string;
  serverColor: string;
  timestamp: string;
}

export function ServerIndicator() {
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServerInfo = async () => {
    try {
      const response = await fetch("/api/server-info", {
        cache: "no-store",
      });
      const data = await response.json();
      setServerInfo(data);
    } catch (error) {
      console.error("Failed to fetch server info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-gray-600 z-50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono">Loading...</span>
        </div>
      </div>
    );
  }

  if (!serverInfo) {
    return null;
  }

  return (
    <div
      className="fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg border-2 z-50 animate-in fade-in slide-in-from-top-5 duration-300"
      style={{
        backgroundColor: serverInfo.serverColor + "20",
        borderColor: serverInfo.serverColor,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: serverInfo.serverColor }}
        ></div>
        <div>
          <div
            className="text-xs font-semibold"
            style={{ color: serverInfo.serverColor }}
          >
            Connected to:
          </div>
          <div
            className="text-sm font-mono font-bold"
            style={{ color: serverInfo.serverColor }}
          >
            {serverInfo.serverId}
          </div>
        </div>
        <button
          onClick={fetchServerInfo}
          className="ml-2 px-2 py-1 text-xs rounded hover:bg-black/10 transition-colors"
          style={{ color: serverInfo.serverColor }}
          title="Refresh server info"
        >
          ↻
        </button>
      </div>
    </div>
  );
}
