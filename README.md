# Booksta: Community for Readers and Writers

## Overview

**Booksta** is a vibrant community platform designed for both readers and writers. Whether you're a book enthusiast looking for recommendations or a writer eager to share your stories, Booksta is the perfect space to connect, collaborate, and engage with like-minded individuals. Our platform allows users to share posts, interact with content, and publish their own books.

---

## Key Features

- **Post Creation**: Users can create and share text and file-based posts with the community.
- **User Engagement**: Readers can like and comment on posts, promoting an interactive environment.
- **Text Editor for Writers**: A built-in text editor lets writers format and publish their stories within the app.
- **Book Publishing**: Writers can publish books, with a minimum of 30 pages available as a preview before purchase.
- **Payment Integration**: Secure payment gateways ensure seamless transactions for book purchases.
  
---

## Tech Stack

- **Architecture**: Microservices for modularity, scalability, and ease of maintenance.
- **Frontend**: Web and mobile applications with seamless user interfaces.
- **Backend**: RESTful API services built with **Node.js** and **Express**.
- **Database**: MongoDB for managing user data, posts, comments, and other resources.

---

## API Endpoints

### Post Management

#### **Create a Post**
- **URL**: `/add-post`
- **Method**: `POST`
- **Middleware**: `auth`, `upload`
- **Description**: Allows authenticated users to create and upload a new post.
- **Request Body**: Multipart form data, including text and files.

#### **Like a Post**
- **URL**: `/:postId/like`
- **Method**: `PATCH`
- **Middleware**: `auth`
- **Description**: Like a post by its unique `postId`.

#### **Unlike a Post**
- **URL**: `/:postId/unlike`
- **Method**: `PATCH`
- **Middleware**: `auth`
- **Description**: Unlike a post by its unique `postId`.

### Comment Management

#### **Add a Comment**
- **URL**: `/:postId/comment`
- **Method**: `POST`
- **Middleware**: `auth`
- **Description**: Adds a comment to a specific post.

#### **Get All Comments for a Post**
- **URL**: `/:postId/comments`
- **Method**: `GET`
- **Middleware**: `auth`
- **Description**: Fetch all comments for a specific post.

#### **Delete a Comment**
- **URL**: `/:postId/comment/:commentId`
- **Method**: `DELETE`
- **Middleware**: `auth`
- **Description**: Deletes a comment by its `commentId`.

#### **Update a Comment**
- **URL**: `/:postId/comment/:commentId`
- **Method**: `PUT`
- **Middleware**: `auth`
- **Description**: Updates a comment by its `commentId`.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**
- **npm** (Node Package Manager)
- **MongoDB**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sayand-ak/booksta.git
    cd booksta
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of your project and include the following values:

    ```
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

4. Run the server:

    ```bash
    npm start
    ```

5. Access the application via `http://localhost:3000`.

---

## Directory Structure

