import React from 'react';
import Tambah from './create';

class Employee extends React.Component {
    itemModel = {
        id: 0,
        FristName: '',
        LastName: ' ',
        Age: ' ',
        Salary: ' ',
        active: true
    }

    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, FirstName: '', LastName: '', Age: '', Salary: ' ', active: true },
                // { id: 2, FristName: ' ', LastName: 'Drn', Age: 'Mnuman Segar', Salary: ' 3', active: true },
                // { id: 3, FristName: ' ', iLastName: 'Dss', Age: 'Makanan Penutup', Salary: '123', active: true }
            ],
            item: this.itemModel,
            hi: true,
            createNew: false
        }
    }

    Create = () => {
        this.setState({
            hi: false,
            item: this.itemModel,
            createNew: true
        });
    }

    toggleEdit = (id) => {
        const selecteditem = this.state.items.find(i => i.id === id);
        this.setState({
            hi: false,
            item: selecteditem,
            createNew: false
        });
    }
    toggleDelete = (id) => {
        const { items } = this.state;
        const selecteditem = this.state.items.find(i => i.id === id);
        if (window.confirm('yakin mau hapus' + selecteditem.name + '?')) {
            const idx = this.state.items.find(i => i.id === id);
            items.splice(idx, 1);
            this.setState({
                items: items
            })
        }
    }

    toggleSaveCancel = () => {
        this.setState({
            hi: true
        })
    }   

    handleChange = nama => ({ target: { value } }) => {
        this.setState({
            item: {
                ...this.state.item,
                [nama]: value
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
                FirstName: item.FirstName,
                LastName: item.LastName,
                Age: item.Age,
                Salary: item.Salary,
                active: item.active
            }
            items.push(newIte)
        } else {
            const idx = this.state.items.findIndex(i => i.id === item.id);
            items[idx] = {
                id: item.id,
                FirstName: item.FirstName,
                LastName: item.LastName,
                Age: item.Age,
                Salary: item.Salary,
                active: item.active
            }
        }
        this.setState({
            items: items,
            hi: true
        })

    }

    render() {
        const { items, item, hi } = this.state;
        return (
            <div align="center">
                <h3>Employee</h3>

                <button type="button" hidden={!hi} onClick={this.Create}>Create New</button>
                
                <br />
                <table border="1">
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Age</th>
                            <th>Salary</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <Tambah hi={hi} item={item} toggleSaveCancel={this.toggleSaveCancel} handleChange={this.handleChange} handleChangeCheckBox={this.handleChangeCheckBox} handleSubmit={this.handleSubmit} />
                        {items.map(i => {
                            return (
                                <tr key={i.id}>
                                    <td>{i.FirstName}</td>
                                    <td>{i.LastName}</td>
                                    <td>{i.Age}</td>
                                    <td>{i.Salary}</td>
                                    <td><input type="checkbox" checked={i.active} readOnly /></td>
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
export default Employee;