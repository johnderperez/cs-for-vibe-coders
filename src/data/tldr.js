// One-line TL;DRs shown on phase pages. Full detail stays in phases.js (in expandable sections).
export const tldr = {
  "phase-1-machine": { line: "Your code becomes chip instructions + limited memory. Know the basics so you can tell a real fix from a fake one.", topics: [
    "Everything is bits. Hex is shorthand. AND/OR/NOT decide every if.",
    "Fetch → decode → execute, billions of times a second. Work is real.",
    "Stack = short-lived scratchpad. Heap = shared, must be freed.",
    "Compiled ahead vs. run as you go. TS types vanish at runtime.",
    "References point at shared data. Leaks = memory nobody lets go.",
    "One thing at a time; waiting is parked. Forget `await` → bugs.",
  ]},
  "phase-2-algorithms": { line: "AI code works on demo data. This phase is about what happens when the data gets real.", topics: [
    "How work grows with data: O(1), O(log n), O(n), O(n²).",
    "Rows, chains, LIFO and FIFO. Queues and undo are everywhere.",
    "Key → instant lookup. The #1 fix for slow loops.",
    "Parents/children and connections: comments, menus, permissions.",
    "Halve to search; n log n to sort. JS sorts numbers as text!",
    "Functions calling themselves; walk graphs wide or deep.",
  ]},
  "phase-3-engineering": { line: "Generating code is easy. Changing it next month without breaking things is the craft.", topics: [
    "Snapshots + branches = your undo button for AI.",
    "UI, business rules and data in separate places.",
    "Five principles that let you swap parts without rewrites.",
    "Smells hint at trouble. Debt charges interest.",
    "Unit → integration → end-to-end. Proof the fix didn't break stuff.",
    "Red, green, refactor. The test is a spec AI can't fake.",
  ]},
  "phase-4-systems": { line: "Where vibe-coded apps break: leaky data, slow pages, fake security. Fix that here.", topics: [
    "Requests, responses and status codes. Read the Network tab.",
    "Your server's menu. Every endpoint is a public door.",
    "Start on Postgres. Store each fact once.",
    "Indexes = speed. Transactions = all-or-nothing.",
    "Cache answers, queue slow jobs. Beware stale cache.",
    "Who are you vs. what can you do. Verify on the server.",
    "Start with a tidy monolith. Simple beats clever.",
  ]},
};
