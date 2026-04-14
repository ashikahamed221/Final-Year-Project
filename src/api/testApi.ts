

export function saveTestResult(
  summary: any,
  results: any[],
  token: string,
  userId: string,
) {
  // http://localhost:5000/save-test
  return fetch(`https://ai-backend-r57w.onrender.com/save-test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ summary, results, userId }),
  });
}


export async function getUserTests(userId: string) {
  
  return fetch(`https://ai-backend-r57w.onrender.com/user-tests/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => console.log(res.json()));
  
}
