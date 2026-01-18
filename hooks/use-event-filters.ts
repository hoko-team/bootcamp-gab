"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";
import type {
  FilterParams,
  EventType,
  PeriodFilter,
} from "@/lib/utils/filter-events";

function getPeriodFilter(value: string | null): PeriodFilter {
  if (value === "replays") return "past";
  if (value === "upcoming") return "upcoming";
  if (value === "past") return "past";
  return "all";
}

/**
 * Custom hook for managing event filter state with URL synchronization
 *
 * This hook:
 * - Reads filter values from URL query params
 * - Provides methods to update filters (updates URL)
 * - Provides a reset method to clear all filters
 * - Tracks whether any filters are active
 *
 * URL format:
 * /events?cities=paris,lille&type=meetup&period=upcoming
 */
export function useEventFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse current filters from URL (memoized)
  const filters = useMemo<FilterParams>(() => {
    const citiesParam = searchParams.get("cities");
    const typeParam = searchParams.get("type");
    const periodParam = searchParams.get("period");

    return {
      cities: citiesParam ? citiesParam.split(",").filter(Boolean) : [],
      type: (typeParam as EventType | "all") || "all",
      period: getPeriodFilter(periodParam),
    };
  }, [searchParams]);

  // Update URL with new filters (preserves other params)
  const setFilters = useCallback(
    (newFilters: Partial<FilterParams>) => {
      const updatedFilters = { ...filters, ...newFilters };
      const params = new URLSearchParams();

      // Only add params if they're not default values
      if (updatedFilters.cities.length > 0) {
        params.set("cities", updatedFilters.cities.join(","));
      }
      if (updatedFilters.type !== "all") {
        params.set("type", updatedFilters.type);
      }
      if (updatedFilters.period !== "all") {
        params.set("period", updatedFilters.period);
      }

      const url = params.toString() ? `${pathname}?${params}` : pathname;
      router.push(url, { scroll: false });
    },
    [filters, router, pathname]
  );

  // Helper methods for specific filter types
  const setCities = useCallback(
    (cities: string[]) => {
      setFilters({ cities });
    },
    [setFilters]
  );

  const setType = useCallback(
    (type: EventType | "all") => {
      setFilters({ type });
    },
    [setFilters]
  );

  const setPeriod = useCallback(
    (period: PeriodFilter) => {
      setFilters({ period });
    },
    [setFilters]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(
    () =>
      filters.cities.length > 0 ||
      filters.type !== "all" ||
      filters.period !== "all",
    [filters]
  );

  // Count how many filters are active (for mobile badge)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.cities.length > 0) count++;
    if (filters.type !== "all") count++;
    if (filters.period !== "all") count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    setCities,
    setType,
    setPeriod,
    resetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
