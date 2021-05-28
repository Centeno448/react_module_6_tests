import '@testing-library/jest-dom'
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import App from "./App";
import TareasLista from "./TareasLista"
import Tarea from './Tarea';
import {validate} from 'uuid'


beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test('App.js tiene 1 componente hijo TareasLista.js | Asegúrate de renderizar 1 vez el componente <TareasLista> dentro de App.js', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(TareasLista).length).toBe(1);
});

test('App.js tiene 1 <input type="text"> | Asegúrate de renderizar 1 vez un <input type="text" /> dentro de App.js', () => {
  const wrapper = shallow(<App />);
  const input = wrapper.find('input[type="text"]')
  expect(input).toBeDefined();
  expect(input.length).toBe(1);
});

test('App.js tiene 2 botones con texto | Asegúrate de renderizar 2 botones con texto dentro de App.js', () => {
  const wrapper = shallow(<App />);
  const buttons = wrapper.find('button')
  expect(buttons).toBeDefined();
  expect(buttons.length).toBe(2);
  expect(buttons.at(0).text().trim()).not.toBe("");
  expect(buttons.at(1).text().trim()).not.toBe("");
});


test('App.js tiene 1 div con texto | Asegúrate de renderizar 1 div con texto dentro de App.js', () => {
  const wrapper = shallow(<App />);
  const div = wrapper.find('div')
  expect(div).toBeDefined();
  expect(div.length).toBe(1);
  expect(div.first().text().trim()).not.toBe("");
});

test('App.js utiliza el hook useState | Asegúrate de utilizar el hook useState dentro de App.js', () => {
  const appDefinition = App.toString()

  expect(appDefinition).toContain('const [tareas, setTareas] = (0, _react.useState)([]);')
});

test('App.js manda el prop "tareas" a TareasLista | Asegúrate de que App.js mande el prop "tareas" al componente TareasLista', () => {
  const wrapper = shallow(<App />)
  const tareasLista = wrapper.find(TareasLista);
  expect(tareasLista.prop('tareas')).toBeDefined();
  expect(tareasLista.prop('tareas').length).toBe(0);
});

test('App maneja click en Añadir Tarea | Asegúrate de que en App.js el boton que de agregar tareas diga "Añadir Tarea" y maneje el evento onClick con una función llamada "agregarTarea" que reciba 1 parámetro', () => {
  const wrapper = shallow(<App />)
  const buttons = wrapper.find('button')
  const firstButton = buttons.at(0);
  const secondButton = buttons.at(1);

  let addButton = undefined;
  if(firstButton.text().includes("Añadir Tarea")){
    addButton = firstButton;
  }
  else if (secondButton.text().includes("Añadir Tarea")){
    addButton = secondButton
  }
  else{
    throw new Error('No existe el botón');
  }
  expect(addButton.prop('onClick')).toBeDefined()
  expect(addButton.prop('onClick').name).toBe('agregarTarea')
  expect(addButton.prop('onClick').length).toBe(1)
});


test('App utiliza ref | Asegúrate de que en App.js crees una ref llamada "tareaNombreRef" y le asignes a la propiedad ref del input', () => {
  const appDefinition = App.toString();
  const regex = /"input", {[\da-zA-Z:,"\s]+}/g
  const inputDefinition = appDefinition.match(regex)[0];

  if(!appDefinition.includes("const tareaNombreRef = (0, _react.useRef)();")){
    throw new Error('ref not implemented');
  }

  if(!inputDefinition.includes("ref: tareaNombreRef")){
    throw new Error('ref not in use on input');
  }
});

test('App agrega una nueva tarea | Asegúrate de que la función agregar tarea tome el valor de la referencia del input y llame a la función setTareas' ,() => {
  const wrapper = mount(<App />)
  const buttons = wrapper.find('button')

  const firstButton = buttons.at(0);
  const secondButton = buttons.at(1);
  let addButton = undefined;

  if(firstButton.text().includes("Añadir Tarea")){
    addButton = firstButton;
  }
  else if (secondButton.text().includes("Añadir Tarea")){
    addButton = secondButton
  }
  else{
    throw new Error('No existe el botón');
  }

  wrapper.find("input[type='text']").getDOMNode().value = "New item";
  addButton.simulate('click')
  expect(wrapper.find(Tarea).length).toBe(1)
  const firstTarea = wrapper.find(Tarea).first().prop('tarea')
  expect(validate(firstTarea.id)).toBe(true);
  expect(firstTarea.nombre).toBe("New item");
  expect(firstTarea.completado).toBe(false);

  wrapper.find("input[type='text']").getDOMNode().value = "New item 2";
  addButton.simulate('click')
  expect(wrapper.find(Tarea).length).toBe(2)
  const secondTarea = wrapper.find(Tarea).at(1).prop('tarea');
  expect(validate(secondTarea.id)).toBe(true);
  expect(secondTarea.nombre).toBe("New item 2");
  expect(secondTarea.completado).toBe(false);

  expect(firstTarea.id).not.toBe(secondTarea.id)
});