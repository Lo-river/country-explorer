const KEY_SAVED = "savedCountries";
const KEY_SCORES = "quizScore";

export function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(KEY_SAVED) || "[]");
  } catch {
    return [];
  }
}

export function saveSaved(list) {
  localStorage.setItem(KEY_SAVED, JSON.stringify(list));
}

export function loadScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY_SCORES) || "[]");
  } catch {
    return [];
  }
}

export function addScore(obj) {
  const arr = loadScores();
  arr.push(obj);
  localStorage.setItem(KEY_SCORES, JSON.stringify(arr));
}

export const storageKeys = { KEY_SAVED, KEY_SCORES };