"use client";

import {
  createContext,
  useCallback,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_MATCH_PROFILE,
  type MatchProfile,
} from "@/lib/smart-match";

type EngagementContextValue = {
  hasHydrated: boolean;
  savedPropertyIds: string[];
  recentPropertyIds: string[];
  matchProfile: MatchProfile;
  toggleSavedProperty: (propertyId: string) => void;
  rememberProperty: (propertyId: string) => void;
  updateMatchProfile: (updates: Partial<MatchProfile>) => void;
  resetMatchProfile: () => void;
};

const EngagementContext = createContext<EngagementContextValue | null>(null);

const SAVED_KEY = "realstate4u.saved-properties";
const RECENT_KEY = "realstate4u.recent-properties";
const PROFILE_KEY = "realstate4u.match-profile";

export function EngagementProvider({ children }: { children: ReactNode }) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [recentPropertyIds, setRecentPropertyIds] = useState<string[]>([]);
  const [matchProfile, setMatchProfile] = useState<MatchProfile>(DEFAULT_MATCH_PROFILE);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SAVED_KEY);
      const recent = window.localStorage.getItem(RECENT_KEY);
      const storedProfile = window.localStorage.getItem(PROFILE_KEY);

      if (saved) {
        setSavedPropertyIds(JSON.parse(saved) as string[]);
      }

      if (recent) {
        setRecentPropertyIds(JSON.parse(recent) as string[]);
      }

      if (storedProfile) {
        setMatchProfile({
          ...DEFAULT_MATCH_PROFILE,
          ...(JSON.parse(storedProfile) as MatchProfile),
        });
      }
    } catch {
      setSavedPropertyIds([]);
      setRecentPropertyIds([]);
      setMatchProfile(DEFAULT_MATCH_PROFILE);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedPropertyIds));
  }, [hasHydrated, savedPropertyIds]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentPropertyIds));
  }, [hasHydrated, recentPropertyIds]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(matchProfile));
  }, [hasHydrated, matchProfile]);

  const toggleSavedProperty = useCallback((propertyId: string) => {
    startTransition(() => {
      setSavedPropertyIds((current) =>
        current.includes(propertyId)
          ? current.filter((id) => id !== propertyId)
          : [propertyId, ...current].slice(0, 24),
      );
    });
  }, []);

  const rememberProperty = useCallback((propertyId: string) => {
    startTransition(() => {
      setRecentPropertyIds((current) => {
        const next = [propertyId, ...current.filter((id) => id !== propertyId)].slice(0, 12);
        return next.every((id, index) => id === current[index]) && next.length === current.length ? current : next;
      });
    });
  }, []);

  const updateMatchProfile = useCallback((updates: Partial<MatchProfile>) => {
    startTransition(() => {
      setMatchProfile((current) => ({
        ...current,
        ...updates,
      }));
    });
  }, []);

  const resetMatchProfile = useCallback(() => {
    startTransition(() => {
      setMatchProfile(DEFAULT_MATCH_PROFILE);
    });
  }, []);

  const value = useMemo<EngagementContextValue>(
    () => ({
      hasHydrated,
      savedPropertyIds,
      recentPropertyIds,
      matchProfile,
      toggleSavedProperty,
      rememberProperty,
      updateMatchProfile,
      resetMatchProfile,
    }),
    [
      hasHydrated,
      matchProfile,
      recentPropertyIds,
      resetMatchProfile,
      rememberProperty,
      savedPropertyIds,
      toggleSavedProperty,
      updateMatchProfile,
    ],
  );

  return <EngagementContext.Provider value={value}>{children}</EngagementContext.Provider>;
}

export function useEngagement() {
  const context = useContext(EngagementContext);

  if (!context) {
    throw new Error("useEngagement must be used within EngagementProvider");
  }

  return context;
}
