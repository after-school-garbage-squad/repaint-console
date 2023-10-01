export const getIdToken = async () => {
  const response = await fetch("/api/user", {
    method: "GET",
    cache: "no-store",
  });

  const idToken = await response.json();

  return idToken;
};
