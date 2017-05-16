import * as RODIN from 'rodin/core';
import { MainContainer } from './container/mainContainer.js';
import { VideoContainer } from './container/videoContainer.js';
RODIN.start();
let mainContainer = new MainContainer();
mainContainer.containers.push(new VideoContainer());

mainContainer.run();