# OrderMaster - Order Management Application

Web application developed with Angular and Express.js for managing customer orders.

## Prerequisites

- Node.js (version 14.x or higher)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB (installed locally or using MongoDB Memory Server for development)

## Installation

1. Clone the project
```bash
git clone https://github.com/Marouanof/OrderMaster.git
cd OrderMaster
```

2. Install dependencies
```bash
npm install
```

## Configuration

The application uses MongoDB Memory Server for development, which means no MongoDB installation is required to get started.

## Starting the Application

1. Start the backend server (Express.js)
```bash
npm run server
```
The server will start on http://localhost:3000

2. In a new terminal, start the Angular application
```bash
ng serve
```
The application will be available at http://localhost:4200

## Features

- 📅 Current date display
- 👥 Client selection from dropdown
- 📝 Add/Remove order lines
- 🛍️ Product selection with automatic price updates
- 💰 Automatic total calculations (excluding and including tax)
- 💾 Order saving
- 📊 Stock management

## Project Structure

- `src/app/components/` : Angular components
- `src/app/services/` : API management services
- `src/app/models/` : Data interfaces and models
- `server/` : Express.js server code

## Technologies Used

- Frontend: Angular, Bootstrap
- Backend: Express.js, MongoDB Memory Server
- Database: MongoDB

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For any questions or issues, please open an issue on GitHub.
