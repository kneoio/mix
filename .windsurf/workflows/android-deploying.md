---
description: android dpk build
auto_execution_mode: 1
---

# Android APK Build Workflow

// turbo
1. Build the Quasar app for Capacitor (run from project root)
```
quasar build -m capacitor -T android
```

// turbo
2. Sync Capacitor with Android project (run from project root)
```
npx cap sync android
```

// turbo
3. Build APK with Gradle (run from src-capacitor folder)
```
cd android && ./gradlew assembleDebug
```

// turbo
4. Rename APK with version (run from project root)
```
node scripts/rename-apk.js
```

The versioned APK will be located at: `mixpla-v{version}.apk` in the project root.

For release build (run from src-capacitor folder):
```
cd android && ./gradlew assembleRelease
```