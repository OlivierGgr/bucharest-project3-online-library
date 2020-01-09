import React from "react";

import "./CardComponent.scss";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CompletedComp from '../../Components/CompletedCourseModal/CompletedCourseModal';

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerColor: "#FA5457",
      disabled: true,
      isCompleted: false,
      buttonValue: 'NOT COMPLETED', 
      admin: false,
      openModal: false
    };
  }

  handleButtonCourseLink = () => {
    this.setState({ 
      isCompleted: true,
      disabled: false
    })
  }

  handleCompletedButton = () => {
    if(this.state.buttonValue === 'NOT COMPLETED') {
      this.setState({
        buttonValue: 'COMPLETED',
        openModal: true
      })
    }
  }

  render() {
    return (
        <div className='cardContainer'>
          <div
            className="headerCard"
            style={{ backgroundColor: this.props.headerColor }}
          >
  <span className="chapterTitle">{this.props.chapterCard}</span>
            <IconButton aria-label="delete" className='deleteButton'>
              <DeleteIcon className='deleteIcon' style={this.props.admin ? {} : { display: 'none' }}/>
            </IconButton>
          </div>
          <div className="cardInfoWrapper">
            <p className="titleCcard">Titlu</p>
    <p className="textCard">{this.props.textCard}</p>
    <p className="keywordsCard">{this.props.keywordsCard}</p>
    <p className="dateAdded">Adaugat: {this.props.date}</p>
            <div className="buttonContainer">
              <Button
                color="inherit"
                className='courseLinkButton'
                onClick={this.handleButtonCourseLink}
              >
                Course Link
              </Button>
              <Button
                color="inherit"
                className='completedButton'
                onClick={this.handleCompletedButton}
                disabled={this.state.disabled}
              >
                {this.state.buttonValue}
              </Button>
            </div>
          </div>
          <CompletedComp OpenModal={this.state.openModal}/>
        </div>
    );
  }
}

export default CardComponent;