module.exports = {
  apps : [
    {
      name: 'FrontEnd',
      script: 'npm',
      args: 'start',
      cwd: './front',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'BackEnd',
      script: 'java',
      args: '-jar spring-back/target/spring-back-0.0.1-SNAPSHOT.jar',
      cwd: './spring-back',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
