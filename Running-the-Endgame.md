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
- [x] Code freeze at 5pm PT
- [x] Ensure we have a green build on all platforms
- [x] All test items contain sufficiently comprehensive test descriptions by 6pm PT

##### Tuesday
- [x] Test build starts at 7am CET / 10pm PT on Monday
- [x] Test plan ready by 8am CET / 11pm PT on Monday
- [x] Testing

##### Wednesday
- [x] Testing
- [x] Remind team members to assign issues that they intend to fix to the July milestone
- [x] Fixing (self-assigned, milestone assigned, and labeled as `candidate`)
- [x] [Verification](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)

##### Thursday
- [x] Fixing (scrutiny sets in - major bugs only - to be discussed in stand-up meeting)
- [x] [Verification](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- [x] Update release notes
   - release notes are collected in a file named *`Month_Year.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
- [x] Add/update shrink-wrap files for built-in extensions if needed (see [instructions](https://github.com/Microsoft/vscode/issues/8570#issuecomment-229669456))
- [x] Update `OSSREADME.json` for built-in extensions based on differences to generated `npm-shrinkwrap.json` files if needed
- [x] Run [OSS tool](https://github.com/Microsoft/vscode-distro/blob/master/distro-tools/README.md) after merging shrink-wrap findings **@owner**
  - *The LCA review of the ThirdPartyNotices.txt files is not needed anymore*
- [x] Check new OSS usage is entered into the [OSS registry](https://ossmsft.visualstudio.com/_apps/hub/ms.vss-oss-web.hub-oss) **@owner**

##### Friday
- [x] Pause scheduled `insider` builds **@zurich**
- Satellite modules/npm packages ready, version updated, smoke tested
  - [x] vscode **@bpasero**
  - [x] yo generator **@aeschli**
  - [x] vsce **@joaomoreno**
  - [x] node debug **@weinand**
- [x] Translation input - **@dbaeumer**
- [x] All issues [verified](https://github.com/Microsoft/vscode/wiki/Issue-Tracking#verification)
- [x] Fixing (only critical bugs - no string changes)
- [Smoketest](https://github.com/Microsoft/vscode/wiki/Smoke-Test)
  - [x] Windows - **@owner**
  - [x] OS X - **@owner**
  - [x] Linux - **@owner**
- [x] All release notes updated
  - release notes are collected in a file named *`Month_Year.md`* in this [repo directory](https://github.com/Microsoft/vscode-docs/blob/vnext/release-notes/)
- [x] Acknowledge pull requests in release notes
- When done fixing/verifying and there are changes since last build at the end of day PT
  - [x] Trigger new insider build and publish it manually **@owner**

##### Friday/Monday
- [x] Tag code with release number **@zurich**
- [x] Announce master is open for business **@zurich**
- [x] Polish release notes **@redmond**

##### Monday/Tuesday
- [x] Publish `Insider` with hand-picked and reviewed candidate fixes **@owner**

##### Thursday/Friday
- [x] Merge translations **@zurich**
- [x] Rebuild for all platforms **@owner**
- [x] Sanity check of installable bits
  - [x] Windows
    - [x] signed installer **@owner**
    - [x] zip **@owner**
  - [x] OS X - **@owner**
  - [x] Linux
    - [x] deb packages **@owner**
    - [x] rpm packages 64-bit **@owner**
    - [x] rpm packages 32-bit **@owner**
    - [x] archives **@owner**
- [x] Publish website **@gregvanl**
- [x] Publish to stable **@owner**
- [x] Enable scheduled `insider` builds **@owner**
- [x] Twitter announcement **@seanmcbreen**
