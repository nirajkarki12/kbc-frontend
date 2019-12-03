import { Injectable, ɵConsole } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Api Constants
import { ApiConstants } from 'src/app/constants/api-constants';
import { Profile } from 'src/app/modules/core/models/profile.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  profileDetail: Profile = new Profile();
  profileDetailRxSubject: Subject<Profile> = new BehaviorSubject<Profile>(this.profileDetail);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  syncProfile() {
    this.profileDetailRxSubject.next(
      this.profileDetail
    );
  }

  getProfileRxSubject() {
    return this.profileDetailRxSubject.asObservable();
  }

  getAndSyncProfileDetail() {
    this.http.get<any>(ApiConstants.API_ENDPOINT + ApiConstants.ADMIN + ApiConstants.V1 + ApiConstants.AUTH + '-user')
      .subscribe(
        (successResponse) => {
          this.profileDetail = successResponse;
          this.syncProfile();
        }, (errorResponse) => {
            console.log(errorResponse);
        });
  }
}
