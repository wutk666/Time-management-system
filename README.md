# Chronos Time Management System

A premium, full-stack time management application with beautiful UI and powerful productivity features.

## 🚀 Features

- **Authentication**: Secure JWT-based user authentication
- **Task Management**: Create, update, and organize tasks with priorities and categories
- **Focus Mode**: Pomodoro timer for deep work sessions
- **Analytics**: Visualize your productivity trends
- **Calendar**: Plan and schedule your time effectively
- **Beautiful UI**: Glassmorphism design with smooth animations

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Framer Motion (animations)
- Recharts (data visualization)
- Lucide React (icons)
- Axios (API client)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Setup

1. **Clone the repository**
   ```bash
   cd G:/test
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Configure environment variables**
   
   Backend (.env in server/):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chronos
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

   Frontend (.env in root):
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend**
   ```bash
   # In the root directory
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Focus Sessions
- `GET /api/focus` - Get focus sessions
- `POST /api/focus` - Create focus session
- `PUT /api/focus/:id` - Update session
- `GET /api/focus/stats` - Get focus statistics

### Calendar
- `GET /api/calendar` - Get calendar events
- `POST /api/calendar` - Create event
- `PUT /api/calendar/:id` - Update event
- `DELETE /api/calendar/:id` - Delete event

## 🎨 Design Philosophy

Chronos is built with a focus on:
- **Premium aesthetics** - Glassmorphism, smooth gradients, and micro-animations
- **User experience** - Intuitive navigation and responsive design
- **Performance** - Optimized rendering and efficient state management
- **Scalability** - Clean architecture with proper frontend-backend separation

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ by the Chronos team
