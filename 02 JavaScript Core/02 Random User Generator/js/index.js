document.addEventListener("DOMContentLoaded", function() {
  "use strict"
  const body = document.querySelector("body")
  const apiUrl = "https://randomuser.me/api/"

  /* Header */
  const header = document.createElement("h1")
  header.innerText = "Random User Generator"
  body.appendChild(header)

  /* Get user button */
  const nextButton = document.createElement("button")
  nextButton.innerText = "Get User"
  nextButton.id = "get-user-button"
  nextButton.addEventListener("click", () => getNewUser(apiUrl))
  body.appendChild(nextButton)

  /* Save users button */
  const saveButton = document.createElement("button")
  saveButton.innerText = "Save Users"
  saveButton.id = "save-users-button"
  saveButton.addEventListener("click", () => saveUsers(users))
  body.appendChild(saveButton)

  /* New page or reload */
  let users = JSON.parse(localStorage.getItem('savedUsers'))
  if (!users) {
    users = []
    getNewUser(apiUrl)
  } else {
    const savedUsersHeader = document.createElement('h3')
    savedUsersHeader.innerText = 'Saved Users'
    body.appendChild(savedUsersHeader)
    users.forEach(user => displayUser(user, true))
  }

  /* functions */
  function saveUsers(users) {
    localStorage.removeItem('savedUsers')
    localStorage.setItem('savedUsers', JSON.stringify(users))
    const savedUsersHeader = document.createElement('h3')
    savedUsersHeader.innerText = 'Saved Users'
    body.appendChild(savedUsersHeader)
    users.forEach(user => displayUser(user, true))
  }

  function getNewUser(apiUrl) {
    getUserFromApi(apiUrl)
      .then(user => {
        if (user) {
          users.push(user)
          displayUser(user)
        }
      })
  }

  async function getUserFromApi(apiUrl) {
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      return data.results[0]
    } catch(error) {
      alert("Can't connect to api.")
      return null
    }
  }

  function displayUser(user, saved=false) {
    const div = document.createElement("div")
    div.className = "user"
    if (saved) {
      div.classList.add("saved")
    }

    const name = document.createElement("h2")
    name.innerText = user.name.first + ' ' + user.name.last
    name.className = "name"
    div.appendChild(name)

    const email = document.createElement("p")
    email.innerHTML = `<b>Email:</b> ${user.email}`
    email.className = "email"
    div.appendChild(email)

    const password = document.createElement("p")
    password.innerText = 'Password: ' + user.login.password
    password.className = "password"
    password.hidden = true
    div.appendChild(password)

    const location = document.createElement("p")
    location.innerHTML = `<b>Location:</b> ${user.location.city + ', ' + user.location.country}`
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
    div.prepend(picture)

    body.appendChild(div)
  }
})
