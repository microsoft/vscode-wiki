This page describes how we track issues in the `vscode` repository.

## Popular queries

- [Global Inbox](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+no%3Aassignee+-label%3Afeature-request+-label%3Atestplan-item+-label%3Aplan-item)
- [Bugs to be Verified](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug+-label%3Averified+is%3Aclosed+-label%3A*duplicate+-label%3Ainvalid+) - VS Code only
- [Verification Needed](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+-label%3Averified+is%3Aclosed+label%3Averification-needed) - VS Code only


## Inbox tracking and Issue triage
New issues or pull requests submitted by the community are triaged by a team member. The team rotates the inbox tracker on a weekly basis. A bot assists the inbox tracker.

### Inbox Tracking

The inbox tracker is responsible for the [global inbox](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aopen+no%3Aassignee+-label%3Afeature-request+-label%3Atestplan-item+-label%3Aplan-item) containing all **open issues and pull requests** that
- are neither **feature requests** nor **test plan items** nor **plan items** and
- have **no owner assignment**.

The **inbox tracker** may perform any step described in our [issue triaging documentation](https://github.com/microsoft/vscode/wiki/Issues-Triaging) but its main responsibility is to route issues to the actual feature area owner.

Feature area owners track the **feature area inbox** containing all **open issues and pull requests** that
- are personally assigned to them and are not assigned to any milestone
- are labeled with their feature area label and are not assigned to any milestone.
This secondary triage may involve any of the steps described in our [issue triaging documentation](https://github.com/microsoft/vscode/wiki/Issues-Triaging) and results in a fully triaged or closed issue.

The [github triage extension](https://github.com/microsoft/vscode-github-triage-extension) can be used to assist with triaging — it provides a "Command Palette"-style list of triaging actions like assignment, labeling, and triggers for various bot actions.


### Ongoing Issue Management
The details can be found in our [issue triaging documentation](https://github.com/microsoft/vscode/wiki/Issues-Triaging).


### Planning
During the iteration planning process we use the following sources as input:
- Review feature requests with many reactions.
Issues we plan to work on during an iteration are assigned to the current milestone.

## Filing bugs as a development team member
When team members files a bug they perform steps of the inbox tracker for the issue they filed. Therefore bugs filed by the development team do not need to be triaged by the global inbox tracker. 
 
## Verification

Issues need to be verified.

Verification is a service that you request from others either implicitly with the `bug`-label or explicitly with the `verification-needed`-label. Find issue that are to be verified with these queries

- [bugs to be verified, VS Code](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue%20label%3Abug%20-label%3Averified%20is%3Aclosed%20-label%3Aduplicate%20-label%3Ainvalid%20)
- [verification needed, VS Code](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+-label%3Averified+is%3Aclosed+label%3Averification-needed)
- [bugs to be verified, all GitHub projects](https://github.com/issues?utf8=âœ“&q=is%3Aissue+is%3Aclosed+-label%3Averified+label%3Abug+repo%3AMicrosoft%2Fvscode)
- [verification needed, all GitHub projects](https://github.com/issues?utf8=âœ“&q=is%3Aissue+is%3Aclosed+-label%3Averified+label%3Averification-needed)

Follow the these rules:

1. Query for issues that are to be verified
2. Start with issues you created (filter by `Author`) but didn't close
3. Pick an item
    - Start with setting `verified`-label (prevents duplicate verifications)
    - Verify the issue
    - If you cannot verify the issue due to missing or hard-to-understand repro steps, add a `verification-steps-needed` label and remove the `verified` label
    - If the issue still shows, add the `verification-found`-label and remove the `verified` label
    - Go back to #3

## Consistent labels across vscode repositories

Visual Studio Code consists of multiple repositories and we should use consistent work flows and labels across all our repositories.

To establish consistent labels across all our repositories use the [Label Manager](http://www.dorukdestan.com/github-label-manager/) tool.

## Consistent milestones across vscode repositories

To enable planning across repositories all the Visual Studio Code related repositories need to define the same milestones.

## Iteration Planning
We use issues for iteration plans. Iteration plans have a label `iteration-plan` with `tasks` [ ] for the different items. The individual items are tracked in existing issues (bugs, feature requests). If there is no existing issue then a new issue with the label `plan-item` is created. All our iteration plans can be found [here](https://github.com/microsoft/vscode/wiki/Iteration-Plans)
