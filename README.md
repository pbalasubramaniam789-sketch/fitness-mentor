# Fitness Mentor - Personal Fitness Coach Web App

A comprehensive, responsive web application that acts as your personal fitness coach, monitoring health data, suggesting meals and exercises, and providing personalized feedback.

## 🚀 Quick Start

### Running the Application

The application uses ES6 modules and requires a local web server to run properly. You have several options:

#### Option 1: Using Node.js (Recommended)

If you have Node.js installed:

```bash
# Navigate to the project directory
cd "C:\Users\balasubramaniam\Desktop\Web design\fitness-mentor"

# Start the server using npx (no installation required)
npx -y http-server -p 8000 -o
```

The application will automatically open in your browser at `http://localhost:8000`

#### Option 2: Using Python

If you have Python 3 installed:

```bash
# Navigate to the project directory
cd "C:\Users\balasubramaniam\Desktop\Web design\fitness-mentor"

# Start the server
python -m http.server 8000
```

Then open your browser and navigate to: `http://localhost:8000`

#### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Accessing the Application

Once the server is running, open your browser and go to:
```
http://localhost:8000/index.html
```

## 📁 Project Structure

```
fitness-mentor/
├── index.html              # Main HTML file
├── index.css              # Complete design system and styles
├── app.js                 # Main application controller
├── utils/
│   ├── constants.js       # Configuration and content
│   ├── calculations.js    # Health calculations (BMI, calories)
│   ├── storage.js         # localStorage management
│   └── mentor.js          # Intelligent feedback engine
└── components/
    ├── onboarding.js      # First-time user setup
    ├── dashboard.js       # Main dashboard
    ├── meals.js           # Meal tracking
    ├── workout.js         # Workout logging
    ├── progress.js        # Progress monitoring
    └── settings.js        # Settings and profile management
```

## ✨ Features

### 🎯 Core Features
- **Smart Onboarding**: Personalized profile setup with BMI and calorie calculations
- **Dashboard**: Real-time overview of daily nutrition and activity
- **Meal Tracking**: Log food intake with macro tracking and personalized suggestions
- **Workout Logging**: Track exercises with calorie burn estimates
- **Progress Monitoring**: Weight tracking with visual charts and insights
- **Settings Management**: Profile editing and data management

### 🧠 Intelligent Features
- **Mentor Feedback**: Personalized advice based on your data
- **Goal-Based Suggestions**: Food and workout recommendations aligned with your goals
- **BMI Tracking**: Automatic BMI calculation and categorization
- **Calorie Calculation**: Daily calorie needs using Mifflin-St Jeor equation
- **Progress Insights**: Long-term trend analysis and recommendations

### 💾 Data Management
- **Local Storage**: All data stored in browser for privacy
- **Data Export**: Export your data as JSON
- **Data Persistence**: Data survives page reloads
- **Backup Reminders**: Periodic reminders to backup your data

## 🎨 Design Highlights

- **Modern Dark Theme**: Glassmorphic cards with vibrant gradients
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Micro-interactions and transitions
- **Accessible**: Proper contrast and keyboard navigation
- **Premium Feel**: State-of-the-art UI/UX design

## ⌨️ Keyboard Shortcuts

- `Alt + 1`: Dashboard
- `Alt + 2`: Meal & Food
- `Alt + 3`: Workout
- `Alt + 4`: Progress
- `Alt + 5`: Settings

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript (ES6+)**: Modular architecture
- **Canvas API**: Custom chart rendering
- **LocalStorage API**: Data persistence

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### Requirements
- Modern web browser with JavaScript enabled
- Local web server (for ES6 module support)

## 📖 Usage Guide

### First Time Setup
1. Open the application in your browser
2. Complete the onboarding form with your details
3. Review your calculated BMI and daily calorie target
4. Start logging meals and workouts!

### Daily Usage
1. **Morning**: Log your breakfast
2. **Throughout the day**: Log meals and snacks
3. **After exercise**: Log your workouts
4. **Evening**: Review your dashboard and mentor feedback
5. **Weekly**: Log your weight in the Progress page

### Tips for Best Results
- Log meals immediately after eating for accuracy
- Be honest about workout intensity
- Track weight weekly at the same time
- Follow your mentor's personalized advice
- Export your data regularly as backup

## 🐛 Troubleshooting

### Application Not Loading?
**Issue**: Blank page or console errors about CORS/modules

**Solution**: Make sure you're running a local web server (see Quick Start above). The application cannot be opened directly from the file system due to ES6 module restrictions.

### Data Not Saving?
**Issue**: Data disappears after reload

**Solution**: 
- Check that localStorage is enabled in your browser
- Make sure you're accessing the same URL (http://localhost:8000)
- Don't use incognito/private browsing mode

### Onboarding Modal Not Appearing?
**Issue**: Modal doesn't show on first visit

**Solution**: 
- Clear localStorage for the site
- Or go to Settings and click "Clear All Data"
- Reload the page

## 📊 Data Storage

All data is stored locally in your browser's localStorage:

- **Profile**: Name, age, gender, height, weight, activity level, goal
- **Meals**: Daily meal logs with calories and macros
- **Workouts**: Exercise logs with duration and intensity
- **Progress**: Weight tracking over time

**Privacy**: No data is sent to any server. Everything stays on your device.

## 🚀 Future Enhancements

Potential features for future versions:
- Multi-user support with authentication
- Cloud sync for data backup
- Meal photos with camera integration
- Exercise library with instructions
- Social features to share progress
- Nutrition database integration
- Wearable device integration
- Custom goal setting
- Push notifications

## 📝 License

This project is created for personal use. Feel free to modify and enhance as needed.

## 🤝 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the walkthrough documentation
3. Check browser console for error messages

## 🎉 Enjoy Your Fitness Journey!

Start tracking your health and achieving your fitness goals with Fitness Mentor! 💪

---

**Version**: 1.0.0  
**Last Updated**: December 2025
