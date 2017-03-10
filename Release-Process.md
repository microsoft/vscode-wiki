This page describes how we use branches and tags with every new release.

**Example**

1. During endgame, a release branch is created: `release/1.10`.
2. VS Code is functionally and smoke tested with a build from that branch.
3. Any critical issues should have fixed delivered to both `master` and `release/1.10` and properly verified with step 2.
4. When there are no more additional critical issues, a release tag `1.10.0` is created.
5. VS Code is built from the `1.10.0` tag and shipped to customers.
6. Any further recovery builds should be from commits on the `release/1.10` branch and patch versions should be used: `1.10.1`, `1.10.2`, etc.