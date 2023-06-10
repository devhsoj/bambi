# bambi

A place to hold the passwords you hold deerly safe. 

## Installation

**Requirements:** [Node.js](https://nodejs.org/en/download) or [Docker](https://docs.docker.com/get-docker/)

**Without Docker**
```bash
git clone https://github.com/devhsoj/bambi.git
cd bambi/
npm i
npm run build

```

**With Docker**
```bash
git clone https://github.com/devhsoj/bambi.git
cd bambi/

# build with default login. If no username/password provided, the default login will be admin:admin
docker build . --build-arg USERNAME=joe --build-arg PASSWORD=m4ma -t bambi

# build with default login and non-random session secret (for load balancing/multiple instances of bambi)
docker build . --build-arg USERNAME=joe --build-arg PASSWORD=m4ma --build-arg SESSION_SECRET=bUrn3d! -t bambi
```

## Running

**IMPORTANT:** bambi **should** be served behind a **HTTPS** reverse proxy like [nginx](https://www.nginx.com/). Unless you're a network god or you're not scared of your traffic being sniffed!

**Without Docker:**
```bash
npm start # running at http://0.0.0.0:3000
```

**With Docker:**
```bash
docker run -d -p 3000:3000 bambi # running on http://0.0.0.0:3000
```