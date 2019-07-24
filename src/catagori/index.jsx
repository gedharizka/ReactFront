import React from 'react';
import Create from './create';
import { Button, Modal, ModalBody, ModalFooter, FormCheck,Toast } from 'react-bootstrap';
import { config } from '../configuration/config'
import axios from 'axios';
import { CategoryServices } from '../services/categoryServices';

class Catagori extends React.Component {
    catagoriModel = {
        _id: '',
        name: '',
        initial: '',
        active: true
    }
    constructor(props) {
        super(props);
        this.state = {
            catagories: [
                { id: 1, name: 'main course', initial: 'ManCo', active: true },
                { id: 2, name: 'Drk', initial: 'Drink', active: false },
                { id: 3, name: 'Dessert', initial: 'Dss', active: true }
            ],
            catagori: this.catagoriModel,
            showModal: false,
            createNew: true,
            title: 'Create',
            buttonText: 'Create New',
            variant: 'success',
            readOnly: false,
            showToast:false
        }
    }

    componentDidMount() {
        this.loadCatagories();

    }

    loadCatagories = async () => {
        const cats = await CategoryServices.getAll();
        if (cats.success) {
            this.setState({
                catagories: cats.result.data
            })
        } else {
            alert(cats.result)
        }
    }

    onCreate = () => {
        this.setState({
            catagori: this.catagoriModel,
            showModal: true,
            title: 'Create',
            buttonText: 'Create New',
            variant: 'success',
            readOnly: false
        })
    }

    onEdit = (id) => {
        axios.get(config.url + '/category/' + id)
            .then(res => {
                this.setState({
                    catagori: res.data,
                    showModal: true,
                    createNew: false,
                    title: 'Edit',
                    buttonText: 'Save Change',
                    variant: 'warning',
                    readOnly: false
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onDelete = async (id) => {
        const cats = await CategoryServices.getById(id);
        if (cats.success) {
            this.setState({
                catagori: cats.result.data,
                showModal: true,
                createNew: false,
                title: 'Delete',
                buttonText: 'Yes Delete',
                variant: 'danger',
                readOnly: true
            })
        } else {
            alert(cats.result)
        }
    }

    onCancel = () => {
        this.setState({
            showModal: false
        })
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            catagori: {
                ...this.state.catagori,
                [name]: value
            }
        })
    }

    toggleEdit = (id) => {
        const selectedcata = this.state.catagories.find(i => i.id === id);
        this.setState({
            catagori: selectedcata,
            createNew: false,
            showModal: true
        });
    }

    // toggleDelete = (id) => {
    //     const { catagories } = this.state;
    //     const selectedCata = this.state.catagories.find(i => i.id === id);
    //     if (window.confirm('yakin mau hapus' + selectedCata.name + '?')) {
    //         const idx = this.state.catagories.find(i => i.id === id);
    //         catagories.splice(idx, 1);

    //         this.setState({
    //             catagories: catagories
    //         })
    //     }
    // }

    handleCheckBox = name => event => {
        this.setState({
            catagori: {
                ...this.state.catagori,
                [name]: event.target.checked
            }
        })
    }

    handleSubmit = async () => {
        const { catagori, title } = this.state;
        let newCat = {
            name: catagori.name,
            initial: catagori.initial,
            active: catagori.active
        }
        if (title === 'Create') {
            const cats = await CategoryServices.post(newCat);
            if (cats.success) {
                this.setState({
                    showModal: false,
                    showToast:true
                })
                this.loadCatagories();
            } else {
                alert(cats.result)
            }
        } else if (title === 'Edit') {
            const cats = await CategoryServices.put(catagori._id, newCat);
            if (cats.success) {
                this.setState({
                    showModal: false,
                    showToast:true
                })
                this.loadCatagories();
            } else {
                alert(cats.result)
            }
        } else if (title === 'Delete') {
            const cats = await CategoryServices.delete(catagori._id);
            if (cats.success) {
                this.setState({
                    showModal: false,
                    showToast:true
                })
                this.loadCatagories();
            } else {
                alert(cats.result)
            }
        }
    }

    cakeToast=(show)=>{
        this.setState({
            showToast:show
        })
    }
    

    render() {
        const { showModal, catagori, title, buttonText, variant, readOnly,showToast } = this.state;

        return (
            <div>
                <h5>List of Catagory</h5>
                <Button variant="success" size="sm" onClick={this.onCreate}>Create New</Button>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Initial</td>
                            <td>active</td>
                            <td>action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.catagories.map(c => {
                            return (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td>{c.initial}</td>
                                    <td>
                                        <FormCheck checked={c.active} readOnly />
                                    </td>
                                    <td>
                                        <Button variant="warning" size="sm" onClick={() => this.onEdit(c._id)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => this.onDelete(c._id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Modal show={showModal}>
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <Button type="button" className="close" aria-lable="close" readOnly={readOnly} onClick={this.onCancel}>&times;</Button>
                    </div>
                    <ModalBody>
                        <Create catagori={catagori} handleChange={this.handleChange} readOnly={readOnly} handleCheckBox={this.handleCheckBox} />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" size="sm" onClick={this.onCancel}>Cancel</Button>
                        <Button variant=" btn btn-primary" size="sm" onClick={this.handleSubmit} variant={variant} >{buttonText}</Button>
                    </ModalFooter>

                </Modal>

                <div style={{
                    position:'absolute',
                    bottom:5,
                    left:5
                    }}
                >


                <Toast onClose={()=>this.cakeToast(false)} show={showToast} delay={3000}  autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>2 seconds ago</small>
                    </Toast.Header>
                    <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
                </Toast>

                </div>
            </div>
        )
    }
}


export default Catagori;