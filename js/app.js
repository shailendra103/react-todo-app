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
                //items: [],
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
            document.getElementById("totalCount").innerHTML = itemArray.length;

            e.preventDefault();
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

              <div className="columns left">To Do
                <ul onDragOver={this.dragOver}>
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
              <div className="columns left">In Progress
                <ul onDragOver={this.dragOver}>
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
              <div className="columns left">Done
                <ul onDragOver={this.dragOver}>
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

            this.dragged.style.display = "block";
            this.dragged.parentNode.removeChild(placeholder);

            // Update state
            var itemArray = this.state.todo;
            var fromKey = this.dragged.dataset.id;
            var toKey = this.over.dataset.id;
            var from, to;

            for (var i in itemArray) {
                if (itemArray[i].key == fromKey) {
                    from = i;
                }

                if (itemArray[i].key == toKey) {
                    to = i;
                }
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
    });


    /*Render in Dom */

    ReactDOM.render( < div >
        < TodoList / >
        < /div>,
        destination
    );

})();
