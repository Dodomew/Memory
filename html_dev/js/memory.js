/*

Creating Memory the game!

- A tile has a top and a bottom. Top = a color. Bottom = a value (like a number)
- There has to be an even amount of tiles
- They need to be drawn
- There needs to be an interaction possible by clicking a tile, turning it around. Showing bottom instead of top.
- There needs to be a check; check when 2 tiles are turned around if their values are === the same. If yes, remove the tiles. If no, turn both tiles back down.
- There needs to be a way to shuffle the tiles when starting.

Bonus
- User can input how many tiles he wants. Only input even numbers
- Animate tiles when clicked (change color? scale 1.1? some visual feedback)

For now the idea is:

- Create 2 arrays. One for holding the top values, one for holding the bottom values.
- The Top array "draws" the tiles with the help of 2 for loops, one for X, one for Y.
- The Bottom array assigns randomly to each Top tile a value. This array holds each value twice (it has 0, 0, 1, 1, 2, 2 etc)
- The for loop for X or Y can only draw an even amount of tiles, so I think something with modulo
- the sum of both for loops' tiles = even number
- function: when tile is clicked, show bottom array value. If no other tile is showing bottom value, keep showing bottom value. 
- If other tile is showing, check to see if their values are the same. If so, remove both tiles. Otherwise, show for both tiles their top values again.
- This check should be visible to the player for at least 1 second (cause the pc sees it in ms)
- The tiles can be created with createObject and assign a class to it. I can have 2 classes, like ''red tile'' and ''blue tile''

- Create object with a loop and these properties:
	- Boolean: false (is the tile face up?);
	- topValue = color(red); //does not need to be in js, can be declared in css. only 1 class is needed anyway
	- bottomValue = bottomRandomValue;

Create a loop that does something like : 
for(var i; i = bottomValue.length; i++) //for loop will not work, because at some point i === array.length, therefor the loop would stop prematurely (the array shrinks because of splice() and the for loop increments each time)
so use a do while loop like below! Because you do not have to increment anything then
the do while loop stops when array.length =! 0 . If you do > 0 , it stops immediately. Do while means: Do THIS, while THAT condition is TRUE (so do createObject, while array.length does NOT equal 0 (it will eventually reach 0, therefor ending the loop))

*/
 
//I create an array to hold the bottom values
var bottomValue = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]; 
var tileCount = 0;
//array to hold the Tile objects
var tileContainer = []; 



//I create an object named "tile", which should be used in a loop that spawns the tiles. Constructor
function Tile(hiddenNumber, isFaceUp, newDiv)
{
	this.hiddenNumber = hiddenNumber;
	this.isFaceUp = isFaceUp;
	this.newDiv = newDiv;
}

do
{
	//I create a var to hold the index number of the array, which is chosen at random between 0 and array.length. Math.floor makes sure the number is never higher than the array.lenght by rounding down (1.9 ==> 1)
	var index = Math.floor(Math.random() * bottomValue.length);
	//I create a var which holds the value of the chosen index of array
	var bottomRandomValue = bottomValue[index];
	//I remove the index of array and only remove 1
	bottomValue.splice(index, 1);

	tileCount++;

	//create a var that holds the code to create a HTML div
	var newDiv = document.createElement("div");

	//instantiate Tile (line 44) and give the following parameters
	var NewTile = new Tile(bottomRandomValue, false, newDiv);
	
	var divTileContainer = document.createElement("div");
	divTileContainer.setAttribute("class", "tile-container");

	var contentContainer = document.getElementById("content-container");
	contentContainer.appendChild(divTileContainer);

	var innerTileContainerFront = document.createElement("div");
	innerTileContainerFront.class = "front";
	innerTileContainerFront.setAttribute("class", "front");
	divTileContainer.appendChild(innerTileContainerFront);

	var innerTileContainerBack = document.createElement("div");
	innerTileContainerBack.class = "back";
	innerTileContainerBack.setAttribute("class", "back");
	divTileContainer.appendChild(innerTileContainerBack);

	//access the newDiv property of Tile object and give it a html class named tile
	var divClassName = NewTile.newDiv.setAttribute("class", "tile" + tileCount.toString());
	//ik moet hiddenNumber appenden aan tile1, 2 etc
	//tile1.appendChild(hiddenNumber)
	//divClassName.appendChild()
	

	innerTileContainerBack.appendChild(NewTile.newDiv);
	//append the instantiated object's property newDiv to the body element, which reads: div class = "tile"
	//document.body.appendChild(NewTile.newDiv);
	tileContainer.push(NewTile);
}
while(bottomValue.length > 0);



