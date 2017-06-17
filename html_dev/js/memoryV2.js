(function()
{
  var tileNumberContainer = [];
  var tileObjectsContainer = [];
  var clickedTilesContainer = [];

  var contentContainer = document.getElementById("content-container");
  var numberOfTilesClicked = document.getElementById("numberOfTilesClicked");
  var userInputButton = document.getElementById("userInputButton");
  userInputButton.addEventListener('click', initializeGame, false);

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

      this.divTile.addEventListener('click', userHandleClickEvent, false);
    }

    turnTileFaceUp()
    {
      this.divTile.classList.add("flipped");
      this.innerTileContainerBack.innerHTML = this.hiddenNumber;
      this.tileState = TileState.FACE_UP;
      clickedTilesContainer.push(this);
    }

    turnTileFaceDown()
    {
      this.divTile.classList.remove("flipped");
      this.innerTileContainerBack.innerHTML = "";
      this.tileState = TileState.FACE_DOWN;
      clickedTilesContainer.splice(this);
    }

    scaleInTile()
    {
      this.divTile.classList.add("scaled");
    }

  }

  function initializeGame()
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
    assignNumberToTiles();
    scaleInSpawnedTiles();
  }

  function assignNumberToTiles()
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

  function userHandleClickEvent(event)
  {
    let e = event.currentTarget;
    let targetId = e.id || e.srcElement.id;
    let targetClass = e.className || e.srcElement.className;

    if(targetClass.indexOf("tile-container") >= 0)
    {
      gameLogic(targetId);
    }
  }

  function gameLogic(clickedTileId)
  {
    if(clickedTilesContainer.length <= 1)
    {
      for (let i = 0; i < tileObjectsContainer.length; i++)
      {
        if(clickedTileId === tileObjectsContainer[i].divTile.id && tileObjectsContainer[i].tileState == TileState.FACE_DOWN)
        {
          tileObjectsContainer[i].turnTileFaceUp();
          amountOfTimesClickedOnTile();

          if(clickedTilesContainer.length == 2)
          {
            compareTwoTilesAndDoAnimation();
          }
        }
      }
    }
  }

  function compareTwoTilesAndDoAnimation()
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
        tileToCompareTo.turnTileFaceDown();
        tileToBeCompared.turnTileFaceDown();
      },
      1000);
    }

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

      if(tileObjectsContainer.length == 0)
      {
        userHasWon();
      }

    }
    ,500);
  }

  function scaleInSpawnedTiles()
  {
    for (let i = 0; i < tileObjectsContainer.length; i++)
    {
      (function (i)
      {
        setTimeout(function ()
        {
          tileObjectsContainer[i].scaleInTile();
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
    let youWonDiv = document.createElement("div");
    youWonDiv.setAttribute("class", "youWonContainer");
    youWonDiv.innerHTML = "You won!";

    contentContainer.innerHTML = "";
    contentContainer.appendChild(youWonDiv);
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
