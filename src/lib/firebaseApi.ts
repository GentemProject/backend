import * as FirebaseAdmin from 'firebase-admin';

export class FirebaseApi {
  static credentialFromServiceAccount(serviceAccount: FirebaseAdmin.ServiceAccount) {
    return FirebaseAdmin.credential.cert(serviceAccount);
  }

  firebase: FirebaseAdmin.app.App;

  constructor(options: {
    databaseUrl: string;
    privateKey: string;
    projectId: string;
    clientEmail: string;
  }) {
    this.firebase = FirebaseAdmin.initializeApp({
      databaseURL: options.databaseUrl,
      credential: FirebaseAdmin.credential.cert({
        privateKey: options.privateKey,
        projectId: options.projectId,
        clientEmail: options.clientEmail,
      }),
    });
  }

  async verifyIdToken(options: { token: string }) {
    return await this.firebase.auth().verifyIdToken(options.token);
  }

  createUser(options: { email: string; password: string }) {
    return this.firebase.auth().createUser({ email: options.email, password: options.password });
  }

  deleteUser(options: { firebaseId: string }) {
    return this.firebase.auth().deleteUser(options.firebaseId);
  }

  async updateUserFirebasePassword(options: { auth_id: string; new_password: string }) {
    return await this.firebase.auth().updateUser(options.auth_id, {
      password: options.new_password,
    });
  }

  async generatePasswordResetLink(options: { email: string }) {
    const actionCodeSettings = {
      url: 'https://gentem.com/login',
    };
    return await this.firebase.auth().generatePasswordResetLink(options.email, actionCodeSettings);
  }
}
