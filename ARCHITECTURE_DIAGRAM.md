# Component Architecture Diagram

## Visual Component Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                          NotesPage (Main)                            │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  Header: Title, Online/Offline Status, New Note Button       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────┬──────────────────────────────────────────────┐  │
│  │   Sidebar    │           Main Content Area                   │  │
│  │              │                                                │  │
│  │ ┌──────────┐ │  ┌──────────────────────────────────────────┐│  │
│  │ │ Folder   │ │  │        Search Bar                         ││  │
│  │ │ Tree     │ │  └──────────────────────────────────────────┘│  │
│  │ │          │ │                                                │  │
│  │ │ • All    │ │  ┌──────────────────────────────────────────┐│  │
│  │ │ • Work   │ │  │     Note Editor (when creating)           ││  │
│  │ │   └─ Dev │ │  │  ┌────────────────────────────────────┐  ││  │
│  │ │ • Personal│ │  │  │ Title Input                        │  ││  │
│  │ └──────────┘ │  │  └────────────────────────────────────┘  ││  │
│  │              │ │  │  ┌────────────────────────────────────┐  ││  │
│  │ ┌──────────┐ │  │  │ Tag Selector (Autocomplete)        │  ││  │
│  │ │ Tag      │ │  │  └────────────────────────────────────┘  ││  │
│  │ │ Filter   │ │  │  ┌────────────────────────────────────┐  ││  │
│  │ │          │ │  │  │  Markdown Editor                    │  ││  │
│  │ │ • All    │ │  │  │  ┌──────────┬──────────┬─────────┐ │  ││  │
│  │ │ • work   │ │  │  │  │  Split   │  Edit    │ Preview │ │  ││  │
│  │ │ • idea   │ │  │  │  └──────────┴──────────┴─────────┘ │  ││  │
│  │ │ • todo   │ │  │  │  ┌─────────────┬──────────────┐   │  ││  │
│  │ └──────────┘ │  │  │  │   Editor    │   Preview    │   │  ││  │
│  │              │ │  │  │  │             │              │   │  ││  │
│  └──────────────┘ │  │  │  │ # Header   │ Header       │   │  ││  │
│                   │  │  │  │ **bold**   │ bold         │   │  ││  │
│                   │  │  │  │             │              │   │  ││  │
│                   │  │  │  └─────────────┴──────────────┘   │  ││  │
│                   │  │  └────────────────────────────────────┘  ││  │
│                   │  │  ┌────────────────────────────────────┐  ││  │
│                   │  │  │ Save Button | Cancel Button        │  ││  │
│                   │  │  └────────────────────────────────────┘  ││  │
│                   │  └──────────────────────────────────────────┘│  │
│                   │                                                │  │
│                   │  ┌──────────────────────────────────────────┐│  │
│                   │  │        Notes Grid (when not editing)     ││  │
│                   │  │  ┌────────────┐  ┌────────────┐         ││  │
│                   │  │  │ Note Card  │  │ Note Card  │         ││  │
│                   │  │  │ ┌────────┐ │  │ ┌────────┐ │         ││  │
│                   │  │  │ │  Icon  │ │  │ │  Icon  │ │         ││  │
│                   │  │  │ └────────┘ │  │ └────────┘ │         ││  │
│                   │  │  │ Title      │  │ Title      │  ...   ││  │
│                   │  │  │ Content    │  │ Content    │         ││  │
│                   │  │  │ [tags]     │  │ [tags]     │         ││  │
│                   │  │  │ Date       │  │ Date       │         ││  │
│                   │  │  │ [E][H][D]  │  │ [E][H][D]  │         ││  │
│                   │  │  └────────────┘  └────────────┘         ││  │
│                   │  └──────────────────────────────────────────┘│  │
│                   └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

[E] = Edit Button   [H] = History Button   [D] = Delete Button
```

## Modal Components

```
┌─────────────────────────────────────────────────────────────┐
│              Version History Modal                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Header: Title, Close Button                         │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌──────────────┬──────────────────────────────────────┐   │
│  │ Version List │        Version Details                │   │
│  │              │                                        │   │
│  │ ┌──────────┐ │  Title: "Meeting Notes"              │   │
│  │ │ Version 3│ │  Date: 2024-01-15 10:30 AM           │   │
│  │ │ 10:30 AM │ │                                       │   │
│  │ │ [Restore]│ │  Diff Comparison:                     │   │
│  │ └──────────┘ │  ┌────────────────────────────────┐  │   │
│  │ ┌──────────┐ │  │ - Old line (red background)    │  │   │
│  │ │ Version 2│ │  │ + New line (green background)  │  │   │
│  │ │ 09:15 AM │ │  │   Unchanged line               │  │   │
│  │ │ [Restore]│ │  └────────────────────────────────┘  │   │
│  │ └──────────┘ │                                       │   │
│  │ ┌──────────┐ │  Content Preview:                     │   │
│  │ │ Version 1│ │  ┌────────────────────────────────┐  │   │
│  │ │ 08:00 AM │ │  │ Full markdown content...       │  │   │
│  │ │ [Restore]│ │  │ displayed here                 │  │   │
│  │ └──────────┘ │  └────────────────────────────────┘  │   │
│  └──────────────┴──────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
┌──────────────┐
│   User Input │
└──────┬───────┘
       │
       ↓
