/**
 * Production OAuth 1.0a Client for Garmin Connect API
 * Uses proper HMAC-SHA1 signature generation
 */

import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import { GarminOAuthConfig, GarminUserTokens } from '../@types/garmin';

export class GarminOAuthClient {
  private oauth: OAuth;
  private config: GarminOAuthConfig;

  constructor(config: GarminOAuthConfig) {
    this.config = config;
    
    // Initialize OAuth 1.0a client with proper signature generation
    this.oauth = new OAuth({
      consumer: {
        key: config.consumerKey,
        secret: config.consumerSecret
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (base_string: string, key: string) => {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
      }
    });
  }

  /**
   * Step 1: Get request token for OAuth flow
   */
  async getRequestToken(): Promise<{ token: string; tokenSecret: string; authUrl: string }> {
    const requestData = {
      url: 'https://connectapi.garmin.com/oauth-service/oauth/request_token',
      method: 'POST',
      data: {
        oauth_callback: this.config.redirectUri
      }
    };

    const headers = this.oauth.toHeader(this.oauth.authorize(requestData));

    const response = await fetch(requestData.url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get request token: ${response.statusText}`);
    }

    const responseText = await response.text();
    const params = new URLSearchParams(responseText);
    
    const token = params.get('oauth_token');
    const tokenSecret = params.get('oauth_token_secret');

    if (!token || !tokenSecret) {
      throw new Error('Invalid response from request token endpoint');
    }

    const authUrl = `https://connect.garmin.com/oauthConfirm?oauth_token=${token}`;

    return { token, tokenSecret, authUrl };
  }

  /**
   * Step 2: Exchange OAuth verifier for access tokens
   */
  async getAccessToken(requestToken: string, requestTokenSecret: string, verifier: string): Promise<GarminUserTokens> {
    const requestData = {
      url: 'https://connectapi.garmin.com/oauth-service/oauth/access_token',
      method: 'POST',
      data: {
        oauth_verifier: verifier
      }
    };

    const token = {
      key: requestToken,
      secret: requestTokenSecret
    };

    const headers = this.oauth.toHeader(this.oauth.authorize(requestData, token));

    const response = await fetch(requestData.url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const responseText = await response.text();
    const params = new URLSearchParams(responseText);
    
    const accessToken = params.get('oauth_token');
    const accessTokenSecret = params.get('oauth_token_secret');
    const userId = params.get('user_id') || params.get('oauth_token'); // Fallback to token as user ID

    if (!accessToken || !accessTokenSecret) {
      throw new Error('Invalid response from access token endpoint');
    }

    return {
      accessToken,
      accessTokenSecret,
      userId: userId || 'unknown' // Provide fallback if userId is not available
    };
  }

  /**
   * Generate OAuth authorization header for API requests
   */
  getAuthorizationHeader(
    method: string,
    url: string,
    userTokens: GarminUserTokens,
    requestData?: any
  ): Record<string, string> {
    const requestObj = {
      url,
      method: method.toUpperCase(),
      data: requestData || {}
    };

    const token = {
      key: userTokens.accessToken,
      secret: userTokens.accessTokenSecret
    };

    const authHeader = this.oauth.toHeader(this.oauth.authorize(requestObj, token));
    return authHeader as unknown as Record<string, string>;
  }

  /**
   * Make an authenticated API request
   */
  async makeAuthenticatedRequest(
    method: string,
    url: string,
    userTokens: GarminUserTokens,
    requestData?: any
  ): Promise<any> {
    const headers = {
      ...this.getAuthorizationHeader(method, url, userTokens, requestData),
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers,
      body: requestData ? JSON.stringify(requestData) : undefined
    });

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      throw new Error(`Rate limit exceeded. Retry after: ${retryAfter || 'unknown'} seconds`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }

    // Handle empty responses for DELETE requests
    if (response.status === 204 || (method.toUpperCase() === 'DELETE' && response.status === 200)) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return response.text();
  }
}
