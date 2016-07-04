This page describes how we use branches and tags with every new release.

**Example**

1. During endgame, a release branch is created: `release/0.10.2`.
2. VS Code is functionally and smoke tested with a build from that branch.
3. Any critical issues should have fixed delivered to the branches `master` and `release/0.10.2` and properly verified with step 2.
4. When there are no more additional critical issues, a `0.10.2` tag is created and the `release/0.10.2` branch is deleted.
5. VS Code is built from the `0.10.2` tag and shipped to customers.