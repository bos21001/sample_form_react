import React from 'react';
import './style.css';

function Title(props) {
    return (
        <div className='mb-3'>
            <h4 class='card-title'>{props.title.title}</h4>
            <h6 class='card-subtitle mb-2 text-muted'>{props.title.subtitle}</h6>
        </div>
    )
}

function InputForm(props) {
    return (
        <div className='mb-3'>
            <label for={props.for} className='form-label fw-semibold'>{props.label}</label>
            {props.children}
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            age: '',
            email: '',
            note: ''
        };
        this.title = props.title;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert(this.state.nickname + " " + this.state.age + " " + this.state.email + " " + this.state.note);
        event.preventDefault();
    }

    render() {
        return (
            <div className='container p-0 card bg-light position-absolute top-50 start-50 translate-middle shadow-lg'>
                <div className='card-body'>
                    <form onSubmit={this.handleSubmit}>

                        <Title title={this.title} />

                        <InputForm for='nickname' label='Nickname'>
                            <input type='text' value={this.state.nickname} onChange={this.handleInputChange} className='form-control shadow-sm' name='nickname' id='nickname' placeholder='Tito' required />
                        </InputForm>

                        <InputForm for='age' label='Age'>
                            <input type='number' value={this.state.age} onChange={this.handleInputChange} className='form-control shadow-sm' name='age' id='age' placeholder='23' required />
                        </InputForm>

                        <InputForm for='email' label='Email Adress'>
                            <input type='email' value={this.state.email} onChange={this.handleInputChange} className='form-control shadow-sm' name='email' id='email' placeholder='name@example.com' />
                        </InputForm>

                        <InputForm for='note' label='Note'>
                            <textarea value={this.state.note} onChange={this.handleInputChange} className='form-control shadow-sm' name='note' id='note' rows='2'></textarea>
                        </InputForm>

                        <div className='text-center'>
                            <input type='submit' value='Submit' className='btn btn-dark shadow-sm' />
                        </div>

                    </form>
                </div>
                <div class="card-footer text-center">
                    © 2022 - Christopher Mendes - Made with Bootstrap and React
                </div>
            </div>

        );
    }
}

export default App;