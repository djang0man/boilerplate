import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// routes
import { routeConfig, getTabIndex } from '@boilerplate/example-app/routing';

// actions
import * as APP from '@boilerplate/example-app/state/app/actions';

// selectors
import { selectCurrentTabIndex } from '@boilerplate/example-app/state/app/selectors';

// utils
import { buildAction, immerHistory } from '@boilerplate/shared/util';

const SimpleMenu = () => {
  const dispatch = useDispatch();

  const currentTabIndex = useSelector(selectCurrentTabIndex);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = path => {
    const selectedTabIndex = getTabIndex(path);
    if (currentTabIndex !== selectedTabIndex) {
      immerHistory.push(path);
      dispatch(
        buildAction(APP.UPDATE_SELECTED_TAB_INDEX, {
          selectedTabIndex,
        })
      );
    }
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        keepMounted
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {routeConfig.map((route, index) => (
          <MenuItem key={index} onClick={() => handleSelect(route.path)}>
            {route.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SimpleMenu;
