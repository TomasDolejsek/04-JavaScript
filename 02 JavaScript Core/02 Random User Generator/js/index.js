document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector("body")
  const apiUrl = "https://randomuser.me/api/"

  function displayPerson(person) {
    const header = document.createElement("h1")
    header.innerText = "Random User Generator"
    body.appendChild(header)

    const div = document.createElement("div")
    div.className = "user"

    const name = document.createElement("h2")
    name.innerText = person.name.first + ' ' + person.name.last
    name.className = "name"
    div.appendChild(name)

    const email = document.createElement("p")
    email.innerText = 'Email: ' + person.email
    email.className = "email"
    div.appendChild(email)

    const password = document.createElement("p")
    password.innerText = 'Password: ' + person.login.password
    password.className = "password"
    password.hidden = true
    div.appendChild(password)

    const location = document.createElement("p")
    location.innerText = "Location: " + person.location.city + ', ' + person.location.country
    location.className = "location"
    div.appendChild(location)

    const gender = document.createElement("p")
    gender.innerText = "Gender: " + person.gender
    gender.className = "gender"
    div.appendChild(gender)

    const phone = document.createElement("p")
    phone.innerText = "Phone: " + person.phone
    phone.className = "phone"
    div.appendChild(phone)

    const birthDay = document.createElement("p")
    const date = new Date(person.dob.date).toLocaleDateString('en-GB')
    birthDay.innerText = "Birthday: " + date
    birthDay.className = "birthday"
    div.appendChild(birthDay)

    const picture = document.createElement("img")
    picture.src = person.picture.large
    picture.alt = person.name.first
    picture.className = "photo"
    div.appendChild(picture)

    body.appendChild(div)
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        alert("Can't connect to API")
      } else {
        return response.json()
      }
    })
    .then(data => {
      const person = data.results[0]
      displayPerson(person)
    })
})
