import axios from "axios"

export const state = () => ({
    list: []
})

export const actions = {
    async upload ({ commit }, id) {
        const { data } = await axios.post('http://localhost:1337/graphql',{
            query: 
            `{
            post(id:${id}) {
                id
                title
                slug
                description
                created_at
                content
                image {
                url
                }
                category {
                name
                }
            }
            }`
        })
        let post = data.data.post
        if (post) commit('set', post)
    }
}
  
export const mutations = {
    set(state, post) {
        state.list.push(post)
    }
}