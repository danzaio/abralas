
"use client";

import { LiveblocksProvider, RoomProvider } from "@liveblocks/react";
import { ReactNode } from "react";

export function RitualWrapper({ children }: { children: ReactNode }) {
    const API_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

    if (!API_KEY) {
        console.warn("Liveblocks key missing. Presence disabled.");
        return <>{children}</>;
    }

    return (
        <LiveblocksProvider publicApiKey={API_KEY}>
            <RoomProvider id="abralas-global" initialPresence={{}}>
                {children}
            </RoomProvider>
        </LiveblocksProvider>
    );
}
