import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }
})

export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text,
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items
    // no need to use response.json()
    // /search/users?${params} return items array and, we need items

    // ***before axios***
    // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    //     headers: {
    //         Authorization: `token ${GITHUB_TOKEN}`
    //     }
    // })
    // const {items} = await response.json()

    // we don't need everything it returns we just need items array so we destructure from the object that return
    // and get items
    // return items
}
// We use this in UserSearch

export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])
    return { user: user.data, repos: repos.data}
        // [user, repos] = user.data & repos.data
}


// export const getUser = async (login) => {
//
//     const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`
//         }
//     })
//     if (response.status === 404) {
//         window.location = '/notfound'
//     } else {
//         const data = await response.json()
//         return data
//     }
// }
//
// export const getUserRepos = async (login) => {
//
//     const params = new URLSearchParams({
//         sort: 'created',
//         per_page: 10
//     })
//
//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`
//         }
//     })
//
//     const data = await response.json()
//     return data
//
// }