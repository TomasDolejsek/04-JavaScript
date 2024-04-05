const createButton = document.querySelector("#button-create")
const deleteButton = document.querySelector("#button-delete")
const inputField = document.querySelector("#input-url")
const listElement = document.querySelector("#list-url")
const errorElement = document.querySelector("#error")

function createNewShort() {
  const alphanumerical = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let newUrl = "localhost/"
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * alphanumerical.length)
    newUrl += alphanumerical[index]
  }
  return newUrl
}

createButton.addEventListener("click", function() {
  const validUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  const url = inputField.value
  if (!validUrl.test(url)) {
    errorElement.hidden = false
  } else {
    errorElement.hidden = true
    const shortUrl = createNewShort()
    const newShortItem = document.createElement('li')
    newShortItem.dataset.shortUrl = shortUrl
    newShortItem.dataset.url = url
    newShortItem.dataset.clicks = "0"

    const inputElement = document.createElement('input');
    inputElement.id = "edit-url"
    inputElement.type = "text"
    inputElement.maxLength = 5
    inputElement.value=shortUrl.slice(-5)

    const linkElement = document.createElement('a')
    linkElement.href = url
    linkElement.target = "_blank"
    linkElement.innerText = shortUrl
    newShortItem.appendChild(linkElement)
    newShortItem.innerHTML += ` - ${url} - <span>Clicks: ${newShortItem.dataset.clicks}</span>`

    const link = newShortItem.querySelector('a')
    link.addEventListener("click", function() {
      console.log(newShortItem.dataset.clicks)
      newShortItem.dataset.clicks = String(Number(newShortItem.dataset.clicks) + 1)
      newShortItem.querySelector("span").innerText = `Clicks: ${newShortItem.dataset.clicks}`
    })

    const editButton = document.createElement("button")
    editButton.id = "button-edit"
    editButton.type = "button"
    editButton.innerText = "Edit"
    editButton.addEventListener("click", function() {
      if (editButton.innerText === 'Edit') {
        editButton.innerText = 'Save'
        link.replaceWith(inputElement)
      } else {
        editButton.innerText = 'Edit'
        newShortItem.dataset.shortUrl = "localhost/" + inputElement.value
        link.innerText = newShortItem.dataset.shortUrl
        newShortItem.querySelector("#edit-url").replaceWith(link)
      }
    })
    newShortItem.appendChild(editButton)
    listElement.appendChild(newShortItem)
  }
})

deleteButton.addEventListener("click", function() {
  const url = inputField.value
  Array.from(listElement.children).forEach(element => {
    if (element.innerHTML.includes(url)) {
      listElement.removeChild(element)
    }
  })
})