//this file is use for creating services for database and storage

import config from "../Config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases; //for database
  bucket; //for storage

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectID); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //A method createPost -> to create a blog post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID, //database id
        config.appwriteCollectionID, //collection id
        slug, //unique id -> generated using slug
        {
          //all data
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  //A nethod updatePost -> to update a existing blog post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID, //database id
        config.appwriteCollectionID, //collection id
        slug, //unique id -> generated using slug
        {
          //all data
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  //A nethod deletePost -> to delete a existing blog post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseID, //database id
        config.appwriteCollectionID, //collection id
        slug //unique id -> generated using slug
      )
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  //To see a single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseID, //database id
        config.appwriteCollectionID, //collection id
        slug //unique id -> generated using slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  //To see that post which are active only.
  async getPosts(queries = [Query.equal("status", "title")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseID, //database id
        config.appwriteCollectionID, //collection id
        queries //-> this is variable which is declared above
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  //service to upload the file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketID, //bucket id
        ID.unique(), //unique file id
        file // file which we are going to upload
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  //service to delete the uploaded file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketID, //bucket id
        fileId //id of the file, to be deleted
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  //service to preview the file
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(
      config.appwriteBucketID, //bucket id
      fileId //id of the file, to be deleted
    );
  }
}

const service = new Service();

export default service;

/* Read docs to understand more

1. Imported config from config.js
2. Import client, databases, storage, query and id from 'appwrite'
3. create a class Service
4. created a new object service of class Service(). So, that properties of class can be accessed using (.) operator (service.)
5. export service.

6. Inside Service class
a. create a client, databases and bucket.
b. create a constructor -> setEndpoint , setProject, databases and bucket

7. create post method -> to create a blog post
a. What we want in post -> title, slug, content, featuredImage, status, userId
b. this method can throw error hence used try and catch -> which will try the method and if error than throw the error.
c.  await databases.createDocument('<DATABASE_ID>', '<COLLECTION_ID>', // collectionId ','<DOCUMENT_ID>',{}); -> syntax

8. update post method
a. A post will be updated based on slug (id). We don't want to update userId. Therefore slug is outside as post will be identified using slug.
b. databases.updateDocument -> syntax

9. delete post method
a. to delete a post only slug is needed. Base on slug(id) the post will be deleted.
b. once deleted we have handle true or false for frontend.

10. To see a single post based on slug

11. To see that only post which are active
a.  declare a query -> if title == active than, show the posts.

12. Upload file -> in storage (bucket)

13. delete file -> from storage using fileId

14. getFilePreview -> based on fileId

*/
