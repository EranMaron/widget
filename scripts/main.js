// const widget = document.getElementById("widget-container")
const list = document.getElementById("ad-list")
const xhr = new XMLHttpRequest()
const url = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&  placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

const maxNumofChar = 70

xhr.onload = function() {
    if(this.status === 200) {
        const res = JSON.parse(this.responseText)
        const ads = res.list
        ads.forEach(function(ad) {
            addingAd(ad)
        })
    }
}

// Send request to server
xhr.open('get', url)
xhr.send()

// Add Ad card to DOM
function addingAd(ad) {
    let listItem = document.createElement("li")
    let clickable = document.createElement("a")
    let imageContainer = document.createElement("div")
    let image = document.createElement("img")
    let title = document.createElement("h3")
    let brand = document.createElement("h4")
    let category = document.createElement("h4")
    
    if(ad.categories.length !== 0) {
        category.innerHTML = 'Category: ' + ad.categories[0]
    }
    
    category.classList.add("category-text")
    imageContainer.classList.add("image-container")
    image.classList.add("ad-image")
    image.src = ad.thumbnail[0].url
    image.alt = ad.name
    brand.innerHTML = ad.branding
    
    if(checkNumOfChar(ad.name)) {
        title.innerHTML = ad.name
    } else {
        let truncatedTitle = ad.name.slice(0, maxNumofChar) + '...'
        title.innerHTML = truncatedTitle
    }
      
    clickable.href = ad.url
    clickable.target = "_blank"
    
    imageContainer.appendChild(image)
    imageContainer.appendChild(brand)
    clickable.appendChild(imageContainer)
    clickable.appendChild(title)
    listItem.appendChild(clickable)
    listItem.appendChild(category)
    list.appendChild(listItem)
    
    clickable.addEventListener('click', function() {
        window.open(ad.url);
    })
}

// Check if the length of the title is too long and add elipsis 
function checkNumOfChar(str) {
    if(str.length <= maxNumofChar){
        return true
    }else return false
}

