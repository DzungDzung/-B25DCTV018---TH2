const FAV_KEY = 'favorites';
const THEME_KEY = 'theme';

export function loadFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}
export function saveFavs(set) {
  localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
}
export const loadTheme = () => localStorage.getItem(THEME_KEY) || 'light';
export const saveTheme = (t) => localStorage.setItem(THEME_KEY, t);
