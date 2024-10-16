# Étape 1 : Build de l'application Angular
FROM node:18-alpine AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le code de l'application dans le conteneur
COPY . .

# Construire l'application pour la production
RUN npm run build --prod

# Étape 2 : Serveur Nginx pour servir l'application Angular
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*


# Copier les fichiers buildés de l'étape précédente vers le dossier nginx
COPY --from=build /app/dist/lama-tennis/browser /usr/share/nginx/html

# Copier le fichier de configuration personnalisé de Nginx (si nécessaire)
COPY nginx.conf /etc/nginx/nginx.conf

ENV NODE_ENV=production

ENV PORT=8080

# Exposer le port sur lequel Nginx tourne
EXPOSE 8080



# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
