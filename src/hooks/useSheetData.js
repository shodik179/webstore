import { useState, useEffect } from 'react';
import { fetchSheetData } from '../utils/fetchData';

// Global cache to store sheet data across page transitions safely
const sheetCache = {};

export function useSheetData(csvUrl) {
  const [data, setData] = useState(sheetCache[csvUrl] || []);
  const [loading, setLoading] = useState(!sheetCache[csvUrl] && !!csvUrl);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!csvUrl) return;

    let cancelled = false;
    const cached = sheetCache[csvUrl];
    Promise.resolve().then(() => {
      if (cancelled) return;

      if (cached) {
        setData(cached);
        setLoading(false);
      } else {
        setLoading(true);
      }
    });

    const cacheBusterUrl = `${csvUrl}${csvUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;

    fetchSheetData(cacheBusterUrl)
      .then(res => {
        if (cancelled) return;
        sheetCache[csvUrl] = res; // Save to global cache
        setData(res);
        setError(null);
      })
      .catch(err => {
        if (cancelled) return;
        // Only set error state if we have nothing in cache to overlay
        if (!sheetCache[csvUrl]) {
          setError(err);
        }
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [csvUrl]);

  return { data, loading, error };
}
