# Probability Calculator

## Overview
Probability Calculator is a web-based application that allows users to calculate probabilities using various functions and view a log of all calculations. The solution consists of a .NET 9 Web API backend and a React-based frontend.
---
## Architecture

### Backend (API)

- **Framework:** ASP.NET Core (.NET 9)
- **API Versioning:** Endpoints versioned (e.g., `/api/v1.0/probability/calculate`)
- **Controllers:** Handle calculation requests and log retrieval
- **Services:**  
  - `ProbabilityService`: Performs probability calculations  
  - `ProbabilityLogService`: Logs calculation requests/results to a file and retrieves logs
- **Logging:** Serilog for file-based logging
- **CORS:** Allows requests from any `localhost` origin (any port) for development
- **OpenAPI/Swagger:** Enabled for API documentation and testing

### Frontend (UI)

- **Framework:** React
- **Routing:** React Router for navigation
- **Features:**  
  - Probability calculation form  
  - View calculation logs

---

## Key Features

- Calculate probabilities using different functions
- View a log of all calculations (timestamped and detailed)
- Modern, versioned REST API
- Developer-friendly: CORS enabled for local React development

---

## Getting Started

### Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js & npm](https://nodejs.org/)

### Run the API:
Navigate to the fodler `ProbabilityCalculator.Api` and run the project (dotnet run or via Visual Studio 2022). Run in Debug mode (F5) or without debugging (Ctrl + F5). The project should install dependencies and run on port `7249`. Server side Serilog logs will be written in /Logs folder
### Run the UI:
1. In a terminal, cd to the folder ProbabilityCalculator.UI
Install dependencies
`npm install`

2. Build for bundling and modules transformation so the app is ready to run
`npm run build`

3. launch the development server (run)
`npm run dev`
4.	Access the UI:
The port on which the app is running will be mentioned on the terminal. For eg Open http://localhost:5174/ in your browser

---

## API Endpoints

- `POST /api/v1.0/probability/calculate`  
  Calculate probability.  
  **Body:**  
  { "parameter1": 0.5, "parameter2": 0.5, "functionName": "Either" }

- `GET /api/v1.0/probability/logs`  
  Retrieve all calculation logs.

---

## Development Notes

- CORS is configured to allow any `localhost` origin for development convenience.
- Calculation logs are stored in a file (`probability_log.txt`) and can be retrieved via the API.
- Run the API unit tests via MS Test Explorer with Visual Studio
