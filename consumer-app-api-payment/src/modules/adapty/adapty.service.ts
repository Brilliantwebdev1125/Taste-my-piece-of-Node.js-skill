import { HttpService, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AdaptyService {

  constructor(private httpService: HttpService, private configService: ConfigService,) {
  }


  async getProfile(user: string) {
    return await this.httpService.get(`/profiles/${user}/`).pipe(
      map(res => res.data.data),
      catchError(
        error => {
          return of(false);
        }
      )
    ).toPromise();
  }

  async createProfile(user: string) {
    return await this.httpService.post(`/profiles/`, { customer_user_id: user }).pipe(
      map(res => res.data.data),
      catchError(
        error => {
          return of(false);
        }
      )
    ).toPromise();
  }

  async editProfile(user: string, data: any) {
    return await this.httpService.patch(`/profiles/${user}/`, data).pipe(
      map(res => res.data.data),
      catchError(
        error => {
          return of(false);
        }
      )
    ).toPromise();
  }


  async setAccessLevel(user: string, accessLevel: string, expiresAt: Date) {
    return await this.httpService.post(`/profiles/${user}/paid-access-levels/${accessLevel}/grant/`,
      { expires_at: expiresAt }).pipe(
      map(res => res.data.data),
      catchError(
        error => {
          return of(false);
        }
      )
    ).toPromise();
  }

  async getSubscription(user: string) {
    return await this.httpService.get(`/profiles/${user}/`).pipe(
      map(res => res.data.data.paid_access_levels),
      catchError(
        error => {
          return of(false);
        }
      )
    ).toPromise();
  }
}