//document.getElementByClassName("tile");
/*
	if element is clicked, return the classname to me (newDiv), which is a property of that object
	that newDiv has a bottomRandomValue which I want to show
	to know which class the element has, i have to look at the Tile object, since it stores the newDiv
	but the Tile objects arent stored anywhere, so i gotta create an Array that holds the Tiles
	then, when clicked I can check the returned value with the objects in the array to see which object was clicked

	something like: tileContainer[clickedObject].hiddenNumber
	I want to show this number in this tile square, so perhaps something like innerHTML = hiddenNumber.toString(); , but only to the tileNumber class, not tile class (tile1, tile2 etc)
	e.srcElement = newDiv (in the web console it shows for example: div.tile1.tile, which is also the first object's newDiv (in this case))
	so when a tile is clicked, I know the value of its newDiv. 
	I can then iterate through the array that holds the object and check each object's newDiv. If any of those object's newDiv matches the clicked newDiv, I know which Object was clicked. For loop

	When I know which object is clicked, I want to show bottomRandomValue as a string inside the tile1 div

	for(var i; i < array.length; i++)
	{
		if(e.srcElement === tileContainer[i].newDiv)
		{
			this is my ClickedObject
		}
		else
		no;
	}
*/

//I call the addEventListener function, give it parameters. Inside this function, I call another function named ''objectFinder'' with parameter e. Inside this function a lot will happen
//e is then defined as window.event. When you check web console you get MouseEvent, which is e. This e has a lot of properties, including src.Element.
document.addEventListener('click', function objectFinder(e) 
{
    e = window.event;
    var target = e.target || e.srcElement; //the target can be either the e.target or e.srcElements, both properties work        
	      
        if (checkNumberOfTilesClicked() <= 1)
        {

	        //Iterate through the tileContainer array, increment by 1 each time
	       	for(var i = 0; i < tileContainer.length; i++)
	       	{	//if the MouseEvent property target or srcElement === the tile object's newDiv, then...
	       		if(target === tileContainer[i].newDiv)
	       		{
	       			showHiddenNumber(i);
	       		

	       			//I check the tileContainer again with a different var
	       			for(var j = 0; j < tileContainer.length; j++ )
	       			{
	       				/*because it runs through the same tileContainer, it is important to distinguish the 2 objects from each other (because they come from the same object).
	       				 When i and j = 0, the second if gets done (tileContainer i = j, because their index are both 0.)
	       				 If they are not the same, so i = 0, j = 1 , then it looks at the .isFaceUp. Since i isFaceUp is true when it gets to the inner for loop, all it has to have is tileContainer[j] = true.
	       				 If this is the case, it checks both hiddenNumbers and compares. If true, delete the divs and remove them from the array
	       				 Else set their innerHTML to empty and their bool to false
	       				 */
						if(tileContainer[i] != tileContainer[j] && tileContainer[j].isFaceUp === true)
						{

							tileContainer[j].newDiv.innerHTML = tileContainer[j].hiddenNumber.toString();

							if(tileContainer[i].isFaceUp === true && tileContainer[j].isFaceUp === true)
							{

								timeoutCode(tileContainer[i], tileContainer[j]);

							}

						}
						
	       			}

	       			break; //stops the for loop. When an object is clicked again, the function is called again, therefor calling the for loop again
	       		}

	       	}
       }
}, 
false);

