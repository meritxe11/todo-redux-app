import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarTodos, toggle, toggleAll } from './todo.actions';

export const estadaInicial: Todo[] = [
  new Todo('Salvar el mon'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje Ironman'),
  new Todo('Robar escudo del capitán américa'),
];

const _todoReducer = createReducer(
  estadaInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    }); //regresa un nuevo arreglo, no lo modifica
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on( borrar, (state, { id }) => state.filter( todo => todo.id !== id) ),
  on( toggleAll, (state, { completado}) => state.map( todo => {
      return{
          ...todo,
          completado: completado
      }
  })),
  on( limpiarTodos, state => state.filter( todo => !todo.completado)),

);

export function todoReducer(state: any, action: any) {
  return _todoReducer(state, action);
}
