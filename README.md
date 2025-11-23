# Wateraid Server

## Backend Setup and Configuration

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (for the database)

### Installation
1. Clone the repository: `git clone https://github.com/Reyad02/wateraid-server.git`
2. Navigate to the backend directory: `cd wateraid-server`
3. Install dependencies: `npm install`

### Configuration
1. Create a `.env` file in the `wateraid-server` directory.
2. Add the following environment variables (adjust values as needed):
   ```env
    DB_USER=username
    DB_PASS=password
   ```

### Running the Project
Start the development server: 
```bash
npm run dev
```
The app will run at http://localhost:3000 by default.


