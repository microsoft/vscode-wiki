This page can be used to smoke test the screen reader usage with VS Code. In the following always have screen reader accessibility mode toggled on. 

- For macOS use VoiceOver. The gold standard is XCode.
- For windows use NVDA. The golden standard is Visual Studio. 

In the following tests use the following example code:

<details>
<summary>
Example Code
</summary>

```
export interface IRange {
	start: number;
	end: number;
}

export interface IRangedGroup {
	range: IRange;
	size: number;
}

export namespace Range {

	/**
	 * Returns the intersection between two ranges as a range itself.
	 * Returns `{ start: 0, end: 0 }` if the intersection is empty.
	 */
	export function intersect(one: IRange, other: IRange): IRange {
		if (one.start >= other.end || other.start >= one.end) {
			return { start: 0, end: 0 };
		}

		const start = Math.max(one.start, other.start);
		const end = Math.min(one.end, other.end);

		if (end - start <= 0) {
			return { start: 0, end: 0 };
		}

		return { start, end };
	}

	export function isEmpty(range: IRange): boolean {
		return range.end - range.start <= 0;
	}

	export function intersects(one: IRange, other: IRange): boolean {
		return !isEmpty(intersect(one, other));
	}

	export function relativeComplement(one: IRange, other: IRange): IRange[] {
		const result: IRange[] = [];
		const first = { start: one.start, end: Math.min(other.start, one.end) };
		const second = { start: Math.max(other.end, one.start), end: one.end };

		if (!isEmpty(first)) {
			result.push(first);
		}

		if (!isEmpty(second)) {
			result.push(second);
		}

		return result;
	}
}
```
</details>

## Simple Screen Reader Usage

- Place the cursor on (1, 1). Move cursor down, move cursor up.
- Verify the screen reader reads the full first line. 

**macOS:**
- Verify there is a black box surrounding the line that is read
- Move cursor right to (1, 2) with the right arrow. Verify it reads `e`.
- Move cursor right to (1, 3) with the right arrow. Verify it reads `x`.

**windows:**
- Verify there is a black box surrounding the line that is read
- Move cursor right to (1, 2) with the right arrow. Verify it reads `x`.
- Move cursor right to (1, 3) with the right arrow. Verify it reads `p`.

## Screen Reader with Word Wrap

- Set the setting `editor.wordWrapColumn` to 10
- Set the setting `editor.wordWrap` to `wordWrapColumn`
- Place the cursor on (1, 1). 
- Put cursor down once, verify it reads: `interface`
- Put cursor down once, verify it reads: `IRange {`

## Screen Reader Read Word by Word

**macos:**
- Consider the keybindings:
  - Option + leftArrow to read the previous word
  - Option + rightArrow to read the next word
- Place the cursor on (1, 1)
- Jump to the next word. The screen reader should read `export`
- Jump to the next word. The screen reader should read `interface`
- Jump to the previous word. The screen reader should read `export`

**windows:**
- Consider the keybindings:
  - NVDA + ctrl + leftArrow to read the previous word
  - NVDA + ctrl + rightArrow to read the next word
- Place the cursor on (1, 1)
- Jump to the next word. The screen reader should read `interface`
- Jump to the previous word. The screen reader should read `export`
