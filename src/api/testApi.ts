// export async function saveTestResult(summary: any, results: any[], userId?: string) {
//   return fetch("http://localhost:5000/save-test", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ summary, results, userId }),
//   });
// }
import { useAuth } from "@clerk/clerk-react";
// export const saveTestResult = async (summary: any, results: any[]) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("User not authenticated");
//   }

//   const response = await fetch("http://localhost:5000/save-test", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ summary, results }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to save test result");
//   }

//   return response.json();
// };

export function saveTestResult(
  summary: any,
  results: any[],
  token: string
) {
  return fetch("http://localhost:5000/save-test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ summary, results }),
  });
}


export async function getUserTests(userId: string) {
  return fetch(`http://localhost:5000/user-tests/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}
