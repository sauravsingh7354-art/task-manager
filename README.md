# Task Manager

A task management web application built with Laravel, React, TypeScript, and Inertia.js.

## Features

- User authentication and registration
- Create, view, update, and delete tasks
- Search tasks
- Filter tasks by status and priority
- Role-based access control
- Admin users can view all tasks
- Regular users can manage their own tasks
- Task ownership authorization

## Tech Stack

- **Backend:** Laravel, PHP
- **Frontend:** React, TypeScript, Inertia.js
- **Database:** MySQL
- **Testing:** PHPUnit / Laravel testing tools
- **Code Quality:** Laravel Pint, PHPStan, TypeScript checks
- **CI/CD:** GitHub Actions

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sauravsingh7354-art/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
composer install
npm install
```

### 3. Configure environment

```bash
copy .env.example .env
php artisan key:generate
```

Update your `.env` file with your local MySQL database credentials.

### 4. Run migrations

```bash
php artisan migrate
```

### 5. Start the application

```bash
php artisan serve
```

In another terminal:

```bash
npm run dev
```

Open the local URL shown by Laravel in your browser.

## Quality Checks

Run the project's CI checks:

```bash
composer ci:check
```

## Repository

[GitHub – Task Manager](https://github.com/sauravsingh7354-art/task-manager)
