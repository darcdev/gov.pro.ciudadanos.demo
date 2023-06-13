import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }
  /**
   * Add token to the request
   * @param {HttpRequest} request - request object
   * @returns {HttpRequest } Request object (with or without token added)
   */
  private addToken(request: HttpRequest<unknown>) {
      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhc3laSllUUjFwSnN4THJfclhPZ25zSmt3VkJUaEFVMmtYTDdiSFdZdzNNIn0.eyJleHAiOjE2ODY2MDAwNTUsImlhdCI6MTY4NjU5Mjg1NSwianRpIjoiZDdkNjZjMDgtZTdiNC00ZGY4LTk4OTItYzlkNzg2YThkMTc1IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrYnBtOjgwODAvcmVhbG1zL0JwbUlkZW50aXR5IiwiYXVkIjoiYmFja2VuZCIsInN1YiI6IjBkZGYzNGQzLWRhODYtNGE3Ni1hODMwLWNjYmQ2YTE2ZWQxMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6Ijk0YzNiMGY2LWI4NWQtNGUxNS1hMDM1LTA1YjNlMTk5NWZkNiIsInNjb3BlIjoicHJvZmlsZSBwaG9uZSBiYXNpY19hcHAgZW1haWwgYWRkcmVzcyIsInNpZCI6Ijk0YzNiMGY2LWI4NWQtNGUxNS1hMDM1LTA1YjNlMTk5NWZkNiIsImFkZHJlc3MiOnt9LCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1icG1pZGVudGl0eSIsInVzZXIiXSwibmFtZSI6IkRpZWdvIFJvamFzICIsInByZWZlcnJlZF91c2VybmFtZSI6ImRhcmNkZXYiLCJnaXZlbl9uYW1lIjoiRGllZ28iLCJmYW1pbHlfbmFtZSI6IlJvamFzICIsImVtYWlsIjoiZGllZ29hbmRyZXNyb2phczIwMDBAZ21haWwuY29tIn0.I8xYxRFReGh0ssgi-hRFYRF4zqNiX-hbGox7vOSe4mTtFfdQ6WndOCj-hd_pvLLgSVdES6rdKh6xFBr-fTO5-jbN8obwUIDgY9I1EFJven6R-y1JpYfwBrPmBfByRoLRFh9cwGUSRGlfTIwJpoBPyIojol8_WEUtjGNNx-zJWpVXPe2udXmrC4Maph3RxQZx5zN6KS6D6Z0-70V83Rgp6NaI3wkzPY_556TWpmaWMDB8EfF9pm378lukbh9Jqqu-SsZFFVmYj2hJ9TvezBcjaP1ucJERVqaP-Q4NtV1nkaNGfthVkd4lRg1YgNfDVrAOQAGufVqzvkvSWTjMWlZVTg';
      const authReq = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`),
      });
      return authReq;
    }
}
