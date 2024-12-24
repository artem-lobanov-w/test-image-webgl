export default {
  base: '/test-image-webgl/', // имя репозитория
  esbuild: {
    include: /src\/(.*\.js|.*\.jsx|.*\.ts|.*\.tsx)$/
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
}