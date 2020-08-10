const quoteContainer= document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide the loader

function hideLoading (){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// get quote from API
async function getQuote(){
    showLoading();
    const proxyUrl= 'https://cors-anywhere.herokuapp.com/'
    const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response= await fetch(proxyUrl + apiUrl);
        const data= await response.json();
        // if Author is unknown
        if(authorText===''){
           authorText.innerText = 'Unknown';
        }
        else {
             authorText.innerText = data.quoteAuthor;
        }
        
        if(data.quoteText.length > 120)
        {
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText
      
        hideLoading();  

    }catch(error){
        getQuote();
        console.log('oops, no quote',error);
    }
}
// Tweet quote

function twitter() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}
// Event listerners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitter);

//on Load
getQuote();


