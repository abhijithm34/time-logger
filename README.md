# Time Logger

A full-stack application for logging and visualizing time-based activities. Built with a React frontend and an Express/MongoDB backend.

## Features
- Log daily activities with timestamps
- View summaries and charts of logged activities
- Responsive UI with Material-UI
- RESTful API backend
- MongoDB for persistent storage

## Folder Structure
```
├── backend/    # Express.js API server
├── frontend/   # React.js client app
├── .gitignore
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/abhijithm34/time-logger.git
   cd time-logger
   ```
2. **Install dependencies:**
   - Backend:
     ```sh
     cd backend
     npm install
     ```
   - Frontend:
     ```sh
     cd ../frontend
     npm install
     ```
3. **Configure environment variables:**
   - Create a `.env` file in `backend/` for MongoDB connection (see `.env.example` if available):
     ```env
     MONGODB_URI=mongodb://localhost:27017/time-logger
     PORT=3001
     ```

### Running the App
- **Start the backend:**
  ```sh
  cd backend
  npm start
  ```
- **Start the frontend:**
  ```sh
  cd frontend
  npm start
  ```
- The frontend will be available at [http://localhost:3000](http://localhost:3000)
- The backend API will run at [http://localhost:3001](http://localhost:3001) (or as configured)

## Usage
- Log activities via the frontend UI
- View daily and summary charts
- Data is stored in MongoDB

