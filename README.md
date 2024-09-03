# Unity WebGL with Next.js

This project integrates Unity WebGL with a Next.js front end, providing a seamless way to run Unity games or simulations directly within a web application.

## 🌐 Live Demo

Check out the deployed version on Vercel: [Unity WebGL](https://faraz-unity-webgl.vercel.app/)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

Clone the repository and install dependencies:

```shell
git clone https://github.com/your-username/unity-webgl-nextjs.git
cd unity-webgl-nextjs
npm install
# or
yarn install
```

### Running Locally

Start the development server:

```shell
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Project Structure

-   **`/unity`**: Contains the Unity WebGL build files.
-   **`/components`**: React components used throughout the app.
-   **`/pages`**: Next.js pages.
-   **`/public`**: Static assets, including the Unity WebGL loader and data files.

## ✨ Features

-   **Unity Integration**: Run Unity games/simulations directly in the browser using WebGL.
-   **Responsive Design**: The Unity canvas adapts to different screen sizes while maintaining the correct aspect ratio.
-   **Loading Screen**: A custom loading screen with a spinning Unity logo while the WebGL build loads.
-   **Deployed on Vercel**: Continuous deployment with Vercel, optimized for performance.

## 🚀 Deployment

This project is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). To deploy your own version, follow these steps:

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically build and deploy your project on every push to the `main` branch.

## 🧩 Unity WebGL Build

To update the Unity WebGL build:

1. **Build in Unity**: Make sure to export your Unity project as a WebGL build.
2. **Replace Files**: Copy the new build files into the `/public/unity/Build` directory.
3. **Replace Streaming Assets**: Copy the new asset files into the `/public/unity/StreamingAssets` directory.
4. **Commit & Deploy**: Push the changes to GitHub. Vercel will automatically redeploy the updated build.

## 🎮 Usage

To integrate your own Unity WebGL build, replace the files in the `/public/unity/Build` directory with your own Unity WebGL build files. Any included assets must be placed inside the `/public/unity/StreamingAssets` directory. The Next.js app is pre-configured to load these files.

## 🛠️ Technologies Used

-   **[Next.js](https://nextjs.org/)**: React framework for building web applications.
-   **[Unity](https://unity.com/)**: Platform for creating and operating interactive, real-time 3D content.
-   **[React Unity WebGl](https://react-unity-webgl.dev/)**: Displaying Unity WebGL components.
-   **[Vercel](https://vercel.com/)**: Hosting platform for modern web projects.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.
