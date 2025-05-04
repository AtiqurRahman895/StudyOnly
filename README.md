# StudyOnly

StudyOnly is an advanced online learning platform that enables users to book tutoring sessions, access study materials, and manage educational resources effectively.

![StudyOnly Screenshot](https://i.ibb.co.com/p6Sx0x5K/project-Image0.jpg) 

## 🚀 Live Project  
🔗 [StudyOnly Live](https://study-only-atiq.web.app/)  

---

## ⚡️ Quick Access for Recruiters   

### Admin:
**Admin email**: admin@studyonly.com
**Admin password**: 1aA@1a

### Tutor:
**Tutor email**: tutor@gmail.com
**Tutor password**: 1aA@1a

### Student:
**Student email**: student@gmail.com
**Student password**: 1aA@1a


---

## 📌 Technologies Used  
- **Frontend**: React, React Router DOM, Tailwind CSS, DaisyUI, Firebase for Authentication 
- **Backend**: Node.js, Express.js, MongoDB Atlas, Axios (for API calls) 
- **Hosting:** Client hosted on Firebase, Server hosted on Vercel  
- **Payments**: Stripe Integration  
- **State Management & Utilities**: TanStack React Query, LocalForage, Match Sorter  
- **Animations & UI Enhancements**: React Awesome Reveal, Motion, React Fast Marquee  
- **Text & Charts**: React Quill, Recharts  
- **Notifications & Alerts**: React Toastify, React Tooltip  

---

## 🌟 Core Features  
✅ Book tutoring sessions with expert tutors  
✅ Secure online payments using Stripe  
✅ Manage and modify booked sessions  
✅ Access educational notes and study materials  
✅ Admin panel for user and session management  
✅ Responsive design with Tailwind CSS and DaisyUI  
✅ Authentication and role-based access with Firebase  

---

## 📦 Dependencies  
Refer to [`package.json`](package.json) for a complete list of dependencies. Some key dependencies include:  
- **React & React DOM** (`^18.3.1`)  
- **React Router DOM** (`^6.28.0`)  
- **Firebase** (`^11.1.0`)  
- **Axios** (`^1.7.9`)  
- **React Quill** (`^2.0.0`)  
- **React Toastify** (`^10.0.6`)  
- **React Tooltip** (`^5.28.0`)  
- **Recharts** (`^2.15.0`)  
- **Stripe Payment Integration** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)  

---

## 🛠️ Installation & Setup  

Follow these steps to run the project locally:  

### Prerequisites  
- Install [Node.js](https://nodejs.org/) (latest LTS version recommended)  
- Install [Git](https://git-scm.com/)  

### Steps  

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-username/studyonly.git
   cd studyonly
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory and add the following variables:  
   ```sh
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_payment_key=your_stripe_payment_key
   VITE_cloudinary_cloud_name=your_cloudinary_cloud_name
   ```

4. **Start the development server**  
   ```sh
   npm run dev
   ```

5. **Open the project in your browser**  
   ```
   http://localhost:5173
   ```

---

## 🔄 Project Routes  

| Route                          | Access  | Description                           |
|--------------------------------|---------|---------------------------------------|
| `/`                           | Public  | Home page                              |
| `/payment/:amount/:session_id/:email` | Private | Make a payment for a session |
| `/dashboard`                  | Private | User dashboard                         |
| `/dashboard/all_users`        | Admin   | Manage all users                       |
| `/dashboard/creat_session`    | Tutor   | Create a new tutoring session          |
| `/dashboard/all_sessions`     | Private | View all available sessions            |
| `/dashboard/session/:_id`     | Private | View single session details            |
| `/dashboard/modify_session/:_id` | Tutor | Modify an existing session            |
| `/dashboard/booked_session`   | Private | View booked sessions                   |
| `/dashboard/my_sessions`      | Tutor   | View tutor's created sessions          |
| `/dashboard/creat_note`       | Private | Create study notes                     |
| `/dashboard/all_notes`        | Private | View all notes                         |
| `/dashboard/update_note/:_id` | Private | Update an existing note                |
| `/dashboard/all_materials`    | Private | View all study materials               |
| `/login`                      | Public  | User login                             |
| `/register`                   | Public  | User registration                      |
| `/change-password`            | Private | Change account password                |
| `/forgot-password`            | Public  | Reset password request                 |

---

## 🌍 Relevant Resources  
🔗 [Live Project](https://study-only-atiq.web.app/)  
📖 [Vite Documentation](https://vitejs.dev/)  
📖 [React Router Docs](https://reactrouter.com/)  
📖 [Firebase Docs](https://firebase.google.com/docs)  
📖 [Stripe Docs](https://stripe.com/docs)  

---

## 📜 License  
This project is licensed under the **MIT License**.  

🙌 Feel free to contribute and improve the project! 🚀


