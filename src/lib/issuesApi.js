import { DEMO_ISSUES } from "@/data/demoIssues";

// Stands in for a network request so loading and error states can be shown.
// Replace the body of this function with a real data call.
export function loadDemoIssues({ fail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error("Request failed"));
        return;
      }
      resolve(DEMO_ISSUES);
    }, 500);
  });
}
