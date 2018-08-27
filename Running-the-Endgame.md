Each iteration closes with an [endgame](https://github.com/Microsoft/vscode/wiki/Development-Process#end-game).

## Duties of the endgame master

> Proactive communication is key to a smooth and successful endgame.

- Update iteration plan issue with the endgame schedule (see template below and potentially last month's schedule)
  - Ensure each plan item is linked to a test item
- Discuss the endgame schedule in Monday's planning call
  - Find an endgame buddy in the other lab
  - Determine the pool of testers and their availability
- Ensure each test item has meaningful content
- Assign test items to testers (usually platform specific); ensure fair distribution across testers
  - Use the [testplan-helper](https://github.com/roblourens/testplan-helper) to download info from all the testplan items
  - Make a copy of the [endgame spreadsheet template](https://microsoft.sharepoint.com/:x:/t/DD_OTP/EXHnEJw_c2pGtDgjNTT5zDYBg4lGFD5qjT4hb7M9rxRx0Q?e=8e4f47108edd43efa7a415adfbdde91d), and paste the testplan-helper's output into it
  - Use it to assign testplan items evenly to the team - see the [June 2017 endgame](https://microsoft.sharepoint.com/:x:/t/DD_OTP/ERMhUazQBxVGjcHmvzFHq1sBn-dsuxbWxce3ABwQbS5Dkg?e=6efd3c33939d45b58709fe75287083be) for example usage
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
- *Month/Day* Endgame done

> **Note:** The `Insiders` build needs to be in the wild for 24 hours before we can enter the last phase of the endgame.

##### Monday
- [ ] Run [OSS tool](https://github.com/Microsoft/vscode-distro/blob/master/distro-tools/README.md) **endgame master**
  - *The LCA review of the ThirdPartyNotices.txt files is not needed anymore*
- [ ] Code freeze at 5pm PT
- [ ] Ensure we have a green build on all platforms at 5pm PT
- [ ] All test items contain sufficiently comprehensive test descriptions by 6pm PT
- [ ] Update your availability for testing here - https://vscode-tools.azurewebsites.net/

##### Tuesday
- [ ] Test plan items assigned
- [ ] All closed feature-requests either have a verification-needed or on-testplan tag
- [ ] Test build starts at 7am CET / 10pm PT on Monday
- [ ] Test plan ready by 8am CET / 11pm PT on Monday
- [ ] Testing
- [ ] [Verification needed](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+-label%3Averified+is%3Aclosed+label%3Averification-needed)

##### Wednesday
- [ ] Testing
- [ ] Remind team members to assign issues that they intend to fix to the current milestone
- [ ] Fixing (self-assigned, milestone assigned)
- [ ] [Verification (pls update the milestone in the query)](https://github.com/Microsoft/vscode/issues?utf8=✓&q=is%3Aissue+label%3Abug+-label%3Averified+-label%3Aon-testplan+is%3Aclosed+-label%3Aduplicate+-label%3A*duplicate+-label%3Ainvalid+-label%3Aas-designed+-label%3Aerror-telemetry+milestone%3A%22August+2018%22+)

##### Thursday
- [ ] Fixing (scrutiny sets in - major bugs only - to be discussed in stand-up meeting, labeled as `candidate`)
- [ ] [Verification](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
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
- [ ] All issues [verified](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- [ ] Fixing (only critical bugs - no string changes)
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test)
  - [ ] Windows - **owner**
  - [ ] OS X - **owner**
  - [ ] Linux - **owner**
- [ ] All release notes updated
  - release notes are collected in a file named *`Month_Year.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
  - [ ] @aeschli
  - [ ] @alexandrudima
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
  - [ ] @ramya-rao-a
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
  - [ ] vscode-jscs **@chrisdias**
  - [ ] vscode-tslint **@egamma**
  - [ ] vscode-eslint **@dbaeumer**
  - [ ] vscode-jshint **@rmacfarlane**
  - [ ] vscode-recipes **@auchenberg**
  - [ ] localization **@danyeh**
  - [ ] vscode-github-issues-prs **@chrmarti**
- [ ] Add notable fixes to the release notes **all**
- When done fixing/verifying and there are changes since last build at the end of day PT
  - [ ] Trigger new insider build and publish it manually **endgame master**

##### Friday/Monday
- [ ] Branch code to `release/<x.y> **endgame master**
- [ ] Bump up the version in package.json - **endgame master**
- [ ] Announce master is open for business **endgame master**
- [ ] Let Daniel Ye know that the release branch `release/<x.y>` got created and that translation should be pulled from there and that the pull request has to be created against that branch **endgame master**
- [ ] Polish release notes **redmond**

##### Monday - Wednesday
- [ ] Polish release notes **redmond**
- [ ] Cherry-pick hand-picked and reviewed changes to `release/<x.y>` **endgame master**
- [ ] Build `Insider` from `release/<x.y>` **endgame master**
- [ ] Manually release `Insider` **endgame master**
- [ ] Documentation updated
  - [ ] @aeschli
  - [ ] @alexandrudima
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
  - [ ] @ramya-rao-a
  - [ ] @rebornix 
  - [ ] @rmacfarlane
  - [ ] @roblourens
  - [ ] @sandy081
  - [ ] @sbatten
  - [ ] @tyriar
  - [ ] @weinand

> **Note:** The `Insiders` build needs to be in the wild for 24 hours before we can enter the last phase of the endgame.

##### Wednesday/Thursday
- [ ] Check translations (check `i18n` folder git history for latest translations, then build locally and see the amount of untranslated strings) **zurich**
- [ ] Build stable for all platforms **endgame master**
- [ ] Add a git tag to `HEAD` of `release/<x.y>` in format `x.y.z` (for vscode.d.ts download)  **endgame master**
- [ ] Make [rpm signing request](https://github.com/Microsoft/vscode-distro/blob/master/linux-repo/README.md) **@Tyriar**
- [ ] Sanity check of installable bits
  - [ ] Windows
    - [ ] signed installer 32-bit **owner**
    - [ ] signed installer 64-bit **owner**
    - [ ] signed user installer 32-bit **owner**
    - [ ] signed user installer 64-bit **owner**
    - [ ] zip 32-bit **owner**
    - [ ] zip 64-bit **owner**
  - [ ] OS X - **owner**
  - [ ] Linux
    - [ ] deb package 32-bit **owner**
    - [ ] deb package 64-bit **owner**
    - [ ] rpm package 64-bit **owner**
    - [ ] rpm package 32-bit **owner**
    - [ ] archives **owner**
- [ ] Publish website **@gregvanl**
- [ ] Publish to stable **endgame master**
- [ ] Publish deb and rpms to repositories manually **@Tyriar**
- [ ] Add version with symbols to HockeyApp @Tyriar
- [ ] Enable scheduled `insider` builds **endgame master**
- [ ] Twitter announcement **@seanmcbreen**

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
- [ ] Include an issue 'update translations' **owner**
- [ ] Assign candidate issues to the recovery milestone **team**
- [ ] Review the `candidate` issues, and if they pass the review assign them to the recovery milestone **team**
- [ ] All `candiate` fixes are peer reviewed and pushed to `master` and then cherry-picked into the release branch **team**
- [ ] Initiate `insiders` build from `master`
- [ ] Issues are tested in the `insiders` **team**
- [ ] Build `stable` for all platforms from release branch **owner**
- [ ] Make rpm signing request **@Tyriar**
- [ ] Issues are verified on `stable` build and the `verified` label is added **owner**
- [ ] Check `https://github.com/Microsoft/vscode/compare/release/<x.y>` to ensure no other commits have been made in the release branch **owner**
- [ ] Update the release notes and include a link to a query for the fixed issues **@gregvanl**
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test) stable bits
  - [ ] Windows - **owner**
  - [ ] OS X - **owner**
  - [ ] Linux - **owner**
- [ ] Sanity check installable stable bits that have not been smoke tested
  - [ ] Windows
    - [ ] signed installer 32-bit **owner**
    - [ ] signed installer 64-bit **owner**
    - [ ] zip 32-bit **owner**
    - [ ] zip 64-bit **owner**
  - [ ] OS X - **owner**
  - [ ] Linux
    - [ ] deb package 32-bit **owner**
    - [ ] deb package 64-bit **owner**
    - [ ] rpm package 64-bit **owner**
    - [ ] rpm package 32-bit **owner**
    - [ ] archives **owner**
- [ ] Publish website **@gregvanl**
- [ ] Publish stable build **owner**
- [ ] Publish deb and rpms to repositories manually **@Tyriar**
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
| Sara          | @mousetraps    |  x    |  x  |    x    |
| Ramya         | @ramya-rao-a   |  x    |  x  |    x    |
| Matt          | @mjbvz         |  x    |  x  |    x    |
| Rob           | @roblourens    |  x    |  x  |    x    |
| Sandeep       | @sandy081      |  x    |  x  |    x    |
| Sean          | @seanmcbreen   |  x    |  x  |    x    |
| Steven        | @stevencl      |       |     |    x    |
| Wade          | @waderyan      |  x    |  x  |    x    |

### Dev Matrix

|                    |                    |                    |                    |
|:-------------------|:-------------------|:-------------------|:-------------------|
| [ ] @alexandrudima | [ ] @weinand       | [ ] @bpasero       | [ ] @chrmarti      |
| [ ] @tyriar        | [ ] @dbaeumer      | [ ] @egamma        | [ ] @isidorn       |
| [ ] @joaomoreno    | [ ] @jrieken       | [ ] @kieferrm      | [ ] @aeschli       |
| [ ] @rebornix      | [ ] @mjbvz         | [ ] @ramya-rao-a   | [ ] @roblourens    |
| [ ] @sandy081      | [ ] @mousetraps    |                    |                    |