Each iteration closes with an [endgame](https://github.com/Microsoft/vscode/wiki/Development-Process#end-game).

## Duties of the endgame master

> Proactive communication is key to a smooth and successful endgame.

- Update iteration plan issue with the endgame schedule (see template below and potentially last month's schedule)
  - Ensure each plan item is linked to a test item
- Discuss the endgame schedule in Monday's planning call
  - Find an endgame buddy in the other lab
  - Determine the pool of testers and their availability
- Ensure each test item has meaningful content
- Assign test items to testers (usually platform specific) using the [testplan tool](https://vscode-tools.azurewebsites.net/); ensure fair distribution across testers
- Communicate test assignments in the `release` Slack channel by posting the test item queries ([example query](https://github.com/Microsoft/vscode/issues?q=label%3Atestplan-item+milestone%3A%22June+2016%22+is%3Aclosed))
- Communicate end of day progress in the `release` Slack channel by communicating
   - the number of issues filed
   - the number of test items not yet completed ([example query](https://github.com/Microsoft/vscode/issues?q=label%3Atestplan-item+milestone%3A%22June+2016%22+is%3Aclosed))
   - number of issues to be [verified](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- Assign owners to checklist items for each day (if not owned by the endgame master)
- Track progress on test items and checklist items
- Adjust schedule, particularly the publishing dates, based on defects found, fixes made, holidays, vacations, etc.

## Schedule Template
- *Month/Day* Code freeze for the endgame
- *Month/Day* [Endgame done](https://github.com/Microsoft/vscode/wiki/Development-Process#inside-an-iteration)
- *Month/Day* Expected release date (this may change)

> **Note:** The `Insiders` build needs to be in the wild for 24 hours before we can enter the last phase of the endgame.

##### Monday
- [ ] Run [OSS tool](https://github.com/microsoft/vscode-build-tools/tree/master/distro-tools) **endgame master**
- [ ] Code freeze at 5pm PT
- [ ] Ensure we have a green build on all platforms at 5pm PT
- [ ] All test items contain sufficiently comprehensive test descriptions by 6pm PT
- [ ] Update your availability for testing here - https://vscode-tools.azurewebsites.net/

##### Tuesday
- [ ] Test plan items assigned (using https://vscode-tools.azurewebsites.net/)
  - Run the tool multiple times to balance load if test items come in later and assignments are already made
- [ ] All closed feature-requests either have a verification-needed or on-testplan tag
- [ ] Test build starts at 7am CET
- [ ] Test plan ready by 8am CET
- [ ] Testing
- [ ] [Verification needed](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+-label%3Averified+is%3Aclosed+label%3Averification-needed)

##### Wednesday
- [ ] Testing
- [ ] Remind team members to assign issues that they intend to fix to the current milestone
- [ ] Fixing (self-assigned, milestone assigned)
- [ ] [Verification (pls update the milestone in the query)](https://github.com/Microsoft/vscode/issues?utf8=✓&q=is%3Aissue+label%3Abug+-label%3Averified+-label%3Aon-testplan+is%3Aclosed+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+-label%3Aerror-telemetry+milestone%3A%22August+2018%22+)

##### Thursday
- [ ] Fixing (scrutiny sets in - major bugs only - to be discussed in stand-up meeting, labeled as `candidate`)
- [ ] [Verification](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug+-label%3Averified+-label%3Aon-testplan+is%3Aclosed+-label%3Aerror-telemetry+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+milestone%3A%22August+2018%22+)
- [ ] Check new OSS usage is entered into the [OSS registry](https://ossmsft.visualstudio.com/_apps/hub/ms.vss-oss-web.hub-oss) **owner**

##### Friday
- [ ] Pause scheduled `insider` builds **endgame master**
- Satellite modules/npm packages ready, version updated, smoke tested
  - [ ] vscode **@bpasero**
  - [ ] yo generator **@aeschli**
  - [ ] vsce **@joaomoreno**
  - [ ] node debug **@weinand**
  - [ ] node debug2 **@roblourens**
  - [ ] node debugadapter node **@weinand**
- [ ] All issues [verified](https://github.com/Microsoft/vscode/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Abug+-label%3Averified+-label%3Aon-testplan+is%3Aclosed+-label%3Aerror-telemetry+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+milestone%3A%22August+2018%22+)
- [ ] Fixing (only critical bugs - no string changes)
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test) (⚠️ MUST run with `--stable-build` argument ⚠️ )
  - [ ] Windows - **owner**
  - [ ] OS X - **owner**
  - [ ] Linux - **owner**
- [ ] All release notes updated
  - release notes are collected in a file named *`Month_Year.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
  - [ ] @aeschli
  - [ ] @alexandrudima
  - [ ] @alexr00
  - [ ] @bpasero
  - [ ] @chrmarti
  - [ ] @dbaeumer
  - [ ] @egamma
  - [ ] @isidorn
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
  - [ ] vscode-languageserver-node **@dbaeumer**
  - [ ] language-server-protocol **@dbaeumer**
  - [ ] vscode-textmate **@alexandrudima**
  - [ ] vscode-loader **@alexandrudima**
  - [ ] vscode-generator-code **@aeschli**
  - [ ] vscode-vsce **@joaomoreno**
  - [ ] vscode-docs **@gregvanl**
  - [ ] vscode-css-languageservice **@aeschli**
  - [ ] vscode-json-languageservice **@aeschli**
  - [ ] vscode-html-languageservice **@aeschli**
  - [ ] jsonc-parser **@aeschli**
  - [ ] vscode-tslint **@egamma**
  - [ ] vscode-eslint **@dbaeumer**
  - [ ] vscode-jshint **@rmacfarlane**
  - [ ] vscode-recipes **@chrisdias**
  - [ ] localization **@weeteckt**
  - [ ] vscode-github-issues-prs **@chrmarti**
  - [ ] inno-updater **@joaomoreno**
- [ ] Review pull requests acknowledgements with `NOT MERGED - PLS REVIEW`. **endgame master**
- [ ] Acknowledge issue trackers from the community **@chrmarti**
- [ ] Add notable fixes to the release notes **all**
- When done fixing/verifying and there are changes since last build at the end of day PT
  - [ ] Trigger new insider build and publish it manually **endgame master**

##### Friday/Monday
- [ ] Branch code to `release/<x.y> **endgame master**
- [ ] Bump up the version in package.json - **endgame master**
- [ ] Announce master is open for business **endgame master**
- [ ] Polish release notes **redmond**

##### Monday - Wednesday
- [ ] Polish release notes **redmond**
- [ ] Cherry-pick hand-picked and reviewed changes to `release/<x.y>` **endgame master**
- [ ] Build `Insider` from `release/<x.y>` **endgame master**
- [ ] Manually release `Insider` **endgame master**
- [ ] Build stable for all platforms as new candidate issues come in **endgame master**
- [ ] Documentation updated
  - [ ] @aeschli
  - [ ] @alexandrudima
  - [ ] @alexr00
  - [ ] @bpasero
  - [ ] @chrmarti
  - [ ] @dbaeumer
  - [ ] @egamma
  - [ ] @isidorn
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

##### Wednesday/Thursday
- [ ] Build stable for all platforms **endgame master**
- [ ] Make [rpm signing request](https://github.com/Microsoft/vscode-build-tools/tree/master/linux-repo) **@Tyriar**
- [ ] Sanity check of installable bits
  - [ ] Windows 32 bit **owner**
    - [ ] signed installer 32-bit
    - [ ] signed user installer 32-bit
    - [ ] zip 32-bit
  - [ ] Windows 64 bit **owner**
    - [ ] signed installer 64-bit
    - [ ] signed user installer 64-bit
    - [ ] zip 64-bit
  - [ ] OS X - **owner**
  - [ ] Linux
    - [ ] deb package 64-bit **owner**
    - [ ] rpm package 64-bit **owner**
    - [ ] archives **owner**
- [ ] Publish website **@gregvanl**
- [ ] Publish Localization language pack **@weeteckt**
- [ ] Publish to stable **endgame master**
- [ ] Add a git tag to `HEAD` of `release/<x.y>` in format `x.y.z` (for vscode.d.ts download)  **endgame master**
- [ ] [Publish @types/vscode](https://github.com/microsoft/vscode/wiki/Publish-vscode-types) **endgame master**
- [ ] Publish rpm to repository manually **@Tyriar**
- [ ] Enable scheduled `insider` builds **endgame master**
- [ ] Twitter announcement **@chrisdias**

### Recovery Build

We release a recovery build with a handful of critical fixes and translation updates a few days after a release. The candidate fixes are reviewed by the development team and are assigned to the recovery milestone. We want to be restrictive about the included candidates. The mindset is "we will lose users if we do not include the fix". Here are some examples:
- data loss
- a regression that users complain loudly about in issues or twitter
- a significant performance regressions
- an issue that impacts many users as indicated by telemetry data
- an embarrassing UI glitch
- critical security fixes
- an issue that impacts extensions or is an API regression

#### Check list
- [ ] Create a milestone `<Month> Recovery <year>` **owner**
- [ ] Bump the version number **owner**
- [ ] Include an issue 'update translations' **owner**
- [ ] Assign candidate issues to the recovery milestone **team**
- [ ] Review the `candidate` issues, and if they pass the review assign them to the recovery milestone **team**
- [ ] All `candidate` fixes are peer reviewed and pushed to `master` and then cherry-picked into the release branch **team**
- [ ] Initiate `insiders` build from `master`
- [ ] Issues are tested in the `insiders` **team**
- [ ] Build `stable` for all platforms from release branch **owner**
- [ ] Make rpm signing request **@Tyriar**
- [ ] Issues are verified on `stable` build and the `verified` label is added **owner**
- [ ] Check `https://github.com/Microsoft/vscode/compare/release/<x.y>` to ensure no other commits have been made in the release branch **owner**
- [ ] Update the release notes and include a link to a query for the fixed issues **@gregvanl**
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test) stable bits  (⚠️ MUST run with `--stable-build` argument ⚠️ )
  - [ ] Windows - **owner**
  - [ ] OS X - **owner**
  - [ ] Linux - **owner**
- [ ] Sanity check of installable bits
  - [ ] Windows 32 bit **owner**
    - [ ] signed installer 32-bit
    - [ ] signed user installer 32-bit
    - [ ] zip 32-bit
  - [ ] Windows 64 bit **owner**
    - [ ] signed installer 64-bit
    - [ ] signed user installer 64-bit
    - [ ] zip 64-bit
  - [ ] OS X - **owner**
  - [ ] Linux
    - [ ] deb package 64-bit **owner**
    - [ ] rpm package 64-bit **owner**
    - [ ] archives **owner**
- [ ] Publish website **@gregvanl**
- [ ] Publish stable build **owner**
- [ ] Publish rpm to repository manually **@Tyriar**
- [ ] Add a git tag to `HEAD` of `release/<x.y>` in format `x.y.z`

### OS Test Availability

| Name          | GitHub Alias   | Linux | Mac | Windows |
| :------------ |:---------------|:-----:|:---:|:-------:|
| Alex          | @alexandrudima |       |     |    x    |
| Andre         | @weinand       |  x    |  x  |    x    |
| Ben           | @bpasero       |  x    |  x  |    x    |
| Brad          | @bgashler1     |  x    |  x  |    x    |
| Chris         | @cdias         |  x    |  x  |    x    |
| Christof      | @chrmarti      |  x    |  x  |    x    |
| Daniel        | @tyriar        |  x    |  x  |    x    |
| Dirk          | @dbaeumer      |       |     |    x    |
| Erich         | @egamma        |  x    |  x  |    x    |
| Greg          | @gregvanl      |  x    |  x  |    x    |
| Isidor        | @isidorn       |  x    |  x  |    x    |
| Joao          | @joaomoreno    |  x    |  x  |    x    |
| Johannes      | @jrieken       |  x    |  x  |    x    |
| Kai           | @kieferrm      |  x    |  x  |    x    |
| Martin        | @aeschli       |  x    |  x  |    x    |
| Peng          | @rebornix      |  x    |  x  |    x    |
| Matt          | @mjbvz         |  x    |  x  |    x    |
| Rob           | @roblourens    |  x    |  x  |    x    |
| Sandeep       | @sandy081      |  x    |  x  |    x    |
| Steven        | @stevencl      |       |     |    x    |
| Alex          | @alexr00       |  x    |  x  |    x    |

### Dev Matrix

|                    |                    |                    |                    |
|:-------------------|:-------------------|:-------------------|:-------------------|
| [ ] @alexandrudima | [ ] @weinand       | [ ] @bpasero       | [ ] @chrmarti      |
| [ ] @tyriar        | [ ] @dbaeumer      | [ ] @egamma        | [ ] @isidorn       |
| [ ] @joaomoreno    | [ ] @jrieken       | [ ] @kieferrm      | [ ] @aeschli       |
| [ ] @sandy081      | [ ] @mousetraps    | [ ] @alexr00       |                    |
