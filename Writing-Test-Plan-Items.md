## Test Plan Items

Test Plan Items (TPIs) are the issues created with label `testplan-item` for testing the features during the endgame. There is a tool that parses all these TPIs and generates user assignments. Endgame master uses this tool to assign these TPIs to others for testing.

A TPI should contain **Header** and **Body** sections which are separated by `---` (line). Header section shall contain the meta information about the TPI that is used by the tool for generating TPI assignments. Body section shall include testing details for the user to test.

### Header Section

Header section should be separated using `---` (line) 

```markdown

<!-- Header Section. -->

---

<!-- Body Section. -->

```

It shall contain following:

- References to issues being tested

```
Refs: <!-- Refer to the issue that this test plan item is testing. -->
```

- Platform assignments mentioning on which platforms this TPI shall be tested. You can pre-assign them to a user you would like to test by adding the user id next to platform. Refer #examples.
  - macOS
  - windows
  - linux
  - wsl
  - ssh
  - dev container
  - anyOS

- Complexity of the test plan item which should be between 1 till 5.

```
Complexity: 4
```

- If there are more than one authors for it, all the authors should be specified so that they will not be assigned for testing

```
Authors: @user1, @user2
```

## Examples

### Example 1 (Platforms)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] macOS
- [ ] linux
- [ ] windows

Complexity: 2

---

<!-- Please write your test here. -->

```

### Example 2 (Any platforms)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] anyOS
- [ ] anyOS

Complexity: 4

---

<!-- Please write your test here. -->

```

### Example 3 (One specific and other any platform)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] windows
- [ ] anyOS

Complexity: 4

---

<!-- Please write your test here. -->

```

### Example 4 (Same platform multiple times)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] windows
- [ ] windows

Complexity: 4

---

<!-- Please write your test here. -->

```

### Example 5 (Pre-assigned to users)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] macOS: @user1
- [ ] linux

Complexity: 4

Authors: @user1, @user2

---

<!-- Please write your test here. -->

```

### Example 6 (Remote)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] wsl
- [ ] ssh
- [ ] dev container

Complexity: 2

---

<!-- Please write your test here. -->

```

### Example 7 (Multiple Authors)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] windows
- [ ] linux

Complexity: 4

Authors: @user1, @user2

---

<!-- Please write your test here. -->

```

### Example 8 (Additional note to assigned users)

```markdown

Refs: <!-- Refer to the issue that this test plan item is testing. -->

- [ ] linux (test cross paltform)
- [ ] windows: @user1 (test 32 bit)

Complexity: 4

---

<!-- Please write your test here. -->

```