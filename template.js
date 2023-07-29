const templates = [
    {
        key: 'nodejs',
        description: 'nodejs 模板',
        url: 'https://github.com/lqzhgood/create-lqzh-app/tree/nodejs',
        downloadUrl: 'direct:https://github.com/lqzhgood/create-lqzh-app.git#nodejs',
        script: {
            post: 'npm install && npm run dev',
        },
    },
];

module.exports = templates;
