As part of our issue triaging pipeline, 


## Author Verification

In cases where an issue is particularly difficult to verify, for instance those which only reproduce in a specific environment, the bot is able to help out by asking the original issue author to verify and automatically marking the issue as `verified` once they respond. It works as follows:

1. To initialize the workflow, label an issue `author-verification-requested` and either ensure it is [closed with a commit](#closing-with-a-commit), or manually add the `insiders-released` when you know it has been released in the latest insiders. 
2. Upon the issue becoming both `insiders-released` and `author-verification-requested`, the bot will ask the issue author to verify it by commenting `\verified`. 
3. Once the author comments, the bot will label the issue `verified` and it will be removed from our endgame queries.



## Insiders Released

The `insiders-released` pipeline runs automatically to:

- Mark all issues newly [closed with a commit](#closing-with-a-commit) as `unreleased`
- Periodically (~daily) scan through all `unreleased` issues and promote them to `insiders-released` if their closing patch is present in the latest insiders.

## Closing With a Commit

Various pipelines work best when an issue is "closed with a commit". This means the latest timeline instance of one of:
  - A commit with the `Closes/Fixes #NUM` GitHub syntax being put on `main`
  - A PR which is marked as `Closes/Fixes #NUM` being merged into `main`
  - A comment with `\closedWith SHA` made by a team member

> Note: If an issue is reopened, the prior closing events will be ignored.
