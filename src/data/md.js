const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export const md = s => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
