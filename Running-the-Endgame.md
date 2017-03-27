Each iteration closes with an [endgame](https://github.com/Microsoft/vscode/wiki/Development-Process#end-game).

## Duties of the endgame master

> Proactive communication is key to a smooth and successful endgame.

- update iteration plan issue with the endgame schedule (see template below and potentially last month's schedule)
  - ensure each plan item is linked to a test item
- discuss the endgame schedule in Monday's planning call
  - find an endgame buddy in the other lab
  - determine the pool of testers and their availability
- ensure each test item has meaningful content
- assign test items to testers (usually platform specific); ensure fair distribution across testers ([see this example](https://microsoft.sharepoint.com/teams/DD_OTP/_layouts/OneNote.aspx?id=%2Fteams%2FDD_OTP%2FDocuments%2FTicino%2FNotebooks%2FTicino&wd=target%28Sprints.one%7C97CC4DED-1C83-4716-A6D1-C080F036F75D%2FJuneTest%20Load%20Balancer%7CBAABAED7-7FC1-6E47-A901-D2E514241DD6%2F%29))
- communicate test assignments in the `release` slack channel by posting the test item queries ([example query](https://github.com/Microsoft/vscode/issues?q=label%3Atestplan-item+milestone%3A%22June+2016%22+is%3Aclosed))
- communicate end of day progress in the `release` slack by communicating
   - the number of issues filed
   - the number of test items not yet completed ([example query](https://github.com/Microsoft/vscode/issues?q=label%3Atestplan-item+milestone%3A%22June+2016%22+is%3Aclosed))
   - number of issues to be [verified](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- assign owners to checklist items for each day (if not owned by the endgame master)
- track progress on test items and checklist items
- adjust schedule, particularly the publishing dates, based on defects found, fixes made, holidays, vacations, etc.

## Schedule Template
- *Month/Day* Code freeze for the endgame
- *Month/Day* Endgame done

##### Monday
- [ ] Code freeze at 5pm PT
- [ ] Ensure we have a green build on all platforms
- [ ] All test items contain sufficiently comprehensive test descriptions by 6pm PT
- [ ] If there were any new extensions pulled into the core product, add them to the list in the next 2 points about shrink-wrap and OSSREADME **@owner**
- [ ] Update shrink-wrap files for built-in extensions if needed (see [instructions](https://github.com/Microsoft/vscode/issues/8570#issuecomment-229669456))
   - [ ] typescript **@mjbvz** 
   - [ ] javascript **@mjbvz**
   - [ ] php **@mousetraps** 
   - [ ] markdown **@mjbvz**
   - [ ] json **@aeschli** 
   - [ ] css **@aeschli** 
   - [ ] configuration-editing **@jrieken** 
   - [ ] node-debug **@weinand**
- [ ] Update `OSSREADME.json` for built-in extensions based on differences to generated `npm-shrinkwrap.json` files if needed
   - [ ] typescript **@mjbvz** 
   - [ ] javascript **@mjbvz**
   - [ ] php **@mousetraps** 
   - [ ] markdown **@mjbvz** 
   - [ ] json **@aeschli** 
   - [ ] css **@aeschli** 
   - [ ] configuration-editing **@jrieken** 
   - [ ] node-debug **@weinand**

##### Tuesday
- [ ] Test build starts at 7am CET / 10pm PT on Monday
- [ ] Test plan ready by 8am CET / 11pm PT on Monday
- [ ] Testing
- [ ] [Verification needed](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+-label%3Averified+is%3Aclosed+label%3Averification-needed)

##### Wednesday
- [ ] Testing
- [ ] Remind team members to assign issues that they intend to fix to the July milestone
- [ ] Fixing (self-assigned, milestone assigned)
- [ ] [Verification](https://github.com/Microsoft/vscode/issues?q=is%3Aissue+label%3Abug+-label%3Averified+is%3Aclosed+-label%3Aduplicate+-label%3Ainvalid+-label%3Aas-designed+milestone%3A%22March+2017%22)

##### Thursday
- [ ] Fixing (scrutiny sets in - major bugs only - to be discussed in stand-up meeting, labeled as `candidate`)
- [ ] [Verification](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- [ ] Update release notes
   - release notes are collected in a file named *`Major_Minor.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
- [ ] Run [OSS tool](https://github.com/Microsoft/vscode-distro/blob/master/distro-tools/README.md) after merging shrink-wrap findings **@owner**
  - *The LCA review of the ThirdPartyNotices.txt files is not needed anymore*
- [ ] Check new OSS usage is entered into the [OSS registry](https://ossmsft.visualstudio.com/_apps/hub/ms.vss-oss-web.hub-oss) **@owner**

##### Friday
- [ ] Pause scheduled `insider` builds **@zurich**
- Satellite modules/npm packages ready, version updated, smoke tested
  - [ ] vscode **@bpasero**
  - [ ] yo generator **@aeschli**
  - [ ] vsce **@joaomoreno**
  - [ ] node debug **@weinand**
- [ ] Translation input - **@dbaeumer**
- [ ] All issues [verified](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- [ ] Fixing (only critical bugs - no string changes)
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test)
  - [ ] Windows - **@owner**
  - [ ] OS X - **@owner**
  - [ ] Linux - **@owner**
- [ ] All release notes updated
  - release notes are collected in a file named *`Month_Year.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
- [ ] Acknowledge pull requests in release notes. We acknowledge PRs from outside the team. Use the [thankyou](https://github.com/Microsoft/vscode-tools/tree/master/thankyou) utility to generate the initial contents of the section. **owner**
- [ ] Anotable fixes in the release notes **@all**
- When done fixing/verifying and there are changes since last build at the end of day PT
  - [ ] Trigger new insider build and publish it manually **@owner**

##### Friday/Monday
- [ ] Branch code to `release/<x.y> **@zurich**
- [ ] Announce master is open for business **@zurich**
- [ ] Polish release notes **@redmond**

##### Monday/Tuesday
- [ ] Publish `Insider` with hand-picked and reviewed candidate fixes **@owner**

##### Thursday/Friday
- [ ] Merge translations **@zurich**
- [ ] Build stable for all platforms **@owner**
- [ ] Sanity check of installable bits
  - [ ] Windows
    - [ ] signed installer **@owner**
    - [ ] zip **@owner**
  - [ ] OS X - **@owner**
  - [ ] Linux
    - [ ] deb package 32-bit **@owner**
    - [ ] deb package 64-bit **@owner**
    - [ ] rpm package 64-bit **@owner**
    - [ ] rpm package 32-bit **@owner**
    - [ ] archives **@owner**
- [ ] Publish website **@gregvanl**
- [ ] Publish to stable **@owner**
- [ ] Add a git tag to `HEAD` of `release/<x.y>` in format `x.y.z`
- [ ] Enable scheduled `insider` builds **@owner**
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
- [ ] Create a milestone `<Month> Recovery <year>` **@owner**
- [ ] Include an issue 'update translations' **@owner**
- [ ] Assign candidate issues to the recovery milestone **@team**
- [ ] Review the `candidate` issues, and if they pass the review assign them to the recovery milestone **@team**
- [ ] All `candiate` fixes are peer reviewed and pushed to `master` and then cherry-picked into the release branch **@team** 
- [ ] Initiate `insiders` build from `master`
- [ ] Issues are tested in the `insiders` **@team**
- [ ] Build `stable` for all platforms from release branch **@owner**
- [ ] Issues are verified on `stable` build and the `verified` label is added **@owner**
- [ ] Check `https://github.com/Microsoft/vscode/compare/release/<x.y>` to ensure no other commits have been made in the release branch **@owner**
- [ ] Update the release notes and include a link to a query for the fixed issues **@gregvanl**
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test) stable bits
  - [ ] Windows - **@owner**
  - [ ] OS X - **@owner**
  - [ ] Linux - **@owner**
- [ ] Sanity check installable stable bits that have not been smoke tested
  - [ ] Windows
    - [ ] signed installer **@owner**
    - [ ] zip **@owner**
  - [ ] OS X - **@owner**
  - [ ] Linux
    - [ ] deb package 32-bit **@owner**
    - [ ] deb package 64-bit **@owner**
    - [ ] rpm package 64-bit **@owner**
    - [ ] rpm package 32-bit **@owner**
    - [ ] archives **@owner**
- [ ] Publish website **@gregvanl**
- [ ] Publish stable build **@owner**
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
| Erich         | @egamma        |       |     |    x    |
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