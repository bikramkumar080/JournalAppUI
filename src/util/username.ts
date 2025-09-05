export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || payload.username || null;
  } catch {
    return null;
  }
}