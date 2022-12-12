module.exports = {
    client:{
        includes:["./src/**/*.{tsx,ts}"],
        tagName:"gql",
        service:{
            name:"salad-peace-backend",
            url:"https://salad-peace.herokuapp.com/graphql"
        }
    }
}