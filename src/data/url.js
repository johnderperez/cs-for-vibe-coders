// Prefix an internal path with the site base path, e.g. u('/rules') -> '/computer-science-for-vibe-coders/rules'.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (p = '/') => (base + p).replace(/(.)\/$/, '$1') || '/';
