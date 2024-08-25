# Gunakan Node.js versi yang sesuai
FROM node:20.15.1

# Setel direktori kerja dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Tentukan port yang akan digunakan oleh aplikasi
EXPOSE 5000

# Jalankan perintah untuk memulai aplikasi
CMD ["npm", "start"]
