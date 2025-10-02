This page covers testing during the [endgame](https://github.com/microsoft/vscode/wiki/Running-the-Endgame) process. It's mainly for VS Code team members but others may find our general approach to testing and some of the specific tips of interest

# General Philosophy
The VS Code team strives for a culture where all team members feel responsible for the quality of VS Code and are empowered to uphold and improve this quality. Testing and how we approach testing is a key part of this.

It's not always the most fun to run through tests and verify issues, but this is a key part of upholding the quality of VS Code. When a bug is fixed, we want to confirm it really has been fixed. When a feature is committed to a milestone, we want to make sure it works as described. But it's more than that too.

When going through a test-plan item or verifying an issue, it's not enough to mechanically through the exact flow listed so you can check it off and move on to the next item. Instead try to treat testing as more exploratory, open ended process. 

For bugs, try other cases beyond the original issue. Could the fix be improved? Are there similar bugs in other areas of the product?

For features, ask yourself: does the feature makes sense as designed? Does it align with the rest of VS Code? Could be improved or extended? Could it cause problems for certain workflows or in the future?

Approaching testing this way not only helps us ship a better product, it also makes testing more fun. Exploring new features and trying to break them becomes an investing challenge. It can also be a great opportunity to learn about and explore a new area of the product.

Don't be afraid about opening bugs or providing feedback. Getting fresh eyes on a feature is extremely valuable, and often interns will end up spot problems or offer perspective that a team of very senior engineers hadn't considered. If you see something that feels off during testing, open an issue. It doesn't have to be something major. You don't even have to be sure it is a bug. Just having the issue opened provides valuable feedback. Do this even for any part of VS Code, not just the feature you are testing/verification 

Critically, take this same testing mindset beyond endgame into your daily work too. We all use VS Code every day, so always report issues and confusion you run into in your day-to-day work too. We are all responsible for the quality of VS Code


# Starting questions to ask during testing

- Does this feature work as described? Try other flows and variations too beyond exactly what the test-plan item describes
- Does this behavior make sense? Could it be simplified or improved?
- Does this behavior feel aligned with the rest of VS Code?
- Could a new user understand it? Can they learn about it?
- Can I break it? What happens if I try entering invalid values or going off of the recommended flow
-Does it work nicely for all sorts of VS Code setups and configurations and usage patterns (see notes on UI testing below)

# Basics for testing UI features
- Is the feature accessible?
    At the very least try using the keyboard to navigate, but you can also use a screen reader for more complete testing

- Does it work at different zoom levels?

- Does it work with different color themes, especially the high contrast themes?

- Does it work with different window / UI component sizes and different workbench layouts?

- When relevant, does it work with different icon themes or when disabling various UI features

- If relevant, do the keybindings make sense?
    
Are the command names good and if there are default keybindings do they conflict with existing VS Code / OS keybindings

# Basics for testing APIs 
- Try approaching it as a beginner who is unfamiliar with the space. Is there enough info to understand the API?

- Do the JSDocs make sense? Make sure to check that links are rendered properly in IntelliSnese

- For new package.json contributions, make sure the hover documentation in the package.json makes sense. Make sure they have reasonable IntelliSense suggestions. Make sure the snippet suggestions fill in correctly. Make sure you get an error for invalid configurations

- Look at the names in the API. Are they consistent with other names in the product?

- Does the API encourage correct usage? Are there any easy to miss complexities or footguns?

- Does the API require a large amount of boilerplate? Is this something we should try to improve?

- If there's an extension sample or written documentation, is it up to date? Does it build correctly? Do the docs in it make sense?