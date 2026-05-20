import { useState, useEffect } from 'react';
import { fetchSheetData } from '../utils/fetchData';

export function useSheetData(csvUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(!!csvUrl);
  const [error, setError] = useState(null);
  const [prevCsvUrl, setPrevCsvUrl] = useState(csvUrl);

  if (csvUrl !== prevCsvUrl) {
    setPrevCsvUrl(csvUrl);
    setLoading(!!csvUrl);
  }

  useEffect(() => {
    if (!csvUrl) return;
    
    const cacheBusterUrl = `${csvUrl}${csvUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    fetchSheetData(cacheBusterUrl)
      .then(res => {
        setData(res);
        setError(null);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [csvUrl]);

  return { data, loading, error };
}
