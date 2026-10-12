// Per-topic step slugs + a quick quiz for each step. Order matches phases.js topics.
// q: question, o: options, a: index of correct option, x: explanation shown after answering.
export const steps = {
"how-computers-work": [
 { s:"binary-and-logic", q:"What is 255 in hexadecimal?", o:["FF","100","F0","255h"], a:0, x:"255 = 11111111 in binary = FF in hex. Each hex digit is 4 bits." },
 { s:"the-cpu", q:"A loop over 1 million rows is slow but the code is only 3 lines. Why?", o:["Short code is always fast, so it's a network issue","The CPU still has to execute every iteration","JavaScript skips loops over 1,000 items"], a:1, x:"Code length isn't work. The CPU fetches, decodes and runs each step, a million times." },
 { s:"stack-vs-heap", q:"'Maximum call stack size exceeded' usually means…", o:["The server ran out of disk","A function kept calling itself with no way to stop","The heap is full of images"], a:1, x:"Each call adds a stack frame. Endless recursion fills the stack." },
 { s:"compilers-and-interpreters", q:"Does a TypeScript type check data coming from an API at runtime?", o:["Yes, always","Only in strict mode","No, types are erased when compiled to JavaScript"], a:2, x:"Types vanish at runtime. Validate external data with a schema (e.g. Zod)." },
 { s:"pointers-and-leaks", q:"`const b = a; b.name = 'x';` where a is an object. What is a.name?", o:["'x'","Unchanged","undefined"], a:0, x:"a and b point to the same object. Change one, you change 'both'." },
 { s:"async-event-loop", q:"You forgot an `await` before saving to the database. What happens?", o:["A syntax error","Code continues before the save finishes","The save is cancelled"], a:1, x:"Without await, the next line runs immediately, maybe before the write is done." },
],
"algorithms-and-data": [
 { s:"big-o", q:"A loop inside a loop over the same list of n items is…", o:["O(n)","O(log n)","O(n²)"], a:2, x:"n × n steps. 1,000 items → 1,000,000 steps." },
 { s:"lists-stacks-queues", q:"An undo button is best modelled as a…", o:["Queue (first in, first out)","Stack (last in, first out)","Hash map"], a:1, x:"Undo removes the most recent action first: last in, first out." },
 { s:"hash-maps", q:"Best fix for `users.find()` inside a loop over orders?", o:["Build a Map of users by id once, then look up","Sort the orders first","Use a for loop instead of .find()"], a:0, x:"Map lookups are ~O(1), turning O(n²) into O(n)." },
 { s:"trees-and-graphs", q:"Comments with nested replies are a…", o:["Queue","Tree","Flat array only"], a:1, x:"Each reply has one parent: that's a tree." },
 { s:"search-and-sort", q:"In JavaScript, `[10, 9, 1].sort()` returns…", o:["[1, 9, 10]","[10, 9, 1]","[1, 10, 9]"], a:2, x:"Default sort compares as text. Use `.sort((a, b) => a - b)`." },
 { s:"recursion-bfs-dfs", q:"Which explores a graph level by level?", o:["Breadth-first search (BFS)","Depth-first search (DFS)","Binary search"], a:0, x:"BFS goes wide first, level by level. DFS goes deep first." },
],
"code-that-lasts": [
 { s:"git", q:"Before a big AI prompt that will touch many files, you should…", o:["Commit (ideally on a branch)","Delete node_modules","Turn off CI"], a:0, x:"A commit is your undo button if the generation goes wrong." },
 { s:"separation-of-concerns", q:"A component that queries the DB, computes prices and renders HTML is…", o:["Efficient","Mixing three concerns that should be separate","Required by React"], a:1, x:"Split UI, business logic and data access so changes don't ripple." },
 { s:"solid-and-patterns", q:"Which principle lets you swap Stripe for another provider easily?", o:["Single responsibility","Depend on interfaces, not vendors","Copy-paste reuse"], a:1, x:"Code against a simple payments interface; plug in the vendor behind it." },
 { s:"code-smells", q:"Which is a code smell?", o:["A function with 8 parameters named data1…data8","A short, well-named function","A unit test"], a:0, x:"Too many params and vague names hint the code needs refactoring." },
 { s:"testing", q:"A test that drives a real browser through sign-up is a…", o:["Unit test","End-to-end test","Lint rule"], a:1, x:"E2E tests act like a user, in a real browser." },
 { s:"tdd", q:"The TDD cycle is…", o:["Code, ship, test","Red, green, refactor","Refactor, red, green"], a:1, x:"Write a failing test (red), make it pass (green), clean up (refactor)." },
],
"building-for-scale": [
 { s:"how-the-web-talks", q:"Logged in, but not allowed to see a record. Which status code fits?", o:["401","403","500"], a:1, x:"401 = not authenticated. 403 = authenticated but not allowed." },
 { s:"apis", q:"Where must an API check who's allowed?", o:["Only in the UI","On the server","In the README"], a:1, x:"Anyone can call your API directly. The server must enforce access." },
 { s:"databases", q:"Normalization means…", o:["Storing each fact once and linking to it","Copying data everywhere for speed","Using NoSQL"], a:0, x:"One fact, one place. Fewer inconsistent copies, fewer bugs." },
 { s:"indexes-and-transactions", q:"Payment recorded but order missing after a crash. What was missing?", o:["An index","A transaction","A cache"], a:1, x:"A transaction makes related writes all succeed or all fail." },
 { s:"caching-and-queues", q:"Sending a welcome email shouldn't make sign-up wait. Use a…", o:["Queue","Bigger font","Second database"], a:0, x:"Put the job on a queue and process it in the background." },
 { s:"auth", q:"`if (user)` before editing a record checks…", o:["Authorization","Authentication only (logged in?)","Both"], a:1, x:"You also need `user.id === record.owner_id`: are they allowed?" },
 { s:"system-design", q:"Best default architecture for a new app?", o:["20 microservices","A well-organized monolith","One file"], a:1, x:"Simple systems are easier to secure, debug and pay for." },
],
};

