# Best practices

## How do I import existing requirements?

If your requirements or designs already exist in another system (such as JIRA, Confluence, or Word documents), you have two options:

1.  **Using MCP integration**: If your requirements tool has an MCP server that supports STDIO, you can connect directly to import requirements into your spec session.
    
2.  **Manual import**: Simply copy your existing requirements (e.g. `foo-prfaq.md`) into a new file in your repo and open a spec chat session and say `#foo-prfaq.md Generate a spec from it`. Kiro will read your requirements, and generate requirement and design specs.
    

## How do I iterate on my specs?

Kiro's specifications are designed for continuous refinement, allowing you to update and enhance them as your project evolves. This iterative approach ensures that specifications remain synchronized with changing requirements and technical designs, providing a reliable foundation for development.

1.  **Update Requirements**: Either modify the `requirements.md` file directly or initiate a spec session and instruct Kiro to add new requirements or design elements.
    
2.  **Update Design**: Navigate to the `design.md` file for your spec and select **Refine**. This action will update both the design documentation and the corresponding task list to reflect your changes.
    
3.  **Update Tasks**: As you complete tasks or identify new ones, you can update the `tasks.md` file directly or use the spec interface to mark tasks as complete or add new ones.

## How do I share specs with my team?

Kiro specifications are stored as markdown files in your repository, making them easy to share and collaborate on with your team. You can:

1.  **Version Control**: Since specs are markdown files, they integrate seamlessly with your existing version control workflow (Git, etc.)
    
2.  **Pull Requests**: Team members can review and comment on spec changes through standard pull request processes
    
3.  **Documentation**: Specs serve as living documentation that stays up-to-date with your codebase

## Can I share specs across multiple teams?

Yes! Kiro specs are designed to be shared across teams and organizations. Since they're stored as markdown files in your repository, multiple teams can:

*   Access and reference the same specifications
*   Contribute to spec development through standard collaboration workflows
*   Maintain consistency across different parts of a larger system

## Can I start a spec session from a vibe session?

Absolutely! If you're in a vibe session and realize you need more structured planning, you can transition to a spec session. Simply:

1.  Save any important context from your vibe session
2.  Start a new spec session in the same repository
3.  Reference the vibe session context when generating your initial requirements

## Can I execute all the tasks in my spec in a single shot?

While Kiro provides task tracking and management, the execution of tasks typically happens through your normal development workflow. However, you can:

*   Use the task interface to track progress as you complete implementation
*   Mark tasks as in-progress or completed
*   Update task descriptions and outcomes as needed

## What if some tasks are already implemented?

If you're creating a spec for a partially implemented feature, you can:

1.  Mark completed tasks as "Done" in the `tasks.md` file
2.  Focus on remaining tasks that need implementation
3.  Use the spec to document what's already been built and what still needs work

## How many specs can I have in a single repo?

You can have multiple specs in a single repository. A common pattern is to organize specs by feature or component:

```
.kiro/
└── specs/
    ├── user-authentication/     # Login, registration, password reset
    ├── payment-processing/      # Billing, subscriptions, invoices
    ├── notification-system/     # Email, SMS, push notifications
    └── admin-dashboard/         # Product management, user analytics
```

This approach allows you to:

*   Work on features independently without conflicts
*   Maintain focused, manageable spec documents
*   Iterate on specific functionality without affecting other areas
*   Collaborate with team members on different features simultaneously

---

*Source: https://kiro.dev/docs/specs/best-practices/*
*Scraped on: 2025-07-21T17:19:02+07:00*
