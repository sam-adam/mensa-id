import * as postApi from './posts';
import * as mediaApi from './media';
import * as authApi from './auth';

export default {
  ...postApi,
  ...mediaApi,
  ...authApi
}