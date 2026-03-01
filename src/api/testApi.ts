

export function saveTestResult(
  summary: any,
  results: any[],
  token: string,
  userId: string,
) {
  return fetch(`${import.meta.env.VITE_API_URL}/save-test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ summary, results, userId }),
  });
}


export async function getUserTests(userId: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/user-tests/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
