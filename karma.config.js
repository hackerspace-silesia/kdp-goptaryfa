module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            'vendor/jquery.min.js',
            {
                pattern: "src/*.ts"
            }, // *.tsx for React Jsx 
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"], // *.tsx for React Jsx 
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};