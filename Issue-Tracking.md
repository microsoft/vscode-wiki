This page describes how we track issues in the `vscode` repository.

## Inbox tracking and Issue triage

### The Inbox
The inbox consists of issues and pull requests which have no assigned owner and no assigned label. 

Query to find bugs in the inbox: [inbox query](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+no%3Aassignee+-label%3Afeature-request+-label%3Abug+-label%3Aquestion+)

### Labels
Issues are assigned a label that indicates the issue type:
- `bug`: incorrect behaviour of the code
- `feature-request`: a request for an enhancement
- `question`: a question from a user

Issues are assigned to a feature area/topic using a label. The feature area labels are 'greenish'. 

### Initial Triage
The person assigned to do the inbox tracking has the following duties. 
- if the issue is a `bug` assign it to a person
- if the issue is a `feature request` add the label `feature request` you to @mention if the someone from the team should be aware of the issue.
- if the issue is a `question` redirect them to stack overflow (see [[Submitting Bugs]]
- assign the issue a feature/topic area label
- assign a P1 label if the issue is critical/blocking and use @microsoft/vscode to make the team aware of the issue. 
- if the issue doesn't have enough information, comment on the issue with a link for how to file issues [[Submitting Bugs and Suggestions]]

The person assigned to do the inbox tracking **doesn not** have to (but is free to do more):
- perform a duplicate search
- analyze the issue, this is the duty of the assignee
- engage into a discussion with the author of the issue and ask for more information
- assign a P1 label as appropriate

The team rotates the initial inbox triage on a weekly basis.

### 2nd level Triage done by the assignee
- review the `feature-request` vs. `bug` assignment, if it is a feature request remove the assignee
- assign the `P1` label if needed
- assign a milestone 
- follow-up with the author

### Fix Planning
- The open bugs assigned to an milestone will be reviewed weekly at the iteration planning meeting and the milestone will be adjusted if needed.

## Bug Verification

Bugs need to be verified. 
- Once a bug is fixed its state is changed to `closed`. 
- If it needs verification it is assigned to another team member
- Once verified the issue is labeled with `verified`

Create a personal query: current milestone, assigned to me, closed, `-label:"verified ✓"`

## Duplicates

Duplicate bugs are closed with a comment `duplicates #issue`

## Moving issues to another repository

Use [issue mover](https://github-issue-mover.appspot.com/) tool to move bugs to another repository.


## Consistent labels across vscode repositories

VS Code consists of multiple repositories and we should use consistent work flows and labels across all our repositories.

To establish consistent labels across all our repositories use the [Label Manager](http://www.dorukdestan.com/github-label-manager/) tool.

## Consistent milestones across vscode repositories

To enable planning across repositories all the vscode repositories need to define the same milestones.

## Iteration Planning
We use issues for iteration plans and test plans:
- Iteration Plans have a label `iteration-plan` with `tasks` [ ] for the different items. The individual items are tracked in existing issues (bugs, feature requests). If there is no existing issue then a new issue with the label `plan-item` is created. Here is an [example](https://github.com/Microsoft/vscode/issues/917).
- Test Plans have a label `test-plan`[example](https://github.com/Microsoft/vscode/issues/1096)
