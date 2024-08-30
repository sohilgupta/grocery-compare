# Grocery Price Comparison App

This full-stack web application allows users to compare grocery prices across different platforms in India. It features a React frontend and a Node.js backend with Express and MongoDB.

## Features

- Compare prices of grocery items across multiple platforms
- User authentication and profile management
- Grocery list creation and management
- Community features for sharing tips and deals

## Tech Stack

### Frontend
- React
- TypeScript
- Styled Components
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Axios for external API calls (SerpAPI for Google Shopping data)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- SerpAPI key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/grocery-compare.git
   cd grocery-compare
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     SERPAPI_API_KEY=your_serpapi_api_key
     ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/frontend`: React frontend application
  - `/src`: Source files
    - `/components`: Reusable React components
    - `/pages`: Main page components
- `/backend`: Node.js backend application
  - `/src`: Source files
    - `/config`: Configuration files
    - `/routes`: Express route definitions
    - `/services`: Business logic and external API interactions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.