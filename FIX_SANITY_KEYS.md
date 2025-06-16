# Fix for Sanity Missing Keys Error

## The Issue
You're seeing "Missing keys" error in Sanity Studio for the Value Props in data sellers. This happens when array items don't have unique `_key` properties.

## Quick Fix

1. **In Sanity Studio**, when editing the document:
   - Click on each item in the Value Props list
   - Sanity will automatically add keys when you make any edit
   - Just click "Publish" to save

2. **Alternative**: Delete and re-add the items
   - Remove all items from the Value Props
   - Add them back one by one
   - Sanity will automatically assign keys

## To Prevent This
When adding content through the API or scripts, always include `_key` for array items:

```javascript
props: [
  {
    _key: 'unique-key-1',
    title: 'Zero Data Movement',
    description: 'Your data never leaves...',
    icon: 'shield'
  },
  {
    _key: 'unique-key-2', 
    title: 'Automatic Royalties',
    description: 'Get paid every time...',
    icon: 'dollar'
  }
]
```

## Why This Happened
The initial seed scripts didn't include `_key` properties for array items. Sanity requires these for proper list editing in the Studio interface.