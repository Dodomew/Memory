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

(function()
{
	var bottomValue = [];
	var tileContainer = [];
	var contentContainer = document.getElementById("content-container");

	function userInput()
	{
		tileContainer.length = 0;
		bottomValue.length = 0;
		contentContainer.innerHTML = "";

		let userNumber = parseInt(document.getElementById("userInputField").value);

		for (let i = 0; i < userNumber; i++)
		{
			// push twice, because 2 tiles have the same value
			bottomValue.push(i);
			bottomValue.push(i);
		}

		do
		{
			let index = Math.floor(Math.random() * bottomValue.length);
			let bottomRandomValue = bottomValue[index];

			bottomValue.splice(index, 1);

			var divTile = document.createElement("div");
			divTile.setAttribute("class", "tile-container");
			contentContainer.appendChild(divTile);

			var innerTileContainerFront = document.createElement("div");
			innerTileContainerFront.class = "front";
			innerTileContainerFront.setAttribute("class", "front");

			var innerTileContainerBack = document.createElement("div");
			innerTileContainerBack.class = "back";
			innerTileContainerBack.setAttribute("class", "back");

			divTile.appendChild(innerTileContainerFront);
			divTile.appendChild(innerTileContainerBack);

			var NewTile = new Tile(bottomRandomValue, false, innerTileContainerBack, innerTileContainerFront, divTile);

			tileContainer.push(NewTile);

		}
		while(bottomValue.length > 0);

	  scaleIn();
	}


	//I create an object named "tile", which should be used in a loop that spawns the tiles. Constructor
	function Tile(hiddenNumber, isFaceUp, back, front, HTMLtileContainer)
	{
		this.hiddenNumber = hiddenNumber;
		this.isFaceUp = isFaceUp;
		this.back = back;
		this.front = front;
		this.HTMLtileContainer = HTMLtileContainer;
	}

	document.addEventListener('click', function objectFinder(e)
	{
	    e = window.event || e;
	    var target = e.target || e.srcElement;
			console.log(e.target); //the target can be either the e.target or e.srcElements, both properties work

	    if (checkNumberOfTilesClicked() <= 1)
	    {
	       	for(var i = 0; i <tileContainer.length; i++)
	       	{
	       		if(target === tileContainer[i].front)
	       		{
	       			showHiddenNumber(i);

	       			for(var j = 0; j < tileContainer.length; j++ )
	       			{
								if(tileContainer[i] != tileContainer[j] && tileContainer[j].isFaceUp === true)
								{
									tileContainer[j].back.innerHTML = tileContainer[j].hiddenNumber.toString();

									if(tileContainer[i].isFaceUp === true && tileContainer[j].isFaceUp === true)
									{
										timeoutCode(tileContainer[i], tileContainer[j]);
									}
								}
	       			}
	       			break;
	       		}
	       	}
		}
	},
	false);

	function showHiddenNumber(el)
	{
		var clickedObject = tileContainer[el];

		if(tileContainer[el].isFaceUp == true)
		{
			clickedObject.back.innerHTML = " ";
		}
		else
		{
			clickedObject.back.innerHTML = tileContainer[el].hiddenNumber.toString();
			clickedObject.isFaceUp = true;

			clickedObject.HTMLtileContainer.classList.add("flipped");
			clickedObject.HTMLtileContainer.classList.add("flipped");

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
		i.HTMLtileContainer.classList.add("removed");
		j.HTMLtileContainer.classList.add("removed");

		//set timeOut for code underneath, so that the animation first completes then gets removed
		setTimeout(function ()
		{
			i.front.remove(i.front);
			i.back.remove(i.back);

			j.front.remove(j.front);
			j.back.remove(j.back);

			tileContainer = tileContainer.filter(function(tile) { return tile !== i; }); //return tilecontainer zonder object i erin (grootte is dan 8 - 1 - 7)
			tileContainer = tileContainer.filter(function(tile) { return tile !== j; }); //return tilecontainer opnieuw zonder object j erin (grootte is dan 7 - 1 = 6)

			youHaveWon();

		}, 300);

	}

	function turnTileDown(i, j)
	{
		i.HTMLtileContainer.classList.remove("flipped");
		i.HTMLtileContainer.classList.remove("flipped");

		j.HTMLtileContainer.classList.remove("flipped");
		j.HTMLtileContainer.classList.remove("flipped");

		i.back.innerHTML = " ";
		j.back.innerHTML = " ";
		i.isFaceUp = false;
		j.isFaceUp = false;
	}

	function scaleIn()
	{
		for (var i = 0; i < tileContainer.length; i++)
		{
			(function (i)
			{
				setTimeout(function ()
				{
					tileContainer[i].HTMLtileContainer.classList.add("scaled");
				}, randomIntFromInterval(10, 50) * i );
			})(i);
		};
	}

	// What it does "extra" is it allows random intervals that do not start with 1.
	// So you can get a random number from 10 to 15 for example.
	// http://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
	function randomIntFromInterval(min,max)
	{
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

	function youHaveWon()
	{
		if(tileContainer.length == 0)
		{
			tileContainer.innerHTML = "";
			var youWonDiv = document.createElement("div");
			youWonDiv.setAttribute("class", "youWonContainer");
			youWonDiv.innerHTML = "You won!";
			tileContainer.appendChild(youWonDiv);
		}
	}
	userInput();
}
());
