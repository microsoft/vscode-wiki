- *Month/Day* Code freeze for the endgame
- *Month/Day* [Endgame done](https://github.com/Microsoft/vscode/wiki/Development-Process#inside-an-iteration)
- *Month/Day* Expected release date (this may change)

> **Note:** The `Insiders` build needs to be in the wild for 24 hours before we can enter the last phase of the endgame.

##### Monday
- [ ] Run [OSS tool](https://github.com/microsoft/vscode-build-tools/tree/master/distro-tools) **endgame master**
- [ ] Code freeze at 5pm PT
- [ ] Ensure we have a green build on all platforms at 5pm PT
- [ ] Create test plan items following the template [here](https://github.com/microsoft/vscode/wiki/Writing-Test-Plan-Items) by 6pm PT
- [ ] Add verification-needed label to [features needed testing and are not tested by TPIs](https://github.com/microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Afeature-request+is%3Aclosed+-label%3Aon-testplan+-label%3Averification-needed+).
- [ ] Update your availability for testing here - https://vscode-tools.azurewebsites.net/
- [ ] Create Test plan item for smoke testing ([template](https://github.com/microsoft/vscode/wiki/Test%3A-Smoke-Test-Template)) **endgame master**
- [ ] Review the `extensionKind` list in `product.json` both for stable and insiders, see this [tracking issue](https://github.com/microsoft/vscode-internalbacklog/issues/932). 

##### Tuesday
- [ ] Test plan items assigned (using https://vscode-tools.azurewebsites.net/)
  - Run the tool multiple times to balance load if test items come in later and assignments are already made
  - [Assigned to you](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+assignee%3A%40me++label%3Atestplan-item+)
- [ ] [🔖All closed feature-requests](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed+milestone%3A%22January+2020%22+label%3Afeature-request+-label%3Averification-needed+-label%3Aon-testplan+-label%3Averified+-label%3A*duplicate+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release) either have a `verification-needed` or `on-testplan` label
- [ ] Test build starts at 7am CET
- [ ] Test plan ready by 8am CET
- [ ] [🔖Testing](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Atestplan-item+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release+)
- [ ] [🔖Verification needed](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed+milestone%3A%22January+2020%22+label%3Averification-needed+-label%3Averified+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)

##### Wednesday
- [ ] [🔖Testing](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Atestplan-item+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release+)
- [ ] Remind team members to assign issues that they intend to fix to the current milestone
- [ ] Fixing (self-assigned, milestone assigned)
- [ ] [🔖Verification needed](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed+milestone%3A%22January+2020%22+label%3Averification-needed+-label%3Averified+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)
- [ ] Prepare for Smoke test: Make sure all smoke test issues are labelled `smoke-test` and fixed **endgame master**

##### Thursday
- [ ] Fixing (scrutiny sets in - major bugs only - to be discussed in stand-up meeting, labeled as `candidate`)
- [ ] [🔖Verification needed](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed+milestone%3A%22January+2020%22+label%3Averification-needed+-label%3Averified+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)
- [ ] [🔖Verification](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aclosed+is%3Aissue+milestone%3A%22January+2020%22+label%3Abug+-label%3Averified+-label%3Aon-testplan+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+-label%3Aerror-telemetry+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)
- [ ] Prepare for Smoke test: Make sure all smoke test issues are labelled `smoke-test` and fixed **endgame master**

##### Friday
- [ ] Pause scheduled `insider` builds **endgame master**
- Satellite modules/npm packages ready, version updated, smoke tested
  - [ ] vscode **@bpasero**
  - [ ] yo generator **@aeschli**
  - [ ] vsce **@joaomoreno**
  - [ ] node debug **@weinand**
  - [ ] node debug2 **@roblourens**
  - [ ] js-debug **@connor4312**
  - [ ] node debugadapter node **@weinand**
- [ ] All issues [🔖verified](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aclosed+is%3Aissue+milestone%3A%22January+2020%22+label%3Abug+-label%3Averified+-label%3Aon-testplan+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+-label%3Aerror-telemetry+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)
- [ ] Fixing (only critical bugs - no string changes)
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test) (⚠️ MUST run with `--stable-build` argument ⚠️ )	
  - [ ] Windows - **owner**	
  - [ ] macOS - **owner**	
  - [ ] Linux - **owner**	
  - [ ] Web (Chromium) - **owner**	
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
  - [ ] @eamodio
  - [ ] @egamma
  - [ ] @isidorn
  - [ ] @JacksonKearl 
  - [ ] @joaomoreno
  - [ ] @jrieken
  - [ ] @kieferrm
  - [ ] @mjbvz
  - [ ] @octref
  - [ ] @rebornix
  - [ ] @rmacfarlane
  - [ ] @roblourens
  - [ ] @sandy081
  - [ ] @sbatten
  - [ ] @tyriar
  - [ ] @weinand
- [ ] Acknowledge pull requests in release notes. We acknowledge PRs from outside the team. Use the [thankyou](https://vscode-tools.azurewebsites.net/#acknowledgePRs) tool to generate the initial contents of the section. **owner**
  - [ ] vscode **endgame master**
  - [ ] vscode-node-debug **@weinand**
  - [ ] vscode-node-debug2 **@roblourens**
  - [ ] vscode-debugadapter-node **@weinand**
  - [ ] vscode-js-debug **@connor4312**
  - [ ] vscode-languageserver-node **@dbaeumer**
  - [ ] language-server-protocol **@dbaeumer**
  - [ ] vscode-textmate **@alexdima**
  - [ ] vscode-loader **@alexdima**
  - [ ] vscode-generator-code **@aeschli**
  - [ ] vscode-vsce **@joaomoreno**
  - [ ] vscode-docs **@gregvanl**
  - [ ] vscode-css-languageservice **@aeschli**
  - [ ] vscode-json-languageservice **@aeschli**
  - [ ] vscode-html-languageservice **@aeschli**
  - [ ] jsonc-parser **@aeschli**
  - [ ] vscode-eslint **@dbaeumer**
  - [ ] vscode-jshint **@rmacfarlane**
  - [ ] vscode-recipes **@chrisdias**
  - [ ] localization **@weeteckt**
  - [ ] vscode-github-issues-prs **@chrmarti**
  - [ ] inno-updater **@joaomoreno**
- [ ] Review pull requests acknowledgements with `NOT MERGED - PLS REVIEW`. **endgame master**
- [ ] Acknowledge [issue trackers](https://github.com/microsoft/vscode-internalbacklog/wiki/Community-Triage:-Credits) from the community **@chrmarti**
- [ ] Add notable fixes to the release notes **all**
- When done fixing/verifying and there are changes since last build at the end of day PT
  - [ ] Trigger new insider build and publish it manually **endgame master**

##### Friday/Monday
- [ ] Branch code to `release/<x.y> **endgame master**
- [ ] Bump up the version in package.json - **endgame master**
- [ ] Announce master is open for business **endgame master**
- [ ] Polish release notes **redmond**

##### Monday - Wednesday
- [ ] [🔖milestone issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+milestone%3A%22January+2020%22+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)
- [ ] [🔖candidate issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Acandidate+repo%3Amicrosoft%2Fvscode+repo%3Amicrosoft%2Fvscode-internalbacklog+repo%3Amicrosoft%2Fvscode-remote-release)
- [ ] Polish release notes **redmond**
- [ ] Cherry-pick hand-picked and reviewed changes to `release/<x.y>` **endgame master**
- [ ] Build `Insider` from `release/<x.y>` **endgame master**
- [ ] Manually release `Insider` **endgame master**
- [ ] Build stable for all platforms as new candidate issues come in **endgame master**
- [ ] Documentation updated
  - [ ] @aeschli
  - [ ] @alexdima
  - [ ] @alexr00
  - [ ] @bpasero
  - [ ] @chrmarti
  - [ ] @connor4312
  - [ ] @dbaeumer
  - [ ] @deepak1556 
  - [ ] @eamodio
  - [ ] @egamma
  - [ ] @isidorn
  - [ ] @JacksonKearl 
  - [ ] @joaomoreno
  - [ ] @jrieken
  - [ ] @kieferrm
  - [ ] @mjbvz
  - [ ] @octref
  - [ ] @rebornix
  - [ ] @rmacfarlane
  - [ ] @roblourens
  - [ ] @sandy081
  - [ ] @sbatten
  - [ ] @tyriar
  - [ ] @weinand
- [ ] Run `scripts/test-documentation.sh|bat` and add file or fix issues if there are new colors that are not documented.

> **Note:** The `Insiders` build needs to be in the wild for 24 hours before we can enter the last phase of the endgame. **endgame master**

##### Wednesday/Thursday - Expected release day (this may change)
- [ ] Build stable for all platforms **endgame master**
- [ ] Sanity check of installable bits
  - [ ] Windows 32 bit **owner**
    - [ ] signed installer 32-bit
    - [ ] signed user installer 32-bit
    - [ ] zip 32-bit
  - [ ] Windows 64 bit **owner**
    - [ ] signed installer 64-bit
    - [ ] signed user installer 64-bit
    - [ ] zip 64-bit
  - [ ] macOS - **owner**
  - [ ] Linux
    - [ ] deb package 64-bit **owner**
    - [ ] rpm package 64-bit **owner**
    - [ ] archives **owner**
    - [ ] snap (`sudo snap install --classic --dangerous <file>.snap`) **owner**
  - [ ] Server ([instructions](https://github.com/microsoft/vscode-remote-release/wiki/Sanity-Check-VS-Code-Servers)) **owner**
    - [ ] Linux
    - [ ] macOS
    - [ ] WIndows
- [ ] Publish website **@gregvanl**
- [ ] Publish Localization language pack **@weeteckt**
- [ ] Publish to stable **endgame master**
- [ ] Add a git tag to `HEAD` of `release/<x.y>` in format `x.y.z` (for vscode.d.ts download)  **endgame master**
- [ ] [Publish @types/vscode](https://github.com/microsoft/vscode/wiki/Publish-vscode-types) **endgame master**
- [ ] Enable scheduled `insider` builds **endgame master**
- [ ] Twitter announcement **@chrisdias**
