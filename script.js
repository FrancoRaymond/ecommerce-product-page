const menuIcon = document.querySelector('.menuIcon')
const closeMenu = document.querySelector('.closeMenu')
const navLinks = document.querySelector('.navLinks')
let body = document.body

menuIcon.addEventListener('click', function(){
    navLinks.classList.toggle('active')
    body.classList.add('no-scroll')
});
closeMenu.addEventListener('click', function(){
    navLinks.classList.toggle('active')
    body.classList.remove('no-scroll')
});

const cartIcon = document.getElementById('navCartIcon')
const cartItems = document.querySelector('.cartItems')

cartIcon.addEventListener('click', function(){
    cartItems.classList.toggle('active')
});

let productImageDataNumber = 1;
const thumbnailDiv = document.querySelectorAll('.thumbnailDiv')
const hoverOverlay = document.querySelectorAll('.hoverOverlay')
const thumbnail = document.querySelectorAll('.thumbnail')

thumbnailDiv.forEach(div => {
    div.addEventListener('click', function(){

        const activeOverlays = document.querySelectorAll('.activeOverlay');
        const thumbnailNum = div.querySelector('.thumbnail').dataset.number

        activeOverlays.forEach(overlay => {
            overlay.classList.remove('active')
        });

        const activeOverlay = this.querySelector('.activeOverlay')
        activeOverlay.classList.toggle('active')
        productImageDataNumber = thumbnailNum
        updateImages()
        updateActiveThumbanilOverlay()
    });
});

updateActiveThumbanilOverlay()
function updateActiveThumbanilOverlay(){
    thumbnail.forEach(thumbnail =>{
        thumbnail.parentElement.querySelector('.activeOverlay').classList.remove('active')
        if(thumbnail.dataset.number == productImageDataNumber){
            thumbnail.parentElement.querySelector('.activeOverlay').classList.add('active')
        }
    });
}

const productImage = document.querySelectorAll('.productImage')
const productThumbnail = document.querySelectorAll('.thumbnail')
const lightBoxGallery = document.querySelector('.lightBoxGallery')
const nextAndPreviousBtns = document.querySelectorAll('.nextAndPrevious')

nextAndPreviousBtns.forEach(nextAndPreviousBtns => nextAndPreviousBtns.addEventListener('click', function(){
    if(this.id == 'next'){
        if(productImageDataNumber == 4){
            return
        }else{
            productImageDataNumber ++
            updateImages()
            updateActiveThumbanilOverlay()
        }
    }

    if(this.id == 'previous'){
        if(productImageDataNumber == 1){
            return
        }else{
            productImageDataNumber --
            updateImages()
            updateActiveThumbanilOverlay()
        }
    }
}));

updateImages()
function updateImages(){
    productImage.forEach(productImage => {
        if(productImage.dataset.number == productImageDataNumber){
            productImage.style.display = 'block'
        }else{
            productImage.style.display = 'none'
        }
    });
};

productImage.forEach(productImage => productImage.addEventListener('click', function(){
    lightBoxGallery.style.display = 'block'
    body.classList.add('no-scroll')
}));

const closeLightBoxGallery = document.querySelector('.closeGallery')

closeLightBoxGallery.addEventListener('click', function(){
    lightBoxGallery.style.display = 'none'
    body.classList.remove('no-scroll')
});

const quantity = document.querySelector('.quantity')
const addOrSubtract = document.querySelectorAll('.qty img')

addOrSubtract.forEach(btn => btn.addEventListener('click', function(){
    if(this.id === "subtract"){
        if(quantity.innerText == 0){
            return;
        }else{
            quantity.innerText --
        }
    }
    if(this.id === "add"){
        quantity.innerText ++
    }
}));

const addToCartBtn = document.querySelector('.addToCartBtn')

addToCartBtn.addEventListener('click', function(){
    addItemToCart()
    quantity.innerText = '0';
});

let numberOfItemsInTheCart = document.querySelector('.numberOfItems')
const emptyCart = document.querySelector('.emptyCart')
const addedItems = document.querySelector('.addedItems')
const checkoutBtn = document.querySelector('.checkoutButtonContainer button')
const itemPrice = document.getElementById('itemPrice')

function addItemToCart(){
    if(quantity.innerText == '0'){
        return;
    }else{
        const itemExists = document.querySelector('.addedItems .item')

        if(!itemExists){
            emptyCart.style.display = 'none'
            numberOfItemsInTheCart.innerText = quantity.innerText
            checkoutBtn.style.display = 'block'

            const div = document.createElement('div')
            div.classList.add('item')

            const img = document.createElement('img')
            img.src = 'images/image-product-1-thumbnail.jpg'
            div.append(img)

            const div2 = document.createElement('div')
            div2.classList.add('nameAndPrice')
            div.append(div2)

            const p = document.createElement('p')
            p.innerText = 'Fall Limited Edition Sneakers'

            const p2 = document.createElement('p')

            const span = document.createElement('span')
            span.classList.add('price')
            span.innerText = '$125.00  * '

            const span2 = document.createElement('span')
            span2.id ='quantity'
            span2.innerText = quantity.innerText

            const span3 = document.createElement('span')
            span3.classList.add('total')
            span3.innerText = '$' + parseInt(itemPrice.innerText) * parseInt(quantity.innerText)
            div2.append(p, p2)
            p2.append(span, span2, span3)

            const img2 = document.createElement('img')
            img2.src = 'images/icon-delete.svg'
            img2.classList.add('deleteIcon')
            div.append(img2)

        addedItems.append(div)
        }else{
            return
        }
    }
}

addedItems.addEventListener('click', function(event){
    if(event.target.classList.contains('deleteIcon')){
        event.target.parentElement.remove()
        numberOfItemsInTheCart.innerText = '0'
        checkoutBtn.style.display = 'none'
        emptyCart.style.display = 'block'
    }
})
