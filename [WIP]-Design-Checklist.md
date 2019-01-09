# Intro
These items are a general checklist for when we create new features that is based off our [design principles](https://github.com/Microsoft/vscode/wiki/%5BWIP%5D-Design-Principles).

# Design checklist
- [ ] Is this accessible?
  - [ ] Does it pass the color [contrast ratio requirement](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=143#contrast-minimum)?
  - [ ] Does it support [keyboard navigation](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=213#keyboard-no-exception) (i.e. keyboard only)?
  - [ ] Does it have the [proper markup (name, role, value)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=412#name-role-value)?
  - [ ] Are the [text links meaningful](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&showtechniques=244#qr-navigation-mechanisms-refs)?
- [ ] Is this customizable?
  - [ ] Can extensions [contribute to this](https://code.visualstudio.com/docs/extensionAPI/extension-points)?
  - [ ] Can users define [keybindings](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributeskeybindings) for actions?
  - [ ] Are the setting names and descriptions clear?
- [ ] Is this simple?
  - [ ] Are these incremental changes (i.e. can it be broken down)?
  - [ ] Are text descriptions clear and easy to understand?
  - [ ] Can you re-use existing components/patterns?
  - [ ] Do your icons make sense?
  - [ ] Have you tested this with users?
- [ ] Is this delightful?
  - [ ] Is input from the user contextual?
  - [ ] Are user actions optimized (i.e. can we reduce the number of steps)?
  - [ ] Can we reduce the load time?