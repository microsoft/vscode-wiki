This page describes the Build Master role. This is a weekly rotating role.

## Daily Goals

1. Make sure an Insider build is released daily [![Build Status](https://dev.azure.com/monacotools/Monaco/_apis/build/status/VS%20Code?branchName=master)](https://dev.azure.com/monacotools/Monaco/_build/latest?definitionId=111&branchName=master)
2. Make sure the Continuous Build is green [![Build Status](https://dev.azure.com/vscode/VSCode/_apis/build/status/VS%20Code?branchName=master)](https://dev.azure.com/vscode/VSCode/_build/latest?definitionId=12&branchName=master)

## Process

When there are **hygiene** or **compilation errors**, push a commit that fixes them and ping the responsible dev. If the fix isn't trivial, bring in the related developer to come up with a fix.

When there are **test failures**, comment out the test and create an issue for the test owner to fix. The same process applies even if the test is flaky. The rule is: _a flaky test is as good as a failing test_.

When there are **code signing errors**, retrigger builds. If the errors persist, [file an issue to ESRP](https://microsoft.sharepoint.com/teams/prss/esrp/info/ESRP%20Onboarding%20Wiki/Engaging%20ESRP%20Support.aspx).

Else:

1. Try to reason about the failure and get familiar with the [build infrastructure](https://github.com/microsoft/vscode/tree/master/build/azure-pipelines).
2. Reach out to the previous week's Build Master, they might know something.
3. Reach out to João. Improve the Build Master process by documenting whatever he tells you.