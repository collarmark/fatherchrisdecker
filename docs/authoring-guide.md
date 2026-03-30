---
title: Authoring Guide
---

# Authoring Guide

This document is a reference for the custom Markdown features and TinaCMS conventions used on this site. It lives in `docs/` and is **never published** to the public site.

---

## Image Focal Point

Every content type has a **Image focal point** field in TinaCMS. It controls which part of the cover image stays visible when the image is cropped — on listing cards, the cinematic banner, and the Camino timeline thumbnail.

The value is a standard CSS `object-position` expression. Leave it blank for the default (`center`).

| Value | Effect |
|---|---|
| *(blank)* | Center of image (default) |
| `top` | Pin to top edge — good for faces/skylines |
| `bottom` | Pin to bottom edge |
| `left` | Pin to left edge |
| `right` | Pin to right edge |
| `50% 25%` | 50% from left, 25% from top — subject near top-center |
| `30% 60%` | 30% from left, 60% from top |
| `center top` | Named keywords can be combined |

**How to find the right value:** open the image in any browser, right-click → "Inspect", find the `<img>` element, and in the Styles panel try different `object-position` values live until the crop looks right. Copy that value into TinaCMS.

---

## ⚠️ TinaCMS Compatibility Warning

TinaCMS's rich-text editor only understands standard Markdown. Any custom syntax it doesn't recognise will be **escaped with backslashes** the next time you open and save that post in TinaCMS, permanently breaking the feature.

**Edit these directly in your code editor (VS Code, etc.), not TinaCMS:**

| Feature | Syntax | What TinaCMS does to it |
|---|---|---|
| Highlighted text | `==text==` | Saves as `\==text\==` — broken |
| Footnote popups | `[^label]` / `[^label]: content` | Saves as `\[^label]` — broken |
| Image class attrs | `{.float-right}` | Saves as `\{.float-right\}` — broken |
| Aside (via Embed UI) | `<Aside text="..." />` | Silently dropped — use `[aside: ...]` instead |

**Safe workflow for posts that use these features:**

1. Draft the post in TinaCMS (title, date, excerpt, cover image, body text).
2. Save and close TinaCMS.
3. Open the `.md` file in VS Code and add footnotes, highlights, and image attrs by hand.
4. Do not re-open that post body in TinaCMS again. Front matter fields (title, date, image, etc.) are safe to edit in TinaCMS — they are not processed by the rich-text editor.

Alternatively, use the **Raw** toolbar button in TinaCMS to edit Markdown source directly and add custom syntax there — but be cautious about saving after switching back to rich-text view.

---

## Highlighted Text

Wrap text in double equals signs to apply a yellow highlighter effect.

**Syntax:**

```
The Council declared this ==absolutely, unambiguously, definitely settled== doctrine.
```

- Works inline anywhere: inside paragraphs, blockquotes, list items, headings.
- Can span multiple words but should not cross paragraph breaks.
- Do not use for decorative purposes — `==highlight==` carries the semantic meaning of *marked for relevance*, which is appropriate for emphasis, key terms, or comedic effect.
- Nests fine with other inline formatting:

```
**==bold and highlighted==**
==*italic highlight*==
==combined with a footnote[^fn1]==
```

Combined with a footnote popup for maximum comedic layering:

```
The theology of ==cookies[^cookies]== is often overlooked.

[^cookies]: Everyone knows Oreos are the best cookies.
```

---

## Aside Popover (inline annotation)

An aside is an inline `···` pill that reveals a hidden annotation in a popover when clicked. Use it for parenthetical commentary, sarcastic footnotes-without-numbers, or context you want available but unobtrusive.

⚠️ **TinaCMS limitation:** The visual Embed button inserts the component correctly in the editor, but TinaCMS silently drops it when saving `.md` files. Use the plain-text syntax below instead.

**Syntax** — type this directly in the Raw editor or in VS Code:

```
[aside: your annotation text here]
```

Place it inline anywhere in a sentence:

```
When I got the yen and a free afternoon [aside: ...a planetary alignment which is as rare as a white moose] I'd sketch out a new frame or two.
```

**At build time** Eleventy converts `[aside: ...]` to a clickable `···` span. **On the page**, clicking the pill opens a white popover above it with a triangle pointer. Clicking anywhere else closes it. Keyboard accessible: Tab to focus, Enter/Space to open, Escape to close.

**Combining with other features:**

```
The Council declared this matter ==settled==<Aside text="Only provisionally settled, of course." /> pending further study.
```

```
He arrived carrying cookies[^1]<Aside text="Oreos, obviously." />.

[^1]: Store-bought, no less.
```

**Links are supported** inside the popover. Because the `text` attribute itself uses double quotes, any `href` must use **single quotes**:

```
<a href='https://example.com'>link text</a>
```

Basic inline HTML (`<em>`, `<strong>`, `<a href='...'>`) works. Markdown syntax does not.

---

## Raw Markdown Mode

