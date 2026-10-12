export const phases = [
{
  slug: "phase-1-machine",
  num: 1,
  title: "The Machine Mental Model",
  short: "How computers actually run your code",
  goal: "Stop treating the computer (and the AI) as magic. Understand bits, memory and what really happens when your code runs.",
  intro: "Every app you build with Lovable, Cursor or Claude eventually turns into instructions a chip follows one at a time, using a limited amount of memory. You don't need to design chips. You do need a rough picture of what's going on underneath, because that picture is what lets you tell a real bug from a fake fix.",
  topics: [
    { h: "Binary, hex and Boolean logic", p: "Computers only store on/off values (bits). Group 8 bits and you get a byte, enough for a number from 0 to 255. Hexadecimal (like #FF5733 in a color) is just a compact way to write bytes. Boolean logic (AND, OR, NOT) is how every if-statement and permission check eventually gets decided.", why: "When an AI writes `if (user.isAdmin || isOwner && canEdit)`, the order those operators are evaluated in decides who can edit your data. Knowing Boolean logic lets you catch that." },
    { h: "The CPU and the execution cycle", p: "The processor repeats one loop billions of times a second: fetch the next instruction, decode it, run it. It keeps a few values in super-fast slots called registers. Everything else lives in slower memory.", why: "This is why 'just loop over everything' works fine with 100 rows and falls over with 1 million. The work is real, even if the code looks short." },
    { h: "Stack vs. heap memory", p: "The stack is a tidy, short-lived scratchpad for each function call: it's cleaned up automatically when the function returns. The heap is a big shared space for data that needs to stick around (objects, lists, user sessions). Heap memory has to be freed, either by you (C) or by a garbage collector (JavaScript, Python).", why: "'Maximum call stack size exceeded' means a function kept calling itself and filled the stack. A server that slowly uses more and more RAM usually means something is holding on to heap memory it no longer needs." },
    { h: "Compilers and interpreters", p: "A compiler translates your whole program into machine code before it runs (C, Go, Rust). An interpreter or runtime reads and runs it as it goes (Python, JavaScript in Node or the browser). TypeScript is compiled into JavaScript, and its types vanish at runtime.", why: "TypeScript types do not check data coming from users or APIs at runtime. AI tools often 'fix' a type error with `as any`, which silences the warning and hides the real bug." },
    { h: "Pointers, allocation and memory leaks", p: "A pointer (or reference) is an address: 'the data lives over there'. Two variables can point to the same object, so changing one changes 'both'. A leak happens when something keeps a reference to memory you'll never use again, so it's never freed.", why: "Classic React bug: mutating state objects in place so the UI doesn't update, or adding event listeners and intervals in useEffect without cleaning them up." },
    { h: "Async: the event loop", p: "JavaScript runs one thing at a time. When it waits on the network or a timer, it parks that work and handles other things, coming back when the result is ready. `async/await` is a nicer way to write that waiting.", why: "Forgotten `await`s, unhandled promise rejections and race conditions are some of the most common bugs in AI-generated code." }
  ],
  mistakes: [
    "Using `as any` or `// @ts-ignore` to make a type error disappear instead of fixing the data shape.",
    "Missing `await`, so code continues before the database write actually finished.",
    "Mutating objects or arrays in place (e.g. `state.items.push(x)`) and wondering why the UI doesn't update.",
    "setInterval / event listeners / subscriptions created in a component with no cleanup, causing slowdowns and duplicate calls.",
    "Loading an entire table into memory to count or filter it, instead of asking the database to do it.",
    "Recursive functions with no base case, crashing with a stack overflow on real data."
  ],
  milestones: [
    "Explain, out loud, the difference between the stack and the heap with a real example from your own app.",
    "Convert a few numbers between decimal, binary and hex by hand (e.g. 255 → 11111111 → FF).",
    "Complete Weeks 0–5 of Harvard CS50x, including the C problem sets where you manage memory and arrays yourself.",
    "Find one `await` that was missing (or deliberately remove one) in a project and explain what broke.",
    "Open your browser's DevTools Memory or Performance tab and record a profile of your own app."
  ],
  reading: [
    { t: "Code: The Hidden Language of Computer Hardware and Software (Charles Petzold)", u: "https://www.codehiddenlanguage.com/", n: "The core book for this phase. Builds a computer up from light switches. Very readable." },
    { t: "Harvard CS50x (free)", u: "https://cs50.harvard.edu/x/", n: "The hands-on milestone. Free lectures, problem sets and an auto-grader." },
    { t: "Nand2Tetris (free)", u: "https://www.nand2tetris.org/", n: "Optional deep dive: build a computer from logic gates up to a working program." },
    { t: "MDN: JavaScript memory management", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management", n: "How garbage collection works in the language most vibe-coded apps use." },
    { t: "MDN: Using promises", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises", n: "The clearest explanation of async code and why forgetting `await` hurts." },
    { t: "MIT: The Missing Semester of Your CS Education (free)", u: "https://missing.csail.mit.edu/", n: "Terminal, shell, editors, debugging: the tooling nobody teaches." }
  ]
},
{
  slug: "phase-2-algorithms",
  num: 2,
  title: "Algorithms & Data Structures",
  short: "Why code is slow, and how to organize data",
  goal: "Understand why some code runs slowly and how to pick the right shape for your data.",
  intro: "AI tools write code that works on the demo data. Algorithms and data structures are about what happens when the data gets real: 10,000 listings, 50 users clicking at once, a list that keeps growing. This phase gives you the vocabulary to spot slow code before your users do.",
  topics: [
    { h: "Big-O notation (time and space)", p: "Big-O describes how work grows as your data grows. O(1): same speed no matter the size (looking up a key in a map). O(n): work grows in step with the data (one pass through a list). O(n²): a loop inside a loop. 1,000 items means 1,000,000 steps. O(log n): halve the problem each step (binary search).", why: "Ask the AI 'what's the Big-O of this?' for any loop over user data. Nested loops over two lists are the number-one cause of 'it was fast in dev, slow in prod'." },
    { h: "Arrays, linked lists, stacks and queues", p: "An array is a row of numbered boxes: instant to read by position, slow to insert in the middle. A linked list is a chain where each item points to the next. A stack is last-in-first-out (undo history). A queue is first-in-first-out (a job queue, a waiting line).", why: "Background jobs, emails to send, retry logic and undo buttons are all stacks and queues in disguise." },
    { h: "Hash maps (objects, dictionaries, Maps, Sets)", p: "A hash map turns a key into a storage location, so finding 'user_123' is basically instant regardless of size. In JavaScript that's an object, `Map` or `Set`; in Python a `dict` or `set`.", why: "The single most useful fix for slow code: replace `array.find()` inside a loop with a Map built once. That turns O(n²) into O(n)." },
    { h: "Trees and graphs", p: "A tree is data with parents and children: folders, comments with replies, the HTML DOM, database indexes (B-trees). A graph is anything with connections in any direction: social networks, road maps, 'related listings'.", why: "Nested comments, org charts, categories and permissions are trees. Recognizing that saves you from tangled, buggy code." },
    { h: "Searching and sorting", p: "Binary search finds an item in a sorted list by halving it each step: 1 million items takes about 20 checks. Merge sort and quicksort sort in O(n log n). You'll rarely write a sort yourself, but you should know what `.sort()` costs and that JavaScript's default sort compares numbers as text.", why: "`[10, 9, 1].sort()` gives `[1, 10, 9]` in JavaScript. AI code hits this bug constantly." },
    { h: "Recursion, BFS and DFS", p: "Recursion is a function that calls itself on a smaller piece of the problem until it hits a base case. Breadth-first search (BFS) explores a graph level by level; depth-first search (DFS) goes as deep as it can first.", why: "Rendering nested menus, walking a file tree or finding 'shortest path' features all rely on these." }
  ],
  mistakes: [
    "`.find()` or `.filter()` inside a `.map()` over large lists (hidden O(n²)).",
    "Calling the database or an API inside a loop (the 'N+1 query' problem) instead of one batched query.",
    "Using `.sort()` on numbers without a compare function.",
    "Fetching every row and paginating in the browser instead of using LIMIT/OFFSET or cursors in the query.",
    "Recursion with no depth limit on user-supplied data.",
    "Re-computing the same expensive value on every render instead of caching or memoizing it."
  ],
  milestones: [
    "For three functions in your own app, write down their Big-O and justify it in one sentence each.",
    "Find one nested loop in a project and rewrite it using a Map or Set. Measure before and after.",
    "Solve 30 foundational problems (LeetCode Easy/Medium) without AI help. Write pseudocode first, then code.",
    "Implement a stack, a queue and binary search from scratch in the language you use most.",
    "Draw (on paper) the tree or graph hiding in one feature of your app."
  ],
  reading: [
    { t: "Grokking Algorithms (Aditya Bhargava)", u: "https://www.manning.com/books/grokking-algorithms-second-edition", n: "The core book for this phase. Illustrated, friendly, no heavy math." },
    { t: "VisuAlgo", u: "https://visualgo.net/", n: "Animated visualizations of sorting, trees, graphs and more." },
    { t: "NeetCode Roadmap", u: "https://neetcode.io/roadmap", n: "A structured order to tackle practice problems, with free video explanations." },
    { t: "LeetCode problem set", u: "https://leetcode.com/problemset/", n: "Where to do the 30-problem milestone. Filter by Easy first." },
    { t: "Big-O Cheat Sheet", u: "https://www.bigocheatsheet.com/", n: "Quick reference for the cost of common operations." },
    { t: "MDN: Array.prototype.sort()", u: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort", n: "Read it once; you'll never ship the number-sort bug again." }
  ]
},
{
  slug: "phase-3-engineering",
  num: 3,
  title: "Software Engineering & Clean Architecture",
  short: "Code that humans (and future you) can maintain",
  goal: "Write code that other people, future you, and future AI sessions can understand, test and safely change.",
  intro: "AI can generate a 900-line file in seconds. The hard part is changing it next month without breaking three other things. Software engineering is the craft of keeping a codebase easy to change. It matters even more with AI, because AI tools work best on small, clearly organized, well-tested code.",
  topics: [
    { h: "Version control with Git", p: "Git records snapshots (commits) of your project. A branch is a separate line of work; merging brings it back. A merge conflict is just Git asking you which of two edits to keep. Interactive rebase lets you tidy up commits before sharing them.", why: "Git is your undo button for AI. Commit before every big prompt, work on a branch, and you can always roll back a bad generation." },
    { h: "Separation of concerns and layers", p: "Keep the UI, the business rules and the data access in separate places. A typical split: components (what it looks like), services or server functions (what it does), and a data layer (how it's stored).", why: "When the AI puts a database query, pricing logic and HTML into one component, every future change risks breaking all three." },
    { h: "SOLID and design patterns, in plain English", p: "S: each module does one job. O: add features by adding code, not by editing working code everywhere. L: a substitute should behave like the original. I: don't force code to depend on things it doesn't use. D: depend on simple interfaces, not specific vendors. Patterns (adapter, strategy, factory) are named, reusable solutions to common shapes of problems.", why: "'Depend on interfaces' is what lets you swap Stripe for another payment provider, or Supabase for another database, without rewriting your app." },
    { h: "Code smells and technical debt", p: "A code smell is a hint something's off: giant files, copy-pasted blocks, functions with 8 parameters, vague names like `data2`, deep nesting. Technical debt is the shortcut you take now and pay interest on later.", why: "AI-generated code accumulates duplication fast, because each prompt solves the problem from scratch. Refactoring keeps the debt manageable." },
    { h: "Testing: unit, integration, end-to-end", p: "A unit test checks one function in isolation. An integration test checks pieces working together (your API plus the database). An end-to-end (E2E) test drives a real browser like a user. Mocks are stand-ins for slow or external things like payment APIs.", why: "Tests are how you know the AI's 'fix' didn't break something else. Ask the AI to write the test first, read it, then let it write the code." },
    { h: "Test-driven development (TDD)", p: "Write a failing test that describes what you want, write the smallest code that makes it pass, then clean up. Red, green, refactor.", why: "TDD is a great way to direct AI: the test is a precise spec that the model can't fake its way around." }
  ],
  mistakes: [
    "One giant component or file that fetches data, holds business logic and renders UI.",
    "Copy-pasted logic in several places, so a bug fix only gets applied to one of them.",
    "Tests that only check the 'happy path', or tests the AI changed so they'd pass.",
    "Swallowing errors with an empty `catch {}` so failures are silent.",
    "Huge commits mixing five unrelated changes, impossible to review or revert.",
    "Dead code, unused dependencies and leftover `console.log`s after many prompt iterations."
  ],
  milestones: [
    "Use a branch and a pull request for every change to one project for two weeks.",
    "Resolve a merge conflict by hand and explain which edit you kept and why.",
    "Take an AI-generated prototype and refactor it into clear layers (UI, logic, data).",
    "Add unit tests until core logic has over 80% coverage, and at least one end-to-end test of the main user flow.",
    "Write one feature test-first: failing test, then code, then refactor."
  ],
  reading: [
    { t: "The Pragmatic Programmer (Thomas & Hunt)", u: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/", n: "Core book. Practical habits of good developers." },
    { t: "Refactoring (Martin Fowler)", u: "https://refactoring.com/", n: "Core book. The catalog of safe ways to improve existing code." },
    { t: "Pro Git book (free)", u: "https://git-scm.com/book/en/v2", n: "The official, complete guide to Git." },
    { t: "Learn Git Branching", u: "https://learngitbranching.js.org/", n: "Interactive, visual Git practice in your browser." },
    { t: "Refactoring.Guru", u: "https://refactoring.guru/", n: "Free illustrated guides to code smells and design patterns." },
    { t: "Vitest", u: "https://vitest.dev/", n: "Fast test runner for JavaScript/TypeScript projects." },
    { t: "Playwright", u: "https://playwright.dev/", n: "End-to-end browser testing." }
  ]
},
{
  slug: "phase-4-systems",
  num: 4,
  title: "Systems & Scale",
  short: "Backends, databases and architecture",
  goal: "Move from a single-file script to real, multi-user production applications.",
  intro: "This is where vibe-coded apps most often get into trouble: data that leaks between users, pages that slow to a crawl, and logins that aren't as secure as they look. Systems knowledge is what turns a demo into a product people can trust with their data.",
  topics: [
    { h: "How the web talks: HTTP, TCP/IP, WebSockets", p: "Your browser opens a connection (TCP/IP), then sends HTTP requests (GET to read, POST to create, etc.) and gets responses with status codes (200 OK, 401 not logged in, 403 not allowed, 404 not found, 500 server error). HTTPS encrypts it. WebSockets keep a connection open for live updates.", why: "Knowing the status codes and reading the Network tab in DevTools will solve half your 'it doesn't work' moments." },
    { h: "APIs: REST and GraphQL", p: "An API is the menu your server offers. REST uses URLs and HTTP verbs (`GET /listings/42`). GraphQL lets the client ask for exactly the fields it needs from one endpoint.", why: "Every API endpoint is a public door. Check who's allowed through on the server, never only in the UI." },
    { h: "Databases: SQL vs. NoSQL, schemas and normalization", p: "Relational (SQL) databases like Postgres store data in tables with relationships and strict types. NoSQL stores (document, key-value) trade some of that structure for flexibility. Normalization means storing each fact once and linking to it, instead of copying it everywhere.", why: "Most apps should start on Postgres. A well-designed schema prevents an entire class of bugs before any code runs." },
    { h: "Indexes and ACID transactions", p: "An index is like a book's index: it lets the database jump to rows instead of scanning the whole table. A transaction groups several changes so they all succeed or all fail (ACID: atomic, consistent, isolated, durable).", why: "Missing indexes are why queries get slow as you grow. Missing transactions are why a payment gets recorded but the order doesn't." },
    { h: "Caching and queues", p: "A cache (like Redis or a CDN) stores answers you'll need again so you don't recompute them. A message queue holds jobs to process later (send email, resize images) so the user isn't kept waiting.", why: "Caching makes things fast, but stale cache is a classic bug. Queues make apps resilient when a third-party API is slow or down." },
    { h: "Authentication and authorization", p: "Authentication is 'who are you?' (login). Authorization is 'what are you allowed to do?' JWTs are signed tokens that carry identity; OAuth is how 'Sign in with Google' works. Both must be verified on the server.", why: "The most damaging vibe-coding bug: hiding a button in the UI but leaving the data readable through the API." },
    { h: "System design: scaling, load balancing, monolith vs. microservices", p: "Scaling up means a bigger server; scaling out means more servers behind a load balancer. A monolith is one deployable app; microservices split it into many. Start with a well-organized monolith almost always.", why: "AI tools happily suggest complex architectures. Simple systems are easier to secure, debug and pay for." }
  ],
  mistakes: [
    "Authorization checks only in the frontend; the API or database returns anything to anyone.",
    "Database tables exposed to the public key with Row Level Security turned off or set to `true` for everyone.",
    "SQL built by gluing strings together with user input (SQL injection).",
    "No indexes on columns you filter or join by, e.g. `user_id`.",
    "Several related writes with no transaction, leaving half-finished data on failure.",
    "Secrets (API keys, service-role keys) shipped to the browser in frontend code."
  ],
  milestones: [
    "Read your app's network requests in DevTools and explain what each one does and what status code it returns.",
    "Design a small schema on paper (tables, keys, relationships) before generating any code.",
    "Add an index to a slow query and show the difference using `EXPLAIN ANALYZE`.",
    "Prove you can't read another user's data: log in as user A and try to fetch user B's rows directly through the API.",
    "Build and deploy a full-stack app with real auth, versioned database migrations, your own API design and a cloud deployment."
  ],
  reading: [
    { t: "Designing Data-Intensive Applications (Martin Kleppmann)", u: "https://dataintensive.net/", n: "Core book. The best explanation of how data systems really work." },
    { t: "MDN: HTTP", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP", n: "Methods, status codes, headers, cookies, CORS." },
    { t: "PostgreSQL documentation", u: "https://www.postgresql.org/docs/current/", n: "The source of truth for the database most modern stacks use." },
    { t: "Use The Index, Luke (free)", u: "https://use-the-index-luke.com/", n: "SQL indexing and performance, explained for developers." },
    { t: "The System Design Primer", u: "https://github.com/donnemartin/system-design-primer", n: "Free, community-maintained guide to designing large systems." },
    { t: "OWASP Top 10", u: "https://owasp.org/www-project-top-ten/", n: "The most common web security risks." }
  ]
}
];
