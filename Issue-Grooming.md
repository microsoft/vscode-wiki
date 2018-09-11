Despite our best efforts during [inbox tracking](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#inbox-tracking) and regular development to keep our issue situation in good shape, the number of issues increases over time and the quality of our issue database decreases. Thus, from time to time, we need concerted efforts to consolidate our issue database.

# Closing Issues

We close issues for the following reasons:

|Reason|Label|
|---|---|
|The issue is obsolete or already fixed. ||
|We didn't get the information we need within 7 days. | `needs more information`|
|It's a duplicate of another issue. | `*duplicate`|
|A feature request is best realized by implementing an extension.| `*extension-candidate`|
|What is described is the designed behavior. | `as-designed`|
|Issue was caused by an extension.| `*caused-by-extension`|
|Issue is a developer question.| `*dev-question`|
|Issue is a user question.| `*question`|
|Issue does not make sense or was unintended.| `invalid`|
|Given the information we have we can't reproduce the issue. | `not-reproducible`|
|The feature request is out of scope. (See [below](#out-of-scope-feature-requests)) | `out-of-scope`|

We close issues with the help of a bot that responds to a particular comment such as `/duplicate of #1234` or to assigning a label with adding a pre-canned comment to the issue and closing the issue.

## Out of Scope Feature Requests

Issues serve two purposes: they are a means of communication between us and our community as well as among members of the community and they are a reflection of the current situation and plans of the project. We could keep all feature requests open but we think it would hamper both of those purposes. For example, in order to not get buried under GH notifications, we'd unsubscribe from many feature requests which practically turns those into zombie issues.

Thus we think it's better if the set of feature requests is not open ended but reflects what has a reasonable chance to be considered in the next 12-24 months. 24 months is longer than our [roadmap](https://github.com/Microsoft/vscode/wiki/Roadmap) which outlines the next 6-12 months. Thus, there is some crystal ball reading on our part, and we'll most likely keep more feature requests open than what we can accomplish in 24 months.

Here are the criteria we use to make a decision.
- Does the functionality described in the feature request have any reasonable change to be on the next roadmap?
- Are the costs to implement the functionality reasonable given the size of our team? I.e. can we afford the feature?
- Has the community at large expressed interest in this functionality? I.e. has it gathered more than 10 up-votes or more than 10 comments over the last 6 months? Just for reference, the up-vote criterion alone covers more than 500 feature requests as of right now, September 10th, 2018. We also look at the duplicates for this analysis.

If the answer to all three of them is `yes` we keep the feature request open. If an issue has a strong affinity with our roadmap or describes an interesting competitive advantage we might keep it open even if it has not yet gathered sufficient community support. In this case, the decision clearly is more subjective.

When we close feature requests as out of scope, we'll unsubscribe from these issues to reduce the overall number of issue notifications we receive every day.

If you are the author of a feature request you might feel differently about whether or not it's a good idea to close your issue. We understand that. Be assured, we love all of your input. So, don't take personal offense when we decide to close your issue :peace_symbol:. If you feel your feature request deserves to stay open, feel free to improve your use case or gather more up-votes. Then ping us and we'll consider reopening the feature request.

# Categorizing Issues

Each issue must have a **type** label. Most type labels are grey, some are yellow. Bugs are grey with a touch of red.

|Type|Description|
|---|---|
|`bug` | the implementation of a feature is not correct|
|`feature-request` | request for a new feature|
|`under-discussion` | not decided whether the issue is a bug or feature|
|`debt` | improve the implementation/architecture|
|`needs more info` | not possible to assing a type label due to missing information|
|`question` | we should direct questions to SO|
|`upstream` | an issue used to track an issue in an upstream component|
|`electron` | an issue with electron|
|`engineering` | issues related to our engineering system or our processes|

# Labeling Issues
- We assign the `important` label to issues that
  - result in data loss
  - a breakage of extension
  - critical security, performance issues
  - UI issue that makes a feature unusable
- We label issues that the community can take up as `help-wanted`.
- If issues are suitable for beginners we may add the `good-first-issue` label and we add code pointers that help beginners to get started with a PR.


# Fixing Issues
- We assign bugs that we plan to fix during the grooming to the milestone of the current iteration.