module.exports = {
  apps : [
    {
      name: "NextApp",
      script: "npm",
      args: "start",
      cwd: "./front",
      env: {
        NODE_ENV: "production"
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
      name: "SpringBootApp",
      script: "./spring-back/run-app.sh",
      exec_mode: "fork"
    }
  ]
};