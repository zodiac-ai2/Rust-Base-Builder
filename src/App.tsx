import Toolbar from "./components/script/Toolbar.tsx";
import Presets from "./components/script/Presets.tsx";
import Version from "./components/script/Version.tsx";
import CameraType from "./components/script/CameraSwitch.tsx";
import BuildCalculator from "./components/script/BuildCalculator.tsx";
import RaidCalculator from "./components/script/RaidCalculator.tsx";
import CanvasContainer from "./components/script/CanvasContainer.tsx";
import ObjectList from "./components/script/ObjectList.tsx";
import ControlsInput from "./components/script/ModelControlsMouseInput.tsx";
import Hints from "./components/script/Hints.tsx";
import Settings from "./components/script/Settings.tsx";
import StructureVisibilityMode from "./components/script/StructureVisibilityMode.tsx";
import Github from "./components/script/Github.tsx";

import "./components/styles/global.css";
import "./components/styles/toolbar.css";
import "./components/styles/presets.css";
import "./components/styles/version.css";
import "./components/styles/camera_switch.css";
import "./components/styles/canvas_container.css";
import "./components/styles/resource_calculator.css";
import "./components/styles/object_list.css";
import "./components/styles/controls_input.css";
import "./components/styles/hints.css";
import "./components/styles/settings.css";
import "./components/styles/structure_visibility_mode.css";
import "./components/styles/github.css";

import { RootState } from "./Store";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

function App() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  const enable_hints = useSelector((state: RootState) => state.pageSettings.enable_hints);
  const enable_presets = useSelector((state: RootState) => state.pageSettings.enable_presets);
  const enable_cameras = useSelector((state: RootState) => state.pageSettings.enable_cameras);
  const enable_structures_visibility = useSelector((state: RootState) => state.pageSettings.enable_structures_visibility); //prettier-ignore
  const enable_resource_container = useSelector((state: RootState) => state.pageSettings.enable_resource_container);
  const model_transform_controls = useSelector((state: RootState) => state.pageSettings.enable_model_transform_controls); //prettier-ignore

  const map = useMemo<KeyboardControlsEntry[]>(() => [], []);

  return (
    <>
      <KeyboardControls map={map}>
        {model_transform_controls && <ControlsInput />}
        <Toolbar />
        {enable_presets && <Presets />}
        <Version />
        {enable_cameras && <CameraType />}
        {enable_resource_container && page_mode === "edit" && <BuildCalculator />}
        {page_mode === "raid" && <RaidCalculator />}
        <CanvasContainer />
        <ObjectList />
        {enable_hints && <Hints />}
        <Settings />
        {enable_structures_visibility && <StructureVisibilityMode />}
        <Github />
      </KeyboardControls>
    </>
  );
}

export default App;

// object copy: "C"
// different "save files / base plans"
// add object list filters (walls / foundations / stairs / roofs / miscs )
// move every canvas item configs (position, rotation ...) to separate file
// add custom rotation angle and distance unit to transform the object
// prebuild base setups selector
// add 1st person walking in overview and raid mode
// add new keyboard controls diescription - 2d camera (moving the objects) + creation mode
// base share as a link
// creating an object > WASD (offset by 0.125 on every click) -> model placed + offset reset for future models

// errors
// -

// if performance issue = canvas lighting + postprocessing + click events

// verify that every building costs the same as in game (wiki data) ( possible error in roofs and foundations)
// fix the camera NSEW position, it is incorrectly calculated
// fix: wsad object transform > mouse click up transform > wsad transform = double axis transform
// merge the CurrentTimestamp variable
// lower the execution rate of adding the models while symmetry is active (id overwrite)
// remove selected -> remove clicked object when active
// delete an object with DEL | BACKSPACE => unable to delete all models

// react three fiber - pointer lock controls (first person camera control) + fps octree
