(function()
{
  var tileNumberContainer = [];
  var tileObjectsContainer = [];
  var contentContainer = document.getElementById("content-container");

  let userInputButton = document.getElementById("userInputButton");
  userInputButton.addEventListener('click', setAmountOfTiles, false);

  var TileState =
  {
    FACE_DOWN : 0,
    FACE_UP : 1,
  }

  class Tile
  {
    constructor(hiddenNumber, id)
    {
      this.hiddenNumber = hiddenNumber;
      this.tileState = TileState.FACE_DOWN;

      this.divTile = document.createElement("div");
      this.divTile.className = "tile-container";
      this.divTile.id = "tile-" + id;

      contentContainer.appendChild(this.divTile);

      let innerTileContainerFront = document.createElement("div");
      innerTileContainerFront.className = "front";

      let innerTileContainerBack = document.createElement("div");
      innerTileContainerBack.className = "back";

      this.divTile.appendChild(innerTileContainerFront);
      this.divTile.appendChild(innerTileContainerBack);

      this.divTile.addEventListener('click', whichTileIsClicked, false);
    }
  }

  function setAmountOfTiles()
  {
    tileNumberContainer = [];
    tileObjectsContainer = [];
    let userNumber = parseInt(document.getElementById("userInputField").value);

		for (let i = 0; i < userNumber; i++)
		{
			// push twice, because 2 tiles have the same value
			tileNumberContainer.push(i);
			tileNumberContainer.push(i);
		}
    assignNumberToTile();
    scaleIn();
  }

  function assignNumberToTile()
  {
    let loopCount = 0;

    do
    {
      let index = Math.floor(Math.random() * tileNumberContainer.length);
      let bottomRandomValue = tileNumberContainer[index];

      let newTile = new Tile(bottomRandomValue, loopCount);
      tileObjectsContainer.push(newTile);

      tileNumberContainer.splice(index, 1);

      loopCount++;
    }
    while (tileNumberContainer.length > 0);
  }

/*
  function turnTileFaceUp(event)
  {
    let e = window.event || event;
    let target = e.target || e.srcElement;

    if(target.className == "front")
    {
      console.log("yay");
    }
  }
*/

  function whichTileIsClicked(event)
  {
    let e = event.currentTarget;
    let targetId = e.id || e.srcElement.id;
    let targetClass = e.className || e.srcElement.className;

    if(targetClass.indexOf("tile-container") >= 0)
    {
      for (let i = 0; i < tileObjectsContainer.length; i++)
      {
        if(targetId === tileObjectsContainer[i].divTile.id)
        {
          console.log("e");
        }
      }
    }
  }

  function turnTileFaceUp()
  {

  }

  function scaleIn()
  {
    for (let i = 0; i < tileObjectsContainer.length; i++)
    {
      (function (i)
      {
        setTimeout(function ()
        {
          tileObjectsContainer[i].divTile.className += " scaled";
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

}
());
