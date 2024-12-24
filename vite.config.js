export default {
  base: '/test-image-webgl/', // имя репозитория, начинающееся и заканчивающееся на "/"
  esbuild: {
    include: /src\/(.*\.js|.*\.jsx|.*\.ts|.*\.tsx)$/
  },
  server: {
    port: 3000,       // Порт сервера
    host: '0.0.0.0',
  },
}