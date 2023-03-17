# Factify Frontend

The Frontend Application for Factify. 

## About Factify

Factify is on Open Source Multimedia Fact generation tool. Factify can be used to create Video, Audio, Image FactChecks from simple text Input. 

Factify Frontend is a part of Factify Toolchain consisting of [Factify Frontend](https://github.com/FactifyEditor/Factify-Frontend), [Factify API](https://github.com/FactifyEditor/Factify-Api) and [Factify Renderer](https://github.com/FactifyEditor/Renderer-Engine). 

## Setup Factify Frontend

To Setup Factify Frontend, follow the following steps:

1- Clone the Repository ``` git clone https://github.com/FactifyEditor/Factify-Frontend ```
2- Run Npm install ``` npm install ```
3- Run the development server ``` npm start ```
4- Build the application using ``` npm run build ```

## Integrate with custom API Server and Renderer

- Open the file [src/environments/environment.ts](src/environments/environment.ts) and [src/environments/environment.prod.ts](src/environments/environment.prod.ts)
- Change the BASE_URL to your API Server URL
- Change the RENDERER_URL to your Renderer Server URL