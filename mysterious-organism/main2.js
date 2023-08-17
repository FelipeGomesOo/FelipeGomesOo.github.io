let first = document.body.children[0];
first.innerHTML = 'BROWN BEARS ARE AWESOME!';
first.parentNode.style.backgroundColor = 'beige';


let second = document.getElementById("introduction").children[0];
second.innerHTML = 'BROWN BEARS ARE AWESOME!';

 
let speciesChildren = Array.from(document.getElementById("species").children).map(item =>{
    return item.innerHTML;
})
console.log(speciesChildren) 
 alert(speciesChildren.join(", "));

//for(let i = 0;i <=4; i++ ){speciesChildren[i].innerHTML = "Eitach";}
/* speciesChildren.forEach((item, index) => {
    item.innerHTML += " uhul! " + index ;
}) */


