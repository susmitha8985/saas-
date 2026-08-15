// Pyodide Service - Runs Python code directly in the browser
// No server needed for code execution

let pyodide = null;
let loading = false;
let loadPromise = null;

export async function getPyodide() {
  if (pyodide) return pyodide;

  if (loadPromise) return loadPromise;

  loading = true;
  loadPromise = (async () => {
    // Load Pyodide from CDN so we don't need it in node_modules
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
    });
    loading = false;
    return pyodide;
  })();

  return loadPromise;
}

export function isPyodideLoading() {
  return loading;
}
