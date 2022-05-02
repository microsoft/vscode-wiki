- *Month/Day* Code freeze for the endgame
- *Month/Day* [Endgame done](https://github.com/Microsoft/vscode/wiki/Development-Process#inside-an-iteration)
- *Month/Day* Expected release date (this may change)

##### Monday
- [ ] Check that all queries in this issue use the current milestone **endgame champion**
- [ ] Run [OSS tool](https://github.com/microsoft/vscode-build-tools/tree/main/distro-tools) **endgame champion**
- [ ] Update links in the [Endgame notebooks](https://github.com/microsoft/vscode/blob/main/.vscode/notebooks/endgame.github-issues) to point to new milestone **endgame champion**
- [ ] Code freeze at 5pm PT
- [ ] Ensure we have a green build on all platforms at 5pm PT
- [ ] Create test plan items following the template [here](https://github.com/microsoft/vscode/wiki/Writing-Test-Plan-Items) by 6pm PT
- [ ] Add verification-needed label to [features needed testing and are not tested by TPIs](https://github.com/microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Afeature-request+is%3Aclosed+-label%3Aon-testplan+-label%3Averification-needed+).
- [ ] Update your availability for testing here - https://vscode-tools.azurewebsites.net/team-manifest **team**
  - [ ] Update availability of testers in vacation. Double check N/A testers. **endgame champion**


##### Tuesday
- [ ] Test plan items assigned (using https://vscode-tools.azurewebsites.net/test-plan-items)
  - Run the tool multiple times to balance load if test items come in later and assignments are already made
  - [Assigned to you](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+assignee%3A%40me++label%3Atestplan-item+)
- [ ] [🔖All closed feature-requests](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed+milestone%3A%22April+2022%22+label%3Afeature-request+-label%3Averification-needed+-label%3Aon-testplan+-label%3Averified+-label%3A*duplicate+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub) either have a `verification-needed` or `on-testplan` label
- [ ] Test build starts at 7am CET
- [ ] Test plan ready by 8am CET
- [ ] [🔖Testing](https://github.com/issues?q=is%3Aopen+is%3Aissue+label%3Atestplan-item+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal)
- [ ] [🔖Verification needed](https://github.com/issues?q=is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+-label%3Aiteration-plan+-label%3Aendgame-plan+-label%3Atestplan-item+label%3Averification-needed+-label%3Averified+is%3Aclosed+label%3Afeature-request)

##### Wednesday
- [ ] [🔖Testing](https://github.com/issues?q=is%3Aopen+is%3Aissue+label%3Atestplan-item+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal)
- [ ] Remind team members to assign issues that they intend to fix to the current milestone
- [ ] Fixing (self-assigned, milestone assigned)
- [ ] [🔖Verification needed](https://github.com/issues?q=is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+-label%3Aiteration-plan+-label%3Aendgame-plan+-label%3Atestplan-item+label%3Averification-needed+-label%3Averified+is%3Aclosed+label%3Afeature-request)

##### Thursday
- [ ] Fixing (self-assigned, milestone assigned, no need for PR or review)
  - Increased scrutiny sets in due to testing being completed. Fixes pose a much higher risk
  - Move issues to the next month that can be deferred
- [ ] [🔖Verification needed](https://github.com/issues?q=is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+-label%3Aiteration-plan+-label%3Aendgame-plan+-label%3Atestplan-item+label%3Averification-needed+-label%3Averified+is%3Aclosed+label%3Afeature-request)
- [ ] [🔖Verification](https://github.com/issues?q=is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+-label%3Aiteration-plan+-label%3Aendgame-plan+-label%3Atestplan-item+label%3Abug+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+-label%3Aerror-telemetry+is%3Aclosed+-label%3Averified)

##### Friday
- [ ] Build a `stable` build to ensure stable build is green **endgame champion**
- [ ] Pause scheduled `insider` builds **endgame champion**
- Satellite modules/npm packages ready, version updated, smoke tested
  - [ ] yo generator **@aeschli**
  - [ ] node debug **@weinand**
  - [ ] js-debug **@connor4312**
  - [ ] node debugadapter node **@weinand**
  - [ ] debug adapter protocol **@weinand**
  - [ ] custom data for html/css **@aeschli**
- [ ] Only candidate issues are open and assigned to [🔖milestone](https://github.com/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+)
- [ ] All issues [🔖verified](https://github.com/issues?q=is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+-label%3Aiteration-plan+-label%3Aendgame-plan+-label%3Atestplan-item+label%3Abug+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+-label%3Aerror-telemetry+is%3Aclosed+-label%3Averified)
- [ ] Branch code to `release/<x.y>` after all expected fixes are in (latest 5PM PST) **endgame champion**
- [ ] Branch distro to `release/<x.y>` after all expected fixes are in (latest 5PM PST) **endgame champion**
- [ ] Announce `main` is open for business **endgame champion**
- [ ] Fixing (PR + review required once branched - major bugs only - to be discussed in stand-up meeting, labeled as `candidate`)
- [ ] All release notes updated
  - release notes are collected in a file named *`v<Major>_<Minor>.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
  - [ ] @aeschli
  - [ ] @alexdima
  - [ ] @alexr00
  - [ ] @bpasero
  - [ ] @chrmarti
  - [ ] @connor4312
  - [ ] @dbaeumer
  - [ ] @deepak1556
  - [ ] @egamma
  - [ ] @hediet
  - [ ] @isidorn
  - [ ] @JacksonKearl
  - [ ] @joaomoreno
  - [ ] @joyceerhl
  - [ ] @jrieken
  - [ ] @kieferrm
  - [ ] @lramos15
  - [ ] @lszomoru
  - [ ] @meganrogge
  - [ ] @mjbvz
  - [ ] @rebornix
  - [ ] @roblourens
  - [ ] @rzhao271
  - [ ] @sandy081
  - [ ] @sbatten
  - [ ] @tanhakabir
  - [ ] @tylerleonhardt
  - [ ] @tyriar
  - [ ] @weinand
- [ ] Acknowledge pull requests in release notes. We acknowledge PRs from outside the team. We have improved [the tooling](https://vscode-tools.azurewebsites.net/acknowledgement) so that the endgame champion can generate the pull request acknowledgment for all repositories at once. **endgame champion**
  - [ ] `debug-adapter-protocol`, `inno-updater`, `jsonc-parser`, `language-server-protocol`, `lsif-node`, `vscode`, `vscode-codicons`, `vscode-css-languageservice`, `vscode-debugadapter-node`, `vscode-dev-containers`, `vscode-docs`, `vscode-emmet-helper`, `vscode-eslint`, `vscode-extension-samples`, `vscode-generator-code`, `vscode-hexeditor`, `vscode-html-languageservice`, `vscode-js-debug`, `vscode-js-debug-companion`, `vscode-js-profile-visualizer`, `vscode-jshint`, `vscode-json-languageservice`, `vscode-languageserver-node`, `vscode-livepreview`, `vscode-loader`, `vscode-lsif-extension`, `vscode-node-debug`, `vscode-node-debug2`, `vscode-pull-request-github`, `vscode-recipes`, `vscode-references-view`, `vscode-textmate`, `vscode-vsce`
- [ ] Acknowledge [issue trackers](https://github.com/microsoft/vscode-internalbacklog/wiki/Community-Triage---Credits) from the community **@chrmarti**
- [ ] Add notable fixes to the release notes **all**
- When done fixing/verifying and there are changes since last build at the end of day PT
  - [ ] Build and manually release Insider from release/<x.y> **endgame champion**
- [ ] Localization: Run [Update VS Code Branch](https://github.com/microsoft/vscode-loc-drop/actions/workflows/update-vscode-branch.yml) in the vscode-loc-drop repo with `release/*` as the VS Code Branch parameter (it's the default so you shouldn't have to change anything) **endgame champion**

##### Friday/Monday
- [ ] Polish release notes **redmond**
- [ ] Fixing (only critical bugs - no string changes)

##### Monday - Wednesday
- [ ] [🔖milestone issues](https://github.com/issues?q=is%3Aopen+is%3Aissue+milestone%3A%22April+2022%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub+)
- [ ] [🔖candidate issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Acandidate+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-dev+repo%3Amicrosoft%2Fvscode-remote-repositories-github+repo%3Amicrosoft%2Fvscode-unpkg+repo%3Amicrosoft%2Fvscode-remote-release+repo%3Amicrosoft%2Fvscode-js-debug+repo%3Amicrosoft%2Fvscode-pull-request-github+repo%3Amicrosoft%2Fvscode-livepreview+repo%3Amicrosoft%2Fvscode-python+repo%3Amicrosoft%2Fvscode-jupyter+repo%3Amicrosoft%2Fvscode-jupyter-internal+repo%3Amicrosoft%2Fvscode-settings-sync-server+repo%3Amicrosoft%2Fvscode-emmet-helper+repo%3Amicrosoft%2Fvscode-remotehub)
- [ ] Polish release notes **redmond**
- [ ] Cherry-pick hand-picked and reviewed changes to `release/<x.y>` **endgame champion**
- [ ] Build `Insider` from `release/<x.y>` **endgame champion**
- [ ] Manually release `Insider` **endgame champion**
- [ ] Build stable for all platforms as new candidate issues come in **endgame champion**
- [ ] Documentation updated
  - [ ] @aeschli
  - [ ] @alexdima
  - [ ] @alexr00
  - [ ] @bpasero
  - [ ] @chrmarti
  - [ ] @connor4312
  - [ ] @dbaeumer
  - [ ] @deepak1556
  - [ ] @egamma
  - [ ] @hediet
  - [ ] @isidorn
  - [ ] @JacksonKearl
  - [ ] @joaomoreno
  - [ ] @joyceerhl
  - [ ] @jrieken
  - [ ] @kieferrm
  - [ ] @lramos15
  - [ ] @lszomoru
  - [ ] @meganrogge
  - [ ] @mjbvz
  - [ ] @rebornix
  - [ ] @roblourens
  - [ ] @rzhao271
  - [ ] @sandy081
  - [ ] @sbatten
  - [ ] @tylerleonhardt
  - [ ] @tyriar
  - [ ] @weinand
- [ ] Run `scripts/test-documentation.sh|bat` and add file or fix issues if there are new colors that are not documented. **endgame champion**

> **Note:** The `Insiders` build needs to be in the wild for 24 hours before we can enter the last phase of the endgame. **endgame champion**

##### Wednesday/Thursday - Expected release day (this may change)
- [ ] Build stable for all platforms **endgame champion**
- [ ] Sanity check of installable bits ([server instructions](https://github.com/microsoft/vscode-remote-release/wiki/Sanity-Check-VS-Code-Servers))
  - [ ] Windows 32 bit **owner**
    - [ ] signed installer 32-bit
    - [ ] signed user installer 32-bit
    - [ ] zip 32-bit
    - [ ] server 32-bit
  - [ ] Windows 64 bit **owner**
    - [ ] signed installer 64-bit
    - [ ] signed user installer 64-bit
    - [ ] zip 64-bit
    - [ ] server 64-bit
  - [ ] Windows ARM64 **owner**
    - [ ] signed installer ARM64
    - [ ] signed user installer ARM64
    - [ ] zip ARM64
  - [ ] macOS
    - [ ] Universal **owner**
    - [ ] Intel **owner**
    - [ ] Intel server **owner**
    - [ ] Apple Silicon **owner**
  - [ ] Linux x64
    - [ ] deb **owner**
    - [ ] rpm **owner**
    - [ ] archives **owner**
    - [ ] snap (`sudo snap install --classic --dangerous <file>.snap`) **owner**
  - [ ] Linux server **owner**
    - [ ] x64
    - [ ] x64 Alpine
    - [ ] ARM32
    - [ ] ARM64
- [ ] Publish website **@gregvanl**
- [ ] Publish to stable **endgame champion**
- [ ] Trigger the [vscode.dev Deploy pipeline](https://dev.azure.com/monacotools/Monaco/_build?definitionId=276) for the `prod` deployment target **endgame champion**
- [ ] Create an official release **endgame champion**
  - [ ] Create a tag (make sure you pull the release branch first): `git tag <x.y.z>`
  - [ ] Push the tag: `git push origin <x.y.z>`
  - [ ] Create a GitHub release: [Open the GitHub tags](https://github.com/microsoft/vscode/tags), and click far right `... > Create Release`. Use the correct title and description from our release notes. Also change the relative links for the key highlight list items to absolute links [Example](https://github.com/microsoft/vscode/releases/tag/1.39.0)
- [ ] Twitter announcement **@chrisdias**
- [ ] Enable scheduled `insider` builds **endgame champion**
- [ ] Bump up the version in `package.json` on `main` - **endgame champion**
- [ ] [Publish @types/vscode](https://github.com/microsoft/vscode/wiki/Publish-vscode-types) **endgame champion**
- [ ] Close the milestone on [GitHub](https://github.com/microsoft/vscode/milestones) **endgame champion**