// Featured activity per track (rendered on the track overview page).
export const bigO = [
 { c:"users.get(id)  // Map lookup", a:"O(1)" },
 { c:"for (const x of list) total += x", a:"O(n)" },
 { c:"for (a of list) for (b of list) compare(a, b)", a:"O(n²)" },
 { c:"binarySearch(sortedList, target)", a:"O(log n)" },
 { c:"list.sort((a, b) => a - b)", a:"O(n log n)" },
 { c:"orders.map(o => users.find(u => u.id === o.userId))", a:"O(n²)" },
];
export const bugs = {
 "how-computers-work": { title:"Spot the bug", code:"async function save(item) {\n  db.insert(item);\n  showToast('Saved!');\n}", lines:["async function save(item) {","  db.insert(item);","  showToast('Saved!');","}"], bad:1, x:"Line 2 is missing `await`. The toast shows before the insert finishes, and errors are never caught." },
 "code-that-lasts": { title:"Spot the bug", code:"", lines:["try {","  await chargeCard(order);","} catch (e) {","}","markPaid(order);"], bad:3, x:"The empty `catch {}` swallows the error, so a failed charge still gets marked paid. Handle or rethrow it." },
 "building-for-scale": { title:"Spot the bug", code:"", lines:["app.get('/api/invoices/:id', async (req, res) => {","  if (!req.user) return res.status(401).end();","  const inv = await db.invoice.find(req.params.id);","  res.json(inv);","});"], bad:2, x:"Line 3 fetches any invoice by id without checking it belongs to req.user. Any logged-in user can read anyone's invoice." },
};
export const order = { title:"Put the ship steps in order", items:["Create a branch","Commit small changes","Open a pull request","CI runs checks","Merge to main","Deploy from main"] };
