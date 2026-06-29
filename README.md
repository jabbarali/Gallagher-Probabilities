# Gallagher-Probabilities

Overview
Probability Calculator is a web-based application that allows users to calculate probabilities using various functions and view a log of all calculations. The solution consists of a .NET 9 Web API backend and a React-based frontend.
---
Architecture
Solution Structure
ProbabilityCalculator/
├── ProbabilityCalculator.Api/      # ASP.NET Core Web API (.NET 9)
│   ├── Controllers/                # API controllers (e.g., ProbabilityController)
│   ├── Models/                     # Data models (e.g., ProbabilityRequest, ProbabilityLogEntry)
│   ├── Services/                   # Business logic and logging services
│   ├── Program.cs                  # Application startup and configuration
│   └── ProbabilityCalculator.Api.csproj
└── ProbabilityCalculator.UI/       # React frontend
    └── src/
        └── App.jsx                 # Main React app and routing

Backend (API)
•	Framework: ASP.NET Core (.NET 9)
•	API Versioning: Supports versioned endpoints (e.g., /api/v1.0/probability/calculate)
•	Controllers: Handle calculation requests and log retrieval
•	Services:
•	ProbabilityService: Performs probability calculations
•	ProbabilityLogService: Logs calculation requests/results to a file and retrieves logs
•	Logging: Uses Serilog for file-based logging
•	CORS: Configured to allow requests from any localhost origin (any port) for development
•	OpenAPI/Swagger: Enabled for API documentation and testing
Frontend (UI)
•	Framework: React
•	Routing: Uses React Router for navigation
•	Features:
•	Probability calculation form
•	View calculation logs
---
Key Features
•	Calculate probabilities using different functions
•	View a log of all calculations (timestamped and detailed)
•	Modern, versioned REST API
•	Developer-friendly: CORS enabled for local React development
---
Getting Started
1.	Run the API:
•	Navigate to ProbabilityCalculator.Api and run the project (dotnet run or via Visual Studio 2022). Run in Debug mode (F5) or without debugging (Ctrl + F5). The project should install dependencies and run on port 7249. Server side Serilog logs will be written in /Logs folder
2.	Run the UI:
•	In a terminal, cd to the folder ProbabilityCalculator.UI
Install dependencies
npm install

Build for bundling and modules transformation so the app is ready to run
npm run build

launch the development server (run)
npm run dev
3.	Access the UI:
•	The port on which the app is running will be mentioned on the terminal. For eg Open http://localhost:5174/ in your browser
---