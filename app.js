let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not__found");
const apiKey='21774178-729e-4eab-8793-fcdd4e39190f'
let defBox = document.querySelector(".def");
let loading = document.querySelector(".loading");
searchBtn.addEventListener("click",function(e){
    e.preventDefault();
    // clear data
    notFound.innerText = '';
    defBox.innerText = '';
    //get input data
    let word = input.value;
    // call API to get data
    if (word==='') {
        alert("word is required");
        return;
    }

    getData(word);
});

async function getData(word)
{
    loading.style.display = 'block';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    /// if empty result

    if (!data.length) {
        loading.style.display = 'none';
        notFound.innerText= ' No result found';
        return;
    }

    // if result is suggestion

    if (typeof data[0] === "string") {
        loading.style.display = 'none';
        let heading  = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement("span");
            suggestion.classList.add("suggested");
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });
        return;
    }

    /// if result is found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;
    
}






// key :- 21774178-729e-4eab-8793-fcdd4e39190f