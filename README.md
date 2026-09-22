# Smart Expense Tracker

## Project Overview

Smart Expense Tracker ek **React-based web application** hai jo users ko income aur expenses manage karne aur spending patterns visualize karne me help karta hai.

Is project ka main goal **React development ke saath Docker, DockerHub aur CI/CD practically learn karna** hai.

> **Note:** Is project me backend ya database use nahi kiya gaya hai. Data browser Local Storage me manage kiya jayega.

---

## Technologies Used

### Frontend

* React
* JavaScript
* React Router DOM
* Tailwind CSS
* Recharts / Chart.js

### DevOps

* Git & GitHub
* Docker
* DockerHub
* GitHub Actions
* CI/CD


## Features

* Add and manage expenses
* Add and manage income
* Transaction history
* Search and filter transactions
* Total income and expense overview
* Remaining balance
* Expense analytics
* Monthly expense charts
* Responsive UI
* Local Storage data management

---

## React Concepts

This project covers:

* Components
* props
* useState
* useEffect
* React Router
* Form handling
* Conditional rendering
* Local Storage
* Charts
* Responsive UI

---

## Project Structure


src/
│
├── components/
├── pages/
├── charts/
├── context/
├── routes/
├── App.jsx
├── main.jsx
└── index.css



## Docker

The React application will be containerized using Docker.


React App
    ↓
Dockerfile
    ↓
Docker Image
    ↓
Docker Container


### Docker Learning

* Dockerfile
* Docker image
* Docker container
* Docker build
* Docker run
* Port mapping

---

## DockerHub

The Docker image will be pushed to DockerHub.


Docker Build
     ↓
Docker Image
     ↓
DockerHub
     ↓
Docker Pull
     ↓
Docker Container
---

## CI/CD

GitHub Actions will be used to implement a basic CI/CD pipeline.

Whenever code is pushed to GitHub:

`
Git Push
   ↓
GitHub Actions
   ↓
Install Dependencies
   ↓
Build React App
   ↓
Build Docker Image
   ↓
Push Image to DockerHub


### CI/CD Learning

* GitHub Actions
* YAML workflow
* Automated build
* Docker image build
* DockerHub push



## Project Workflow


React Development
       ↓
     GitHub
       ↓
     Docker
       ↓
   DockerHub
       ↓
 GitHub Actions
       ↓
     CI/CD




