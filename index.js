import { renderComments } from './modules/renderComments.js'
import {initAddComment} from './modules/initListeners.js'


renderComments()
initAddComment(renderComments)
