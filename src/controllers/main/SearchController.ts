import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";

import SearchAPIs from "@/src/apis/search";
import { IMediaItem } from "@/src/apis/interfaces";

export const useSearchController = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IMediaItem[]>([]);
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // To hold the cancel token for Axios requests
  const [cancelTokenSource, setCancelTokenSource] =
    useState<CancelTokenSource | null>(null);

  // Handle query changes with debounce and reset page/results on new query
  useEffect(() => {
    if (!query) {
      setResults([]);
      setHasMore(false);
      return;
    }

    // Reset results and page when the query or media type changes
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchSearchResults(1, query, mediaType); // Fetch first page immediately
  }, [query, mediaType]);

  // Fetch next page
  const fetchNextPage = () => {
    if (loading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  // Search API function
  const fetchSearchResults = async (
    pageNum: number,
    searchQuery: string,
    type: "movie" | "tv"
  ) => {
    setLoading(true);

    // Cancel the previous request if it exists
    if (cancelTokenSource) cancelTokenSource.cancel();

    // Create a new cancel token for this request
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    try {
      const response = await SearchAPIs[
        type === "movie" ? "searchMovie" : "searchTV"
      ](searchQuery, pageNum, source.token);

      // Append new results to existing ones
      setResults((prevResults) => [...prevResults, ...response.results]);

      // Update hasMore based on whether more results are available
      setHasMore(response.results.length > 0);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous search request canceled");
      } else {
        console.error("Search API error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch results when page changes (for pagination)
  useEffect(() => {
    if (page > 1) {
      fetchSearchResults(page, query, mediaType);
    }
  }, [page]);

  // Expose functions and state
  return {
    query,
    setQuery,
    results,
    loading,
    mediaType,
    setMediaType,
    fetchNextPage,
    hasMore,
  };
};
