FROM node:11

WORKDIR /src/app

COPY package*.json ./

#dependencias
 RUN yarn install
 #copia de ruta actual  ./ al contenedor  ./
 COPY ./  ./
 #instalando pm2
 RUN yarn global install pm2 -g
 
 EXPOSE 8080
 CMD["pm2-runtime", "start", "--watch", "yarn", "--", "interpreter", "bash", "server"]
 
