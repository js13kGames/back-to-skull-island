const initLevel3 = () => {
  const loop = () => {
    const state = getState();
    render(
      mapData,
      state.kong,
      state.trex
    ).then(() => isUpdated() && loop());
  };

  // init
  const {
    mapData,
    kong,
    trex,
    actions,
    directions
  } = initLevel3Model(50, 25, 35);

  const {
    getState,
    isUpdated,
    setState: modelSetState
  } = initState();
  const setState = val => modelSetState(val) && loop();

  function move (direction) {
    setState((state) => {
      if (state.kong.currentAction === actions.DISABLED) {
        return state;
      }
      let proposedLocation = state.kong.location;
      let newDirection;
      switch (direction) {
        case 'left':
          proposedLocation--;
          newDirection = directions.LEFT;
          break;
        case 'right':
          proposedLocation++;
          newDirection = directions.RIGHT;
          break;
      }
      if (
        proposedLocation >= mapData.width
        || proposedLocation < 0
        || proposedLocation === state.trex.location
      ) proposedLocation = state.kong.location; // reset to current state
      // is location under attack
      return {
        ...state,
        kong: {
          ...state.kong,
          direction: newDirection,
          location: proposedLocation
        }
      }
    })
  }

  function keydownHandler (key) {
    switch (key) {
      case 37:
        // left
        move('left');
        break;
      case 39:
        // right
        move('right');
        break;
      case 40:
        // down
        block();
        break;
      default:
        return;
    }
  }

  const {
    cleanUp,
    render
  } = initLevel3View(keydownHandler, actions, directions);
  setState({ kong, trex });
};
