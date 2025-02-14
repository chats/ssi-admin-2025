import { AgentConfig } from "../config/env.config";
import { ApiService } from "./api.service";

export class IssueCredentialService {
    private static instance: IssueCredentialService;
    private apiService: ApiService;
    //private service?: string;
  
    private constructor(config: AgentConfig) {
      this.apiService = ApiService.getInstance(config);
      //this.service = config.service;
    }
  
    public static getInstance(config: AgentConfig): IssueCredentialService {
      if (!IssueCredentialService.instance) {
        IssueCredentialService.instance = new IssueCredentialService(config);
      }
      return IssueCredentialService.instance;
    }

    /**
     *  Get credential issue records
     * @returns  Promise<any>
     */
    async getRecords() {
        try {
            const response = await this.apiService.get(`/issue-credential-2.0/records`);
            return response.data;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    /**
     * Send credential offer
     * @param connectionId string  
     * @param attributes any
     * @param ctx string[] 
     * @param types string[]
     * @returns Promise<any>
    */
    async sendOffer(connectionId: string, data: Record<string, string>, comment: string, contexts: string[], types: string[], issuerDid: string, holderDid: string) {
        const attributes = data;
        const previewAttrs = [];
        for (const key in attributes) {
            previewAttrs.push({
                name: key,
                value: attributes[key],
            });
        }

        const credentialOffer = {
            comment: comment,
            connection_id: connectionId,
            filter: {
                ld_proof: {
                  credential: {
                    "@context": [
                      "https://www.w3.org/2018/credentials/v1",
                      ...contexts
                    ],
                    type: [
                      "VerifiableCredential",
                      ...types
                    ],
                    issuer: issuerDid,
                    //issuanceDate: "2024-11-15T12:00:00Z",
                    issuanceDate: new Date().toISOString(),
                    credentialSubject: {
                        type: [...types],
                        id: holderDid,
                        ...attributes
                    }
                  },
                  options: {
                    proofType: "Ed25519Signature2020"
                  }
                }
            },
            auto_remove: false,
            trace: false
        }
        //console.log(JSON.stringify(credentialOffer));

        try {
            const response = await this.apiService.post(`/issue-credential-2.0/send-offer`, credentialOffer);
            return response.data;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    /**
     * Delete credential issue record
     * @param credential_exchange_id string
     * @returns Promise<any>
     */
    async deleteRecord(credential_exchange_id: string) {
        try {
            const response = await this.apiService.delete(`/issue-credential-2.0/records/${credential_exchange_id}`);
            return response.data
        } catch (e) {
            console.error(e);
        }
        return false;
    }
}