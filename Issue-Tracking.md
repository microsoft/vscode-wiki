This page describes how we track issues in the `vscode` repository.

## Inbox tracking and Issue triage

### The Inbox Triage
New issues or pull requests submitted by the community are triaged by a team member. The team rotates the inbox tracker on a weekly basis.

> [Inbox Query](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+no%3Amilestone)

### Initial Triage done by the Inbox Tracker

- If the issue or pull request is valid, it is assigned to the `Backlog` milestone. 
- If an issue is a question, then the author is redirected to stack overflow. Add the following comment and close the issue:
```
Please ask questions on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode) using
the tag `vscode`. The VS Code team and Community will answer questions there.
```
- If an issue needs more info the `needs more info` label is assigned and the author is asked for more information in a comment. The issue is not assigned to the `Backlog`. If there is no additional information provided after 3 days the issue is closed with a comment to reopen it with more information.
- If the issue is a bug, add the `bug` label and assign it to a person
- If the issue is a feature request, add the label `feature request` and @mention if someone from the team should be aware of the issue
- If needed edit the title to improve it
- Assign the issue with a feature/topic area label
- Assign a `P1` label if the issue is critical/blocking and mention @microsoft/vscode to make the team aware of the issue

The person assigned to do the inbox tracking **does not** have to (unless they want to):
- Perform a duplicate search
- Analyze the issue, this is the duty of the assignee
- Engage into a discussion with the author of the issue and ask for more information

### 2nd level Triage, done by the assignee
- Review the `feature-request` vs. `bug` assignment, if it is a feature request remove the assignee, add the correct label
- Assign the `P1` label if needed
- Assign the current milestone if the issue needs to be fixed in this release (blocks a scenario, completes a new feature, etc.) 
- Follow-up with the author as needed

### Bug Management
At the beginning of the endgame we review the open issues and adjust the milestone if needed, moving to the next milestone or back to the backlog.

At the beginning of the debt week we review the issues, pull requests assigned to the backlog milestone, and assign them to the current milestone.

## Bug Verification
Bugs need to be verified. 
- Once a bug is fixed its state is changed to `closed` 
- If it needs verification, assign it to another team member
- Once verified, label the issue with `verified`

> **Tip**: To see what bugs you need to verify, create a personal query: current milestone, assigned to me, closed, `-label:"verified"`

## Duplicates
Duplicate bugs are closed with a comment `duplicates #issue`. Please try to reference an earlier issue **unless** a later issue is more appropriate (has more context, better scenarios, repro steps, etc.).

## Moving issues to another repository
Use the [issue mover](https://github-issue-mover.appspot.com/) tool to move bugs to another repository.

## Consistent labels across vscode repositories

Visual Studio Code consists of multiple repositories and we should use consistent work flows and labels across all our repositories.

To establish consistent labels across all our repositories use the [Label Manager](http://www.dorukdestan.com/github-label-manager/) tool.

## Consistent milestones across vscode repositories

To enable planning across repositories all the Visual Studio Code related repositories need to define the same milestones.

## Iteration Planning
We use issues for iteration plans and test plans:
- Iteration Plans have a label `iteration-plan` with `tasks` [ ] for the different items. The individual items are tracked in existing issues (bugs, feature requests). If there is no existing issue then a new issue with the label `plan-item` is created. Here is an [example](https://github.com/Microsoft/vscode/issues/917).
- Test Plans have a label `test-plan`, here is an [example](https://github.com/Microsoft/vscode/issues/1096).