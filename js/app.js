/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
  'use strict';
  var destination = document.querySelector("#container");
  var placeholder = document.createElement("li");
  placeholder.className = "placeholder";

  app.ALL_TODOS = 'all';
  app.ACTIVE_TODOS = 'active';
  app.COMPLETED_TODOS = 'completed';
  var TodoFooter = app.TodoFooter;

  // Renders ul and li items
  var TodoItems = React.createClass({
      render: function() {
        var todoEntries = this.props.entries;
//console.log(todoEntries);
/*
        function createTasks(item) {
          return <li data-id={item.key} key={item.key} draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}>{item.text}</li>
        }

        var listItems = todoEntries.map(createTasks);

        return (
          <ul className="theList">
            {listItems}
          </ul>
        );
*/
      return <ul onDragOver={this.dragOver}>
      {todoEntries.map(function(item) {
        return (
          <li
            data-id={item.key}
            key={item.key}
            draggable="true"
            onDragEnd={this.dragEnd}
            onDragStart={this.dragStart}
          >
            {item.text}
          </li>
        )
      }, this)}
    </ul>

      },
  dragStart: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    // Update state
    var itemArray = this.props.entries;;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    itemArray.splice(to, 0, itemArray.splice(from, 1)[0]);
    //this.setState({items: itemArray});
  },
  dragOver: function(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  },
    });


  var TodoList = React.createClass({

      getInitialState: function() {
        return {
          items: []
        };
      },

      addItem: function(e) {
        var itemArray = this.state.items;

          itemArray.push(
            {
              text: this._inputElement.value,
              key: Date.now()
            }
          );

          this.setState({
            items: itemArray
          });

          this._inputElement.value = "";

          e.preventDefault();
      },
      render: function() {
       // var todoEntries = {this.state.items};
          return (
            <div className="todoListMain">
              <div className="header">
                <form onSubmit={this.addItem}>
                  <label>add project</label>
                    <input ref={(a) => this._inputElement = a}
                       placeholder="enter task">
                    </input>
                </form>
                <div>Total : 10</div>
              </div>
              <ul onDragOver={this.dragOver}>
                {this.state.items.map(function(item) {
                  return (
                    <li
                      data-id={item.key}
                      key={item.key}
                      draggable="true"
                      onDragEnd={this.dragEnd}
                      onDragStart={this.dragStart}
                    >
                      {item.text}
                    </li>
                  )
                }, this)}
              </ul>
            </div>
          );
        },
  dragStart: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd: function(e) {

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    // Update state
    var itemArray = this.state.items;
    console.log (this.state.items);
  //count the length using li
    // console.log(this.dragged);
    var fromKey = this.dragged.dataset.id;
    var toKey = this.over.dataset.id;
    var from, to;

            for (var i in itemArray) {

console.log("index: "+i);
console.log(itemArray[i].key);

if (itemArray[i].key == fromKey){
  from = i;
}

if (itemArray[i].key == toKey){
  to = i;
}


        }

    console.log("from :"+from);
    console.log("to :"+to);
    // var from = Number(this.dragged.dataset.id);
    // var to = Number(this.over.dataset.id);
    if(from < to) to--;
    // itemArray.splice(to, 0, itemArray.splice(from, 1)[0]);

    //      var from = 2;
    // var to =1;
    //  if(from < to) to--;
     itemArray.splice(to, 0, itemArray.splice(from, 1)[0]);

    this.setState({items: itemArray});
  },
  dragOver: function(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  },
    });


    /*Render in Dom */

    ReactDOM.render(
      <div>
        <TodoList/>
      </div>,
      destination
  );

  })();