┌──────────────────┐
│  Component State │  (title, content, tags)
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│  Auto-save Timer │  (3 second debounce)
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│  NotesContext    │  (saveNote function)
└──────┬───────────┘
       │
       ├──────────────────────────────┐
       ↓                              ↓
┌──────────────────┐         ┌────────────────┐
│  IndexedDB       │         │  Version Save  │
│  (immediate)     │         │  (before update)│
└──────┬───────────┘         └────────────────┘
       │
       ↓
┌──────────────────┐
│  Firebase        │  (if online)
│  (cloud sync)    │
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│  Real-time Sync  │  (onSnapshot listener)
└──────┬───────────┘
       │
       ↓
┌──────────────────┐
│  UI Update       │  (re-render with new data)
└──────────────────┘
```

## State Management Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    NotesContext                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  State:                                            │ │
│  │  • notes: []                                       │ │
│  │  • folders: []                                     │ │
│  │  • loading: false                                  │ │
│  │  • isOnline: true                                  │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Functions:                                        │ │
│  │  • saveNote(noteData)                             │ │
│  │  • deleteNote(noteId)                             │ │
│  │  • createFolder(folderData)                       │ │
│  │  • deleteFolder(folderId)                         │ │
│  │  • saveVersion(noteId, content, title)           │ │
│  │  • getVersionHistory(noteId)                      │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Effects:                                          │ │
│  │  • Monitor online/offline status                  │ │
│  │  • Load offline notes from IndexedDB             │ │
│  │  • Sync with Firebase (real-time listener)       │ │
│  │  • Load folders                                   │ │
│  │  • Auto-sync when back online                    │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Storage Layer Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Storage Layer                           │
│                                                             │
│  ┌─────────────────────┐      ┌─────────────────────┐     │
│  │   IndexedDB         │      │   Firebase          │     │
│  │   (Local)           │      │   (Cloud)           │     │
│  │                     │      │                     │     │
│  │  ┌───────────────┐  │      │  ┌───────────────┐  │     │
│  │  │ notes         │  │◄────►│  │ notes         │  │     │
│  │  │ • id          │  │ Sync │  │ • id          │  │     │
│  │  │ • title       │  │      │  │ • userId      │  │     │
│  │  │ • content     │  │      │  │ • title       │  │     │
│  │  │ • tags        │  │      │  │ • content     │  │     │
│  │  │ • synced      │  │      │  │ • createdAt   │  │     │
│  │  └───────────────┘  │      │  └───────────────┘  │     │
│  │                     │      │                     │     │
│  │  ┌───────────────┐  │      │  ┌───────────────┐  │     │
│  │  │ versions      │  │      │  │ folders       │  │     │
│  │  │ • noteId      │  │      │  │ • id          │  │     │
│  │  │ • title       │  │      │  │ • userId      │  │     │
│  │  │ • content     │  │      │  │ • name        │  │     │
│  │  │ • createdAt   │  │      │  │ • parentId    │  │     │
│  │  └───────────────┘  │      │  └───────────────┘  │     │
│  │                     │      │                     │     │
│  │  ┌───────────────┐  │      │                     │     │
│  │  │ folders       │  │      │                     │     │
│  │  │ • id          │  │      │                     │     │
│  │  │ • name        │  │      │                     │     │
│  │  │ • synced      │  │      │                     │     │
│  │  └───────────────┘  │      │                     │     │
│  └─────────────────────┘      └─────────────────────┘     │
│                                                             │
│  Offline-First Strategy:                                   │
│  1. Write to IndexedDB immediately                         │
│  2. Sync to Firebase when online                          │
│  3. Real-time listener updates from Firebase              │
│  4. Update IndexedDB with synced data                     │
└────────────────────────────────────────────────────────────┘
```

## Component Interaction Flow

```
User Creates/Edits Note
        ↓
NotesPage Component
        ↓
    ┌───┴────────────────────────────┐
    ↓                                ↓
MarkdownEditor                  TagSelector
(handles content)              (handles tags)
    ↓                                ↓
    └───┬────────────────────────────┘
        ↓
   Auto-save (3s delay)
        ↓
  saveNote() in Context
        ↓
    ┌───┴────────────────┐
    ↓                    ↓
saveVersion()    saveNoteToIndexedDB()
(before update)      (immediate)
    ↓                    ↓
    └───┬────────────────┘
        ↓
   If online: Firebase addDoc/updateDoc
        ↓
   onSnapshot listener fires
        ↓
   Update local state
        ↓
   Re-render UI with new data
```

## Key Design Patterns

1. **Context API**: Global state management
2. **Offline-First**: IndexedDB before Firebase
3. **Optimistic UI**: Immediate feedback
4. **Real-time Sync**: Firebase onSnapshot
5. **Debouncing**: Auto-save delay
6. **Component Composition**: Reusable components
7. **Controlled Components**: React state for inputs
8. **Error Boundaries**: Graceful error handling

This architecture ensures:
✅ Fast, responsive UI
✅ Offline capability
✅ Real-time synchronization
✅ Data persistence
✅ Scalability
✅ Maintainability
