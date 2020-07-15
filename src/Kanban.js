import React from "react";
import "./Kanban.css";
import Popup from "./components/Popup/Popup";
class Kanban extends React.Component {
  state = {
    tasks: [
      { tid: 1, name: "codding", category: "start", bgcolor: "white" },
      { tid: 2, name: "testing", category: "inprogress", bgcolor: "white" },
      { tid: 3, name: "deployment", category: "complete", bgcolor: "white" },
    ],
    showAddForm: false,
    tempId: 0,
    category: "",
  };

  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter((task) => {
      if (task.tid == id) {
        task.category = cat;
        task.bgcolor = "white";
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  deleteTask = (ev, id) => {
    const itemes = this.state.tasks; // array act like object and we get pointe
    itemes.splice(id, 1);
    this.setState({ tasks: itemes });
  };

  togglePopup(cat) {
    this.setState({
      showAddForm: !this.state.showAddForm,
      category: cat,
    });
  }

  saveTask = (data) => {
    let index = 1;
    if (this.state.tasks.length > 0) {
      index = this.state.tasks[this.state.tasks.length - 1].tid + 1;
    }
    let tasks = {
      tid: index,
      name: data.name,
      category: data.category,
      bgcolor: "white",
    };

    const tasklIst = this.state.tasks;
    tasklIst.push(tasks);

    this.setState({
      task: tasklIst,
      showAddForm: !this.state.showAddForm,
    });
  };
  componentDidMount() {}
  render() {
    var tasks = {
      start: [],
      inprogress: [],
      complete: [],
    };

    this.state.tasks.forEach((t, index) => {
      tasks[t.category].push(
        <div
          key={t.tid}
          onDragStart={(e) => this.onDragStart(e, t.tid)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor, border: "1px solid black" }}
        >
          <div className="draginner">
            <div>
              <button onClick={(e) => this.deleteTask(e, index)}>X</button>
            </div>
            <div>
              <p> {t.name.toUpperCase()} </p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="container-drag">
        <div className="container">
          {this.state.showAddForm ? (
            <Popup
              text="Close Me"
              category={this.state.category}
              saveTask={this.saveTask}
              closePopup={this.togglePopup.bind(this)}
            />
          ) : null}
          <h2 className="header">Sample Application</h2>
          <table>
            <tr>
              <td>
                <div
                  className="wip"
                  onDragOver={(e) => this.onDragOver(e)}
                  onDrop={(e) => {
                    this.onDrop(e, "start");
                  }}
                >
                  <span className="task-header">To Do</span>
                  {tasks.start}
                  <button
                    className="addBtn"
                    onClick={this.togglePopup.bind(this, "start")}
                  >
                    + Add a card
                  </button>
                </div>
              </td>
              <td>
                <div
                  className="progress"
                  onDragOver={(e) => this.onDragOver(e)}
                  onDrop={(e) => this.onDrop(e, "inprogress")}
                >
                  <span className="task-header">In Progress</span>
                  {tasks.inprogress}
                  <button
                    className="addBtn"
                    onClick={this.togglePopup.bind(this, "inprogress")}
                  >
                    + Add a card
                  </button>
                </div>
              </td>
              <td>
                <div
                  className="droppable"
                  onDragOver={(e) => this.onDragOver(e)}
                  onDrop={(e) => this.onDrop(e, "complete")}
                >
                  <span className="task-header">Done</span>
                  {tasks.complete}
                  <button
                    className="addBtn"
                    onClick={this.togglePopup.bind(this, "complete")}
                  >
                    + Add a card
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Kanban;
