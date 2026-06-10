# GitHub Profile Finder

A React application that allows users to search for GitHub profiles and view user information through a fast and responsive interface.

## Features

- 🔍 Search GitHub users by username
- ⚡ Autocomplete suggestions while typing
- 🚀 Prefetch profile data for faster navigation
- 💾 Save recent searches
- 🔄 Smart caching and data management with TanStack Query
- 📱 Responsive design for desktop and mobile devices

## The .env

_The endpoint you'll want to use in the .env is_
**https://api.github.com**

## Tech Stack

- React
- TypeScript
- TanStack Query
- GitHub REST API
- Tailwind CSS

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd github-profile-finder
npm install
```

**You'll need some extra dependencies like:**
_@tanstack/react-query_
_@tanstack/react-query-devtools_
_react-icons_
_use-debounce_

## Running the App

Start the development server:

```bash
npm run dev
```

## How It Works

1. Start typing a GitHub username.
2. Matching user suggestions appear as you type.
3. Select a user to view their profile.
4. Profile data is prefetched and cached for a smoother experience.
5. Recent searches are stored and available for quick access.

## Future Improvements

- Repository filtering and sorting
- Dark mode support
- User activity statistics
