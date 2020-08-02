This page describes the Build Champion role. This is a weekly rotating role.

## Daily Goals

1. Make sure an [Insider build](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111&_a=summary&repositoryFilter=20&branchFilter=332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332) is released daily [![Build Status](https://dev.azure.com/monacotools/Monaco/_apis/build/status/VS%20Code?branchName=master)](https://dev.azure.com/monacotools/Monaco/_build/latest?definitionId=111&branchName=master)
2. Make sure the Continuous Build for [the master branch](https://dev.azure.com/vscode/VSCode/_build?definitionId=1&_a=summary&repositoryFilter=1&branchFilter=2%2C2%2C2%2C2%2C2%2C2%2C2) is green [![Build Status](https://dev.azure.com/vscode/VSCode/_apis/build/status/VS%20Code?branchName=master)](https://dev.azure.com/vscode/VSCode/_build/latest?definitionId=12&branchName=master)

## Process

Given build failures, make sure to pay attention to the [#build Slack channel](https://vscodeteam.slack.com/messages/C1Y427SES). It should notify who's likely responsible.

### Insider build
[Insiders build](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111&_a=summary&repositoryFilter=20&branchFilter=332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332%2C332) is scheduled to run every weekday at 5:00 AM UTC. Check the state of the most recent scheduled build, use the steps documented [here](https://github.com/microsoft/vscode/wiki/Build-Champion#troubleshooting-build-failures) to troubleshoot the build failures, and produce a successful build. The goal is to have an Insiders build released every weekday. 

### Troubleshooting build failures
| Build Error | Troubleshooting Steps |
|:------------|:----------------------|
| hygiene/compilation | 1. push a commit that fixes them and ping the responsible dev. <br> 2. If the fix isn't trivial, bring in the related developer to come up with a fix. |
| test failures/flaky test | 1. comment out the test and create an issue for the test owner to fix. <br>&nbsp;&nbsp;&nbsp;The rule is: _a flaky test is as good as a failing test_. |
| other |   1. Try to reason about the failure, get familiar with the [build infrastructure](https://github.com/microsoft/vscode/tree/master/build/azure-pipelines) and attempt to fix it. <br> 2. Reach out to the previous week's Build Champion, they might know something. <br> 3. Reach out to João/Ladislau. Improve the Build Champion process by documenting whatever they tell you. |

💡 **Note:** After a fix was pushed to address the build failure, manually queue the build.

## FAQ

#### Why do we have two builds?

The [Continuous Build](https://dev.azure.com/vscode/VSCode/_build?definitionId=1) is a **public**, **lightweight** build which runs on every commit and PR and has access to no credentials. It exists to make sure our code base is clean, compilable and tests are happy on branches and pull requests.

The [Product Build](https://dev.azure.com/monacotools/Monaco/_build?definitionId=111) is a **private**, **heavyweight** build which runs daily to produce Insiders, so it has access to credentials. It exists to create all VS Code distributable assets and place them on our [builds page](https://builds.code.visualstudio.com/). **Note:** it's important that it never runs on PRs of external forks of VS Code.


#### How do the builds run?

All our builds run in Azure DevOps and are scripted using YAML build definition files:

- [Product Build](https://dev.azure.com/monacotools/Monaco/_build/latest?definitionId=111&branchName=master): https://github.com/microsoft/vscode/blob/master/build/azure-pipelines/product-build.yml
- [Continuous Build](https://dev.azure.com/vscode/VSCode/_build/latest?definitionId=12&branchName=master): https://github.com/microsoft/vscode/blob/master/azure-pipelines.yml