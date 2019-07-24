import React from 'react';
import CreateEdit from './create';

class Crud extends React.Component {
    itemModel = {
        id: 0,
        name: '',
        initial: ' ',
        description: ' ',
        active: true
    }
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, name: '', initial: '', description: '', active: true },
                
            ],
            item: this.itemModel,
            hidden: true,
            createNew: false
        }
    }

    toggleCreate = () => {
        this.setState({
            hidden: false,
            item: this.itemModel,
            createNew: true

        })
    }

    toggleEdit = (id) => {
        // console.log(id);
        const selecteditem = this.state.items.find(i => i.id === id);
        this.setState({
            hidden: false,
            item: selecteditem,
            createNew: false
        });
    }

    toggleDelete = (id) => {
        const { items } = this.state;
        const selecteditem = this.state.items.find(i => i.id === id);
        if (window.confirm('Are You Sure to Delete' + selecteditem.name + '?')) {
            const idx = this.state.items.find(i => i.id === id);
            items.splice(idx, 1);
            this.setState({
                items: items
            })
        }
    }

    toggleSaveCancel = () => {
        this.setState({
            hidden: true
        })
    }



    handleChange = name => ({ target: { value } }) => {
        this.setState({
            item: {
                ...this.state.item,
                [name]: value
            }
        })
    }

    handleChangeCheckBox = name => event => {
        this.setState({
            item: {
                ...this.state.item,
                [name]: event.target.checked
            }
        })
    }
    handleSubmit = () => {
        const { item, items, createNew } = this.state;
        if (createNew) {
            let newId = parseInt(Math.max(...items.map(i => i.id), 0))
                + 1;
            let newIte = {
                id: newId,
                name: item.name,
                initial: item.initial,
                description: item.description,
                active: item.active
            }
            items.push(newIte)
        } else {
            const idx = this.state.items.findIndex(i => i.id === item.id);
            items[idx] = {
                id: item.id,
                name: item.name,
                initial: item.initial,
                description: item.description,
                active: item.active
            }
        }
        this.setState({
            items: items,
            hidden: false
        })

    }

    render() {
        const { items, item, hidden } = this.state;
        return (
            <div align="center">
                <h3>List of Item</h3>

                <button type="button" hidden={!hidden} onClick={this.toggleCreate}>Create New</button>
                <CreateEdit hidden={hidden} item={item} toggleSaveCancel={this.toggleSaveCancel} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} handleSubmit={this.handleSubmit} />
                <br />
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Initial</th>
                            <th>description</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(i => {
                            return (
                                <tr key={i.id}>
                                    <td>{i.name}</td>
                                    <td>{i.initial}</td>
                                    <td>{i.description}</td>
                                    <td><input type="checkbox" checked={i.active} readOnly/></td>
                                    <td>
                                        <button type="button" onClick={() => this.toggleEdit(i.id)}>Edit</button>
                                        <button type="button" onClick={() => this.toggleDelete(i.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }

                        )}

                    </tbody>
                </table>
            </div>
        )
    }
}
export default Crud;