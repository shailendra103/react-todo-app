/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function() {
    'use strict';
    var destination = document.querySelector("#container");
    var placeholder = document.createElement("li");
    placeholder.className = "placeholder";

    app.ALL_TODOS = 'all';
    app.ACTIVE_TODOS = 'active';
    app.COMPLETED_TODOS = 'completed';
    var TodoFooter = app.TodoFooter;


    var TodoList = React.createClass({

        getInitialState: function() {
            return {
                todo: [],
                inProgress: [],
                done: []
            };
        },

        addItem: function(e) {
            var itemArray = this.state.todo;

            itemArray.push({
                text: this._inputElement.value,
                key: Date.now()
            });

            this.setState({
                todo: itemArray
            });

            this._inputElement.value = "";
            this.updateCounts();


            e.preventDefault();
        },
        addInProgressItem: function(fromObj) {
            var itemArray = this.state.inProgress;

            itemArray.push(fromObj);

            this.setState({
                inProgress: itemArray
            });

            //this._inputElement.value = "";
            this.updateCounts();
            //document.getElementById("totalCount").innerHTML = itemArray.length;

            //e.preventDefault();
        },
        render: function() {
          return (
            <div className="todoListMain">
              <div className="header">
                <form onSubmit={this.addItem}>
                  <label>add project</label>
                    <input ref={(a) => this._inputElement = a}
                       placeholder="enter task">
                    </input>
                </form>
                <div>Total : <span id="totalCount" class='totalCount'>0</span></div>
              </div>

              <div className="columns left">
                <div className="taskColumns">
                  To Do
                  <div className="counterBox"><div id="todoCount" className='countText'>0</div><div>Projects</div></div>
                </div>
                <ul className="todo-column" onDragOver={this.dragOver}>
                  {this.state.todo.map(function(item) {
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
              <div className="columns left">
                <div className="taskColumns">
                  In Progress
                  <div className="counterBox"><div id="inProgressCount" className='countText'>0</div><div>Projects</div></div>
                </div>
                <ul className="inprogress-column" onDragOver={this.dragOver}>
                  {this.state.inProgress.map(function(item) {
                    return (
                      <li
                        data-id={item.key}
                        key={item.key}
                        draggable="true"
                        onDragEnd={this.dragEnd}
                        onDragStart={this.dragStart}
                      >inProgress
                        {item.text}
                      </li>
                    )
                  }, this)}
                </ul>
              </div>
              <div className="columns left">
                <div className="taskColumns">
                  Done
                  <div className="counterBox"><div id="doneCount" className='countText'>0</div><div>Projects</div></div>
                </div>
                <ul className="done-column" onDragOver={this.dragOver}>
                  {this.state.inProgress.map(function(item) {
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

            this.draggedTo = e.currentTarget;
            this.dragged.style.display = "block";
            console.log('after');
            console.log(this.dragged.parentNode);
            this.dragged.parentNode.removeChild(placeholder);
console.log(this.draggedTo.parentNode);
            // Update state
            var itemArray = this.state.todo;
            var fromKey = this.dragged.dataset.id;
            var toKey = this.over.dataset.id;
            var from, to;
            var fromObj;

            for (var i in itemArray) {
                if (itemArray[i].key == fromKey) {
                    from = i;
                    fromObj = itemArray[i];
                }

                if (itemArray[i].key == toKey) {
                    to = i;
                }
            }

            //Move to Inprogress
            if(1){
            itemArray.splice(from,1);
            var inProgressArray = this.state.inProgress;
            this.addInProgressItem(fromObj);
             //this.setState({ inProgress: inProgressArray });
            }
            console.log("from :" + from);
            console.log("to :" + to);

            if (from < to) to--;
            itemArray.splice(to, 0, itemArray.splice(from, 1)[0]);
            this.setState({ todo: itemArray });
        },
        dragOver: function(e) {
            e.preventDefault();
            this.dragged.style.display = "none";
            if (e.target.className == "placeholder") return;
            this.over = e.target;
            e.target.parentNode.insertBefore(placeholder, e.target);
        },
        updateCounts: function() {
          document.getElementById("totalCount").innerHTML = this.state.todo.length+this.state.inProgress.length+this.state.done.length;
          document.getElementById("todoCount").innerHTML = this.state.todo.length;
          document.getElementById("inProgressCount").innerHTML = this.state.inProgress.length;
          document.getElementById("doneCount").innerHTML = this.state.done.length;

        }
    });


    /*Render in Dom */

    ReactDOM.render( < div >
        < TodoList / >
        < /div>,
        destination
    );

})();
