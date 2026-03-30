---
title: Authoring Guide
---

# Authoring Guide

This document is a reference for the custom Markdown features and CMS conventions used on this site. It lives in `docs/` and is **never published** to the public site.

---

## CMS: Sveltia CMS

The site uses **Sveltia CMS** (replacing TinaCMS). The admin panel is at `/admin/`.

### Local development

Two things must be running:

1. **Eleventy** — `npm run dev` (port 8082)
2. *(nothing else needed)* — Sveltia uses the browser's File System Access API in local mode

Visit `http://localhost:8082/admin/`, click **"Work with local repository"**, and select the project root folder. Sveltia reads and writes `.md` files directly to disk.

### Production (Netlify)

Login uses GitHub OAuth via Netlify as the auth proxy. Netlify Identity is **not** required — only the OAuth app in GitHub settings.

### Key improvement over TinaCMS

Sveltia's markdown editor treats the body field as **raw text**. It does not attempt to parse or reserialize custom syntax. This means:

- `==highlight==` — saved exactly as written ✓
- `[^footnote]` — saved exactly as written ✓
- `{.float-right}` — saved exactly as written ✓
- `[aside: text]` — saved exactly as written ✓

The TinaCMS compatibility warnings below are **no longer applicable** for new editing sessions. Legacy content that was previously mangled by TinaCMS has been cleaned up, but if you encounter a `\==` or `\[^` in a post, that's old TinaCMS damage — just remove the backslash.

---

## Image Focal Point

Every content type has an **Image focal point** field. It controls which part of the cover image stays visible when cropped — on listing cards, the cinematic banner, and the Camino timeline thumbnail.

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

**How to find the right value:** open the image in a browser, right-click → Inspect, find the `<img>` element, and try different `object-position` values live in the Styles panel until the crop looks right. Copy that value into the CMS field.

---

## URL / Permalink Override

Every collection has a **URL / Permalink** field. Leave it blank to use the filename as the URL (the default). Fill it in to override the URL for that entry.

**Format:** always include leading and trailing slashes.

```
/camino/day-01-saint-jean/
/blog/my-custom-slug/
```

If you rename a post's permalink after the site is live, add a redirect to `_redirects` at the project root:

```
/camino/old-slug/   /camino/new-slug/   301
```

---

## Highlighted Text

Wrap text in double equals signs to apply a yellow highlighter effect.

**Syntax:**

```
The Council declared this ==absolutely, unambiguously, definitely settled== doctrine.
```

- Works inline anywhere: paragraphs, blockquotes, list items, headings.
- Can span multiple words but should not cross paragraph breaks.
- Nests with other formatting:

```
**==bold and highlighted==**
==*italic highlight*==
==combined with a footnote[^fn1]==
```

Combined with a footnote popup:

```
The theology of ==cookies[^cookies]== is often overlooked.

[^cookies]: Everyone knows Oreos are the best cookies.
```

---

## Aside Popover (inline annotation)

An aside is an inline `···` pill that reveals a hidden annotation in a popover when clicked. Use it for parenthetical commentary, sarcastic asides, or context you want available but unobtrusive.

**Syntax** — type this directly in the Sveltia markdown editor or VS Code:

```
[aside: your annotation text here]
```

Place it inline anywhere in a sentence:

```
When I got the yen and a free afternoon [aside: ...a planetary alignment which is as rare as a white moose] I'd sketch out a new frame or two.
```

**At build time** Eleventy converts `[aside: ...]` to a clickable `···` span. **On the page**, clicking the pill opens a white popover above it with a triangle pointer. Clicking anywhere else closes it. Keyboard accessible: Tab to focus, Enter/Space to open, Escape to close.

**Links are supported** inside the popover — use single quotes for `href` values:

```
[aside: See <a href='/blog/some-post/'>this post</a> for more.]
```

Basic inline HTML (`<em>`, `<strong>`, `<a href='...'>`) works inside asides. Markdown syntax does not.

---

## Footnote Popups

Clicking a footnote superscript opens a small popup rather than jumping to a footnote list. Great for asides, sarcasm, and comedy.

**Syntax:**

Place a label inline where you want the superscript, then define its content below (conventionally at the end of the post).

