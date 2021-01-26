The VS Code project tracks issues and feature requests using the [GitHub issue tracker](https://github.com/microsoft/vscode/issues) for the `vscode` repository. 


### Before Submitting an Issue
Please begin by consulting any of the following pages that may be relevant:
  * [Performance Issues](Performance-Issues)
  * [Keybinding Issues](Keybinding-Issues)
  * [Native Crash Issues](Native-Crash-Issues)
  * [Search Issues](Search-Issues)
  * [Terminal Issues](Terminal-Issues)

Next, do a search in [open issues](https://github.com/Microsoft/vscode/issues) to see if the issue or feature request has already been filed. Use this [query](https://github.com/Microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc) to search for the most popular feature requests.

If you find your issue already exists, make relevant comments and add your [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). Use [a reaction on the issue description](Issues-Triaging#up-voting-a-feature-request) rather than adding a "+1" comment.

👍 - upvote

👎 - downvote

If the open issue is on the `Backlog Candidates` milestone your upvote can help it progress to the `Backlog`.

The VS Code project is distributed across [multiple repositories](https://github.com/Microsoft/vscode/wiki/Related-Projects). Try to file the issue against the correct repository.

If your issue is a question then please ask the question on [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode) using the tag `vscode`.

If you cannot find an existing issue that describes your bug or feature, submit an issue using the guidelines below.

## Writing Good Bug Reports and Feature Requests

File a single issue per problem or feature request.

* Do not enumerate multiple bugs or feature requests in the same issue.
* Do not add your issue as a comment to an existing issue unless it's for the identical input. Many issues look similar, but have different causes.

The more information you can provide, the more likely someone will be successful reproducing the issue and finding a fix. 

Please include the following with each issue. 

* Version of VS Code, and platform it is running on.
* List of extensions that you have installed. 

> **Tip:** You can easily add all this information by creating the issue using `Report Issue` from VS Code's Help menu. 

* Reproducible steps (1... 2... 3...) and what you expected versus what you actually saw. 
* Images, animations, or a video. These can usually be pasted directly into the description field on GitHub. Note that images and animations illustrate repro-steps but *do not* replace them.
* A code snippet that demonstrates the issue, or a link to a code repository we can easily pull down onto our machine to recreate the issue. 

> **Note:** Because we need to copy and paste the code snippet, including a code snippet as a media file (e.g. .gif) is not sufficient. 

* Errors displayed in the Dev Tools Console (Help | Toggle Developer Tools)

Please remember to do the following:

* Search the issue repository first to see if a duplicate exists. 
* Make sure the issue can be reproduced without extensions. Either disable all extensions (see the [docs for how to do this](https://code.visualstudio.com/docs/editor/extension-gallery#_disable-an-extension)) or use start extension bisect via "F1 > Start Extension Bisect". If you find the issue is caused by an extension you have installed please file an issue on the extension. The `Report Issue` option can help you route the report to the correct place.
* Simplify your code around the issue so we can better isolate the problem. 

Don't feel bad if we can't reproduce the issue and ask for more information!

Finally, this is our [issue tracking](https://github.com/Microsoft/vscode/wiki/Issue-Tracking) work flow that describes what happens once you submitted an issue.

## Contributing Fixes
If you are interested in fixing issues and contributing directly to the code base,
please see the document [How to Contribute](https://github.com/Microsoft/vscode/wiki/How-to-Contribute).
