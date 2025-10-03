# Wedding Invitation Website - Ayub & Beatriks

An elegant, responsive wedding invitation website for Ayub Nowoeko and Beatriks Yarangga's wedding on November 29, 2025.

## Features

### 🎨 Design & Aesthetics

- Elegant layout with warm color scheme (soft brown, beige, blush pink, gold)
- Elegant typography combining serif (Playfair Display) and sans-serif (Inter) fonts
- Dark mode and light mode support with toggle button
- Scroll-snap behavior for smooth section navigation
- Smooth transitions and scroll animations
- Subtle fade-in and slide-up animations

### 📱 Responsiveness & UX

- Fully responsive design (mobile-first approach)
- Sticky navigation with smooth scroll
- Back to top button
- Preloader animation with couple's initials
- Auto-play background music with controls
- Music play/pause toggle

### 📌 Website Sections

1. **Opening Invitation** - Envelope opening animation with auto-play music
2. **Bride and Groom Section** - Profiles and love story
3. **Photo Gallery** - Grid layout with hover effects
4. **Wedding Details** - Countdown timer and venue information
5. **RSVP Section** - Contact form for attendance confirmation
6. **Wedding Wishes** - Guest message form with display
7. **Quote Section** - Inspirational wedding quotes
8. **Thank You Section** - Closing appreciation message

### 💡 Technical Features

- Pure HTML, CSS (Tailwind), and JavaScript
- GitHub Pages ready deployment
- Clean file structure
- SEO optimized with meta tags
- Lazy loading for images
- Custom favicon support
- Cross-browser compatible

## File Structure

```
wedding-invitation/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom CSS styles
├── js/
│   └── script.js       # JavaScript functionality
├── assets/
│   ├── images/         # Wedding photos and graphics
│   ├── audio/          # Background music
│   └── favicon.ico     # Website icon
└── README.md           # This file
```

## Setup Instructions

### 1. Replace Placeholder Content

#### Images

- Replace placeholder couple photos in the "Bride and Groom" section
- Add real wedding photos to the gallery section
- Update image alt texts accordingly

#### Audio

- Replace `assets/audio/wedding-music.mp3` with your chosen background music
- Recommended: 3-5 minute acoustic guitar melody
- Suggested sources for royalty-free music:
  - YouTube Audio Library
  - Freesound.org
  - Pixabay Music
  - Incompetech (Kevin MacLeod)
  - Free Music Archive

#### Favicon

- Replace `assets/favicon.ico` with your custom icon
- Recommended: Couple's initials or wedding rings design

### 2. Customize Content

#### Wedding Details

- Update parent names in the couple section
- Modify the love story text
- Add or modify quotes in the quote section
- Update any other personal details

#### Google Maps

- The current map embed shows a placeholder location
- Replace the iframe src with the actual Hotel Cendrawasih location
- Get the correct embed code from Google Maps

### 3. Form Handling

The RSVP and wishes forms currently show success notifications but don't submit data. To make them functional:

#### Option 1: Contact Form Services

- Formspree.io
- Netlify Forms
- EmailJS

#### Option 2: WhatsApp Integration

Modify the RSVP form to redirect to WhatsApp with pre-filled message:

```javascript
// Example WhatsApp integration
const phoneNumber = "+1234567890"; // Your WhatsApp number
const message = `RSVP: ${name}, Email: ${email}, Attending: ${attendance}`;
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
window.open(whatsappUrl, "_blank");
```

## Deployment to GitHub Pages

### Method 1: GitHub Web Interface

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save

### Method 2: Git Commands

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial wedding invitation website"

# Connect to GitHub repository
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY-NAME.git
git push -u origin main

# Enable GitHub Pages in repository settings
```

Your website will be available at: `https://USERNAME.github.io/REPOSITORY-NAME`

## Customization Guide

### Colors

Update CSS custom properties in `css/styles.css`:

```css
:root {
  --cream: #fdf6e3; /* Background color */
  --brown-800: #3e2723; /* Primary text */
  --brown-600: #6d4c41; /* Secondary text */
  --gold: #d4af37; /* Accent color */
  --blush: #f8bbd9; /* Accent color 2 */
}
```

### Fonts

Current fonts:

- **Headings**: Playfair Display (serif)
- **Body text**: Inter (sans-serif)

To change fonts, update the Google Fonts link in `index.html` and CSS classes.

### Animations

- Modify animation durations in CSS
- Add new animations using CSS keyframes
- Adjust scroll animation triggers in JavaScript

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance Optimization

- Images are lazy-loaded
- CSS and JavaScript are minified for production
- Uses CDN for external libraries
- Optimized for Core Web Vitals

## Credits

### Images

- Placeholder images from Unsplash
- Replace with your own wedding photos

### Icons

- Font Awesome 6.4.0

### Fonts

- Playfair Display - Google Fonts
- Inter - Google Fonts

### Framework

- Tailwind CSS via CDN

## Support

For technical issues or customization help:

1. Check the browser console for errors
2. Ensure all file paths are correct
3. Verify that external CDN links are working
4. Test on multiple devices and browsers

## License

This wedding invitation template is free to use and modify for personal use. Please replace all placeholder content with your own.

---

**Congratulations Ayub & Beatriks! 🎉💕**

May your special day be filled with love, joy, and beautiful memories!
