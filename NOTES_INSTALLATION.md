# Smart Note System - Installation Guide

## Required Dependencies

Before running the application, you need to install the following packages:

```bash
npm install react-markdown remark-gfm rehype-raw rehype-sanitize react-syntax-highlighter idb diff
```

### Package Details:

- **react-markdown**: Renders markdown content with live preview
- **remark-gfm**: GitHub Flavored Markdown support (tables, task lists, etc.)
- **rehype-raw**: Allows HTML in markdown
- **rehype-sanitize**: Sanitizes HTML for security
- **react-syntax-highlighter**: Syntax highlighting for code blocks
- **idb**: IndexedDB wrapper for offline storage
- **diff**: Library for comparing text versions

## Features Implemented

### 1. **Markdown Editor with Live Preview**

- Three view modes: Split, Edit-only, Preview-only
- Syntax highlighting for code blocks
- GitHub Flavored Markdown support
- Real-time preview while typing

### 2. **Hierarchical Folders & Tags**

- Create nested folder structures
- Organize notes in folders
- Tag-based categorization
- Smart tag autocomplete
- Filter by folders and tags

### 3. **Auto-save + Offline Caching**

- Auto-saves after 3 seconds of inactivity
- IndexedDB for offline storage
- Syncs automatically when online
- Visual online/offline status indicator
- Works completely offline

### 4. **Version History with Diff Comparison**

- Automatic version saving before updates
- View all previous versions
- Visual diff comparison between versions
- Restore any previous version
- Timestamp tracking

### 5. **Additional Features**

- Search notes by title or content
- Edit and delete notes
- Toast notifications for all actions
- Responsive design
- Proper Firebase integration
- Real-time updates

## Usage

1. **Creating a Note:**

   - Click "New Note" button
   - Enter title and content (markdown supported)
   - Add tags for categorization
   - Note auto-saves after 3 seconds of inactivity
   - Click "Save Note" to manually save

2. **Using Markdown:**

   - Use standard markdown syntax
   - Code blocks with syntax highlighting: ```language
   - Headers: # H1, ## H2, etc.
   - Lists, tables, links, images all supported
   - Toggle between Edit, Preview, and Split view

3. **Organizing with Folders:**

   - Click the "+" icon in Folders section
   - Create nested folders by creating folders within folders
   - Click on a folder to filter notes
   - Delete folders (notes remain safe)

4. **Version History:**

   - Click the clock icon on any note
   - View all saved versions
   - See diff comparison
   - Click "Restore" to revert to a previous version

5. **Offline Mode:**
   - Works completely offline
   - Changes saved locally in IndexedDB
   - Auto-syncs when connection restored
   - Status indicator shows online/offline state

## File Structure

```
neura-life/
├── app/dashboard/notes/
│   └── page.jsx                    # Main notes page
├── components/
│   ├── MarkdownEditor.js          # Markdown editor component
│   ├── FolderTree.js              # Folder hierarchy component
│   ├── TagSelector.js             # Tag selection component
│   └── VersionHistory.js          # Version history modal
├── contexts/
│   └── NotesContext.js            # Notes state management
└── lib/
    ├── firebase.js                # Firebase configuration
    └── indexedDB.js               # IndexedDB utilities
```

## Troubleshooting

1. **If markdown preview is not working:**

   - Ensure all dependencies are installed
   - Check browser console for errors

2. **If offline mode is not working:**

   - Check if IndexedDB is supported in your browser
   - Clear browser cache and reload

3. **If notes are not syncing:**
   - Check internet connection
   - Verify Firebase configuration
   - Check browser console for Firebase errors

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (IndexedDB supported)
- Mobile browsers: Full support
