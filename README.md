<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/fc067df9-f19b-4c29-aa62-f2d5be7b1dfb

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies (internal Artifactory registry only):
   `npm install --registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/`
   To add a package: `npm install <package> --registry https://artifactory.sunlifecorp.com/artifactory/api/npm/npm-all/`
2. Copy [.env.example](.env.example) to `.env.local` and set `VITE_MONDAY_API_TOKEN` (used only by the Vite dev proxy / nginx, never by `src/`)
3. Run the app:
   `npm run dev`
