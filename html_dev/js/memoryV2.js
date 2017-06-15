(function()
{
  var tileNumberContainer = [];
  var tileObjectsContainer = [];
  var clickedTilesContainer = [];

  var contentContainer = document.getElementById("content-container");
  var numberOfTilesClicked = document.getElementById("numberOfTilesClicked");
  var userInputButton = document.getElementById("userInputButton");
  userInputButton.addEventListener('click', setAmountOfTiles, false);

  var countClicksOnTiles = 0;

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
    contentContainer.innerHTML = "";
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
          amountOfTimesClickedOnTile();

          if(clickedTilesContainer.length == 2)
          {
            compareTwoTiles();
          }
        }
      }
    }
  }

  function turnTileFaceUp(clickedTile)
  {
    clickedTile.divTile.classList.add("flipped");
    clickedTile.innerTileContainerBack.innerHTML = clickedTile.hiddenNumber;
    clickedTile.tileState = TileState.FACE_UP;
    clickedTilesContainer.push(clickedTile);
  }

  function turnTileFaceDown(clickedTile)
  {
    clickedTile.divTile.classList.remove("flipped");
    clickedTile.innerTileContainerBack.innerHTML = "";
    clickedTile.tileState = TileState.FACE_DOWN;
    clickedTilesContainer.splice(clickedTile);
  }

  function compareTwoTiles()
  {
    let tileToCompareTo = clickedTilesContainer[0];
    let tileToBeCompared = clickedTilesContainer[1];

    if(tileToCompareTo.hiddenNumber == tileToBeCompared.hiddenNumber)
    {
      setTimeout(function ()
      {
        removeTilesFromContainer(tileToCompareTo);
        removeTilesFromContainer(tileToBeCompared);
      },
      1000);
    }
    else
    {
      setTimeout(function ()
      {
        turnTileFaceDown(tileToCompareTo);
        turnTileFaceDown(tileToBeCompared);
      },
      1000);
    }
    clickedTilesContainer = [];
  }

  function removeTilesFromContainer(tileToBeRemoved)
  {
    removeTileFromGame(tileToBeRemoved);

    tileObjectsContainer = tileObjectsContainer.filter(function(tiles)
    {
      return tiles !== tileToBeRemoved;
    });
  }

  function removeTileFromGame(tileToBeRemoved)
  {
    let tileBack = tileToBeRemoved.innerTileContainerBack;
    let tileFront = tileToBeRemoved.innerTileContainerFront;

    tileToBeRemoved.divTile.classList.add("removed");

    setTimeout(function ()
    {
      tileFront.parentNode.removeChild(tileFront);
      tileBack.parentNode.removeChild(tileBack);
      userHasWon();
    }
    ,500);
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
          tileObjectsContainer[i].divTile.classList.add("scaled");
        }, randomIntFromInterval(10, 50) * i );
      })(i);
    };
  }

  function amountOfTimesClickedOnTile()
  {
    countClicksOnTiles++;
    numberOfTilesClicked.innerHTML = countClicksOnTiles;
  }

  function userHasWon()
  {
    if(tileObjectsContainer.length == 0)
    {
      let youWonDiv = document.createElement("div");
      youWonDiv.setAttribute("class", "youWonContainer");
      youWonDiv.innerHTML = "You won!";

      contentContainer.innerHTML = "";
      contentContainer.appendChild(youWonDiv);
    }
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
