This page describes how we use branches and tags when we create an update:
- we use a branch such as `release/0.10.2`
- then we build VSCode on that branch
- then do cross OS smoke testing
- then if we identify any critical issues we deliver fixes to the branch and repeat from step 2.
- when step 3 yields no additional critical (ship-blockers) issues we're done
- we then create a `0.10.2` tag and delete the `release/0.10.2` branch
