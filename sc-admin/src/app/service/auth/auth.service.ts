import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public  afAuth: AngularFireAuth, public  router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['admin/list']);
  }

  async register(email: string, password: string): Promise<void> {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(value => {
      this.router.navigate(['admin/verify-email']);
    });
    // this.sendEmailVerification();
  }

  // async sendEmailVerification(): Promise<void> {
  //   await this.afAuth.currentUser.sendEmailVerification();
  //   this.router.navigate(['admin/verify-email']);
  // }

  async sendPasswordResetEmail(passwordResetEmail: string): Promise<void> {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async loginWithGoogle(): Promise<void> {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['admin/list']);
  }
}
