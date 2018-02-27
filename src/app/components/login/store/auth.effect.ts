import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../../config';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Member } from '../model/Member';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthEffects {
    private baseUrl = config.backendAPIUrl;
    tokenAndUsernameAndAdmin: {
        token: string,
        authenticated: boolean,
        username: string,
        isAdmin: boolean,
        userId: string
    }
    constructor(private actions$: Actions, private router: Router, private http: HttpClient) {
        this.tokenAndUsernameAndAdmin = {
            token: null,
            authenticated: false,
            username: null,
            isAdmin: false,
            userId: null
        }
    }
    /**
     * Initializes the state at the point of page load or refresh.
     */
    @Effect()
    initState = this.actions$
        .ofType(AuthActions.CHECK_AUTH_STATE)
        .map((action: AuthActions.CheckAuthState) => {
            return action.payload;
        })
        .switchMap((token) => {
            let headers = new HttpHeaders({
                authorization: token
            })
            this.tokenAndUsernameAndAdmin.token = token;
            return this.http.get<any>(`${this.baseUrl}/refresh`, { headers })
                .map((res) => {
                    if(res){
                        this.tokenAndUsernameAndAdmin.authenticated = true;
                    }
                    /**
                     * Finds username by decoding token.
                     */
                    var decoded = jwtDecode(res.token);
                    const isCurrentUserName = Observable.of(decoded.sub);
                    isCurrentUserName.subscribe((res) => {
                        this.tokenAndUsernameAndAdmin.username = res;
                    });
                    return res.token;
                })
                .catch(this.handleError<any>('Authentication Error'))
        })
        .switchMap((token) => {
            /**
             * Checks for admin status.
             */
            let headers = new HttpHeaders({
                authorization: token
            });
            return this.http.get<boolean>(`${this.baseUrl}/admin`, { headers })
                .map((val) => {
                    this.tokenAndUsernameAndAdmin.isAdmin = val;
                    return val;
                })
                .catch((e) => {
                    // handle e and return a safe value or rethrow
                    if (e.status === 403) {
                        this.tokenAndUsernameAndAdmin.isAdmin = false;
                    }
                    return Observable.of<any>([]);
                });
        })
        /**
         * Finds UserId.
         */
        .switchMap(() => {
            return this.http.get<any>(`${this.baseUrl}/members/find?username=${this.tokenAndUsernameAndAdmin.username}`)
                .map((res) => {
                    this.tokenAndUsernameAndAdmin.userId = res;
                })
                .catch(this.handleError<any>('Login Error'));
        })
        .mergeMap(() => {
            console.log(this.tokenAndUsernameAndAdmin);
            return [
                {
                    type: AuthActions.SIGNIN,
                    payload: this.tokenAndUsernameAndAdmin.authenticated
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: this.tokenAndUsernameAndAdmin.token
                },
                {
                    type: AuthActions.SET_CURRENT_USERNAME,
                    payload: this.tokenAndUsernameAndAdmin.username
                },
                {
                    type: AuthActions.SET_ADMIN,
                    payload: this.tokenAndUsernameAndAdmin.isAdmin
                },
                {
                    type: AuthActions.SET_USER_ID,
                    payload: this.tokenAndUsernameAndAdmin.userId
                }
            ]
        })
    /**
     * User Sign up code.
     */
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .map((action: AuthActions.TrySignup) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, name: string, password: string }) => {
            return this.http.post<Member>(`${this.baseUrl}/signup`, authData)
                .map(() => {
                    return authData;
                })
                .catch(this.handleError<Member>('Create Member Error'));
        })
        .switchMap((authData: { username: string, name: string, password: string }) => {
            return this.http.post<any>(`${this.baseUrl}/auth`, authData)
                .catch(this.handleError<any>('Login Error'));
        })
        .mergeMap((token) => {
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ];
        });

    /**
     * At the time of login, once the token is provided, this code also finds Username and checks admin status.
     */
    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .map((action: AuthActions.TrySignin) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, name: string, password: string }) => {
            let username = authData.username;
            let password = authData.password;
            return this.http.post<any>(`${this.baseUrl}/auth`, { username, password })
                .catch(this.handleError<boolean>('Authentication Error'));
        })
        .map(res => {
            if(res){
                this.tokenAndUsernameAndAdmin.authenticated = true;
            } else {
                this.tokenAndUsernameAndAdmin.authenticated = false;
            }
            localStorage.setItem('token', res.token);
            return res.token;
        })
        .map((token) => {

            /**
             * Finds username by decoding token.
             */
            var decoded = jwtDecode(token);
            const isCurrentUserName = Observable.of(decoded.sub);
            isCurrentUserName.subscribe((res) => {
                this.tokenAndUsernameAndAdmin.username = res;
            });
            return token;
        })
        .switchMap((token) => {
            /**
             * Checks for admin status.
             */
            let headers = new HttpHeaders({
                authorization: token
            });
            return this.http.get<boolean>(`${this.baseUrl}/admin`, { headers })
                .map((val) => {
                    this.tokenAndUsernameAndAdmin.isAdmin = val;
                    return val;
                })
                .catch((e) => {
                    // handle e and return a safe value or rethrow
                    if (e.status === 403) {
                        this.tokenAndUsernameAndAdmin.isAdmin = false;
                    }
                    return Observable.of<any>([]);
                });
        })
        /**
         * Finds UserId.
         */
        .switchMap(() => {
            return this.http.get<any>(`${this.baseUrl}/members/find?username=${this.tokenAndUsernameAndAdmin.username}`)
                .map((res) => {
                    this.tokenAndUsernameAndAdmin.userId = res;
                })
                .catch(this.handleError<any>('Login Error'));
        })
        .mergeMap(() => {
            console.log(this.tokenAndUsernameAndAdmin);
            return [
                {
                    type: AuthActions.SIGNIN,
                    payload: this.tokenAndUsernameAndAdmin.authenticated
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: this.tokenAndUsernameAndAdmin.token
                },
                {
                    type: AuthActions.SET_CURRENT_USERNAME,
                    payload: this.tokenAndUsernameAndAdmin.username
                },
                {
                    type: AuthActions.SET_ADMIN,
                    payload: this.tokenAndUsernameAndAdmin.isAdmin
                },
                {
                    type: AuthActions.SET_USER_ID,
                    payload: this.tokenAndUsernameAndAdmin.userId
                }
            ]
        });

    /**
     * Logout
     */
    @Effect({ dispatch: false })
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .do(() => {
            this.router.navigate(['/']);
            this.tokenAndUsernameAndAdmin = {
                token: null,
                authenticated: false,
                username: null,
                isAdmin: false,
                userId: null
            }
        });

    @Effect()
    selfCheck = this.actions$
        .ofType(AuthActions.TRY_SELF_CHECK)
        .map((action: AuthActions.TrySelfCheck) => {
            let headers = new HttpHeaders(
                {
                    authorization: localStorage.getItem('token')
                }
            )
            return this.http.get<boolean>(`${this.baseUrl}/self/${this.tokenAndUsernameAndAdmin.userId}`, { headers })
                .catch(this.handleError<boolean>('Checking Self Error'));
        })
        .mergeMap((res) => {
            return [
                {
                    type: AuthActions.SELF_CHECK,
                    payload: res
                }
            ]
        });


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            if (error != null && error.length < 1)
                console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
