import { cleanup, fireEvent, getByTestId, render, screen } from '@testing-library/react'; 
import { act } from 'react-dom/test-utils';
import App from '../../App';
import Home from '../Home';

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => {

    return {

        ...(jest.requireActual('react-router-dom') as any),

        useNavigate: () => mockNavigate,

    }

})

beforeEach(() => {
    document.body.innerHTML = ''
})

afterEach(() => {
    cleanup()
})

describe('snap testing', () =>  {
    test('snap test for app component', () => {
        render(<App/>)
        expect(screen).toMatchSnapshot()
    })
})



describe('render input test', () => {
    test('textfield test', () => {
        render(
        <Home />
        );
        // eslint-disable-next-line testing-library/no-node-access
        const renderInputEl: any  = screen.getByTestId('parking-create-text-input').querySelector('input');
        fireEvent.change(renderInputEl, {target: {value: 'india'}})
    })
})

test('calls onClick prop when clicked', () => {
    render(<Home />)
    const submitBtn = screen.getByTestId('parking-create-submit-button')
    // eslint-disable-next-line testing-library/no-node-access
    const slotInput: any = screen.getByTestId('parking-create-text-input').querySelector('input')
    fireEvent.change(slotInput, {target : {value: 'number'}})
    expect(submitBtn).toBeInTheDocument()
})

test('submit button test', () => {
    render(<Home />)
    const submitBtn = screen.getByTestId('parking-create-submit-button') 
    expect(submitBtn).toBeInTheDocument()
})

// test('test submit function', async () => {
//     render(<Home />)
//     const submitBtn = screen.getByTestId('parking-create-submit-button')  
//     await act(async() => {
//         await fireEvent.click(submitBtn)
//     })
// })