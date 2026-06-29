const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7249';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  probabilityCalculateUrl: `${API_BASE_URL}/api/v1.0/probability/calculate`,
  probabilityLogsUrl: `${API_BASE_URL}/api/v1.0/probability/logs`,
};
