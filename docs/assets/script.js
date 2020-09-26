let typeHeading = document.getElementById('type-heading');
if (typeHeading) {
  let text = typeHeading.textContent;

  function teletype(id, string, rate){
    let type = document.getElementById(id);
    let displayString = '';
    for (let i=0; i<string.length; i++){
      setTimeout(function(){
        if (i===0){
          typeHeading.setAttribute("class","visible teletype")
        }
        while (type.firstChild) {
          type.removeChild(type.lastChild);
        }
        displayString += string[i];
        let textNode = document.createTextNode(displayString);
        type.appendChild(textNode);
      }, i * rate);
    }
  }


  setTimeout(function(){
    teletype("type-heading", text, 50);
  }, 1000);
}

// Wiggle

let wiggleTexts = document.getElementsByClassName("wiggle");
let wiggleArray = [...wiggleTexts];
wiggleArray.map(text => {
  let theText = text.textContent;
  if (typeof theText != null){
    while (text.firstChild) {
      text.removeChild(text.lastChild);
    }
    for (i = 0; i < theText.length; i++){
      let letter = theText[i];
      let letterNode = document.createElement("span");
      let num = (i % 4) + 1;
      let letterClass = "wiggle" + num;
      letterNode.appendChild(document.createTextNode(letter));
      letterNode.setAttribute("class",letterClass);
      text.appendChild(letterNode);
      console.log(letterNode)
    }
  }
})