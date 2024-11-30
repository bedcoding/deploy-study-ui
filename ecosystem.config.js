module.exports = {
    apps: [{
        name: "my-app",
        script: "node_modules/.bin/next",
        args: "start -p 3000",
        env: {
            NODE_ENV: "production"
        }
    }]
};