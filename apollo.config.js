module.exports = {
    client:{
        includes:["./src/**/*.{tsx,ts}"],
        tagName:"gql",
        service:{
            name:"salad-peace-backend",
            url:"http://localhost:4000/graphql"
        }
    }
}