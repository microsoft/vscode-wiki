Each iteration closes with an [endgame](https://github.com/Microsoft/vscode/wiki/Development-Process#end-game).

## Duties of the endgame champion

> Proactive communication is key to a smooth and successful endgame.

- Update iteration plan issue with the endgame schedule (see template below and potentially last month's schedule)
  - Ensure each plan item is linked to a test item
- Discuss the endgame schedule in Monday's planning call
  - Find an endgame buddy in the other lab
  - Remind people to update their testing availability and platform(s) in the call and release channel
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

### Schedule Template

https://github.com/microsoft/vscode/wiki/Endgame-Template

### OS Test Availability

Update the OS test availability [here](https://github.com/Microsoft/vscode-tools#updating-testers)

## Recovery Build

We release a recovery build with a handful of critical fixes and translation updates a few days after a release. The candidate fixes are reviewed by the development team and are assigned to the recovery milestone. We want to be restrictive about the included candidates. The mindset is "we will lose users if we do not include the fix". Here are some examples:
- data loss
- a regression that users complain loudly about in issues or Twitter
- a significant performance regression
- an issue that impacts many users as indicated by telemetry data
- an embarrassing UI glitch
- critical security fixes
- an issue that impacts extensions or is an API regression

### Schedule Template

https://github.com/microsoft/vscode/wiki/Endgame-Recovery-Template