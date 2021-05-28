import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Tarea from "./Tarea"


beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test('Tarea tiene 1 <div> | Asegurate de que tengas 1 <div> sin contenido dentro de Tarea.js', () => {
  const wrapper = shallow(<Tarea tarea={""}/>);
  const div = wrapper.find("div");
  expect(div.length).toBe(1)
  expect(div.text().trim()).toBe("")
});