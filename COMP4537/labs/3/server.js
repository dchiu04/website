function submit() {
	let name = document.getElementById('name').value;
	fetch(`https://morning-thicket-36286.herokuapp.com/?name=${name}`)
	.then(response => response.json())
	.then(data => document.getElementById('message').innerHTML = data['res']);
}

