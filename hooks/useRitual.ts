
import { useOthers } from "@liveblocks/react";

export function useRitualPresence() {
    try {
        const others = useOthers();
        // Return count + 1 (myself)
        return (others?.length || 0) + 1;
    } catch (e) {
        // Fallback if not inside provider or error
        return 1;
    }
}