/*
	I have to create an if(?) that says: if object is clicked, and this object is already showing its hiddenNumber, hide hiddenNumber
	I append something, so I should be able to remove it too, something like: clickedObject.newDiv.remove(divContent)

	Now I have to make it so that IF there are two tiles showing their hiddenNumber, and their hiddenNumbers are NOT EQUAL, then hide both tiles again.
	If they are the same hiddenNumber, then remove them from the game.
	ClickedObjects are stored in the tileContainer[i]; . So is there a way to say: if 2 objects from the array their bool is true, then check their values?

	if(tileContainer[i].isFaceUp === true)
	{
		console.log(tileContainer[i]);
	}

	for(var x = 0; x = 2; )
*/

/*

When one object is already showing its hiddenNumber, and a second object is clicked, it must also show its hiddenNumber. BUT if they dont match each other, both tiles gotta go facedown again.
If they do match each other, then they both got to disappear.

	if(tileContainer[j].isFaceUp == true)
	{
		clickedObject.newDiv.innerHTML = " ";
		clickedObject.isFaceUp = false;
	}
	else
	{
		//append the hiddenNumber string to the found object's newDiv, so that it appears as : div class = "tile1 tile">hiddenNumber's value</div>
		clickedObject.newDiv.innerHTML = tileContainer[j].hiddenNumber.toString();
		clickedObject.isFaceUp = true;
	}
	
	but this is copy paste of the first object, is there anything to make this less?
*/

function showHiddenNumber(el)
{
	var clickedObject = tileContainer[el];


	//set bool to false again, and remove its html content. Which is the hiddenNumber.
	if(tileContainer[el].isFaceUp == true)
	{
		clickedObject.newDiv.innerHTML = " ";
	}
	else
	{
		//append the hiddenNumber string to the found object's newDiv, so that it appears as : div class = "tile1 tile">hiddenNumber's value</div>
		clickedObject.newDiv.innerHTML = tileContainer[el].hiddenNumber.toString();
		clickedObject.isFaceUp = true;
	}
}

function timeoutCode(i, j)
{
	setTimeout(function ()
	{

		if(i.hiddenNumber === j.hiddenNumber)
		{
			removeTile(i, j);
		}
		else
		{			
			turnTileDown(i, j);			
		}
	}, 1000);
}

function checkNumberOfTilesClicked()
{
	/*
	deze functie moet checken hoeveel tiles.isFaceUp = true zijn en returned dit.
	*/
	var faceUpCounter = 0;
	tileContainer.forEach(function(tile)
	{
		if(tile.isFaceUp == true)
		{
			faceUpCounter++;
		}
		
	});

	return faceUpCounter;
	
}



function removeTile(i, j)
{
	i.newDiv.remove(newDiv);
	j.newDiv.remove(newDiv);

	tileContainer = tileContainer.filter(function(tile) { return tile !== i; }); //return tilecontainer zonder object i erin (grootte is dan 8 - 1 - 7)
	tileContainer = tileContainer.filter(function(tile) { return tile !== j; }); //return tilecontainer opnieuw zonder object j erin (grootte is dan 7 - 1 = 6)
}

function turnTileDown(i, j)
{
	i.newDiv.innerHTML = " ";
	j.newDiv.innerHTML = " ";
	i.isFaceUp = false;
	j.isFaceUp = false;
}

function flipCard() 
{
	var cards = document.querySelectorAll(".tile-container");
	for ( var i  = 0, len = cards.length; i < len; i++ ) 
	{
		var card = cards[i];
		clickListener( card );
	}

	function clickListener(card) 
	{
		card.addEventListener( "click", function() 
		{
		  var c = this.classList;
		  c.contains("flipped") === true ? c.remove("flipped") : c.add("flipped");
		});
	}
}

flipCard();