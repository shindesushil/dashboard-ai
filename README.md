# 🧠 Dashboard AI

A smart, AI-integrated dashboard built with Next.js and Gemini Pro that converts meeting transcripts into categorized tasks and visualizes them using charts. Ideal for teams to extract, manage, and track actionable items from discussions instantly.

---

## 🚀 Features

- 📝 Submit meeting transcripts
- 🤖 Auto-generate tasks using Gemini AI
- 📊 View task stats via dynamic Pie Charts (Chart.js)
- 🗂️ Organize tasks by dashboard
- ✏️ Edit tasks through modal interface
- 🧠 Manage state with Zustand
- ☁️ Store data in MongoDB Atlas

---

## 🧱 Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **State**: Zustand
- **AI**: Gemini Pro (`@google/generative-ai`)
- **Database**: MongoDB Atlas
- **Charts**: Chart.js
- **Design**: Responsive UI with Tailwind + shadcn

---


## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shindesushil/dashboard-ai.git
cd dashboard-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_atlas_uri
GOOGLE_API_KEY=your_gemini_api_key
```

### 4. Run the app

```bash
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 💡 How It Works

1. User submits a dashboard name and meeting transcript.
2. Backend sends the transcript to **Gemini AI** and receives structured tasks.
3. Tasks are saved to **MongoDB** with their associated dashboard.
4. Zustand stores the dashboards and tasks in local state.
5. Each dashboard displays its tasks categorized by status and category using pie charts.

---

## 📊 Example Output from AI

```json
[
  {
    "name": "Implement auth system",
    "category": "DEV",
    "status": "pending",
    "description": "Build login & signup with JWT"
  },
  {
    "name": "Write integration tests",
    "category": "QA",
    "status": "in progress",
    "description": "Cover major endpoints with Jest"
  }
]
```

---

## 📈 Planned Improvements

- [ ] User authentication
- [ ] Shareable dashboards
- [ ] Drag-and-drop task ordering
- [ ] AI-powered task prioritization

---

## 🛡️ License

MIT © 2025 [Sushil Shinde](https://github.com/shindesushil)

---

## 🙌 Contributions

Contributions and suggestions are welcome. Fork the repo, open issues, and submit pull requests!

---

## 🌐 Live Demo

Coming soon…
