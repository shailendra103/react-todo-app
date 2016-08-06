/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Router*/
var app = app || {};

(function () {
  'use strict';
  var destination = document.querySelector("#container");

  app.ALL_TODOS = 'all';
  app.ACTIVE_TODOS = 'active';
  app.COMPLETED_TODOS = 'completed';
  var TodoFooter = app.TodoFooter;

  // Renders ul and li items
  var TodoItems = React.createClass({
      render: function() {
        var todoEntries = this.props.entries;

        function createTasks(item) {
          return <li key={item.key}>{item.text}</li>
        }

        var listItems = todoEntries.map(createTasks);

        return (
          <ul className="theList">
            {listItems}
          </ul>
        );
      }
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
              <TodoItems entries={this.state.items}/>
            </div>
          );
        }
    });


    /*Render in Dom */

    ReactDOM.render(
      <div>
        <TodoList/>
      </div>,
      destination
  );

  })();