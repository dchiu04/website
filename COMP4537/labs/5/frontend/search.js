function getDef(word) {
    fetch(`https://lab5-dictionary.herokuapp.com/api/definitions/${word}`)
        .then(response => response.json())
        .then(data => {
            console.log("Result", data)
            $("#result").append(`<div class="item"><h3><b>${data.word}</b></h3><p>${data.definition}</p></div>`)
        })
        .catch(error => {
            $("#result").append(`<div class="item"><p><b>${searchword}</b> not found in dictionary</p></div>`)
        })
}

document.getElementById("searchbtn").addEventListener("click", function() {
    searchword = document.getElementById("searchword").value
    console.log(searchword)
    $("#result").empty()
    if (searchword && !/\d/.test(searchword)) {
        getDef(searchword)
    } else if (searchword && /\d/.test(searchword)) {
        $("#result").append(`<div class="item"><p>please enter a valid word!</p>
            <p><b>${searchword}</b>contains invalid characters</p></div>`)
    }
})

