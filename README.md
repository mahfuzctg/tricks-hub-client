# Tricks Hub - Frontend

**Tricks Hub** is a tech-focused web application built with Next.js, designed for tech enthusiasts to share and discover tech tips, tricks, and solutions. Users can interact with content, upvote insights, and access exclusive features.

## Table of Contents

- [Deployment](#deployment)
  - [Vercel Client Live Link](https://tricks-hub-client.vercel.app/)
  - [Vercel Server Live Link](https://tricks-hub-server.vercel.app/)
- [GitHub Repositories](#github-repositories)
  - [GitHub Client Repository](https://github.com/mahfuzctg/tricks-hub-client)
  - [GitHub Server Repository](https://github.com/mahfuzctg/tricks-hub-server)


## Project Overview

- **Purpose**: Provide a platform for tech enthusiasts to share and explore valuable tech-related content.
- **Core Functions**: 
  - User-generated tips and tricks for solving tech problems.
  - Interactive features such as comments, upvotes, and following users.
  - Premium content options available via subscription for exclusive tips and insights.

## Getting Started

### Prerequisites
- Ensure **Node.js** and **npm** are installed on your machine.

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tricks-hub.git
Navigate to the project directory:
bash
Copy code
cd tricks-hub
Install dependencies:
bash
Copy code
npm install
Running the Development Server
Start the server with one of the following commands:
bash
Copy code
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 in your browser to see the result.

Environment Variables
Create a .env.local file in the root directory with the following:
plaintext
Copy code
NEXT_PUBLIC_API_URL=<your-backend-api-url>
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-stripe-public-key>

## User Credentials

For testing or development purposes, you can use the following credentials:

### Regular User
- **Name**: `user`
- **Email**: `user@gmail.com`
- **Password**: `xyz1234`

### Admin User
- **Name**: `Admin`
- **Email**: `admin@gmail.com`
- **Password**: `xyz1234`


Features
User Authentication: Secure JWT-based login and registration for personalized user experiences.
Content Creation: A rich text editor for users to create and share tech tips, solutions, and tutorials.
Advanced Search and Filters: Find specific content using advanced search functionality with filtering options.


Social Interactions:
Upvote valuable tips and comments.
Comment and discuss insights with other users.
Follow other users to stay updated on their latest posts.
Premium Content: Access exclusive content through Stripe-integrated payments.
Responsive Design: Fully optimized for various devices and screen sizes.
Notification System: Users receive notifications for upvotes, comments, and new posts.


Technologies
Framework: Next.js for server-rendered React applications.
Frontend Library: React for building interactive UI components.
Language: TypeScript for type safety and improved development experience.
Styling: Tailwind CSS for responsive, utility-first styling.
State Management: Redux for global app state management.
API Calls: Axios for seamless communication with the backend API.
Payment Gateway: Stripe for handling premium content subscriptions.
Authentication: JSON Web Tokens (JWT) for secure user authentication and session handling.


Deployment Steps
Push the code to a GitHub repository.
Connect your GitHub repository to Vercel.
Vercel will automatically build and deploy your application.
For more details, check the Next.js deployment documentation.


Benefits
Community Building: Provides a platform for tech enthusiasts to share their knowledge, gain feedback, and collaborate on solving tech problems.
Premium Features: Offers exclusive content and advanced features through a subscription model.
Interactive and Social: Promotes user engagement through upvotes, comments, and following other users.
Easy to Use: Simple interface and intuitive content creation tools make it easy for users to share their tips and learn from others.
Scalable: Built with Next.js for scalability, making it suitable for handling increasing user demand as the platform grows.
Future Improvements
Mobile App: Plan to develop a mobile version for better user experience on smartphones.
Admin Panel: Add an admin panel to manage content and moderate interactions.
User Analytics: Provide users with analytics on their content (views, upvotes, comments).
Dark Mode: Implement a dark mode for better accessibility and user preference.