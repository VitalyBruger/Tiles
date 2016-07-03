 var tilesCount = 6;

 var bgColor = "#fff";
 var firstClick = -1;
 var secondClick = -1;
 var canClick = true;

 var openTiles = tilesCount;

 var Tile = React.createClass({
   render: function() {
     return (
       <div className='tile'  
      id = {this.props.id} 
      style={{backgroundColor: this.props.tileBackgroundColor, visibility:this.props.tileVisibility}}>
        </div>
     );
   }
 });

 var Tiles = React.createClass({
   init: function() {
     var tiles = [];
     var tmp = [];

     for (var i = 0; i < tilesCount; i++) {
       tmp[i] = i;
       tiles[i] = {
         tileBackgroundColor: bgColor,
         tileVisibility: 'visible',
       };
     }

     var emptyTiles = tilesCount;
     for (i = 0; i < tilesCount / 2; i++) {

       var newColor = getRandomColor();
       var next = getRandomInt(0, emptyTiles);
       tiles[tmp[next]].color = newColor;
       emptyTiles--;
       tmp[next] = tmp[emptyTiles];

       next = getRandomInt(0, emptyTiles);
       tiles[tmp[next]].color = newColor;
       emptyTiles--;
       tmp[next] = tmp[emptyTiles];
     }

     return tiles;
   },

   getInitialState: function() {
     return {
       tilesState: this.init()
     };
   },

   tileClcik: function(e) {
     var st = this;
     if (!canClick) return;
     var newState = this.state.tilesState.slice();
     canClick = false;

     if (firstClick < 0) {
       firstClick = e.target.id;
       newState[e.target.id].tileBackgroundColor = newState[e.target.id].color;
       this.replaceState({
         tilesState: newState
       });
       canClick = true;
     } else {
       if (e.target.id == firstClick) {
         canClick = true;
         return;
       }
       secondClick = e.target.id;
       newState[e.target.id].tileBackgroundColor = newState[e.target.id].color;
       this.replaceState({
         tilesState: newState
       });
       if (newState[firstClick].color == newState[secondClick].color) {
         setTimeout(function() {
           newState[firstClick].tileVisibility = "hidden";
           newState[secondClick].tileVisibility = "hidden";
           st.replaceState({
             tilesState: newState
           });
           firstClick = -1;
           secondClick = -1;
           openTiles -= 2;
           canClick = true;
           if (openTiles == 0) {
             openTiles = tilesCount
             st.replaceState({
               tilesState: st.init()
             });
           }
         }, 1000)
       } else {
         setTimeout(function() {
           newState[firstClick].tileBackgroundColor = bgColor;
           newState[secondClick].tileBackgroundColor = bgColor;
           st.replaceState({
             tilesState: newState
           });
           firstClick = -1;
           secondClick = -1;
           canClick = true;
         }, 1000)
       }
     }
   },

   render: function() {
     return (
       <div onClick={this.tileClcik}>                        
                            {
                               this.state.tilesState.map(function(el,i) {
                  
                                    return <Tile                    
                    key = {i}
                    id = {i}
                    tileVisibility = {el.tileVisibility}
                                        tileBackgroundColor = {el.tileBackgroundColor}
                                    />;
                               })
                            }                        
                    </div>
     );
   }
 });


 ReactDOM.render(
   <Tiles />,
   document.getElementById('board')
 );


 function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
 }

 function getRandomColor() {
   var letters = '0123456789ABCDEF'.split('');
   var color = '#';
   for (var i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
 }