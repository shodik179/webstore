import Papa from 'papaparse';

/**
 * Fetch and parse CSV data from Google Sheets export link
 * @param {string} csvUrl 
 * @returns Promise<Array>
 */
export function fetchSheetData(csvUrl) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(), // Otomatis menghapus spasi ekstra pada judul kolom
      complete: (results) => {
        // filter out rows that might be completely empty
        const cleanData = results.data.filter(row => Object.values(row).some(val => val !== ''));
        resolve(cleanData);
      },
      error: (error) => {
        console.error("Error fetching sheet data:", error);
        reject(error);
      }
    });
  });
}
