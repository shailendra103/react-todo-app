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

    var fromState;
    var toState;


    var TodoList = React.createClass({

        getInitialState: function() {
            var itemArray = [];
            var fromObj = {text:'dummy',key: Date.now()}
            itemArray.push(fromObj);

            return {
                todo: [],
                inProgress: itemArray,
                done: [],
                dragFrom: 'todo',
                dragTo: 'todo'
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
             //this.addInProgressTest();
        },
        addInProgressItem: function(fromObj) {
            var itemArray = this.state.inProgress;
            itemArray.push(fromObj);
            this.setState({
                inProgress: itemArray
            });

            this.updateCounts();

            //e.preventDefault();
        },
        addInProgressTest: function() {
            var itemArray = this.state.inProgress;
             var fromObj = {text:'kbc',key: Date.now()}
            itemArray.push(fromObj);
            this.setState({
                inProgress: itemArray
            });

            this.updateCounts();

            //e.preventDefault();
        },
        render: function() {

          return (
            <div className="todoListMain">
              <div className="header">
                <form onSubmit={this.addItem} className="projectForm">
                  <label>add project   </label>
                    <input ref={(a) => this._inputElement = a}
                       placeholder="enter prject">
                    </input>
                </form>
                <div id="totalCountBox" className="counterBox">
                  <div>Total</div>
                  <div><div id="totalCount" className='countText'>0</div><div>Projects</div></div>
                </div>
              </div>
              <div>
                  <div className="columns left column1">
                    <div className="taskColumns todo">
                      <span className='title'>To Do</span>
                      <div className="counterBox"><div id="todoCount" className='countText'>0</div><div>Projects</div></div>
                    </div>
                    <ul className="todo-column theList"  onDragOver={this.dragOver}>
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
                  <div className="columns left column2">
                    <div className="taskColumns inProgress">
                      <span className='title'>In Progress</span>
                      <div className="counterBox"><div id="inProgressCount" className='countText'>0</div><div>Projects</div></div>
                    </div>
                    <ul className="inprogress-column theList" onDragOver={this.inProgressdragOver}>
                      {this.state.inProgress.map(function(item) {
                        return (
                          <li
                            data-id={item.key}
                            key={item.key}
                            draggable="true"
                            onDragEnd={this.dragEndInProgress}
                            onDragStart={this.dragStart}
                          >
                            {item.text}
                          </li>
                        )
                      }, this)}
                    </ul>
                  </div>
                  <div className="columns left column3">
                    <div className="taskColumns done">
                      <span className='title'>Done</span>
                      <div className="counterBox"><div id="doneCount" className='countText'>0</div><div>Projects</div></div>
                    </div>
                    <ul className="done-column theList"  >
                      {this.state.done.map(function(item) {
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


            </div>
          );
        },
        dragStart: function(e) {

          console.log("dragStart");
            this.dragged = e.currentTarget;
            e.dataTransfer.effectAllowed = 'move';

            // Firefox requires calling dataTransfer.setData
            // for the drag to properly work
            e.dataTransfer.setData("text/html", e.currentTarget);
        },
        dragEnd: function(e) {
          console.log("dragEnd");
            this.draggedTo = e.currentTarget;
            this.dragged.style.display = "block";
            console.log('drag to :'+this.state.dragTo );

            console.log(e.target.parentNode);
            console.log(placeholder);
            try {
              this.dragged.parentNode.removeChild(placeholder);
            }
          catch(i) {
            console.log("Error Thrown: " + i);
        }

//console.log(this.draggedTo);
//this.state.dragTo = 'inprogress'

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

            console.log("from :" + from);
            console.log("to :" + to);

            //Move to Inprogress
            if(this.state.dragTo == 'inprogress') {
                itemArray.splice(from,1);
                var inProgressArray = this.state.inProgress;
                this.addInProgressItem(fromObj);
                this.setState({ inProgress: inProgressArray });
                //remove the empty node
                var node =  document.getElementsByClassName("inprogress-column");
                console.log(node);
                node[0].removeChild(placeholder);
             } else if (this.state.dragTo == this.state.dragFrom && this.state.dragTo=='todo'){
                if (from < to) to--;
                itemArray.splice(to, 0, itemArray.splice(from, 1)[0]);
                this.setState({ todo: itemArray });
             }



        },
        inProgressdragOver: function(e){
          console.log("inProgressdragOver");
          this.state.dragTo = 'inprogress';
          e.preventDefault();
          this.dragged.style.display = "none";
          if(e.target.className == "placeholder") return;
          this.over = e.target;
          // Inside the dragOver method
          var relY = e.clientY - this.over.offsetTop;
          var height = this.over.offsetHeight / 2;
          var parent = e.target.parentNode;

          if(relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
          }
          else if(relY < height) {
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
          }

        },
        dragEndInProgress: function(e) {
          console.log("dragEndInProgress");
          this.state.dragTo = 'inprogress'
          console.log(e.currentTarget);
            this.draggedTo = e.currentTarget;
            this.dragged.style.display = "block";
            console.log(e.target.parentNode);
            this.dragged.parentNode.removeChild(placeholder);

          }
        ,
        dragOver: function(e) {
          e.preventDefault();
          this.state.dragTo = 'todo';
          this.dragged.style.display = "none";
          if(e.target.className == "placeholder") return;
          this.over = e.target;
          // Inside the dragOver method
          var relY = e.clientY - this.over.offsetTop;
          var height = this.over.offsetHeight / 2;
          var parent = e.target.parentNode;

          if(relY > height) {
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
          }
          else if(relY < height) {
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
          }
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
