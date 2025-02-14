/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgentConfig } from "../config/env.config";
import { ApiService } from "./api.service";

export class ConnectionService {
    private static instance: ConnectionService;
    private apiService: ApiService;
    private service?: string;
  
    private constructor(config: AgentConfig) {
      this.apiService = ApiService.getInstance(config);
      this.service = config.service;

    }
  
    public static getInstance(config: AgentConfig): ConnectionService {
      if (!ConnectionService.instance) {
        ConnectionService.instance = new ConnectionService(config);
      }
      return ConnectionService.instance;
    }
  
    public async getConnections(): Promise<any> {
      try {
        const response = await this.apiService.get('/connections');
        return response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
    }

    public async getConnectionById(id: string): Promise<any> {
        try {
            const response = await this.apiService.get(`/connections/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    async createInvitation() {
        const body = {}
        try {
            const response = await this.apiService.post('/connections/create-invitation', body);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    async receiveInvitation(invitation: any) {
        try {
            const response = await this.apiService.post('/connections/receive-invitation', invitation);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    async createOOBInvitation() {
        const body = {
          "accept": [
            "didcomm/aip1",
            "didcomm/aip2;env=rfc19"
          ],
          "handshake_protocols": [
            "https://didcomm.org/didexchange/1.0",
            "https://didcomm.org/connections/1.0"
          ],
          "protocol_version": "1.1",
          "use_public_did": true,
          "services": [
            this.service
          ]
        }
        console.log('createOOBInvitation:', JSON.stringify(body));
        try {
            const response = await this.apiService.post('/out-of-band/create-invitation', body); 
            return response.data
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    async receiveOOBInvitation(invitation: any) {
        try {
            const response = await this.apiService.post('/out-of-band/receive-invitation', invitation);
            return response.data;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    async deleteConnection(id: string) {
        try {
            const response = await this.apiService.delete(`/connections/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }
}