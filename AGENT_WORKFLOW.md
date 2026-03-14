# AI Agent Workflow Log

## Agents Used

The following AI agents/tools were used during the development of the project:

* **ChatGPT** – Used for backend logic explanation, debugging, and architecture guidance.
* **GitHub Copilot** – Used for inline code suggestions and boilerplate generation.
* **Cursor AI** – Used for faster code editing and refactoring assistance.



## Prompts & Outputs

### Example 1 – Backend Route Implementation

**Prompt:**
"Generate an Express.js route to fetch route data and compute GHG comparison."

**Generated Output (Snippet):**

```javascript
router.get("/routes", (req, res) => {
  res.json(routes);
});
```

This helped quickly scaffold the backend route structure.



### Example 2 – Code Refinement

**Prompt:**
"Improve error handling for the Express route."

**Refined Output:**

```javascript
router.get("/routes", (req, res) => {
  try {
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
```

The output improved reliability by adding proper error handling.



## Validation / Corrections

* Verified AI-generated code by running the backend server locally.
* Checked API responses using **Postman** and browser network tools.
* Adjusted logic manually where the AI output did not fully match project requirements.
* Ensured correct TypeScript types and proper API response structure.


## Observations

**Where AI saved time**

* Quickly generating Express route templates
* Explaining debugging errors
* Providing architecture suggestions for backend structure

**Where AI failed or hallucinated**

* Occasionally suggested incorrect imports or outdated syntax.
* Some responses required manual correction to match project logic.

**Combining tools effectively**

* Copilot was used for quick inline completions.
* ChatGPT was used for conceptual explanations and debugging.
* Cursor AI helped with refactoring and improving readability.



## Best Practices Followed

* Reviewed all AI-generated code before committing.
* Used AI primarily for **boilerplate and debugging assistance**, not full implementation.
* Ensured generated code matched project coding standards.
* Tested all API endpoints after integrating AI-generated snippets.
