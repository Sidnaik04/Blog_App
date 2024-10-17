//this file is use for authentication service

import config from "../Config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectID); // Your project ID
    this.account = new Account(this.client); //created account with with client values
  }

  //create account method
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //if userAccount exist call another method -> loginAccount
        return this.loginAccount({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //login account method
  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //get current user method
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null; //what if there is no current user
  }

  //logout account method
  async logoutAccount() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logoutAccount :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;

/* Read docs to understand more

1. Imported config from config.js
2. Import client, accoutn and id from 'appwrite'
3. create a class Authservice
4. created a new object authService of class AuthService. So, that properties of class can be accessed using (.) operator (authService.)
5. export authService

6. Inside AuthService
a. create a client and account.
b. create a constructor -> setEndpoint , setProject

7. create account method -> createAccount inside AuthService
a. createAccount has dependencies -> email, password and name. Created using promise (async and await)
b. this method can throw error hence used try and catch -> which will try the method and if error than throw the error.
c. this.account.create is the syntax used as per docs , which need Id as first parameter, genrated using ID.unique
d. user account with same password and email may exist, to solve this issue will use if else.

8. login account method 
a. dependencies -> email and password
b. try and catch -> to find if there is error
c. this.account.createEmailPasswordSession -> syntax as per docs 

9. current user method 
a. dependencies -> none
b. try and catch -> to find if there is error
c. this.account.get -> syntax as per docs 
d. return null-> if no current user

8. logout account method 
a. dependencies -> none
b. try and catch -> to find if there is error
c. this.account.deleteSessions -> syntax as per docs 
*/
