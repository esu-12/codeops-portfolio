import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, {
    signal: controller.signal
  })

  .then((response) => {

    if (!response.ok) {
  throw new Error("Could not fetch data.");
}

return response.json();

  })

  .then((result) => {
  setData(result);
  setLoading(false);
})

.catch((error) => {
  if (error.name !== "AbortError") {
    setError(error.message);
    setLoading(false);
  }
});

return () => {
  controller.abort();
};

  }, [url]);

  return { data, loading, error };
}


export default useFetch;