module.exports = {
  apps: [{
    name: 'wordlost',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-193-16-84.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/reflorance-key-pair-ncal.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ppatternn/wordlost.git',
      path: '/home/ubuntu/wordlost',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
