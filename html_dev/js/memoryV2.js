(function()
{
  var tileNumberContainer = [];
  var tileObjectsContainer = [];
  var contentContainer = document.getElementById("content-container");
  var clickedTilesContainer = [];

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

      this.innerTileContainerFront = document.createElement("div");
      this.innerTileContainerFront.className = "front";

      this.innerTileContainerBack = document.createElement("div");
      this.innerTileContainerBack.className = "back";

      this.divTile.appendChild(this.innerTileContainerFront);
      this.divTile.appendChild(this.innerTileContainerBack);

      this.divTile.addEventListener('click', didUserClickTile, false);
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

  function didUserClickTile(event)
  {
    let e = event.currentTarget;
    let targetId = e.id || e.srcElement.id;
    let targetClass = e.className || e.srcElement.className;

    if(targetClass.indexOf("tile-container") >= 0)
    {
      whichTileIsClicked(targetId);
    }
  }

  function whichTileIsClicked(clickedTileId)
  {
    if(noMoreThanTwoTilesFaceUp() <= 1)
    {
      for (let i = 0; i < tileObjectsContainer.length; i++)
      {
        if(clickedTileId === tileObjectsContainer[i].divTile.id && tileObjectsContainer[i].tileState == TileState.FACE_DOWN)
        {
          turnTileFaceUp(tileObjectsContainer[i]);

          if(clickedTilesContainer.length == 2)
          {
            compareTwoTiles(clickedTilesContainer);
          }
        }
      }
    }
  }

  function turnTileFaceUp(clickedTile)
  {
    clickedTile.divTile.classList.add("flipped");
    clickedTile.innerTileContainerBack.innerHTML = clickedTile.hiddenNumber;
    clickedTile.tileState == TileState.FACE_UP;
    clickedTilesContainer.push(clickedTile);
  }

  function compareTwoTiles(arrayOfClickedTiles)
  {
    let tileToCompareTo = arrayOfClickedTiles[0];
    let tileToBeCompared = arrayOfClickedTiles[1];

    if(tileToCompareTo.hiddenNumber == tileToBeCompared.hiddenNumber)
    {
      setTimeout(function ()
      {
        console.log("yay");
      },
      1000);
    }
    else
    {
      setTimeout(function ()
      {
        turnTileFaceDown(tileToCompareTo);
        turnTileFaceDown(tileToBeCompared);
        clickedTilesContainer = [];
      },
      1000);
    }
  }

  function turnTileFaceDown(clickedTile)
  {
    clickedTile.divTile.classList.remove("flipped");
    clickedTile.innerTileContainerBack.innerHTML = "";
    clickedTile.tileState == TileState.FACE_DOWN;
    clickedTilesContainer.splice(clickedTile);
  }

  function removeTileFromGame()
  {

  }

  function noMoreThanTwoTilesFaceUp()
  {
    let faceUpCounter = 0;

    for (let i = 0; i < tileObjectsContainer.length; i++)
    {
      if(tileObjectsContainer[i].tileState == TileState.FACE_UP)
      {
        faceUpCounter++;
      }
    }

    return faceUpCounter;
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
