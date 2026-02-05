# Excel Community School - Under Construction Page

## Overview
This is a standalone "Under Construction / Coming Soon" placeholder page for Excel Community School. It is completely independent and can be deployed without any build process or server requirements.

## File Structure
```
placeholder/
├── index.html          # Main HTML file
├── style.css          # Stylesheet
└── assets/
    └── excelcs_logo.png  # School logo
```

## Features
- ✅ Fully standalone - no dependencies
- ✅ Mobile-responsive design
- ✅ Brand colors (Blue #2563eb, Gold #f59e0b)
- ✅ Professional appearance
- ✅ Contact information included
- ✅ Works by opening index.html directly in browser

## Testing Locally
1. Navigate to the `placeholder` folder
2. Double-click `index.html` to open in your default browser
3. The page should display correctly without any server

## Deployment Instructions

### Option 1: Upload to Web Hosting (cPanel/FTP)
1. **Upload all files** from the `placeholder` folder to your web server:
   - Upload `index.html` to the **root directory** (public_html or www)
   - Upload `style.css` to the **root directory**
   - Upload the entire `assets` folder to the **root directory**

2. **File structure on server should be:**
   ```
   public_html/
   ├── index.html
   ├── style.css
   └── assets/
       └── excelcs_logo.png
   ```

3. **To temporarily replace the main site:**
   - Rename or backup your existing `index.html` (or main entry point)
   - Upload this placeholder `index.html` as the new `index.html`
   - When ready to restore, replace it back

### Option 2: Deploy to Subdirectory
If you want to keep this as a subdirectory:
1. Upload the entire `placeholder` folder to your server
2. Access via: `https://yourdomain.com/placeholder/`

### Option 3: Static Hosting (Netlify, Vercel, GitHub Pages)
1. Upload the `placeholder` folder contents
2. Set `index.html` as the entry point
3. Deploy

## Important Notes
- ✅ All paths are relative - no absolute URLs
- ✅ No JavaScript dependencies
- ✅ No build step required
- ✅ Works offline
- ✅ Compatible with all modern browsers

## Customization
If you need to update contact information:
1. Open `index.html` in a text editor
2. Find the contact section (around line 30-40)
3. Update phone numbers, email, or hours as needed
4. Save and re-upload

## Brand Colors Used
- Primary Blue: `#2563eb`
- Accent Gold: `#f59e0b`
- Text Dark: `#1e293b`
- Text Light: `#64748b`

## Browser Compatibility
Tested and works on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---
**Created:** January 2026
**For:** Excel Community School
**Status:** Ready for deployment
