const CracoAlias = require("craco-alias");

module.exports = {
    plugins:[{
        plugin: CracoAlias,
        options: {
            aliases:{
                "@components": "src/components",
                "@pages": "src/pages",
                "@redux": "src/redux"
            }
        }
    }]
}