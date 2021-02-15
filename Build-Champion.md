This page describes the Build Champion role. This is a weekly rotating role.

## Daily Goals

[![Build Status](https://dev.azure.com/monacotools/Monaco/_apis/build/status/VS%20Code?branchName=master)](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111&branchFilter=332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332)

1. Make sure [the build](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111&branchFilter=332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332) is green 
2. Make sure it [releases Insiders](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111&branchFilter=332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332&requestedForFilter=00000002-0000-8888-8000-000000000000) every day


## Process

Given build failures, make sure to pay attention to the [#build Slack channel](https://vscodeteam.slack.com/messages/C1Y427SES). It should notify who's likely responsible.

### Insider build
[Insiders build](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111&branchFilter=332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332&requestedForFilter=00000002-0000-8888-8000-000000000000) is scheduled to run every weekday at 5:00 AM UTC. Check the state of the most recent scheduled build, use the steps documented [here](https://github.com/microsoft/vscode/wiki/Build-Champion#troubleshooting-build-failures) to troubleshoot the build failures, and produce a successful build. The goal is to have an Insiders build released every weekday. 

### Troubleshooting build failures
| Build Error | Troubleshooting Steps |
|:------------|:----------------------|
| hygiene/compilation | 1. Push a commit that fixes them and ping the responsible dev. <br> 2. If the fix isn't trivial, bring in the related developer to come up with a fix. |
| test&nbsp;failures/flaky&nbsp;test | 1. Comment out the test and create an issue for the test owner to fix. Please add one of the following labels depending on the test type: `integration-test-failure`, `smoke-test-failure`, `unit-test-failure`. <br><br>The rule is: _a flaky test is as good as a failing test_. |
| yarn error | 1. `error Your lockfile needs to be updated, but yarn was run with --frozen-lockfile`. On master, pull the latest changes. Run `yarn`. If there are changes to `yarn.lock`, review and push them.|
| other |   1. Try to reason about the failure, get familiar with the [build infrastructure](https://github.com/microsoft/vscode/tree/master/build/azure-pipelines), and attempt to fix it. <br> 2. Reach out to the previous week's Build Champion, they might know something. <br> 3. Reach out to João/Ladislau. Improve the Build Champion process by documenting whatever they tell you. |

💡 **Note:** After a fix was pushed to address the build failure, manually queue the build.

## FAQ

#### What happened to the public DevOps continuous build?

We managed to improve the Product build considerably to the point that it now runs on every push, effectively becoming our continuous build. So we dropped the old continuous build: `https://dev.azure.com/vscode/VSCode`.

Additionally, we have a parallel [public continuous build](https://github.com/microsoft/vscode/actions?query=workflow%3ACI) running on GitHub Actions, which mostly validates PRs.

#### How do the builds run?

All our builds run in Azure DevOps and are scripted using YAML build definition files:

- [DevOps](https://github.com/microsoft/vscode/blob/master/build/azure-pipelines/product-build.yml)
- [GH Actions](https://github.com/microsoft/vscode/blob/master/.github/workflows/ci.yml) 