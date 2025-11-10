# 🚀 BlackCardinal - Quick Test Guide

**5-Minute Platform Test**

---

## ✅ What to Test

### 1. Homepage (30 seconds)
**URL**: `http://localhost:3000`

**Check**:
- [ ] Logo animates in
- [ ] Hero text displays
- [ ] Navigation works
- [ ] "Shop Merch" and "Book BYOA" buttons visible

---

### 2. Store & Cart (2 minutes)
**URL**: `http://localhost:3000/store`

**Test Flow**:
1. [ ] Click "Add to Cart" on any product
2. [ ] See cart badge update (shows "1")
3. [ ] Click cart icon in header
4. [ ] See product in cart
5. [ ] Try quantity +/- buttons
6. [ ] Click "Remove" button
7. [ ] Cart updates correctly

---

### 3. Founding 50 Video (1 minute)
**URL**: `http://localhost:3000/founding-50`

**Check**:
- [ ] Page loads with video section
- [ ] Video player appears with controls
- [ ] Click play - video starts
- [ ] Professional dark theme styling

---

### 4. Registration + Demo (2 minutes)
**URL**: `http://localhost:3000/join`

**Test Flow**:
1. [ ] Fill form with any test data
2. [ ] Click "Continue to Payment"
3. [ ] Review your info
4. [ ] Click "Demo Payment (Testing)" (green button)
5. [ ] Wait for processing animation
6. [ ] **Automatically redirected to demo dashboard!**

**What You'll See**:
- Welcome with your name
- Bootcamp progress
- Current week content
- Member profile
- Quick action buttons

---

### 5. Mobile Navigation (30 seconds)
**Action**: Resize browser to mobile size OR use mobile view

**Check**:
- [ ] Hamburger menu appears
- [ ] Click hamburger - menu opens
- [ ] All links visible
- [ ] Click X - menu closes

---

## 🎯 Key URLs

```
Homepage:        http://localhost:3000
Store:           http://localhost:3000/store
Cart:            http://localhost:3000/cart
Founding 50:     http://localhost:3000/founding-50
Registration:    http://localhost:3000/join
Demo Dashboard:  http://localhost:3000/demo
Test Login:      http://localhost:3000/test-login
Terms:           http://localhost:3000/legal/terms
```

---

## ✨ Quick Demo Script

**For Showing to Stakeholders** (3 minutes):

1. **Homepage** (30s)
   - "This is the BlackCardinal platform homepage"
   - "Notice the elegant design and smooth logo animation"
   - "The aesthetic matches 'Disneyland awe × Ralph Lauren elegance'"

2. **Founding 50 Video** (1m)
   - Navigate to Founding 50
   - "Here's the intro video explaining the program"
   - Play video briefly
   - "Professional presentation with custom styling"

3. **Registration Flow** (1.5m)
   - Click "Reserve Your Spot"
   - "Multi-step registration form"
   - Fill with sample data quickly
   - "Review information"
   - Click demo payment
   - "And here's the full founder experience"
   - Show demo dashboard features

---

## 🐛 Known Issues

### Test Login
- **Issue**: Direct test login has middleware timing issue
- **Workaround**: Use demo mode (works perfectly)
- **Impact**: None - demo provides full founder experience

---

## 💡 Pro Tips

### Best Way to Test Full Experience
1. Go to `/founding-50`
2. Complete registration with demo payment
3. Experience full demo dashboard
4. See bootcamp, resources, profile, etc.

### Resetting Demo
1. Clear browser localStorage
2. Register again
3. Fresh demo experience

### Mobile Testing
- Use browser dev tools
- Set to mobile viewport (375px width)
- Test hamburger menu
- Verify all functionality

---

## 🎊 Expected Results

All features should work smoothly:
- ✅ Navigation (desktop & mobile)
- ✅ Store browsing
- ✅ Cart operations
- ✅ Video playback
- ✅ Registration flow
- ✅ Demo dashboard
- ✅ Responsive design

---

## 📞 Quick Reference

**If something doesn't work**:
1. Check the URL is correct
2. Refresh the page
3. Clear browser cache
4. Restart dev server if needed: `npm run dev`

**For detailed information**:
- See `FINAL_TESTING_STATUS.md` for comprehensive report
- See `TESTING_REPORT.md` for detailed test results
- See `PRODUCTION_LAUNCH_PLAN.md` for deployment steps

---

**The platform is ready for testing! Start with the homepage and work through the flow above. Everything should work perfectly! 🚀**

