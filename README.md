# Project Setup Guide

This guide will help you set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Recommended version: >=14.x)
- pnpm (Version >=9.10.0)


If you are using a package manager other than the one specified, you will need to run each application from its respective root folder. 

This is because alternative package managers might not support workspace-based dependency resolution, requiring you to manage dependencies and scripts locally within each application's directory.

## Steps to Get Started

### 1. Clone the Repository

Pull the source code from the Git repository:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of the repository.

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd <project-folder>
pnpm install
```

### 3. Run the Development Server

Start the front-end development server:

```bash
cd apps/design
pnpm storybook
```

or 

```bash
pnpm --filter design storybook
```

The application will run at http://localhost:6006 by default.

### 4. Run backend test

Run the test script using the following command:

```bash
cd apps/backend

pnpm test
# or testing with coverage
pnpm test:coverage
```

or running in root directory

```bash
pnpm --filter backend test
# or testing with coverage
pnpm --filter backend test:coverage
```


## NOTE

Since the project requirements explicitly do not include a backend router, I have based my implementation strictly on the provided requirements. 

Without a router to define endpoint behavior or handle HTTP requests comprehensively, I have focused on implementing only the necessary functions and logic as described in the requirements.

These functions can be invoked programmatically or integrated into a larger backend system if required in the future.
