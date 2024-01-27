# Global News Feed App

## Overview

The Global News Feed App is a dynamic and user-centric platform that delivers personalized news experiences. Users can sign in, set their preferred region and language, and instantly access tailored news headlines. The app features intuitive dropdowns for easy customization, ensuring a seamless and user-friendly experience. With a secure authentication system, users can bookmark articles, manage their saved content, and stay informed in a way that aligns with their individual interests. Explore the world of news with the Global News Feed App – your personalized gateway to up-to-date and relevant information.

## 3rd Party Rapid APIs

The Global News Feed App leverages the following Rapid APIs:

1. **Real Time News Data API** [Rapid API Link](https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-news-data):

   - **Get All Top Headlines Endpoint**: Used to fetch a list of top headlines news.
   - API Link: [Real-Time-News-Data API](https://real-time-news-data.p.rapidapi.com/top-headlines)

2. **Google Translate API** [Rapid API Link](https://rapidapi.com/undergroundapi-undergroundapi-default/api/google-translate113):

   - **Get Translation of Text Endpoint**: Translate text to specific language.

     - API Link: [Google-Translate API](https://google-translate113.p.rapidapi.com/api/v1/translator/text)

## Setup

This repository contains a Docker Compose setup for the Global News Feed App, allowing you to run the Global News Feed App locally for testing and development.

## Prerequisites

Ensure you have Docker and Docker Compose installed on your system.

- [Get Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

Clone this repository:

```bash
git clone https://github.com/DevNinja56/Global News Feed App.git
```

Navigate to the project directory:

```bash
cd Global News Feed App
```

Create Docker Network:

```bash
docker network create my_network
```

Open a terminal and use the following command to provide execution permissions to the scripts:

```bash
chmod +x deploy.sh stop.sh
```

Run the deploy script file:

```bash
./deploy.sh
```

Access the frontend of app in your browser at http://localhost:3000 and backend at http://localhost:3001/api.

To stop the services, Run the stop script file:

```bash
./stop.sh
```

## Application Details

The Global News Feed App incorporates various features and technologies:

- **Next.Js with TypeScript**: Empowers the frontend development of the Global News Feed App using Next.Js with TypeScript
- **Nest.Js with TypeScript**: Empowers robust server-side development with a typed approach.
- **MongoDB**: Utilized for efficient database storage.
- **JWT Authentication with Passport.Js**: Ensures secure user authentication.
- **Swagger**: Incorporates Swagger documentation to streamline API exploration and understanding.
- **Modules**:
  - **Authentication Module**: Manages user authentication.
  - **User Module**: Provides functionalities related to users.
  - **Bookmark Module**: Enables users to manage their bookmarked news.
  - **News Module**: Harnesses the power of 3rd-party Rapid APIs for data retrieval.
  - **Translation Module**: Harnesses the power of 3rd-party Rapid APIs for data retrieval.
