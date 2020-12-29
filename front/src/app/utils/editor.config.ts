import {environment} from '../../environments/environment';

export default {
  editable: true,
  spellcheck: true,
  height: '200px',
  minHeight: '350',
  width: 'auto',
  minWidth: '0',
  placeholder: '',
  uploadUrl: environment.baseUrl + '/app/filesEditor',
};
