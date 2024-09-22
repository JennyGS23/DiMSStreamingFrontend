# DiMS-Streaming-Frontend

Frontend for Distributed Multimedia System for Content Streaming v1.0

## Description

DiMS-Streaming-Frontend is the user interface of the Distributed Multimedia System for Content Streaming. This project complements the [DiMS-Streaming-Backend](https://github.com/juanbnunez/DiMS-Streaming-Backend.git) to offer a seamless multimedia content consumption experience, including videos and music, similar to popular services like Netflix and Spotify.

The frontend is designed to be intuitive, responsive, and optimized for displaying various types of content, allowing users to explore their personal library, receive recommendations, and play videos and music.

![Frontend](https://drive.google.com/uc?export=view&id=1iS7gLdkksThVx9l76Fg49iQmaKybR01w)

### Purpose in Different Network Environments

The system is designed to work efficiently in various network environments, providing adaptive streaming for both high and low bandwidth scenarios. It ensures smooth content delivery whether deployed in local networks, cloud environments, or hybrid setups.

## Features

- **Navigation and Library:** Interface for exploring the user's personal music and video library.
- **Recommendations:** Section for recommended content tailored to user preferences.
- **Responsive Design:** Adapts to different devices and screen sizes for a consistent user experience.
- **Backend Integration:** Smooth communication with the backend to retrieve and play multimedia content.

## Tools and Technologies

- **Frontend:** Built with HTML, CSS (Tailwind CSS), and JavaScript to create an attractive and functional interface.
- **Styling:** Tailwind CSS is used to style components, ensuring a modern and responsive experience.
- **Backend:** The frontend communicates with the backend for managing and delivering multimedia content.
- **Hosting:** Integrated with backend services hosted on AWS for efficient handling of content and requests.

## Installation

To run the project on your local machine, follow these steps:

1. Clone this repository to your local environment:
   
   ```bash
   https://github.com/JennyGS23/DiMSStreamingFrontend.git
   ```
2. Setup the Backend: Ensure the backend is configured and running as per the instructions in its README.

3. Open the home.html file in your browser (remember to have the backend project running).
4. Alternatively, use a local server (e.g., using VSCode Live Server, XAMPP) to serve the project files.
   
## Usage
- Access the platform through the user interface to explore your personal library of music and videos.
- Browse personalized recommendations and enjoy multimedia content.
- The frontend integrates directly with the backend to manage content playback and storage on AWS.

## Example Commands
1. To start the local server using Python:
     ```bash
   python -m http.server 8000
   ```
2. Another option is to install the Live Server extension in Visual Studio Code. Then, right-click on the home.html file and select the Open with Live Server option.
   ![Press open with live server](https://github.com/ritwickdey/vscode-live-server/raw/HEAD/images/Screenshot/vscode-live-server-editor-menu-3.jpg)

## System Requirements
- Browser compatible with HTML5, CSS3, and JavaScript.
- Internet connection to consume cloud-hosted multimedia content.

## Diagrams
Frontend Architecture Diagram:
![Frontend Architecture Diagram](https://drive.google.com/uc?export=view&id=1R35OSiDjvklCKHd_QibqXprJ1SFM6_Ox)

Complete Platform Diagram:
![Complete Platform Diagram](https://drive.google.com/uc?export=view&id=114P-6PvblfqZbKtfffKcamwLzFW6R-nZ)

## Try the Platform
You can try the platform in production on Vercel by visiting the following link: [DiMS Streaming](https://di-ms-streaming-frontend.vercel.app/home.html)

## Contributions and Credits
This project was developed by:

[Jennifer González Solís](https://github.com/JennyGS23) and [Juan B. Núñez](https://github.com/juanbnunez)

Contributions: Together, we designed and implemented both the frontend and backend of the Distributed Multimedia System for Content Streaming. We focused on creating an intuitive user interface, integrating multimedia management, and ensuring seamless communication between components.

## Acknowledgments
We would like to thank the following third-party resources and technologies that were essential for the development of this project:

[Tailwind CSS](https://tailwindcss.com/docs/installation): For providing a responsive and modern design for the interface.

[AWS](https://aws.amazon.com/es/getting-started/hands-on/deliver-content-faster/?pg=ln&sec=hs): For offering efficient solutions for handling and delivering multimedia content.


