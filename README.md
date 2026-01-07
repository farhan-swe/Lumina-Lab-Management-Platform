# Lumina Lab Management Platform

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%203%20Flash-orange.svg?logo=google-gemini)](https://ai.google.dev/)

**Lumina Lab Management Platform** is a high-end, enterprise-grade laboratory information system (LIS) designed to streamline patient registrations, test bookings, and clinical data management. Built for modern clinics, it combines sleek aesthetics with robust functionality.

---

## 🚀 Core Features

### 📊 Intelligence Dashboard
- **Real-time Analytics**: Visualized patient flow and revenue metrics using Recharts.
- **KPI Tracking**: Monitor total revenue, pending reports, and daily registrations at a glance.
- **Recent Activity**: Quick-view of the latest patient entries and their diagnostic status.

### 📝 Smart Patient Registration
- **Streamlined Workflow**: Intuitive forms for patient demographics and contact info.
- **Lumina Intelligence (AI)**: Powered by **Gemini 3 Flash**, the system automatically generates professional medical summaries and reassuring technician notes for every registration.
- **Dynamic Billing**: Automatic subtotal calculation with support for custom discounts and balance tracking.

### 🧾 Automated Digital Receipts
- **Print-Ready Design**: Professionally formatted receipts optimized for both screen viewing and thermal/laser printing.
- **Breakdown Accuracy**: Detailed test-wise pricing, discount application, and balance due warnings.

### 🧪 Test Catalog Management
- **Full CRUD Support**: Manage your lab's test menu, categories (Hematology, Radiology, etc.), and pricing dynamically.
- **Inventory Sync**: Updated tests immediately become available in the registration module.

### 💾 Data Portability & Security
- **JSON Backups**: Export your entire database into a single, portable JSON file.
- **System Restore**: Seamlessly migrate data between workstations or recover from browser resets.
- **Offline First**: Optimized for local environments with robust persistent storage logic.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19 | High-performance UI rendering with functional components. |
| **Styling** | Tailwind CSS | Utility-first styling for a clean, medical-grade aesthetic. |
| **Logic** | TypeScript | Type-safe development for enterprise stability. |
| **Analytics** | Recharts | Composable SVG charts for health data visualization. |
| **AI Engine** | Gemini 3 Flash | Large Language Model integration for clinical summaries. |
| **Storage** | LocalStorage API | Secure, client-side persistent data handling. |

---

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khdxsohee/Lumina-Lab-Management-Platform.git
   cd Lumina-Lab-Management-Platform
   ```

2. **Setup Environment**
   Ensure you have a valid Gemini API Key. The application expects:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. **Development Mode**
   Open `index.html` in any modern browser (Chrome/Edge recommended) or use a local live server extension.

---

## 📖 Usage Workflow

1. **Test Setup**: Navigate to the **Test Catalog** and define your lab's offerings.
2. **Registration**: Go to **New Patient**, fill in details, and select tests from the dynamic list.
3. **Billing**: Confirm the amount, apply discounts, and set the report delivery date.
4. **Receipting**: Upon confirmation, the system generates a professional receipt—click "Print" to hand it to the patient.
5. **Monitoring**: Use the **Dashboard** to track daily growth and pending workloads.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## ✉️ Contact

Project Link: [https://github.com/khdxsohee/Lumina-Lab-Management-Platform](https://github.com/khdxsohee/Lumina-Lab-Management-Platform)

---
*Built with ❤️ for the medical community.*
