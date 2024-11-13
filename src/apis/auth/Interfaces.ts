export interface IRequestLoginTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ICreateSessionResponse {
  success: boolean;
  status_code: number;
  status_message: string;
  session_id?: string;
}
