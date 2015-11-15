## Issue Tracking 101

When you submit an issue, here's what will happen.

We use Labels to track the status of suggestions or feature requests. You can expect to see the following:

`[empty]`

Issues that are unlabelled have not been looked at by a VS Code team member. You can expect to see them labelled within a few days of being logged.

`Bug`

Issues with the `Bug` label are considered to be defects. Once they have the `Bug` label, they'll either be assigned to a developer and assigned a milestone, or put in the `Backlog` milestone, indicating we know it's an issue but we don't know when we will fix it. 

The `Backlog` milestone is a good place to start if you're interested in making a contribution to Code.

`Suggestion`

We consider this issue to not be a bug, but rather a design change or feature of some sort. Any issue with this label should have at least one more label from the list below:

> `Needs Proposal`: A full write-up is needed to explain how the feature should work.

> `Needs More Info`: A proposal exists, but there are follow-up questions that need to be addressed.

>`In Discussion`: This is being discussed by the VS Code team. You can expect this phase to take at least a few weeks, depending on our schedule.

>`Ready to Implement`: The proposal is accepted and has been designed enough that it can be implemented now.

>`Accepting PRs`: We are accepting pull requests that fully implement this feature.

>`Committed`: We have allocated time on the team schedule to implement this feature. It will have a milestone assigned as well.

>`Declined`: Declined suggestions will have this label along with one of the following:
 * `Out of Scope`: Is outside the scope of the project and would be better implemented as a separate tool or extension
 * `Too Complex`: The amount of complexity that this (and its future implications) would introduce is not justified by the amount of value it adds
 * `Breaking Change`: Would meaningfully break compatibility with a previous version of VS Code, or would prevent us from implementing known future proposals
 * `By Design`: This aspect of the Tool is an intentional design decision

Issues that are not bugs or suggestions will be labelled appropriately (`Question`, `By Design`, `External`) and closed.

Please use [Stack Overflow](http://go.microsoft.com/fwlink/?LinkID=536384) for VS Code questions.
