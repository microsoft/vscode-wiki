This page describes how we track issues in the `vscode` repository.

## Inbox tracking

The inbox are bugs which have 1) no assigned owner and 2) no assigned label. Assigning an owner or a label like `feature-request`, `question`, `more info needed` indicates that the issue has been triaged.

[Inbox query](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+no%3Aassignee+no%3Alabel)

## Bug verification

Bugs should be verified. 
- Once a bug is fixed its state is changed to `closed`. 
- If it needs verification it is assigned to another team member
- Once verified the issue is labeled with `verified`

Create a personal query: current milestone, assigned to me, closed, `-label:"verified ✓"`

## Duplicates

Duplicate bugs are closed with a comment `duplicates #issue`

## Issue Triage

Issues are assigned a label that indicates the issue type:
- `bug`: incorrect behaviour of the code
- `feature-request`: a request for an enhancement
- `question`: a question from a user

Issues can be assigned to a feature area using a label. The feature area labels are 'greenish'.

## Moving issues to another repository

Use [issue mover](https://github-issue-mover.appspot.com/) tool to move bugs to another repository.

**Notice** labels are copied to another repository, therefore when moving an issue to a repository owned by another team we should remove our custom labels.

## Consistent labels across vscode repositories

VS Code consists of multiple repositories and we should use consistent work flows and labels across all our repositories.

To establish consistent labels across all our repositories use the [Label Manager](http://www.dorukdestan.com/github-label-manager/) tool.