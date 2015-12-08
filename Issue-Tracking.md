This page describes how we track issues in the `vscode` repository.

## Inbox tracking and Issue triage

### The Inbox
The inbox consists of issues which have 1) no assigned owner and 2) no assigned label. Assigning an owner or a label like `feature-request`, `question`, `more info needed` indicates that the issue has been triaged.

Query to find bugs in the inbox: [inbox query](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+no%3Aassignee+no%3Alabel)

### Labels
Issues are assigned a label that indicates the issue type:
- `bug`: incorrect behaviour of the code
- `feature-request`: a request for an enhancement
- `question`: a question from a user

Issues are assigned to a feature area/topic using a label. The feature area labels are 'greenish'. 

### Initial Triage
The person assigned to do the inbox tracking has the following duties. 
- if the issue is a `bug` assign it to a person
- if the issue is a `feature request` add the label `feature request` **no** `assignee`
- if the issue is a `question` assign the question label and assign a owner to answer the question
- assign the issue a feature/topic area to the issue
- if it is remembered that the issue is a duplicate, mark it as a duplicate (see below)
- if the issue doesn't have enough information, comment on the issue with a link for how to file issues

The person assigned to do the inbox tracking doesn not have to (but is free to do more):
- try to reproduce the issue
- analyze the issue, this is the duty of the assigned owner

### 2nd level Triage by the assignee
- review the `feature-request` vs. `bug` assignment, if it is a feature request remove the assignee
- assign the `P1` label if needed
- assign a milestone issues

### Issue Planning
- Open Bugs assigned to an milestone will be reviewed regularly and the milestone will be adjusted if needed.

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

**Notice** labels are copied to another repository, therefore when moving an issue to a repository owned by another team we should remove our custom labels.

## Consistent labels across vscode repositories

VS Code consists of multiple repositories and we should use consistent work flows and labels across all our repositories.

To establish consistent labels across all our repositories use the [Label Manager](http://www.dorukdestan.com/github-label-manager/) tool.

## Consistent milestones across vscode repositories

To enable planning across repositories all the vscode repositories need to define the same milestones.
