Every new UI component that we add to VS Code needs to be accessible so all developers out there can use it with joy. If you have not already, please read these public facing docs as well: https://code.visualstudio.com/docs/editor/accessibility and https://www.w3.org/TR/WCAG20/#guidelines.

### New features

Test the feature with a screen reader to determine if the feature could benefit from an explanation. To educate screen reader users about what to expect and how to interact with a new feature, an `accessibility.verbosity` setting and an accessibility help menu should be added via `registerProvider` on `IAccessibleViewService`. 

### Existing widgets

If you are using an existing widget in your component you still need to make sure the new experience is accessible by trying it out. Interact with it using the keyboard and by turning on a Screen Reader and make sure the content that is announced is informative. For example, if you are using a `List` widget, you might have missed that you need to implement an `IListAccessibilityProvider`.

### Color contrast

If the component is introducing colors make sure all colors pass the required color contrast: 
1) HC themes - all color contrast MUST be at least `4.5:1` but we SHOULD strive towards `7:1`.
2) All other themes everything inside the Editor MUST be `3:1` but we SHOULD strive towards `4.5:1`. Everything outside the Editor MUST be `4.5:1`

### Keyboard navigation

Every actionable element in your component needs to be keyboard navigable, or there needs to be a great keyboard alternative. No functionality should only be accessed by mouse. Focus movement in your experience should go in a naturaly visual way. Focus can also be moved using arrow keys to save on tabs tops - `ActionBar` is doing that right now.

### Aria labels

When an element gets focus, a screen reader will read something if the element has an `aria-label` attribute set. Set an informative `aria-label` attribute on the element that gets focus. `aria-label` should be informative but concise. Always make sure to put the most important information to the front of the `aria-label` so if users skip the announcement they first hear the important stuff. When there are multiple things to express in the aria label `,` separate them. For example, here's an `aria-label` of one Breakpoint: `main.js 12, ~/Development/vscode/src/main.js`. First the most important information: filename and line number, and then comma separated additional details.

### Aria alerts

Ideally aria announcements are done as focus moves in VS Code, however in some experiences that is not possible (e.g. parameter hints). In those cases you our helper method `aria.alert` to announce. This should be used as a workaround, since we can not control when the screen reader announces these alerts.

### Aria roles
It’s best to use a native HTML control if possible, but roles are available when we are building custom components.

### Input elements
Make sure <input> controls have associated labels.

### Links
Links within `p` elements will automatically show underlines to discern themselves from regular text if `accessibility.underlineLinks` is enabled. However, this rule doesn't catch every case where links could benefit from underlines. Consider including `text-decoration: var(--text-link-decoration)` to ensure a link element respects that setting. 

### Audio cues

Some experiences can be enriched with audio cues (e.g. existence of a breakpoint on a line). Audio cues should be used when just focus and `aria-label` are not enough. When in doubt, reach out to Megan Rogge and she can also put you in contact with our sound designer.

### Bug fixes

Important accessibility issues are labeled with the `accessibility-sla` tag. Please prioritize the fix or reply in the issue within ~ 30 days. Also feel free to reach out to Megan Rogge or Isidor Nikolic for help. 

### Screen readers
The most common screen readers used per platform are:
- Windows - NVDA, JAWS, Narrator (in descending order of support)
- MacOS - VoiceOver
- Linux - Orca (often is tricky)