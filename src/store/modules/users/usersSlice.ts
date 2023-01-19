import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from '../..';
import { User } from '../typeStore';


// opcional - quando o identificador do dado for de nome id
const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.email,
});

export const { selectAll: buscarUsuarios, selectById: buscarUsuarioPorEmail } = usersAdapter.getSelectors<RootState>((state) => state.users);


const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    mensagem: '',
    loading: false,
  }),
  reducers: {
    adicionarNovoUsuario: usersAdapter.addOne,
    atualizarUsuario: usersAdapter.updateOne,
  },
});


export const { adicionarNovoUsuario, atualizarUsuario } = usersSlice.actions;

export const usersReducer = usersSlice.reducer