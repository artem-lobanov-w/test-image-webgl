export default {
  base: './', // Используем относительные пути
  build: {
    assetsDir: 'assets', // Директория для ассетов (по умолчанию "assets")
  },
  esbuild: {
    include: /src\/(.*\.js|.*\.jsx|.*\.ts|.*\.tsx)$/,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
};