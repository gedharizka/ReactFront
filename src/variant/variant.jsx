import React from 'react';
import Create from './createvariant';
import { Button, Modal, ModalBody, ModalFooter, FormCheck, Toast } from 'react-bootstrap';
import { config } from '../configuration/config';
import { VariantService } from '../services/variantService';
import { CategoryServices } from '../services/categoryServices';


class Variant extends React.Component {
    variantModel = {
        _id: 0,
        name: '',
        categoryId : '',
        initial: '',
        active: true
    }
    constructor(props) {
        super(props);
        this.state = {
            variants: [],
            catagories: [],
            variant: this.variantModel,
            showModal: false,
            createNew: true,
            title: 'Create',
            buttonText: 'create New',
            jenis: 'success',
            readOnly: false,
            showToast: true,

        }
    }

    componentDidMount() {
        this.loadVar();
        this.loadCate();
    }

    loadVar = async () => {
        const cats = await VariantService.getAll();
        if (cats.success) {
            this.setState({
                variants: cats.result.data
            })
        } else {
            alert(cats.result)
        }
    }
    loadCate = async () => {
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
            variant: this.variantModel,
            showModal: true,
            createNew: true,
            title: 'create',
            buttonText: 'create New',
            jenis: 'success',
            readOnly: false
        })
    }

    onCancel = () => {
        this.setState({
            showModal: false
        })
    }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            variant: {
                ...this.state.variant,
                [name]: value
            }
        })
    }

    toggleEdit = async (id) => {
        const cats = await VariantService.getById(id);
        if (cats.success) {
            this.setState({
                variant: cats.result.data,
                showModal: true,
                createNew: false,
                title: 'edit',
                buttonText: 'save Change',
                jenis: 'danger',
                readOnly: false,
                showToast: true
            })
        }
    }
    toggleDelete = async (id) => {
        const cats = await VariantService.getById(id);
        if (cats.success) {
            this.setState({
                variant: cats.result.data,
                showModal: true,
                createNew: false,
                title: 'delete',
                buttonText: 'ya sudah yakin',
                jenis: 'danger',
                readOnly: true,
                showToast: true
            })
        }
    }
    handleCheckBox = name => event => {
        this.setState({
            variant: {
                ...this.state.variant,
                [name]: event.target.checked
            }
        })
    }

    handleSubmit = async () => {
        const { variant, title } = this.state;
        let newCata = {
            categoryId: variant.categoryId,
            name: variant.name,
            initial: variant.initial,
            active: variant.active
        }
        if (title === "create") {
            const cats = await VariantService.post(newCata);
            if (cats.success) {
                this.setState({
                    showModal: false,
                    showToast: true
                })
                this.loadVar();
            } else {
                alert(cats.result)
            }
        } else if (title === "edit") {
            const cats = await VariantService.put(variant._id, newCata);
            if (cats.success) {
                this.setState({
                    showModal: false
                })
                this.loadVar();
            } else {
                alert(cats.result)
            }
        } else if (title === "delete") {
            const cats = await VariantService.delete(variant._id, newCata);
            if (cats.success) {
                this.setState({
                    showModal: false
                })
                this.loadVa();
            } else {
                alert(cats.result)
            }
        }

    }

    showToast = (show) => {
        this.setState({
            showToast: show
        })

    }

    render() {
        const { showModal, variant, title, jenis, buttonText, readOnly, showToast, catagories } = this.state;

        return (
            <div>
                <h5>List of Variant</h5>
                <Button jenis="success" size="lg" onClick={() => this.onCreate()}>Create New</Button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Categori</th>
                            <th>Name</th>
                            <th>Initial</th>
                            <th>active</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.variants.map(c => {
                            return (
                                <tr key={c._id}>
                                    <td>{c._id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.initial}</td>
                                    <td>
                                        <FormCheck checked={c.active} readOnly />
                                    </td>
                                    <td>
                                        <buttonGroup>
                                            <Button jenis="warning" size="sm" onClick={() => this.toggleEdit(c._id)}>Edit</Button>
                                            <Button jenis="danger" size="sm" onClick={() => this.toggleDelete(c._id)}>Delete</Button>
                                        </buttonGroup>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Modal show={showModal}>
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <button type="button" className="close" aria-lable="close" onClick={this.onCancel}>&times;</button>
                    </div>
                    <ModalBody>
                        <Create catagories = {catagories}  variant={variant} handleChange={this.handleChange} handleCheckBox={this.handleCheckBox} readOnly={readOnly} />
                    </ModalBody>
                    <ModalFooter>
                        <Button jenis="light" size="sm" onClick={this.onCancel}>Cancel</Button>
                        <Button jenis=" btn btn-primary" size="sm" jenist={jenis} onClick={this.handleSubmit}>{buttonText}</Button>
                    </ModalFooter>
                </Modal>
                
                <div
                    style={{
                        position: 'absolute',
                        bottom: 5,
                        left: 5
                    }}>
                    <Toast show={showToast} delay={3000} onClose={() => this.showToast(false)} autohide>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">horeee km berhasil</strong>
                            <small>2 seconds ago</small>
                        </Toast.Header>
                        <Toast.Body>congratulation yah!</Toast.Body>
                    </Toast>
                
                </div>
            </div>
        )
    }
}


export default Variant;