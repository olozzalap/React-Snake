(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(17)},,,,,,function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var o,s=a(0),n=a.n(s),r=a(2),i=a.n(r),d=(a(14),a(3)),c=a(4),u=a(6),l=a(5),h=a(7),f=(a(15),a(16),function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={boardX:10,boardY:10,snakeSquares:[{x:5,y:5},{x:4,y:5}],foodSquare:{x:7,y:4},direction:"up"},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.startGame(),document.addEventListener("keydown",function(t){console.warn(t.keyCode);var a=e.state.direction;"38"==t.keyCode&&"down"!==e.state.direction?a="up":"40"==t.keyCode&&"up"!==e.state.direction?a="down":"37"==t.keyCode&&"right"!==e.state.direction?a="left":"39"==t.keyCode&&"left"!==e.state.direction&&(a="right"),e.setState({direction:a},function(){console.warn(e.state.direction)})})}},{key:"startGame",value:function(){var e=this;o=setInterval(function(){e.advanceSnake()},1e3)}},{key:"endGame",value:function(){console.warn(o),clearInterval(o)}},{key:"parseBoard",value:function(){for(var e=[],t=this.state.boardY-1;t>=0;t--)for(var a=0;a<this.state.boardX;a++)e.push(this.parseSquareOccupied(a,t));return e}},{key:"parseSquareOccupied",value:function(e,t){var a=this.state.snakeSquares.find(function(a){return a.x===e&&a.y===t}),o={width:100/this.state.boardX+"%",height:100/this.state.boardY+"%"};return a?n.a.createElement("div",{className:"square filled",style:o},e,", ",t):e===this.state.foodSquare.x&&t===this.state.foodSquare.y?n.a.createElement("div",{className:"square food",style:o},e,", ",t):n.a.createElement("div",{className:"square",style:o},e,", ",t)}},{key:"advanceSnake",value:function(){var e={x:this.state.snakeSquares[0].x,y:this.state.snakeSquares[0].y};if("up"===this.state.direction?e.y++:"down"===this.state.direction?e.y--:"left"===this.state.direction?e.x--:"right"===this.state.direction&&e.x++,console.warn(this.state.snakeSquares,e),this.state.snakeSquares.find(function(t){return t.x===e.x&&t.y===e.y}))console.error("you lose, collidede with yourself :0"),this.endGame();else if(e.x<0)console.error("you lose, went over the left edge of the board"),this.endGame();else if(e.y<0)console.error("you lose, went over the bottom edge of the board"),this.endGame();else if(e.x>=this.state.boardX)console.error("you lose, went over the right edge of the board"),this.endGame();else if(e.y>=this.state.boardY)console.error("you lose, went over the top edge of the board"),this.endGame();else{var t=this.state.snakeSquares.slice();t.unshift(e),e.y===this.state.foodSquare.y&&e.x===this.state.foodSquare.x?(console.warn("gratz you got zee food"),this.setState({foodSquare:{x:Math.floor(Math.random()*this.state.boardX),y:Math.floor(Math.random()*this.state.boardY)},snakeSquares:t})):(t.pop(),console.warn(t),this.setState({snakeSquares:t}))}}},{key:"render",value:function(){return n.a.createElement("div",{className:"board"},this.parseBoard())}}]),t}(n.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(n.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[8,1,2]]]);
//# sourceMappingURL=main.66de3cb7.chunk.js.map