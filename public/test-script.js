const body = $('body');

body.css({
    'position': 'relative'
})

const shop = Shopify.shop;

const makeApp = products => {
    const bestSellerContainer = $(
        `<div>
           <h3> Our Best Sellers </h3>
        </div>`
    )
    .css({
        'position' : 'fixed',
        'background-color': '#ffffff',
        'border':'1px solid black',
        'bottom': '80px',
        'right': '25px',
        'height': '400px',
        'width': '350px',
        'display': 'none'
    })

    const bestSellerButton = $('<img />').attr('src', '')
    .css({
        'position': 'fixed',
        'width': '150px',
        'bottom': '20px',
        'right': '20px',
        //'cursor': 'pointer'
    })

    body.append(bestSellerButton);
    body.append(bestSellerContainer);

    bestSellerButton.click(() => {
        bestSellerContainer.slideToggle();
    }

    )
}

fetch('https://cors-anywhere.herokuapp.com/https://2661b61c5d48.ngrok.io/api/products?shop=testingapplications05.myshopify.com')
.then(res => res.json())
.then(data =>{
   // console.log(data)
    makeApp(data.data)
})
.catch(error => console.log(error))