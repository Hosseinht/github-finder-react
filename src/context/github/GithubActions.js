const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })
    const {items} = await response.json()

    // we don't need everything it returns we just need items array so we destructure from the object that return
    // and get items
    return items
}
// We use this in UserSearch

