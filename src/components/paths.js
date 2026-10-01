export function asset(path) {
  if (process.env.NODE_ENV === "development" && path.endsWith(".html")) {
    path = path === "/index.html" ? "/" : path.slice(0, -5);
  }
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
