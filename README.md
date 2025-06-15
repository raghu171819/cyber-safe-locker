
# RansomAware – Cybersecurity Awareness Web App

**RansomAware** is a 100% safe interactive simulation that demonstrates how ransomware attacks appear and how to protect yourself. For classrooms, workshops, demos and portfolios.

---

## 💡 Features

- **Fake Ransomware Simulation:** Simulates a lock screen—no real encryption!
- **Educational Panels:** Explains What is Ransomware, How it Spreads, Encryption, Prevention, Recovery (with visuals and Framer Motion).
- **Decryption Demo:** Enter the right (dummy) key to "unlock" your files.
- **Dark mode + Responsive Design:** Looks good everywhere.
- **Legal/Safety Disclaimer:** No files are encrypted or accessed at any time.

---

## 🏗️ Setup

1. **Clone the repo:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd ransomaware
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the dev server:**
   ```sh
   npm run dev
   ```

4. **Open in browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or shown address)

---

## ⚠️ Disclaimer

> This application is for educational and awareness purposes only.  
> **It never encrypts, deletes, or accesses any files or sensitive data.**  
> DO NOT use this knowledge to create or distribute real malware.

---

## 🛠️ Tech Stack

- React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide Icons

---

## 📦 File Structure

- `src/components/SimulateRansomware.tsx` – Lock screen simulation
- `src/components/DecryptSimulation.tsx` – Decrypt screen
- `src/components/Sidebar.tsx` – Navigation/sidebar
- `src/components/WhatIsRansomware.tsx`, etc – Educational panels
- `src/data/ransomNote.json` – Fake ransom note

---

## 🎨 Credits

- Icons: Lucide
- Animations: Framer Motion
- UI Kit: shadcn/ui

