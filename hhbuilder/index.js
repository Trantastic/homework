var addBtn = document.getElementsByTagName("button")[0];
var submitBtn = document.getElementsByTagName("button")[1];
var pre = document.getElementsByTagName("pre")[0];

var xhr = new XMLHttpRequest();
var url = "http://localhost:8000";

// Holds family members
var family = [];

// Add and delete family members
addBtn.addEventListener("click", function(){
	event.preventDefault();

	// Get values from form
	var age = document.getElementsByName("age")[0].value;
	var relationship = document.getElementsByName("rel")[0].value;
	var smoke = document.getElementsByName("smoker")[0].checked;

	// Text for when family member is appended
	var ageText = document.createTextNode(" " + age + ", ");
	var relText = document.createTextNode(relationship);
	var smokeText = document.createTextNode(", smoker");
	
	var newP = document.createElement("p");

	// Delete button
	var delBtn = document.createElement("button");
	var delText = document.createTextNode("x");
	delBtn.appendChild(delText);

	if(age > 0 && relationship) {
		family.push({"age": age, "relationship": relationship, "smoke": smoke});

		newP.appendChild(delBtn);
		newP.appendChild(ageText);
		newP.appendChild(relText);
	
		if(smoke === true) {
			newP.appendChild(smokeText);
		}
	}
	else {
		alert("Please make sure to fill out a valid age and relationship.");
	}

	document.body.appendChild(newP);

	// Deletes family member if delete button is pressed
	delBtn.addEventListener("click", function(){
		// Removes html of family member
		newP.removeChild(delBtn);
		newP.removeChild(ageText);
		newP.removeChild(relText);

		if(smoke === true) {
			newP.removeChild(smokeText);
		}

		// Removes value of family member
		family.splice(this, 1);
	});
});

// Fake posts to server when submit is clicked
submitBtn.addEventListener("click", function(){
	event.preventDefault();

	if(family.length === 0) {
		alert("Please add a family member.");
	}
	else{
		var data = JSON.stringify(family);
		var dataNode = document.createTextNode(data);

		pre.appendChild(dataNode);

		// Fake sends family members to server
		xhr.open("POST", url, true);
		xhr.send(data);
	}
});