**Senior Frontend Developer Take-Home Assignment: GitHub Repository Explorer**

**Goal:**

Build a small React application that allows users to search for GitHub repositories and view some basic details about them.

**Estimated Time:** 4-6 hours. Please don't feel pressured to spend significantly more time than this. Focus on quality over quantity of features.

**Core Task:**

Create a single-page application (SPA) with the following features:

1.  **Repository Search:**
    *   An input field where users can type a search query (e.g., "react", "tensorflow").
    *   A button or action (e.g., pressing Enter) to trigger the search.
    *   Use the GitHub API to search for repositories based on the user's query.
        *   **API Endpoint:** `https://api.github.com/search/repositories?q={query}&per_page=10&page={page}`
        *   Replace `{query}` with the user's input and `{page}` with the current page number.

2.  **Results Display:**
    *   Display the search results in a list format.
    *   For each repository in the list, show at least:
        *   Repository Name
        *   Owner/Organization Name
        *   Star Count
        *   Primary Language
        *   Description
    *   Handle loading states appropriately (show an indicator while fetching data).
    *   Handle error states (e.g., API errors, no results found) gracefully, providing feedback to the user.

3.  **Pagination:**
    *   Implement pagination for the search results.
    *   Allow users to navigate between pages of results (e.g., "Previous", "Next" buttons, or page numbers).
    *   Update the results list based on the selected page.

4.  **Repository Details (Routing):**
    *   When a user clicks on a repository name in the list, navigate to a separate "details" view/page for that specific repository *without a full page reload*.
    *   This detail view should display additional information fetched for *that specific repository*. You might need a different API call for this (e.g., `https://api.github.com/repos/{owner}/{repo}`). Display details like:
        *   Repository Name
        *   Owner/Organization Name
        *   Star Count
        *   Primary Language
        *   Description
        *   Number of Forks
        *   Number of Open Issues
        *   Link to the repository on GitHub.
    *   Provide a way to navigate back to the search results page.

**Technical Requirements:**

*   **Framework:** React (latest stable version preferred). Use Create React App, Vite, or another standard setup.
*   **Language:** JavaScript or TypeScript (TypeScript is preferred for senior roles, but well-structured JavaScript is acceptable).
*   **Routing:** Use a standard React routing library (e.g., `react-router-dom`).
*   **State Management:** Choose a state management approach you feel is appropriate for this application's scale (e.g., Context API + `useReducer`, Redux Toolkit, Zustand, Jotai). Be prepared to briefly justify your choice in the README.
*   **Styling:** Use any modern styling approach (e.g., CSS Modules, Styled Components, Emotion, Tailwind CSS). Ensure the UI is clean and usable. Basic responsiveness is expected.
*   **API Interaction:** Use `fetch` or a library like `axios` for API calls.
*   **Testing:** Write meaningful unit or integration tests for key components or logic (e.g., testing a component's rendering based on props, testing API fetching logic, testing state updates). Use a standard testing library like Jest and React Testing Library. Aim for reasonable coverage of critical parts rather than 100% coverage.
*   **Version Control:** Use Git. Provide a link to a public repository (e.g., GitHub, GitLab).

**Bonus Points (Optional - tackle only if time permits):**

*   Debouncing the search input to avoid excessive API calls.
*   Adding sorting options to the results list (e.g., by stars, forks).
*   More advanced error handling or UI feedback.
*   Implementing basic accessibility features (semantic HTML, ARIA attributes where appropriate).
*   Caching API responses.

**Deliverables:**

1.  A link to your public Git repository (e.g., GitHub, GitLab).
2.  The repository should contain:
    *   All source code for the application.
    *   A clear `README.md` file that includes:
        *   Instructions on how to install dependencies (`npm install` or `yarn install`).
        *   Instructions on how to run the application locally (`npm start` or `yarn dev`).
        *   Instructions on how to run the tests (`npm test` or `yarn test`).
        *   A brief explanation of your architectural choices (component structure, state management justification, styling approach).
        *   Any assumptions you made.
        *   Any known issues or potential improvements you'd make with more time.

**Evaluation Criteria:**

We will evaluate your submission based on:

*   **Functionality:** Does the application meet the core requirements?
*   **Code Quality:** Is the code clean, well-structured, readable, and maintainable? Are React best practices followed?
*   **Component Design:** Are components well-defined, reusable, and follow separation of concerns?
*   **State Management:** Is the chosen approach implemented correctly and appropriate for the scale?
*   **API Interaction:** Is data fetching handled correctly, including loading and error states?
*   **Routing:** Is client-side routing implemented correctly?
*   **Testing:** Are the tests meaningful and cover critical functionality?
*   **Responsiveness:** Is the UI reasonably responsive?
*   **Git History:** Clear, concise commit messages.
*   **README:** Is it clear, informative, and complete?

**A Note on Authenticated API Calls:**

The public GitHub API has rate limits for unauthenticated requests. You might hit these limits during development. You *do not* need to implement full OAuth authentication. If you hit rate limits, you can:
*   Generate a Personal Access Token (PAT) on GitHub (no special scopes needed for public repos).
*   Include it in your API requests via the `Authorization` header (`Authorization: Bearer YOUR_PAT`).
*   **IMPORTANT:** *Do not* commit your PAT directly into your code. Use environment variables (e.g., `.env` file ignored by git) to store it if you choose this route, and mention this in your README. Alternatively, mocking the API responses for development/testing after initial exploration is also acceptable.

---

Good luck! We look forward to seeing your solution. Remember, this is a starting point for a technical discussion, not just a pass/fail exercise. Focus on demonstrating your thought process and ability to build a solid frontend application.
