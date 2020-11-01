setScore();

//gets the score from local storage
function setScore() {
	let s = document.getElementById('score');
	let sc = localStorage.getItem("score");
	s.innerHTML = `Score: ${sc}`;
	
	//error handling name not being reset
	localStorage.setItem("name", "");
}

//saves name in local storage
function send(elem) {
  //get the parent
  var parent = elem.parentNode;
  
  //search the parent's children to simulate sibling searching
  var name = parent.querySelector('input[type=text]').value;
		
  if (name == '') {
    alert('Please enter a name.');
	return;
  }

  //send to local storage
  localStorage.setItem("name", name);
  
  //send user to leaderboard page
  location.href = "leaderboard.html";
}