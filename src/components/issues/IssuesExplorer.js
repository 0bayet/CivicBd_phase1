"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, RotateCcw, SlidersHorizontal, SearchX, CloudOff } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { STATUSES } from "@/data/statuses";
import { loadDemoIssues } from "@/lib/issuesApi";
import Button from "../ui/Button";
import IssueCard from "./IssueCard";

const PAGE_SIZE = 6;

const SORT_OPTIONS = [
  { id: "newest", label: "Newest first", compare: (a, b) => b.date.localeCompare(a.date) },
  { id: "oldest", label: "Oldest first", compare: (a, b) => a.date.localeCompare(b.date) },
  { id: "supported", label: "Most supported", compare: (a, b) => b.supporters - a.supporters },
];

const DEFAULT_FILTERS = { query: "", category: "all", status: "all", sort: "newest" };

function SkeletonGrid() {
  return (
    <div className="issue-grid" aria-hidden="true">
      {Array.from({ length: 3 }, (_, index) => (
        <div className="skeleton" key={index}>
          <div className="skeleton__block" style={{ height: 180 }} />
          <div style={{ padding: 20, display: "grid", gap: 12 }}>
            <div className="skeleton__block" style={{ height: 14, width: "40%", borderRadius: 8 }} />
            <div className="skeleton__block" style={{ height: 22, width: "90%", borderRadius: 8 }} />
            <div className="skeleton__block" style={{ height: 14, width: "100%", borderRadius: 8 }} />
            <div className="skeleton__block" style={{ height: 14, width: "70%", borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function IssuesExplorer() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialCategory = CATEGORIES.some((category) => category.id === categoryParam) ? categoryParam : "all";
  const initialQuery = searchParams.get("q") ?? "";
  const simulateError = searchParams.get("demo") === "error";

  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, category: initialCategory, query: initialQuery });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [issues, setIssues] = useState([]);
  const [loadState, setLoadState] = useState("loading");

  const load = useCallback(async (fail) => {
    setLoadState("loading");
    try {
      setIssues(await loadDemoIssues({ fail }));
      setLoadState("ready");
    } catch {
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    load(simulateError);
  }, [load, simulateError]);

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const sorter = SORT_OPTIONS.find((option) => option.id === filters.sort) ?? SORT_OPTIONS[0];

    return issues
      .filter((issue) => filters.category === "all" || issue.category === filters.category)
      .filter((issue) => filters.status === "all" || issue.status === filters.status)
      .filter(
        (issue) =>
          !query || [issue.title, issue.description, issue.location, issue.id].join(" ").toLowerCase().includes(query)
      )
      .sort(sorter.compare);
  }, [issues, filters]);

  // Counts for the status tabs ignore the status filter itself.
  const statusCounts = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    const base = issues
      .filter((issue) => filters.category === "all" || issue.category === filters.category)
      .filter(
        (issue) =>
          !query || [issue.title, issue.description, issue.location, issue.id].join(" ").toLowerCase().includes(query)
      );
    const counts = { all: base.length };
    STATUSES.forEach((status) => {
      counts[status.id] = base.filter((issue) => issue.status === status.id).length;
    });
    return counts;
  }, [issues, filters.query, filters.category]);

  const hasActiveFilters =
    filters.query !== "" || filters.category !== "all" || filters.status !== "all" || filters.sort !== "newest";

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
    setVisibleCount(PAGE_SIZE);
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
    setVisibleCount(PAGE_SIZE);
  }

  const visible = results.slice(0, visibleCount);

  return (
    <div className="container page-body">
      <section className="card filter-bar" aria-label="Search and filter reports">
        <div className="filter-bar__row">
          <div className="input-icon filter-bar__search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              className="input"
              placeholder="Search by title, description or place"
              aria-label="Search reports"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
            />
          </div>

          <select
            className="select"
            aria-label="Filter by category"
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="status-tabs" role="group" aria-label="Filter by status">
          {[{ id: "all", label: "All" }, ...STATUSES].map((status) => (
            <button
              key={status.id}
              type="button"
              className="status-tab"
              aria-pressed={filters.status === status.id}
              onClick={() => updateFilter("status", status.id)}
            >
              {status.label}
              <span className="status-tab__count">{loadState === "ready" ? statusCounts[status.id] : "–"}</span>
            </button>
          ))}
        </div>

        <div className="filter-bar__row filter-bar__row--meta">
          <p className="filter-bar__count" role="status" aria-live="polite">
            <SlidersHorizontal size={18} aria-hidden="true" />
            {loadState === "ready" ? (
              <span>
                Showing <strong>{results.length}</strong> of {issues.length} reports
              </span>
            ) : (
              <span>{loadState === "loading" ? "Loading reports…" : "Reports unavailable"}</span>
            )}
          </p>

          <div className="filter-bar__controls">
            <label className="filter-bar__sort">
              <span>Sort by</span>
              <select
                className="select"
                value={filters.sort}
                onChange={(event) => updateFilter("sort", event.target.value)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <Button variant="ghost" size="sm" icon={RotateCcw} onClick={clearFilters} disabled={!hasActiveFilters}>
              Clear filters
            </Button>
          </div>
        </div>
      </section>

      {loadState === "loading" && <SkeletonGrid />}

      {loadState === "error" && (
        <div className="state-panel state-panel--error" role="alert">
          <span className="state-panel__icon">
            <CloudOff size={28} aria-hidden="true" />
          </span>
          <h2>Reports could not be loaded</h2>
          <p>Something went wrong while loading the reports. Check your connection and try again.</p>
          <Button onClick={() => load(false)} icon={RotateCcw}>
            Try again
          </Button>
        </div>
      )}

      {loadState === "ready" && results.length === 0 && (
        <div className="state-panel">
          <span className="state-panel__icon">
            <SearchX size={28} aria-hidden="true" />
          </span>
          <h2>No reports match these filters</h2>
          <p>Try a different search term, or remove a filter to see more reports.</p>
          <Button variant="secondary" onClick={clearFilters} icon={RotateCcw}>
            Clear filters
          </Button>
        </div>
      )}

      {loadState === "ready" && results.length > 0 && (
        <>
          <div className="issue-grid">
            {visible.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>

          <div className="issue-more">
            {visible.length < results.length ? (
              <Button variant="secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                Show more reports
              </Button>
            ) : null}
            <p>
              Showing {visible.length} of {results.length} matching reports
            </p>
          </div>
        </>
      )}
    </div>
  );
}
