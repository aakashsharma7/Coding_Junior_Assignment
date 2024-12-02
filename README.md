# Online Compiler

This is an online code compiler built using **Next.js** and **TypeScript** as part of an assignment for Coding Junior. The project allows users to write, run, and test code in multiple programming languages directly in the browser.

## Features

- **Multi-language Support:** Run code in various programming languages such as Python, JavaScript, TypeScript, C++, and more.
- **Code Editor:** Integrated code editor with syntax highlighting and language selection.
- **Real-Time Execution:** Executes code via an API and displays the output in real time.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Error Handling:** Provides clear error messages for failed code execution or API issues.

## Technologies Used

- **Frontend:**
  - Next.js (React framework for server-side rendering and static site generation)
  - TypeScript (for type-safe development)
  - Tailwind CSS (for styling)
  
- **Backend:**
  - API route in Next.js to interact with JDoodle or similar compiler APIs.

- **Additional Tools:**
  - CodeMirror (for the code editor component)
  - Toast notifications for user feedback

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn package manager
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/online-compiler.git
   cd online-compiler
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add the following variables (replace with your JDoodle credentials):
     ```env
     JDOODLE_CLIENT_ID=your_client_id
     JDOODLE_CLIENT_SECRET=your_client_secret
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

### API Integration

The project integrates with JDoodle or similar compiler APIs to execute code. Ensure your API credentials are valid and have sufficient credits to process code execution requests.

## Usage

1. Select a programming language from the sidebar.
2. Write your code in the editor.
3. Click the "Run Code" button to execute the code.
4. View the output in the output panel.

## Limitations

- Free-tier API credits may restrict usage.
- Execution time and output size are limited by the compiler API.

## Future Enhancements

- Add support for more programming languages.
- Implement user authentication to track usage.
- Improve error messages and debugging tools.
- Allow file upload and save functionality.

