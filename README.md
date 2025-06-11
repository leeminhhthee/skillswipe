# Skillswipe

**Skillswipe** is a mobile application built with **React Native** using **Expo**, developed by a student team at **Foreign Trade University (FTU)**. The app connects **trainees** and **trainers** for skill development, while also laying the groundwork for **skill swapping**—where users can exchange their skills in a Tinder-style matching interface.

## 🚀 Features

Skillswipe aims to create a dynamic, interactive platform where:
- **Trainees** can find **Trainers** to learn new skills.
- In the future, users with complementary skill needs will be able to **swap knowledge** (e.g., one teaches design, the other teaches coding).
- Matching is based on mutual interest, and chatting is only available after a successful match.

## 🔧 Tech Stack

- **Frontend**: React Native (with [Expo](https://expo.dev/))
- **Backend**: Firebase (Authentication, Firestore, Realtime Database)
- **Media Storage**: Cloudinary (for profile pictures and post images)
- **Others**: 
  - Firebase Cloud Messaging (for notifications, planned)
  - Expo Router, AsyncStorage, etc.

## ✨ Current Features

### 🧭 Trainee to Trainer Matching
- Swipe interface similar to Tinder
- Match logic and mutual chat access

### 💬 Messaging (Coming Soon)
- One-on-one chat after matching (under development)

### 📄 Trainer Profiles
- View detailed information about trainers
- Browse skills, bios, and other info

### 🧑‍💻 Profile Management
- Edit personal information
- Add skills you want to teach or learn

### 🌐 Community Tab
- Post articles, questions, and updates
- Like and comment on posts

### 📅 Schedule Booking (Coming Soon)
- Book training sessions with trainers
- Calendar integration under development

### 🔁 Skill Swap (Coming Soon)
- Users can both train and be trained
- Mutual exchange logic in progress

## 📦 Installation

```bash
git clone https://github.com/leeminhhthee/skillswipe.git
cd skillswipe
npm install
npx expo start
```

With run in different network:
```bash
npx expo start --tunnel
```

## 🤝 Contributors

This project is developed by a group of students from **Foreign Trade University (FTU)** as part of a team-based learning initiative.

## 🖼️ Screenshots

| ![](screenshots/SS1.jpg) | ![](screenshots/SS2.jpg) | ![](screenshots/SS3.jpg) |
|-----------|------------|--------------|
| ![](screenshots/SS4.jpg) | ![](screenshots/SS5.jpg) | ![](screenshots/SS6.jpg) |
| ![](screenshots/SS7.jpg) | ![](screenshots/SS8.jpg) | ![](screenshots/SS9.jpg) |
| ![](screenshots/SS10.jpg) | ![](screenshots/SS11.jpg) | |

<video width="320" height="240" controls>
  <source src="screenshots/VD1.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<video width="320" height="240" controls>
  <source src="screenshots/VD2.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

