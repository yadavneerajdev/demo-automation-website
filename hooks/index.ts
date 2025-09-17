// Custom React hooks following SOLID principles
import { useState, useEffect, useCallback, useRef } from "react";
import { StorageUtils, debounce } from "@/lib/utils-extended";
import { TableState, SortOrder } from "@/types";

// Hook for local storage state management
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = StorageUtils.getItem<T>(key);
      return item ?? initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          StorageUtils.setItem(key, valueToStore);
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}

// Hook for managing modal state
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  const openModal = useCallback((modalData?: any) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return {
    isOpen,
    data,
    openModal,
    closeModal,
  };
}

// Hook for API calls with loading and error states
export function useApiCall<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

// Hook for table state management
export function useTableState<T>(initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [state, setState] = useState<TableState>({
    sortBy: null,
    sortOrder: SortOrder.ASC,
    currentPage: 1,
    itemsPerPage: 10,
    searchQuery: "",
    filters: {},
  });

  const updateSort = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      sortBy: key,
      sortOrder:
        prev.sortBy === key && prev.sortOrder === SortOrder.ASC
          ? SortOrder.DESC
          : SortOrder.ASC,
      currentPage: 1,
    }));
  }, []);

  const updateSearch = useCallback((query: string) => {
    setState((prev) => ({
      ...prev,
      searchQuery: query,
      currentPage: 1,
    }));
  }, []);

  const updateFilters = useCallback((filters: Record<string, any>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
      currentPage: 1,
    }));
  }, []);

  const updatePage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const updateItemsPerPage = useCallback((itemsPerPage: number) => {
    setState((prev) => ({ ...prev, itemsPerPage, currentPage: 1 }));
  }, []);

  // Filter and sort data
  const processedData = data
    .filter((item) => {
      // Apply search
      if (state.searchQuery) {
        const searchLower = state.searchQuery.toLowerCase();
        return Object.values(item as any).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((item) => {
      // Apply filters
      return Object.entries(state.filters).every(([key, value]) => {
        if (!value) return true;
        return (item as any)[key] === value;
      });
    });

  // Sort data
  if (state.sortBy) {
    processedData.sort((a, b) => {
      const aValue = (a as any)[state.sortBy!];
      const bValue = (b as any)[state.sortBy!];

      if (aValue < bValue) return state.sortOrder === SortOrder.ASC ? -1 : 1;
      if (aValue > bValue) return state.sortOrder === SortOrder.ASC ? 1 : -1;
      return 0;
    });
  }

  // Paginate data
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const paginatedData = processedData.slice(
    startIndex,
    startIndex + state.itemsPerPage
  );

  const totalPages = Math.ceil(processedData.length / state.itemsPerPage);

  return {
    data: paginatedData,
    allData: processedData,
    state,
    totalPages,
    totalItems: processedData.length,
    updateSort,
    updateSearch,
    updateFilters,
    updatePage,
    updateItemsPerPage,
    setData,
  };
}

// Hook for debounced value
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Hook for previous value
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// Hook for copy to clipboard
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  }, []);

  return { copied, copy };
}

// Hook for toggle state
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
}
