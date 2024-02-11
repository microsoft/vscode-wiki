# The Visual Studio Code Roadmap 2021/22

Our roadmap typically looks out 12-18 months and we establish topics we want to work on. We don't start with our roadmap on a blank sheet. We develop it based on our [last roadmap](https://github.com/Microsoft/vscode/wiki/Roadmap-2020), the findings we made over the course of the last year, and of course what we heard from you in issues, in face-to-face discussions, stack overflow, and twitter.

When we execute on our roadmap, we keep learning and our assessment of some of the topics listed changes. As a result, we may add or drop topics as we go. After around 12 months we come together to develop the next roadmap.

We describe some initiatives as "investigations" or "explorations" which means our goal in the next few months is to better understand the problem and potential solutions before scheduling actual feature work. Once an investigation is done, we will update our plans, either deferring the initiative or committing to it.

As always, we listen to your feedback and adapt our plans if needed. 

Legend of annotations:

| Mark          | Description      |
| ------------- | ---------------- |
| bullet        | work not started |
| check mark    | work completed   |
| :runner:      | on-going work    |
| :muscle:      | stretch goal     |
| :red_circle:  | missing link     |

### Values
Before we go into the details, let's start with our values that guide the development of VS Code. They have pretty much remained the same since the early days and we don't have any intention to change them:
- Out of the box, VS Code is a text editor: lightweight and fast. Users may install extensions that impact the appearance and nature of VS Code.
- Performance trumps functionality.
- Simple, uniform UI and UI interactions.
- Allow for CLI / UI co-existence and interplay whenever possible.
- Although we limit the UI choices extension authors can make, authors can write powerful extensions such as one that turn VS Code into an IDE with bells and whistles.

### Themes for 2021/22
For 2021/22, we'll particularly focus in the following themes.
- Continue on our journey to be the best editor for anyone who relies on accessibility features
- Introduce support for Profiles
- Introduce Trusted Workspaces, and explore signed and sandboxed extensions
- Enable extension authors to provide great notebook experiences or contribute custom output renderers to existing notebook experiences
- Update the infrastructure of our website; start the process of visual updates
- Support the official launch of GitHub Codespaces.


<!-- BEGIN -->

## Performance
- [x] Ensure VS Code loads instantly in the web.


## Security
- [x] Trusted workspaces: Ensure it's safe to clone a repo and read the source code without any unauthorized code execution.
- [x] Make VS Code more secure by running renderer processes **without** access to `node` APIs. This is also crucial of the longevity of our platform as it brings our application model closer to the pure web model.
   - [x] Move from `webviews` to `iFrames` (we'll continue to refer to the custom views and editors as being webview-based)


## Codespace and Remote
- Remote-SSH
   - [x] Support 'Reopen in Container' leveraging Remote-Container support
- Remote-Container
   - [x] Assist users in installing `Docker` when not yet installed
   - [x] Support for untrusted remote-containers


## VS Code Core

### UX
- [x] Rethink: "New Untitled File" is a relict from a time when we only supported text files - how much can we do by automatic detection, how much user input do we need
- [ ] Continue to incrementally improve presentation and behavior across the board. Examples include:
   - [x] Welcome page

### Workbench
- [x] Improve handling opening a file when there are multiple editors available, for example, let the user choose on first open

### API
- [ ] Improve custom editors and custom views
   - [x] Improve data transfer between webviews and the extension host
   - [x] Support a predefined set of webcomponents in webviews

### Settings
- [x] Provide extensions more control over the sequence and grouping of their settings in the settings editor, e.g., support to group *commonly used* settings.
- [x] Support private workspace settings

### Editor
- [ ] Expand editor 'inline' experiences
   - [x] Inline values (on by default, see debugging)
   - [x] Inline type hints (see language section)

### Notebooks
- [x] Explore improved debugging of notebook cell execution

### SCM / Pull Requests
- [x] Investigate synergies between the Core git, GHPRI, and GitLens (implementation sharing, plugin extensibility)
- [ ] :runner: Bring GitHub closer into the inner loop across VS Code Core, and the GHPRI and GitLens extensions
   - [x] Support browsing and modifying GH repositories without a need to clone the repository or open a codespace
   - [x] Assign from overview editor
   - [x] Support resolving conversations

### Testing
- [x] Provide testing support and help the ecosystem to move over.

### Terminal
- [x] Investigate how to persist local terminal sessions across window reloads and application restarts.
- [x] Investigate improved shell/profile selector (see Windows Terminal for inspiration)
- [x] Use tabs instead of the terminal dropdown
- [x] Investigate to "resume" a terminal by deserializing its state rather than replaying raw data events
- [x] Investigate to allow terminals in the editor area

### Extensions


- Extension Authoring
   - [ ] Extend our development tooling:
      - [x] Support for web worker extensions
   - [x] Revisit the format of our extension author community call


- Extension Publishing (See _Security_)
   - [x] Support for platform specific flavors of extensions.
   - [x] Add support for verified publishers.
   - [x] Add support for insider/pre-release extensions


## Languages

### TypeScript
- [x] Inline type hints



### HTML/CSS
- [x] Provide an integrated live preview.

## Contributions to VS Code Extensions
- [x] [GitLens extension](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [ ] :runner: [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)

- [x] [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)


## Install / Update
- [x] Make VS Code available in the Windows Store.


## Engineering
- [x] Invest into a unified, improved and fast file watching
- [ ] :runner: Improve our GitHub issue bots, examples:
   - [x] reject invalid incoming issues automatically
   - [x] detect issues of limited use that 'need more information' automatically
- [x] Explore improving the build time by using [esbuild](https://github.com/evanw/esbuild) (requires AMD support) - ensure we don't lose our ability to use with the latest TS RC


<!-- END -->

## Summary

These are examples of some of the work we will be focusing on in the next 12-18 months. We continuously tune the plan based on feedback and we will provide more detail in each of our [monthly iteration plans](https://github.com/Microsoft/vscode/wiki/Iteration-Plans). We will develop our next roadmap in around 12 months from now. Please follow along and let us know what you think!

