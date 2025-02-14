/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from "axios";
import { AgentConfig } from "../config/env.config";

export class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor(config: AgentConfig) {
    console.log("Config: ", config)
    this.axiosInstance = axios.create({
      baseURL: config.agentApiUrl,
      timeout: config.apiTimeout,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": config.agentApiKey,
      },
    });

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can add auth token here
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          // Example: redirect to login
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(config: AgentConfig): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService(config);
    }
    return ApiService.instance;
  }

  public get<T>(url: string) {
    return this.axiosInstance.get<T>(url);
  }

  public post<T>(url: string, data: any) {
    return this.axiosInstance.post<T>(url, data);
  }

  public put<T>(url: string, data: any) {
    return this.axiosInstance.put<T>(url, data);
  }

  public delete<T>(url: string) {
    return this.axiosInstance.delete<T>(url);
  }
}
