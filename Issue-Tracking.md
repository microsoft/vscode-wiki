This page describes how we track issues in the `vscode` repository.

## Inbox tracking and Issue triage

### The Inbox
The inbox consists of issues and pull requests which have no assigned owner and no assigned label. 

> [Inbox Query](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+no%3Aassignee+-label%3Afeature-request+-label%3Abug+-label%3Aquestion++-label%3Aupstream)

### Labels
Issues are assigned a label that indicates the issue type:
- `bug`: incorrect behaviour of the code
- `feature-request`: a request for an enhancement
- `question`: a question from a user (these will be redirected to Stack Overflow)
>>> can we short circut the `question` and have the inbox triage person refer to S.O. immediatley?

Issues are assigned to a feature area/topic using a label. The feature area labels are 'greenish'. 

### Initial Triage
The person assigned to do the inbox tracking has the following duties. 
- if the issue is a bug, add the `bug` label and assign it to a person
- if the issue is a feature request, add the label `feature request` and @mention if someone from the team should be aware of the issue
- if the issue is a question redirect them to stack overflow (see [[Submitting Bugs and Suggestions]])
>>> should the issue be closed?
- assign the issue a feature/topic area label
- assign a P1 label if the issue is critical/blocking and mention @microsoft/vscode to make the team aware of the issue
- if the issue doesn't have enough information, comment on the issue with a link for how to file issues [[Submitting Bugs and Suggestions]]
>>> should the bug be closed or add a `more info needed` label?

The person assigned to do the inbox tracking **does not** have to (unless they want to):
- perform a duplicate search
- analyze the issue, this is the duty of the assignee
- engage into a discussion with the author of the issue and ask for more information

The team rotates the initial inbox triage on a weekly basis.

### 2nd level Triage done by the assignee
- review the `feature-request` vs. `bug` assignment, if it is a feature request remove the assignee, add the correct label
- assign the `P1` label if needed
- assign a milestone 
- follow-up with the author

### Fix Planning
Open bugs assigned to a milestone will be reviewed weekly at the iteration planning meeting and the milestone will be adjusted if needed

## Bug Verification
Bugs need to be verified. 
- Once a bug is fixed its state is changed to `closed` 
- If it needs verification, assign it to another team member
- Once verified, label the issue with `verified`
>>> How do i know if i need to verify closed bugs?  Will this query do it for me??

> **Tip**: Create a personal query: current milestone, assigned to me, closed, `-label:"verified"`

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
