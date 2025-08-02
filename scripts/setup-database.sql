-- MongoDB Collections Setup
-- This is a reference for the collections we'll create

-- Collection: journal_entries
-- Fields: content, timestamp, mood, isAnonymous, underlines, marginNotes, createdAt, updatedAt

-- Collection: letters  
-- Fields: content, recipient, createdAt, isUnsent

-- Collection: confessions
-- Fields: duration, timestamp, createdAt

-- Collection: growth_moments
-- Fields: reflection, intention, createdAt

-- Indexes to create:
-- journal_entries: { createdAt: -1 }
-- letters: { createdAt: -1 }
-- confessions: { createdAt: -1 }
-- growth_moments: { createdAt: -1 }