```
Cookies[^oreos] are a perfectly acceptable snack.

[^oreos]: Everyone knows Oreos are the best cookies.
```

- Labels can be words (`[^oreos]`) or numbers (`[^1]`). Words are easier to read in source.
- The definition line is hidden from the published page — it only powers the popup.
- Definitions can contain links, emphasis, etc.
- Multiple footnotes in one post each get their own numbered superscript in order of appearance.

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

The image must be **on its own paragraph** (blank line above and below) for the caption to render.

### Layout / size classes

Append `{.class .class}` immediately after the closing `)` of the image (no space before `{`).

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

## General Inline CSS Classes

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

Powered by the `markdown-it-attrs` plugin.

---

## Front Matter Fields

### Posts (`content/posts/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `permalink` | string | Optional URL override — e.g. `/blog/my-slug/` |
| `date` | datetime | Required |
| `time` | string | Optional. `HH:MM` 24-hour. Orders multiple posts on the same day. |
| `image` | image | Featured image. Listing thumbnail and post banner. |
| `coverImagePosition` | string | CSS `object-position` for the banner crop |
| `hideHeroImage` | boolean | Listing thumbnail only — not shown at top of post |
| `excerpt` | textarea | Short summary shown on listing cards |

### Adventures (`content/adventures/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `permalink` | string | Optional URL override |
| `date` | datetime | Required |
| `time` | string | Optional. Orders multiple entries on the same day. |
| `location` | string | City or place name |
| `country` | string | Country name |
| `lat` / `lng` | number | Coordinates for map pin |
| `category` | select | `pilgrimage`, `travel`, `retreat`, `parish`, `personal` |
| `coverImage` | image | Listing thumbnail and post banner |
| `coverImagePosition` | string | CSS `object-position` for the banner crop |
| `hideHeroImage` | boolean | Suppresses banner on the detail page |

### Camino Journal (`content/camino/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `permalink` | string | Optional URL override — e.g. `/camino/day-01-saint-jean/` |
| `date` | datetime | Required |
| `time` | string | Optional. Orders multiple entries on the same day. |
| `stage` | string | e.g. `Stage 4` |
| `startLocation` / `endLocation` | string | Shown in listing and post header |
| `distance` | string | e.g. `22 km` |
| `lat` / `lng` | number | Coordinates for map pin |
| `coverImage` | image | Listing thumbnail and post banner |
| `coverImagePosition` | string | CSS `object-position` for the banner crop |
| `hideHeroImage` | boolean | Suppresses banner on the detail page |

### Galleries (`content/galleries/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `permalink` | string | Optional URL override |
| `category` | select | `sacred-art`, `superheroes`, `sci-fi`, `graphic-design`, `inktober`, `illustration`, `other` |
| `year` | string | e.g. `2023` |
| `coverImage` | image | Listing thumbnail |
| `coverImagePosition` | string | CSS `object-position` for the thumbnail crop |
| `images` | list | Each item has `image` (path) and `caption` (string) |

### Pages (`content/pages/`)

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | string | URL path segment. Defaults to filename. |
| `aliases` | string list | Additional slugs that redirect here (e.g. `cv` → `/curriculum-vitae/`) |
| `coverImage` | image | Page banner image |
| `coverImagePosition` | string | CSS `object-position` for the banner crop |
| `hideHeroImage` | boolean | Suppresses banner on the detail page |

---

## Time Field Ordering Note

The date picker stores all dates as midnight UTC. Multiple posts on the same calendar day will appear in unpredictable order without a `time` field. Set `time` to a 24-hour value like `09:00` or `14:30` to control the sequence. Zero-pad the hour (`09:00`, not `9:00`) so alphabetical sorting works correctly.

---

## Galleries: Local File System Access (Sveltia)

When working locally, Sveltia's media browser reads from the folder you granted access to. Images uploaded via the CMS go to `src/assets/images/`. You can also drop images directly into subfolders (e.g. `src/assets/images/inktober-2025/`) and reference them in the gallery `.md` file manually.

Image paths in front matter always use the **public path** (what the browser sees), not the source path:

```yaml
coverImage: /assets/images/inktober-2025/01-Mustache.png
```
