import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import Tarea from "./Tarea"

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

const tarea = {id: "caced729-15c2-45ad-aa26-58c05283a4cc", nombre: "Nueva", completado: false}

test('Tarea despliega el nombre de la tarea dentro de un label | Asegúrate de que Tarea tenga un label dentro del div y que este label tenga un checkbox con checked={tarea.completado} y depliegue en tarea.nombre', () => {
  const wrapper = shallow(<Tarea tarea={tarea}/>);
  const div = wrapper.find("div");
  const label = div.find("label");
  const checkbox = label.find('input[type="checkbox"]')
  expect(label.length).toBe(1)
  expect(label.text().trim()).toBe(tarea.nombre)
  expect(checkbox.length).toBe(1)
  expect(checkbox.prop('checked')).toBe(tarea.completado)
});