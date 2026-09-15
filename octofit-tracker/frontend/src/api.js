const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function apiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`;
}

function collectionFromPayload(payload, resource) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload[resource])) return payload[resource];
  return [];
}

export async function fetchCollection(resource) {
  const response = await fetch(apiUrl(resource));
  if (!response.ok) {
    throw new Error(`Could not load ${resource} (${response.status})`);
  }

  const payload = await response.json();
  return collectionFromPayload(payload, resource);
}