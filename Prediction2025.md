# The Visual Studio Code Roadmap 2025

## Overview
Our roadmap spans 12-18 months and focuses on the goals and initiatives we will work on. Rather than starting from scratch, we build on insights from our previous roadmap, community feedback through issues, discussions, social media, and developer forums. As we implement these plans, we continuously learn and adapt our priorities. New topics may be introduced, and others may be revised or removed as we gather more information. We may mark some topics as investigations or explorations, where we aim to understand the challenges before diving into development. Upon concluding these investigations, our plans will be updated.

### Legend of Annotations
| Mark          | Description                       |
|---------------|-----------------------------------|
| bullet        | Work not started                  |
| check mark    | Work completed                    |
| :runner:      | Ongoing work                      |
| :muscle:      | Stretch goal                      |
| :red_circle:  | Missing link                      |

## Core Values
Before diving into specifics, here are the guiding principles for the development of VS Code:
- **Lightweight and Fast**: VS Code is a fast text editor that can be extended with rich functionalities.
- **Performance Prioritization**: We emphasize speed and responsiveness over additional features.
- **Consistent UI**: We aim for a clean and intuitive user interface.
- **CLI/UI Synergy**: Seamless integration between the command-line interface and graphical UI.
- **Powerful Extensions**: Extensions enhance the core editor, turning VS Code into a comprehensive development environment.

## Focus Areas for 2025
Our focus will remain on evolving the roadmap for the next 2-3 years while maintaining our commitment to excellence in performance, accessibility, and user-requested features. A major theme will be investigating how AI is influencing the development landscape. Some of the initiatives will be open-source, while others may remain proprietary. An essential project will be enhancing the GitHub Copilot Chat extension.

## Key Initiatives

### Accessibility and Internationalization
- [ ] :runner: Improve VS Code’s accessibility with direct community involvement.
- [ ] Switch from custom IME implementations to `ContentEditable` for improved text segmentation in right-to-left (RTL) and CJK languages.

### Performance
- [ ] Reduce the download size of VS Code.
- [x] Explore lazy downloads for core features.
- [ ] :runner: Ensure predictable startup times on all platforms.
- [ ] Improve performance in large workspaces.
- [x] Introduce "working sets" to manage files and folders in the Explorer.
- [ ] Optimize file opening and Quick Pick performance.
- [x] Ensure faster startup in web environments.

### Security
- [x] Implement trusted workspaces to prevent unauthorized code execution during repository cloning.
- [x] Enhance security by restricting renderer processes from accessing `node` APIs.
- [ ] Transition from `webviews` to `iFrames` for improved isolation.
- [ ] Allow users to enforce signed extensions for added security.
- [ ] :runner: Enable extension signing in local and remote environments.
- [ ] Investigate sandboxing extensions for improved security.

### Codespaces and Remote Development
- [ ] :runner: Simplify transitions between local folders, containers, and codespaces.
- Remote-SSH:
  - [x] Provide web access to Remote-SSH boxes through tunnel services.
  - [ ] Prevent server installations on micro-instances.
  - [x] Support 'Reopen in Container' using Remote-Container support.

### AI Integration
- [ ] Finalize extensibility for Copilot Chat through Agents.
- [ ] Improve built-in agents (`@workspace` and `@vscode`).
- [ ] Refine Inline Chat usage models for smoother interactions.

## VS Code Core Enhancements

### General Improvements
- [ ] :runner: Review default settings for an enhanced user experience.

### User Experience (UX)
- [ ] :runner: Investigate user preferences after installation to streamline environment setup, including runtime, extensions, and settings.
- [x] Improve the command palette discoverability for new users and explore team-like placements.

### Workbench Layout
- [ ] Introduce support for detachable workbench parts, addressing related architectural challenges.

### API Enhancements
- [ ] Clean up or finalize longstanding proposed APIs such as Search.

### Editor Features
- [ ] Expand inline experiences within the editor for a smoother workflow.

## Languages Support
We will continue our close collaboration with TypeScript and Python teams to improve language support. Planned initiatives include:
- [ ] Explore additional refactorings in TypeScript.

This roadmap demonstrates our commitment to continuous improvement, keeping user feedback and evolving technologies at the heart of VS Code’s development. We encourage contributions and insights as we move forward with this vision.
