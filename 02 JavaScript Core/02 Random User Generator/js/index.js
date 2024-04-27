document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector("body")
  const apiUrl = "https://randomuser.me/api/"

  /* Create header and a button */
  const header = document.createElement("h1")
  header.innerText = "Random User Generator"
  body.appendChild(header)
  const button = document.createElement("button")
  button.innerText = "Get User"
  button.id = "get-user-button"
  button.addEventListener("click", function() {
    getUser(apiUrl)
      .then(user => {
        if (user) {
          displayUser(user)
        }
      })
  })
  body.appendChild(button)
  
  /* autoload first user */
  getUser(apiUrl)
    .then(user => {
      if (user) {
        displayUser(user)
      }
    })

  async function getUser(apiUrl) {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      return data.results[0]
    } catch(error) {
      alert("Can't connect to api.")
      return null
    }
  }

  function displayUser(user) {
    const div = document.createElement("div")
    div.className = "user"

    const name = document.createElement("h2")
    name.innerText = user.name.first + ' ' + user.name.last
    name.className = "name"
    div.appendChild(name)

    const email = document.createElement("p")
    email.innerText = 'Email: ' + user.email
    email.className = "email"
    div.appendChild(email)

    const password = document.createElement("p")
    password.innerText = 'Password: ' + user.login.password
    password.className = "password"
    password.hidden = true
    div.appendChild(password)

    const location = document.createElement("p")
    location.innerText = "Location: " + user.location.city + ', ' + user.location.country
    location.className = "location"
    div.appendChild(location)

    const gender = document.createElement("p")
    gender.innerText = "Gender: " + user.gender
    gender.className = "gender"
    div.appendChild(gender)

    const phone = document.createElement("p")
    phone.innerText = "Phone: " + user.phone
    phone.className = "phone"
    div.appendChild(phone)

    const birthDay = document.createElement("p")
    const date = new Date(user.dob.date).toLocaleDateString('en-GB')
    birthDay.innerText = "Birthday: " + date
    birthDay.className = "birthday"
    div.appendChild(birthDay)

    const picture = document.createElement("img")
    picture.src = user.picture.large
    picture.alt = user.name.first
    picture.className = "photo"
    div.appendChild(picture)

    body.appendChild(div)
  }
})
