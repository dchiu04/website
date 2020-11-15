document.getElementById("submit").addEventListener("click", function(event){ 
    event.preventDefault()
    word = document.getElementById("word").value
    definition = document.getElementById("definition").value
    console.log("word", word)
    console.log('definition', definition)
    submitDefinition(word, definition)
    waitEmpty()
  })

async function waitEmpty() {
    await sleep(3000)
    $("#successMessage").empty()
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function submitDefinition(word, definition) {
    console.log(word, definition)
    const def = {word: word, definition: definition}
    if (/\d/.test(def.word) || /\d/.test(def.definition)) {
        $("#successMessage").text(`input failed: numbers are invalid
        characters`)
    } else {
        fetch(`https://lab5-dictionary.herokuapp.com/api/definitions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(def)
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data, "status: ", data.status)
            if (data.error) {
                $("#successMessage").text(`input failed: ${data.error}`)
            } else {
                $("#successMessage").text(`${data.word} has successfully been entered into the dictionary`)
            }
        })
        .catch(error => console.log('Error:', error))
    }

}


