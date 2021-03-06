import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import MenuIcon from 'material-ui-icons/Menu';
import Categories from '../Categories';
import UsersMenu from '../Users/UsersMenu';
import './side-bar.css';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    background: '#1abcd4',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    background: '#000',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    position: 'absolute',
    zIndex: '10000000000',
    top: '5px',
    left: '0',
    color: '#fff',
  },
});

class SideBar extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;
    const drawer = (
      <div className="side-bar-scroll">
        <Hidden mdUp>
          <div className={classes.drawerHeader}>
            <IconButton
              className="draw-close-button"
              onClick={this.handleDrawerClose}
            >
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
                )}
            </IconButton>
          </div>
        </Hidden>
        <Hidden smDown>
          <div className={classes.drawerHeader} />
        </Hidden>
        <div className="logo">
          <Link to="/home">LOGO</Link>
        </div>
        <Divider />
        <Categories />
        <Divider />
        <List>
          <UsersMenu />
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={this.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SideBar);