Every body editor has a **Raw** toggle in the toolbar (the `</>` or `{ }` button at the right end of the toolbar). Clicking it switches the rich-text editor to a plain Markdown source view. This is the safe way to add or edit footnotes, highlights, and image attrs while staying inside TinaCMS — as long as you switch back to rich-text and **do not save** after TinaCMS re-parses the content, the custom syntax should survive.

In practice, the safest workflow for content with custom syntax is still VS Code (see the compatibility warning above), but Raw mode is useful for quick fixes.

---

## Footnote Popups

Clicking a footnote superscript opens a small popup rather than jumping to a footnote list at the bottom of the page. Great for asides, sarcasm, and comedy.

**Syntax:**

Place a label inline where you want the superscript to appear, then define its content anywhere below (conventionally at the end of the post).

```
Cookies[^oreos] are a perfectly acceptable snack.

[^oreos]: Everyone knows Oreos are the best cookies.
```

- Labels can be words (`[^oreos]`) or numbers (`[^1]`). Words are easier to read in the source.
- The definition line (`[^label]: content`) is hidden from the published page — it only powers the popup.
- Definitions can contain links, emphasis, etc.
- Multiple footnotes can appear in the same post; each gets its own numbered superscript in order of appearance.

---

## Images

### Basic image

```
![Alt text for accessibility](/assets/images/folder/file.jpg)
```

### Image with caption

Add the caption as the **title attribute** (text in quotes after the path). The caption appears beneath the image in italics.

```
![Alt text](/assets/images/folder/file.jpg "This text appears as a caption.")
```

The image must be **on its own paragraph** (blank line above and below) for the caption to render. If the image is embedded mid-sentence, the caption is silently ignored.

### Layout / size classes

Append `{.class .class}` immediately after the closing `)` of the image (no space before the `{`).

| Class | Effect |
|---|---|
| `{.float-right}` | Float image to the right; text wraps left |
| `{.float-left}` | Float image to the left; text wraps right |
| `{.img-center}` | Center the image, no float |
| `{.img-full}` | Stretch image to full content width |
| `{.img-medium}` | Constrain to ~60% of content width |
| `{.img-small}` | Constrain to ~30% of content width |

Classes can be combined:

```
![A pilgrim walking](/assets/images/2018-Camino/walking.jpg "Walking the meseta."){.float-right .img-medium}
```

**Important:** floated images with captions must be on their own paragraph or the caption will misalign.

---

## General inline CSS classes

Any block-level Markdown element can receive CSS classes using `{.classname}` syntax.

**On a paragraph:**

```
This is a highlighted note.
{.note}
```

**On a blockquote:**

```
> Blessed are the feet that bring good news.
{.pull-quote}
```

**On a heading:**

```
## Section Title {.section-special}
```

This is powered by the `markdown-it-attrs` plugin.

---

## Front Matter Fields

### Posts (`content/posts/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `date` | datetime | Required. Set via TinaCMS date picker. |
| `time` | string | Optional. `HH:MM` 24-hour format (e.g. `14:30`). Orders multiple posts on the same day. |
| `image` | image | Featured image. Used as listing thumbnail and post banner. |
| `hideHeroImage` | boolean | When checked, `image` is used only as the listing thumbnail — not shown at the top of the post. |
| `excerpt` | textarea | Short summary shown on listing cards. |

### Adventures (`content/adventures/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `date` | datetime | Required |
| `time` | string | Optional. Same ordering use as posts. |
| `location` | string | City or place name |
| `country` | string | Country name |
| `lat` / `lng` | number | Coordinates for the map pin |
| `category` | select | `pilgrimage`, `travel`, `retreat`, `parish`, `personal` |
| `coverImage` | image | Listing thumbnail and post banner |
| `hideHeroImage` | boolean | Suppresses banner on the detail page |

### Camino Journal (`content/camino/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `date` | datetime | Required |
| `time` | string | Optional. Orders multiple entries on the same day. |
| `stage` | string | e.g. `Stage 4` |
| `startLocation` / `endLocation` | string | Shown in listing and post header |
| `distance` | string | e.g. `22 km` |
| `lat` / `lng` | number | Coordinates for the map pin |
| `coverImage` | image | Listing thumbnail and post banner |
| `hideHeroImage` | boolean | Suppresses banner on the detail page |

### Pages (`content/pages/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | string | URL path segment. Defaults to filename. |
| `aliases` | string list | Additional slugs that redirect here (e.g. `cv` → `/curriculum-vitae/`) |
| `coverImage` | image | Page banner image |
| `hideHeroImage` | boolean | Suppresses banner on the detail page |

---

## Time Field Ordering Note

Because TinaCMS's date picker stores all dates as midnight UTC, multiple posts on the same calendar day will appear in an unpredictable order without a `time` field. Set `time` to a 24-hour value like `09:00` or `14:30` to control the sequence. Zero-pad the hour (use `09:00`, not `9:00`) so that alphabetical sorting works correctly.
