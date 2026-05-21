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

    const cached = sheetCache[csvUrl];
    if (cached) {
      setData(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }

    const cacheBusterUrl = `${csvUrl}${csvUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;

    fetchSheetData(cacheBusterUrl)
      .then(res => {
        sheetCache[csvUrl] = res; // Save to global cache
        setData(res);
        setError(null);
      })
      .catch(err => {
        // Only set error state if we have nothing in cache to overlay
        if (!sheetCache[csvUrl]) {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [csvUrl]);

  return { data, loading, error };
}
