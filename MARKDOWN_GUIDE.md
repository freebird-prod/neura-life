# Markdown Syntax Guide for Notes

Quick reference for using Markdown in your notes.

## Headers

```markdown
# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header
```

## Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and Italic***
~~Strikethrough~~
`Inline code`
```

## Lists

### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

### Ordered Lists
```markdown
1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested item
```

### Task Lists
```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

## Links and Images

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Link title")

![Alt text](image-url.jpg)
![Image with title](image-url.jpg "Image title")
```

## Code Blocks

### Inline Code
```markdown
Use `backticks` for inline code
```

### Code Blocks with Syntax Highlighting
````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```

```python
def hello():
    print("Hello, World!")
```

```html
<div class="container">
  <h1>Hello, World!</h1>
</div>
```
````

## Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
> 
> And have multiple paragraphs
```

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

Alignment:
| Left | Center | Right |
|:-----|:------:|------:|
| L1   | C1     | R1    |
| L2   | C2     | R2    |
```

## Horizontal Rules

```markdown
---
***
___
```

## Escaping Characters

```markdown
Use backslash to escape special characters:
\* Not italic \*
\# Not a header
```

## Supported Languages for Code Blocks

- javascript / js
- python / py
- java
- cpp / c++
- html
- css
- json
- markdown / md
- bash / shell
- sql
- typescript / ts
- jsx / tsx
- php
- ruby
- go
- rust
- swift
- kotlin
- and many more...

## Tips for Better Notes

1. **Use headers** to organize sections
2. **Add code blocks** for technical notes
3. **Use tables** for structured data
4. **Add task lists** for todos
5. **Use blockquotes** for important quotes
6. **Add links** for references
7. **Use inline code** for commands and variables

## Example Note

```markdown
# Project Meeting Notes

**Date:** 2024-01-15  
**Attendees:** John, Sarah, Mike

## Agenda

1. Project status update
2. Technical challenges
3. Next steps

## Key Decisions

> We decided to move forward with the new architecture

### Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend  | React      |
| Backend   | Node.js    |
| Database  | MongoDB    |

## Action Items

- [x] Review code
- [ ] Update documentation
- [ ] Schedule follow-up meeting

## Code Snippet

```javascript
const config = {
  api: 'https://api.example.com',
  timeout: 5000
};
```

## References

- [Documentation](https://example.com/docs)
- [API Reference](https://example.com/api)
```

---

Happy note-taking! 📝
