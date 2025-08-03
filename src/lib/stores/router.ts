import { writable } from 'svelte/store';

// Simple page store to simulate SvelteKit's $page store
export const page = writable({
  url: {
    pathname: '/',
    searchParams: new URLSearchParams()
  }
});

// Router store for navigation
export const currentRoute = writable('/');

// Simple router function
export function navigate(path: string) {
  window.history.pushState({}, '', path);
  currentRoute.set(path);
  page.update(p => ({
    ...p,
    url: {
      pathname: path,
      searchParams: new URLSearchParams(window.location.search)
    }
  }));
}

// Handle browser back/forward
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  currentRoute.set(path);
  page.update(p => ({
    ...p,
    url: {
      pathname: path,
      searchParams: new URLSearchParams(window.location.search)
    }
  }));
});

// Initialize with current path
const initialPath = window.location.pathname;
currentRoute.set(initialPath);
page.update(p => ({
  ...p,
  url: {
    pathname: initialPath,
    searchParams: new URLSearchParams(window.location.search)
  }
}));
