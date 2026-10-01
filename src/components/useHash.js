import { useEffect, useState } from "react";
export default function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const read = () => setHash(window.location.hash.slice(1));
    read();
    window.addEventListener("popstate", read);
    window.addEventListener("hashchange", read);
    return () => {
      window.removeEventListener("popstate", read);
      window.removeEventListener("hashchange", read);
    };
  }, []);
  function navigate(value) {
    if (window.location.hash.slice(1) !== value)
      window.history.pushState(
        null,
        "",
        window.location.pathname +
          window.location.search +
          (value ? "#" + value : ""),
      );
    setHash(value);
  }
  return [hash, navigate];
}
