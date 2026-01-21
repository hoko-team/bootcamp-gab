"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { EventFilters, EventPeriod, EventView } from "@/lib/types";

const DEFAULT_FILTERS: EventFilters = {
  cities: [],
  types: [],
  period: "all",
  tags: [],
  view: "list",
};

export function useEventFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo<EventFilters>(() => {
    const cities = searchParams.get("city")?.split(",").filter(Boolean) ?? [];
    const types = searchParams.get("type")?.split(",").filter(Boolean) ?? [];
    const period = (searchParams.get("period") as EventPeriod) || "all";
    const tags = searchParams.get("tag")?.split(",").filter(Boolean) ?? [];
    const view = (searchParams.get("view") as EventView) || "list";

    return { cities, types, period, tags, view };
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: Partial<EventFilters>) => {
      const newFilters = { ...filters, ...updates };
      const params = new URLSearchParams();

      if (newFilters.cities.length > 0) {
        params.set("city", newFilters.cities.join(","));
      }
      if (newFilters.types.length > 0) {
        params.set("type", newFilters.types.join(","));
      }
      if (newFilters.period !== "all") {
        params.set("period", newFilters.period);
      }
      if (newFilters.tags.length > 0) {
        params.set("tag", newFilters.tags.join(","));
      }
      if (newFilters.view !== "list") {
        params.set("view", newFilters.view);
      }

      const queryString = params.toString();
      router.push(`${pathname}${queryString ? `?${queryString}` : ""}`, {
        scroll: false,
      });
    },
    [filters, pathname, router]
  );

  const toggleCity = useCallback(
    (city: string) => {
      const cities = filters.cities.includes(city)
        ? filters.cities.filter((c) => c !== city)
        : [...filters.cities, city];
      updateFilters({ cities });
    },
    [filters.cities, updateFilters]
  );

  const toggleType = useCallback(
    (type: string) => {
      const types = filters.types.includes(type)
        ? filters.types.filter((t) => t !== type)
        : [...filters.types, type];
      updateFilters({ types });
    },
    [filters.types, updateFilters]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const cleanTag = tag.startsWith("#") ? tag.slice(1) : tag;
      const tags = filters.tags.includes(cleanTag)
        ? filters.tags.filter((t) => t !== cleanTag)
        : [...filters.tags, cleanTag];
      updateFilters({ tags });
    },
    [filters.tags, updateFilters]
  );

  const setPeriod = useCallback(
    (period: EventPeriod) => {
      updateFilters({ period });
    },
    [updateFilters]
  );

  const setView = useCallback(
    (view: EventView) => {
      updateFilters({ view });
    },
    [updateFilters]
  );

  const resetFilters = useCallback(() => {
    updateFilters(DEFAULT_FILTERS);
  }, [updateFilters]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.cities.length > 0 ||
      filters.types.length > 0 ||
      filters.period !== "all" ||
      filters.tags.length > 0
    );
  }, [filters]);

  return {
    filters,
    updateFilters,
    toggleCity,
    toggleType,
    toggleTag,
    setPeriod,
    setView,
    resetFilters,
    hasActiveFilters,
  };
}
