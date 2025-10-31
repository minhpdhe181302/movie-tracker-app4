import { useEffect, useState } from "react";
import { getAll } from "../storage/trackerStorage";

export function useStorage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return { items, setItems, loading };
}
