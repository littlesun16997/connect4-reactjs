var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function Circle(props) {
  var color = "gray";
  if (props.cell == 1) {
    color = "black";
  } else
  if (props.cell == 2) {
    color = "red";
  }

  var style = {
    backgroundColor: color,
    border: "1px solid black",
    borderRadius: "100%",
    paddingTop: "98%" };


  return (
    React.createElement("div", { style: style }));

}

function Cell(props) {
  var style = {
    height: 50,
    width: 50,
    backgroundColor: "white" };


  return (
    React.createElement("div", { style: style, onClick: function onClick() {return props.handleClick(props.row, props.col);} },
      React.createElement(Circle, { cell: props.cell })));


}

function Row(props) {
  var style = {
    display: "flex",
    justifyContent: 'center' };

  var cells = [];

  for (var i = 0; i < 7; i++) {
    cells.push(React.createElement(Cell, { key: i, cell: props.cells[i], row: props.row, col: i, handleClick: props.handleClick }));
  }

  return (
    React.createElement("div", { style: style }, cells));

}

function Board(props) {
  var rows = [];

  for (var i = 5; i >= 0; i--) {
    rows.push(React.createElement(Row, { key: i, row: i, cells: props.cells[i], handleClick: props.handleClick }));
  }

  return (
    React.createElement("div", null, rows));

}var

Game = function (_React$Component) {_inherits(Game, _React$Component);
  function Game(props) {_classCallCheck(this, Game);var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this,
    props));
    var cells = [];

    for (var i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0));
    }

    _this.state = { player: false, cells: cells, winner: 0 };
    _this.handleClick = _this.handleClick.bind(_this);return _this;
  }_createClass(Game, [{ key: "handleClick", value: function handleClick(

    row, col) {var _this2 = this;
      console.log("row: " + row + " | col: " + col);
      console.log(this.state.cells);
      var temp = [];

      for (var i = 0; i < 6; i++) {
        temp.push(this.state.cells[i].slice());
      }
      var newRow = this.findAvailableRow(col);
      temp[newRow][col] = this.state.player ? 1 : 2;
      this.setState({ cells: temp, player: !this.state.player }, function () {
        if (_this2.state.winner)
        return;

        if (_this2.checkVictory(newRow, col) > 0) {
          console.log("win");
          _this2.setState({ winner: _this2.state.player ? 2 : 1 });
        }
      });
    } }, { key: "findAvailableRow", value: function findAvailableRow(

    col) {
      for (var i = 0; i < 6; i++) {
        if (this.state.cells[i][col] == 0) {
          return i;
        }
      }
      return -1;
    } }, { key: "checkDiagonal", value: function checkDiagonal(

    row, col) {
      //find right and left tops
      var c = this.state.cells;
      var val = this.state.player ? 2 : 1;
      var rR = row;
      var cR = col;

      while (rR < 5 && cR < 6) {
        rR++;
        cR++;
      }

      while (rR >= 3 && cR >= 3) {
        if (c[rR][cR] == val && c[rR - 1][cR - 1] == val && c[rR - 2][cR - 2] == val && c[rR - 3][cR - 3] == val) {
          return 1;
        }
        rR--;
        cR--;
      }

      var rL = row;
      var cL = col;

      while (rL < 5 && cL > 0) {
        rL++;
        cL--;
      }

      while (rL >= 3 && cL <= 3) {
        if (c[rL][cL] == val && c[rL - 1][cL + 1] == val && c[rL - 2][cL + 2] == val && c[rL - 3][cL + 3] == val) {
          return 1;
        }
        rL--;
        cL++;
      }
      return 0;
    } }, { key: "checkHorizontal", value: function checkHorizontal(

    row, col) {
      var c = this.state.cells;
      var i = 6;
      var val = this.state.player ? 2 : 1;

      while (i >= 3) {
        if (c[row][i] == val && c[row][i - 1] == val && c[row][i - 2] == val && c[row][i - 3] == val) {
          return 1;
        }
        i--;
      }
      return 0;
    } }, { key: "checkVertical", value: function checkVertical(

    row, col) {
      var c = this.state.cells;
      var i = row;
      var val = this.state.player ? 2 : 1;

      if (i >= 3) {
        if (c[i][col] == val && c[i - 1][col] == val && c[i - 2][col] == val && c[i - 3][col] == val) {
          return 1;
        }
      }
      return 0;
    } }, { key: "checkVictory", value: function checkVictory(

    row, col) {
      return this.checkVertical(row, col) || this.checkHorizontal(row, col) || this.checkDiagonal(row, col);
    } }, { key: "restart", value: function restart()

    {
      var cells = [];

      for (var i = 0; i < 6; i++) {
        cells.push(new Array(7).fill(0));
      }
      this.setState({ player: false, cells: cells, winner: 0 });
    } }, { key: "render", value: function render()

    {var _this3 = this;
      return (
        React.createElement("div", null,
          React.createElement("h1", { style: { display: 'flex', justifyContent: 'center' } }, this.state.winner > 0 ? this.state.winner == 1 ? "Black Wins" : "Red Wins" : this.state.player ? "Blacks Turn" : "Reds Turn", " "),
          React.createElement(Board, { cells: this.state.cells, handleClick: this.handleClick }),
          React.createElement("br", null), React.createElement("center", null, React.createElement("button", { onClick: function onClick() {return _this3.restart();} }, "Restart"))));


    } }]);return Game;}(React.Component);


ReactDOM.render(
React.createElement(Game, null),
document.getElementById('root'));