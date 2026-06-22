# C++ Interactive Tools

Interactive browser-based visualizers for C++ courses.

This repo contains small, self-contained teaching tools designed to help students see what C++ code is doing: stack frames, pointers and references, objects, vectors, strings, enums, lambda functions, and control flow. Each tool runs entirely in the browser with no install step and no data sent to a server.

These pages are built especially for embedding into Instructure Canvas lecture pages, assignments, modules, and course notes.

## Tools

- Stack Variable Visualizer
- Pointer & Reference Explorer
- Vector Internals Visualizer
- Object & Class Visualizer
- String Visualizer
- Enum Visualizer
- Flowchart Visualizer
- Operator Overload Explorer
- Who Has the Key? Friend Access
- Lambda Functions Lab

## Canvas Embeds

Open `index.html` in the browser, choose a tool, and use the `</> embed` button to copy an iframe snippet for Canvas.

In Canvas:

1. Edit a Page, Assignment, or other rich-content area.
2. Open the HTML editor.
3. Paste the iframe code.
4. Save or publish the Canvas page.

Example:

```html
<iframe
  src="https://dinocrates.github.io/cpp-interactive-tools/demos/cpp-stack-visualizer.html"
  width="100%"
  height="750"
  frameborder="0"
  allowfullscreen>
</iframe>
```

The suggested iframe heights are tuned per tool, but they can be adjusted for a specific Canvas page layout.

## Theme Support

The tools support dark mode and light mode.

- `auto` follows the user's browser or operating-system preference.
- `dark` preserves the original visual design.
- `light` uses a light classroom-friendly palette.

Each page includes a small theme toggle. Theme choices are saved in the browser when storage is available.

You can also force a theme in an embed URL:

```html
<iframe
  src="https://dinocrates.github.io/cpp-interactive-tools/demos/cpp-vector-visualizer.html?theme=light"
  width="100%"
  height="820"
  frameborder="0"
  allowfullscreen>
</iframe>
```

Canvas dark mode cannot always be detected directly from inside an embedded iframe, especially when Canvas and the tool are on different domains. For Canvas pages, use `auto` for the user's system preference, or add `?theme=dark` or `?theme=light` to the iframe URL when a specific appearance is needed.

## Local Development

This is a static site. There is no build step.

You can open `index.html` directly in a browser, or run a simple local server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Structure

```text
index.html        Tool gallery and Canvas embed helper
assets/           Shared theme CSS and JavaScript
demos/            Standalone interactive visualizers
```

## Notes

These tools are instructional models, not full C++ compilers or debuggers. The parsers and memory layouts are intentionally simplified to support classroom explanations and visual intuition.
