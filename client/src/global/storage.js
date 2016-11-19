export function localSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function localGet(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function localRemove(key) {
  localStorage.removeItem(key);
}
