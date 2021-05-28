import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import TareasLista from "./TareasLista"
import Tarea from "./Tarea"


beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test('TareasLista manda el prop "tarea" a Tarea | asegurate de que TareasLista mande un prop "tarea" al componenete Tarea', () => {
  const wrapper = shallow(<TareasLista tareas={[""]}/>);
  expect(wrapper.find(Tarea).prop('tarea')).toBeDefined()
});

test('TareasLista manda el prop "key" a Tarea | asegurate de que TareasLista mande un prop "key" al componenete Tarea', () => {
  if(TareasLista.toString().includes(", void 0,")){
    throw new Error('key not set')
  }
});

test('TareasLista renderiza componentes Tarea en base a prop "tareas" | asegurate de que TareasLista reciba un prop "tareas" de tipo array y renderice un componenete Tarea por cada elemento presente', () => {
  const wrapper = shallow(<TareasLista tareas={["", "", ""]}/>);
  expect(wrapper.find(Tarea).length).toBe(3);
});