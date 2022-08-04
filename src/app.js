const loginFetch = async (username, pass) => {
    const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            password: pass
        })
    })
    const data = await res.json()
    data.user
    data.token
} //! This is for week 10, only in React app