import React, { Component, Fragment } from 'react';
import Dialog, {
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import EditOrganisation from './EditOrganisation';
import './single-org.css';

class SingleOrganisation extends Component {
  state = {
    open: false,
    editIdx: -1,
  };

  editSelectedOrganisation = index =>
    this.setState({
      editIdx: index,
      open: true,
    });

  stopEditing = () => {
    this.setState({
      editIdx: -1,
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { org } = this.props;
    const index = 1;
    const { editIdx } = this.state;
    const currentlyEditing = editIdx === index;
    const uiMessage = 'Add';
    return currentlyEditing ? (
      <EditOrganisation
        editOrgData={org}
        stopEditing={this.stopEditing}
        show
      />
    ) : (
      <Fragment>
        <div className="org-detail-btn">
          <Button
            onClick={this.editSelectedOrganisation}
            variant="raised"
            size="small"
            className="btn detail-button"
          >
            <i className="material-icons">add</i>DETAILS
          </Button>
        </div>  
        <Dialog
          className="org-info"
          open={this.state.open}
          onClose={this.handleClose}
        >

          <div className="org-close-btn">
            <Button
              onClick={this.handleClose}
              className="btn close-button"
            >
              <i className="material-icons" variant="raised" size="small">close</i>
            </Button>
          </div> 

          <EditOrganisation
            getData={() => this.editSelectedOrganisation(index)}
          />
          {org.org_name.length > 0 ? <h1> {org.org_name} </h1>: <h1 className="not-available"> Add organisation name ... </h1>}
          <h6 className="details-area">
            <span className="location-name">Area</span>: <span className="area">{org.area? org.area : 'Add area ...'} </span> | {"  "} 
            <span className="location-name">Borough</span>: <span className="borough">{org.borough ? org.borough : 'Add borough ...' }</span>
          </h6>
          
          <div className="org-project">
            <h4>Project</h4> 
            {org.project ? <Fragment> <p className="service"> {org.project}</p>  </Fragment>
              :<p className="not-available">{uiMessage} project ...</p>}
          </div>
          <div className="org-service">
            <h4>Services</h4> 
            {org.service? <Fragment> <p className="service"> {org.service}</p></Fragment>: 
            <p className="not-available">{uiMessage} services ...</p>}
          </div>

          <div className="org-process">
            <div>
              <h4>Process</h4>
              {org.process ? <Fragment><p className="service">{org.process} </p> </Fragment> 
                :<p className="not-available">{uiMessage} process ...</p>}
            </div>
            <div>
              <h4>Days</h4> 
              {org.service_days? <Fragment><p>{org.service_days}</p></Fragment>
                  :<p className="not-available">{uiMessage} days ...</p>}
            </div>
          </div>

          <div className="org-contact">
            <div>
              <h4>Telephone</h4> 
              {org.telephone && org.telephone !== "undefined"? <Fragment><p>{org.telephone}</p></Fragment>
                  :<p className="not-available" disable>{uiMessage} telephone...</p>}
            </div>

            <div>
              <h4>Email</h4> 
              {org.email_address? <Fragment><p>{org.email_address}</p></Fragment>
                  :<p className="not-available">{uiMessage} email ...</p>}
            </div>
          </div>
          <div className="org-website">
            <h4>Website </h4> 
            {org.website ? <Fragment> <a className="website-link" target="blank" href={`${org.website}`}>{org.website}</a></Fragment>
                : <p className="not-available"> {uiMessage} website... </p>}
          </div>
          <div className="org-service">
            <h4>Tags</h4> 
            {org.tag ?   <Fragment><p className="tag service"> <img src="https://png.icons8.com/material/15/666666/tag-window.png" alt="tag" /> {org.tag}</p></Fragment>
              : <p className="not-available">  {uiMessage} tags... </p>}
          </div>
        </Dialog>
      </Fragment>
    );
  }
}



export default withMobileDialog()(SingleOrganisation);
